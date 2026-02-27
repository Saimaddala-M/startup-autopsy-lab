
import "dotenv/config";

async function listAllModels() {
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
            console.error("API Error:", data.error);
        } else {
            console.log("FULL MODEL LIST:");
            data.models?.forEach((m: any) => {
                // Strip 'models/' prefix for easier reading, but keep it in mind
                console.log(m.name);
            });
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

listAllModels();
