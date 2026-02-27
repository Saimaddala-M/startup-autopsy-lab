
import { GoogleGenerativeAI } from "npm:@google/generative-ai@^0.21.0";

const getApiKey = () => {
  return Deno.env.get("GEMINI_API_KEY") || "";
};

const getGenAI = () => new GoogleGenerativeAI(getApiKey());
const MODEL_NAME = "gemini-flash-latest"; // Using verified latest flash model to avoid 404

export const analyzeStartup = async (input: any) => {
  console.log("Analyzing startup:", input.name);
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `Perform a high-level strategic audit of the following startup venture:
    ENTITY NAME: ${input.name}
    CORE PROBLEM: ${input.problem}
    TARGET DEMOGRAPHIC: ${input.audience}
    SECTOR: ${input.industry}
    REVENUE ARCHITECTURE: ${input.revenueModel}
    KNOWN COMPETITORS: ${input.competitors || 'None disclosed'}
    CAPITAL STAGE: ${input.budget}
    
    Return JSON:
    {
      "problemSolved": "string",
      "targetUsers": "string",
      "whyItMightWork": ["string"],
      "mainRisks": ["string"],
      "monetizationCheck": "string",
      "improvements": ["string"],
      "riskScore": "Low" | "Medium" | "High",
      "marketGapStrength": "Weak" | "Moderate" | "Strong",
      "growthPotential": number (0-10),
      "confidenceScore": number (0-100)
    }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log("Analysis Success");
  return JSON.parse(text);
};

export const spyOnCompetitor = async (name: string) => {
  console.log("Spying on:", name);
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `Analyze company: ${name}. EXACT JSON:
    {
      "name": "${name}",
      "strengths": ["string"],
      "weaknesses": ["string"],
      "differentiationIdeas": ["string"],
      "pressureLevel": "Low" | "Medium" | "High"
    }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log("Spy Success");
  return JSON.parse(text);
};

export const getTrendRadarData = async () => {
  console.log("Fetching Radar Data");
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `Provide report on 3 failure patterns and 3 high-growth industries. EXACT JSON:
    {
      "failurePatterns": [{ "pattern": "string", "risk": "Low"|"Medium"|"High", "description": "string", "realWorldExample": "string" }],
      "opportunityIndustries": [{ "industry": "string", "growth": "string", "trend": "Up"|"Down", "description": "string", "keyDrivers": ["string"] }],
      "lastUpdated": "2026-02-25"
    }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log("Radar Success");
  return JSON.parse(text);
};
