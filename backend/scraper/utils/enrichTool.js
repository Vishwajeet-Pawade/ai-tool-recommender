const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const enrichTool = async (name, description) => {
  try {
    const prompt = `You are an AI tools analyst. Given this specific AI tool, return ONLY raw JSON with NO markdown, NO explanation.

Tool Name: ${name}
Description: ${description}

Rules:
- humanEval and mbpp should be REALISTIC for this specific tool type (coding tools score 60-90, writing tools 20-50, image tools 10-30)
- rating should vary between 3.2 and 4.9 based on description quality
- reviews should be realistic (new tools: 50-500, established: 1000-10000)
- speed should vary (simple tools: 70-95, complex AI: 40-70)
- ALL values must be different and realistic for THIS specific tool

{"rating":X,"reviews":X,"pros":["...","...","..."],"cons":["...","..."],"purposes":["...","..."],"skillLevel":["..."],"platforms":["..."],"languages":["English"],"privacy":"Standard","accuracy":"High","speed":X,"pricing":"...","ideIntegration":[],"humanEval":X,"mbpp":X}`;

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    const text = response.choices[0]?.message?.content?.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const json = JSON.parse(clean);
    return json;
  } catch (err) {
    console.warn(`[Enrich] Failed for "${name}":`, err.message);
    return null;
  }
};

module.exports = enrichTool;