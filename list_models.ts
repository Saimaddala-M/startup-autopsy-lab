
import "dotenv/config";

type ListModelsResponse =
  | { models: { name: string; supportedGenerationMethods: string[] }[]; error?: never }
  | { models?: never; error: unknown }
  | { models?: undefined; error?: undefined };

async function listAllModels() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env");
        return;
    }

    // The SDK doesn't have a direct listModels helper that's easy to use without the REST API sometimes.
    // We'll use a fetch call to the discovery endpoint.
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = (await response.json()) as ListModelsResponse;

        if (data.error) {
            console.error("API Error:", data.error);
        } else {
            console.log("Available Models:");
            data.models?.forEach((m) => {
                console.log(`- ${m.name} (Supported methods: ${m.supportedGenerationMethods.join(', ')})`);
            });
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

listAllModels();
