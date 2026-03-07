
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Startup Autopsy Lab</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #0f0f0f; color: #e0e0e0; padding: 40px 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #fff; margin-bottom: 8px; }
    .subtitle { color: #888; font-size: 1rem; margin-bottom: 40px; border-bottom: 1px solid #222; padding-bottom: 20px; }
    h2 { font-size: 1.1rem; color: #aaa; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; margin-top: 40px; }
    .feature { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start; }
    .feature-label { color: #c084fc; font-weight: 600; min-width: 120px; }
    .feature-desc { color: #ccc; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    td { padding: 10px 14px; border: 1px solid #222; color: #ccc; }
    td:first-child { color: #c084fc; font-weight: 600; width: 100px; }
    .code-block { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 20px; margin-top: 8px; }
    .code-block code { display: block; font-family: 'Courier New', monospace; font-size: 0.9rem; color: #86efac; margin-bottom: 4px; }
    .cmd-row { display: flex; gap: 20px; margin-bottom: 8px; }
    .cmd { font-family: 'Courier New', monospace; color: #60a5fa; min-width: 160px; }
    .cmd-desc { color: #888; }
    .badge { display: inline-block; background: #1a1a1a; border: 1px solid #333; color: #aaa; font-size: 0.75rem; padding: 4px 10px; border-radius: 20px; margin-top: 8px; }
    hr { border: none; border-top: 1px solid #222; margin: 40px 0; }
  </style>
</head>
<body>
  <div class="container">

    <h1>Startup Autopsy Lab</h1>
    <p class="subtitle">An AI-powered platform that helps founders analyze startup ideas, evaluate competitors, and identify strategic risks.</p>

    <h2>Features</h2>
    <div class="feature">
      <span class="feature-label">AI Analyzer</span>
      <span class="feature-desc">Evaluates your idea, identifies risks, and scores confidence</span>
    </div>
    <div class="feature">
      <span class="feature-label">Spy Mode</span>
      <span class="feature-desc">Competitive intelligence with strength and vulnerability mapping</span>
    </div>
    <div class="feature">
      <span class="feature-label">Trend Radar</span>
      <span class="feature-desc">Emerging opportunities and failure pattern detection</span>
    </div>

    <h2>Tech Stack</h2>
    <table>
      <tr><td>Frontend</td><td>React, TypeScript, Vite, TailwindCSS</td></tr>
      <tr><td>Backend</td><td>Supabase Edge Functions, Express</td></tr>
      <tr><td>AI</td><td>Gemini API (Google Generative AI)</td></tr>
      <tr><td>Database</td><td>Supabase</td></tr>
      <tr><td>Hosting</td><td>Firebase Hosting / Netlify</td></tr>
    </table>

    <h2>Environment Variables</h2>
    <p style="color:#888; margin-bottom:8px;">Create a <code style="color:#f9a8d4;">.env</code> file in the root directory:</p>
    <div class="code-block">
      <code>GEMINI_API_KEY=your_gemini_api_key</code>
      <code>SUPABASE_URL=your_supabase_url</code>
      <code>SUPABASE_ANON_KEY=your_supabase_anon_key</code>
    </div>

    <h2>Getting Started</h2>
    <div class="code-block">
      <div class="cmd-row"><span class="cmd">npm install</span><span class="cmd-desc">Install dependencies</span></div>
