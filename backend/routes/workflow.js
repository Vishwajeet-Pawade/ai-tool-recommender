const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const Tool = require("../models/Tool");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    // Step 1 — Generate workflow steps using LLaMA
    const workflowResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content: `You are a workflow generator. Given a task, generate 3-5 clear workflow steps.
Reply ONLY as JSON with no extra text:
{"steps": ["Step 1", "Step 2", "Step 3"]}`
        },
        {
          role: "user",
          content: `Generate workflow steps for: ${query}`
        }
      ]
    });

    const rawWorkflow = workflowResponse.choices[0].message.content;
    const workflowMatch = rawWorkflow.match(/\{[\s\S]*\}/);
    if (!workflowMatch) throw new Error("Invalid workflow response");
    const { steps } = JSON.parse(workflowMatch[0]);

    // Step 2 — Fetch all tools from MongoDB once
    const allTools = await Tool.find({});

    // Step 3 — For each step, ask LLaMA which tool IDs are most relevant
    // We do this by scoring tools locally — NO extra LLaMA call per step to save tokens
    const workflowWithTools = steps.map((step) => {
      const stepLower = step.toLowerCase().replace(/[^a-z0-9\s]/g, '');
      const stepWords = stepLower.split(/\s+/).filter(w => w.length > 2);

      const scored = allTools.map(tool => {
        const purposes = (tool.purposes || [])
          .map(p => String(p).toLowerCase().replace(/_/g, ' '));
        const tags = (tool.tags || [])
          .map(t => String(t).toLowerCase());
        const name = (tool.name || '').toLowerCase();
        const desc = (tool.description || '').toLowerCase();

        let score = 0;

        stepWords.forEach(word => {
          // Exact purpose match — highest score
          if (purposes.some(p => p === word)) score += 200;
          // Purpose contains the word
          else if (purposes.some(p => p.includes(word))) score += 120;
          // Tag exact match
          if (tags.some(t => t === word)) score += 100;
          // Tag contains word
          else if (tags.some(t => t.includes(word))) score += 60;
          // Name match
          if (name.includes(word)) score += 50;
          // Description match
          if (desc.includes(word)) score += 15;
        });

        // Also check if step words appear in tool's full text combined
        const fullText = `${purposes.join(' ')} ${tags.join(' ')} ${name} ${desc}`;
        const fullMatch = stepWords.filter(w => fullText.includes(w)).length;
        score += fullMatch * 10;

        // Boost by real data — rating and popularity matter
        if (score > 0) {
          score += (tool.rating || 0) * 15;
          score += (tool.popularity || 0) * 0.5;
          score += Math.min((tool.reviews || 0) / 500, 20);
        }

        return { tool, score };
      });

      // Get top 3 tools with score > 0
      const topTools = scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(s => s.tool);

      return { step, tools: topTools };
    });

    res.json({ query, workflow: workflowWithTools });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;