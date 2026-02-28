import "dotenv/config";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import { ForumMessage } from "./types";
import { MOCK_EXPERTS } from "./server/data";
import * as gemini from "./server/gemini";
import { connectDB } from "./server/db";
import path from "path";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize MongoDB
  await connectDB();

  const httpServer = createServer(app);

  // NOTE: Socket.io (WebSockets) will NOT work on serverless platforms like Netlify.
  // For real-time features, consider using a service like Pusher or Ably.
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Real-time Forum State (In-memory for demo)
  const messages: ForumMessage[] = [
    { id: '1', user: 'FounderBot', text: 'Welcome to the Public Forum! Share your ideas here.', timestamp: Date.now() }
  ];

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Send existing messages
    socket.emit("forum:init", messages);

    socket.on("forum:message", (msg) => {
      const newMessage = {
        ...msg,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now()
      };
      messages.push(newMessage);
      // Keep only last 50 messages
      if (messages.length > 50) messages.shift();

      io.emit("forum:message", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/experts", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Experts Fetch Failed:", error);
      res.json(MOCK_EXPERTS); // Fallback to mock data if DB fails
    }
  });

  app.post("/api/experts/apply", async (req, res) => {
    try {
      const { name, role, expertise, bio, availability, avatar } = req.body;
      const { data, error } = await supabase
        .from('experts')
        .insert([{ name, role, expertise, bio, availability, avatar: avatar || `https://picsum.photos/seed/${name}/100/100` }]);

      if (error) throw error;
      res.json({ status: "success", message: "Application received", data });
    } catch (error) {
      console.error("Expert Application Failed:", error);
      res.status(500).json({ status: "error", message: "Failed to submit application" });
    }
  });

  app.post("/api/analyze", async (req, res) => {
    try {
      const result = await gemini.analyzeStartup(req.body);

      // Save to Supabase (Universal persistence)
      try {
        await supabase
          .from('analysis_results')
          .insert([{
            startup_name: req.body.name,
            input_data: req.body,
            result_data: result
          }]);
      } catch (dbErr) {
        console.warn("Supabase Save Failed:", dbErr);
      }

      res.json(result);
    } catch (error: unknown) {
      console.error(error);
      const err = error as { status?: number; message?: string };
      res.status(err.status || 500).json({ error: err.message });
    }
  });

  app.get("/api/history", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('analysis_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("History Fetch Failed:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  app.post("/api/spy", async (req, res) => {
    try {
      const result = await gemini.spyOnCompetitor(req.body.name);
      // Removed MongoDB persistence for spy reports as requested
      res.json(result);
    } catch (error: unknown) {
      console.error(error);
      const err = error as { status?: number; message?: string };
      res.status(err.status || 500).json({ error: err.message });
    }
  });

  app.get("/api/radar", async (req, res) => {
    try {
      const result = await gemini.getTrendRadarData();
      res.json(result);
    } catch (error: unknown) {
      console.error(error);
      const err = error as { status?: number; message?: string };
      res.status(err.status || 500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production" && !process.env.NETLIFY) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (process.env.NODE_ENV === "production" && !process.env.NETLIFY) {
    // Only serve static files manually if NOT on Netlify (Netlify handles this via netlify.toml)
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  // Only listen if we are running the script directly (not as a serverless function)
  if (!process.env.NETLIFY && !process.env.VERCEL && !process.env.FUNCTIONS_EMULATOR && !process.env.K_SERVICE) {
    httpServer.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

export const appPromise = startServer();

// Default export for serverless environments
export default async (req: Request, res: Response) => {
  const app = await appPromise;
  app(req, res);
};
