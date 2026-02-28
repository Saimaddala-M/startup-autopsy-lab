
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StartupInput, AnalysisResult, SpyResult, RadarData } from "../types";

const getApiKey = () => {
  // In Firebase Cloud Functions, we use process.env.GEMINI_API_KEY set via Secrets
  const key = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  console.log("Attempting to use API Key (length):", key.length);
  return key;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    console.error("Gemini SDK Catch:", {
      message: error.message,
      status: error.status,
    });

    if (retries > 0 && (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota'))) {
      await sleep(delay);
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

// Using verified stable model: gemini-flash-latest
const MODEL_NAME = "gemini-flash-latest";

export const analyzeStartup = async (input: StartupInput): Promise<AnalysisResult> => {
  return withRetry(async () => {
    const genAI = new GoogleGenerativeAI(getApiKey());
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
    
    Return the analysis in this EXACT JSON format:
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
    }

    System Instruction: You are Startup Autopsy AI. Analyze startups simply and honestly. No hype.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  });
};

export const spyOnCompetitor = async (name: string): Promise<SpyResult> => {
  return withRetry(async () => {
    const genAI = new GoogleGenerativeAI(getApiKey());
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Analyze the company: ${name}. 
    Explain where they are strong, where they are weak, and what a new competitor could do differently. 
    Return in this EXACT JSON format:
    {
      "name": "${name}",
      "founder": "string (The verified founders)",
      "estimatedRevenue": "string (Latest reported or estimated revenue with currency)",
      "marketShare": "string (Verified or estimated market share percentage/position)",
      "strengths": ["string"],
      "weaknesses": ["string"],
      "differentiationIdeas": ["string"],
      "pressureLevel": "Low" | "Medium" | "High"
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  });
};

export const getTrendRadarData = async (): Promise<RadarData> => {
  return withRetry(async () => {
    const genAI = new GoogleGenerativeAI(getApiKey());
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Provide a report on 3 current startup failure patterns and 3 high-growth opportunity industries for 2026.
    Return in this EXACT JSON format:
    {
      "failurePatterns": [
        { "pattern": "string", "risk": "Low"|"Medium"|"High"|"Critical", "description": "string", "realWorldExample": "string" }
      ],
      "opportunityIndustries": [
        { "industry": "string", "growth": "string", "trend": "Up"|"Down"|"Steady", "description": "string", "keyDrivers": ["string"] }
      ],
      "lastUpdated": "2026-02-25"
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  });
};
