
import "dotenv/config";
import fs from "fs";

type ListModelsResponse =
  | { models: { name: string }[]; error?: never }
  | { models?: never; error: unknown }
  | { models?: undefined; error?: undefined };

async function listAllModelsToFile() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
        process.exit(1);
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = (await response.json()) as ListModelsResponse;

        if (data.models) {
            const names = data.models.map((m) => m.name);
            fs.writeFileSync("available_models.txt", names.join("\n"));
            console.log("Written to available_models.txt");
        } else {
            console.error("No models found or error:", data);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

listAllModelsToFile();
