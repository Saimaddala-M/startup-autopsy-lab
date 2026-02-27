
import { analyzeStartup } from "../_shared/gemini.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
    console.log(`Request received: ${req.method} ${req.url}`);

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const startupData = await req.json();
        console.log("Input data:", JSON.stringify(startupData).substring(0, 100) + "...");

        const result = await analyzeStartup(startupData);
        console.log("Analysis successful");

        return new Response(
            JSON.stringify(result),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
    } catch (error) {
        console.error("Function Error:", error.message);
        return new Response(
            JSON.stringify({ error: error.message, detail: error.stack }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
    }
});
