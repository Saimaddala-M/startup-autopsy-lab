
import "dotenv/config";

async function listAllModelsDetailed() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env");
        return;
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
        } else {
            console.log("Full Model Data:");
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

listAllModelsDetailed();
