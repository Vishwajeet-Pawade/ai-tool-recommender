const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const Tool = require("../models/Tool");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ✅ Category keywords mapping
const categoryKeywords = {
  "image generation": ["image", "photo", "picture", "art", "design", "visual", "dall", "midjourney", "stable", "flux"],
  "video generation": ["video", "animation", "film", "movie", "clip", "runway", "sora"],
  "coding": ["code", "coding", "programming", "developer", "debug", "copilot", "github", "cursor"],
  "writing": ["write", "writing", "content", "blog", "copy", "essay", "text", "jasper", "grammarly"],
  "research": ["research", "search", "data", "analysis", "perplexity", "scholar"],
  "chatbots": ["chat", "assistant", "chatbot", "conversation", "gpt", "claude", "gemini"],
  "data analysis": ["data", "analysis", "analytics", "spreadsheet", "excel", "sql"],
  "video generation": ["video", "animation", "runway", "sora", "clip"],
};

// ✅ Detect category from user query
function detectCategory(query) {
  const q = query.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(k => q.includes(k))) {
      return category;
    }
  }
  return null;
}

router.post("/", async (req, res) => {
  const { message, filters } = req.body;

  try {
    // Build full context
    let fullContext = "";
    if (message) fullContext += message + " ";
    if (filters?.purposes?.length > 0) fullContext += filters.purposes.join(" ") + " ";

    // ✅ Step 1 — Detect category from context
    const detectedCategory = detectCategory(fullContext);

    // ✅ Step 2 — Fetch only relevant tools from MongoDB
    let relevantTools;

    if (detectedCategory) {
      // Fetch tools matching detected category
      relevantTools = await Tool.find({
        purposes: { $regex: new RegExp(detectedCategory, 'i') }
      }).limit(20);

      // If not enough results, also search by tags
      if (relevantTools.length < 3) {
        relevantTools = await Tool.find({
          $or: [
            { purposes: { $regex: new RegExp(detectedCategory, 'i') } },
            { tags: { $regex: new RegExp(detectedCategory, 'i') } }
          ]
        }).limit(20);
      }
    } else if (filters?.purposes?.length > 0) {
      // Use filter purposes to fetch tools
      relevantTools = await Tool.find({
        purposes: { $regex: new RegExp(filters.purposes[0], 'i') }
      }).limit(20);
    } else {
      // No category detected — use top rated tools
      relevantTools = await Tool.find({})
        .sort({ rating: -1 })
        .limit(15);
    }

    // ✅ Step 3 — Format tools minimally to save tokens
    const toolsList = relevantTools.map(t =>
      `ID:${t.id}|Name:${t.name}|Purposes:${(t.purposes || []).slice(0, 2).join(",")}|Pricing:${t.pricing}|Rating:${t.rating}|Popularity:${t.popularity}`
    ).join("\n");

    // ✅ Step 4 — Build user context
    let userContext = "";
    if (message) userContext += `User needs: ${message}. `;
    if (filters?.purposes?.length > 0) userContext += `Purpose: ${filters.purposes.join(",")}. `;
    if (filters?.budget?.length > 0) userContext += `Pricing: ${filters.budget.join(",")}. `;
    if (filters?.skillLevels?.length > 0) userContext += `Skill: ${filters.skillLevels.join(",")}. `;

    // ✅ Step 5 — Send to LLaMA
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content: `AI tool recommender. Available tools:\n${toolsList}\n\nRank max 5 best matching tools.\nReply ONLY as JSON: {"explanation":"brief reason","toolIds":["id1","id2","id3"]}`
        },
        {
          role: "user",
          content: userContext || "Show best AI tools"
        }
      ]
    });

    // ✅ Step 6 — Parse and validate response
    const rawReply = response.choices[0].message.content;
    const jsonMatch = rawReply.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate IDs exist in database
    const allIds = relevantTools.map(t => t.id);
    const validIds = (parsed.toolIds || []).filter((id) =>
      allIds.includes(id)
    );

    res.json({
      explanation: parsed.explanation,
      toolIds: validIds.length > 0 ? validIds : allIds.slice(0, 5)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;