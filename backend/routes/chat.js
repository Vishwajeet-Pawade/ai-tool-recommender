const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const Tool = require("../models/Tool");
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    // Step 1 - Fetch all tools from MongoDB
    const tools = await Tool.find({});

    // Step 2 - Format tools with ALL fields for LLaMA
    const toolsList = tools.map(t => 
      `ID: ${t.id} | Name: ${t.name} | Description: ${t.description} | Purposes: ${(t.purposes || []).join(", ")} | Tags: ${(t.tags || []).join(", ")} | Pricing: ${t.pricing} | Rating: ${t.rating} | Reviews: ${t.reviews} | Popularity: ${t.popularity} | HumanEval: ${t.humanEval} | MBPP: ${t.mbpp} | Accuracy: ${t.accuracy} | Speed: ${t.speed}`
    ).join("\n");

    // Step 3 - Send to LLaMA with ranking instruction
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an AI tool recommender assistant.
          Here are all available tools in our platform with their complete data:
          ${toolsList}
          
          When user asks something:
          1. Find the most RELEVANT tools for their specific need
          2. Rank them from BEST to WORST based on:
             - How well the tool matches the user's need
             - Rating and reviews
             - Popularity
             - HumanEval and MBPP scores (for coding related questions)
             - Pricing (if user mentions free or paid)
          3. Only recommend tools that actually exist in the list above
          4. Return maximum 5 most relevant tools
          
          Always reply in this exact JSON format only, nothing else:
          {
            "explanation": "Brief explanation of why these tools are recommended in this order",
            "toolIds": ["best-tool-id", "second-best-id", "third-best-id"]
          }`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    // Step 4 - Parse response
    const rawReply = response.choices[0].message.content;
    
    // Clean response in case LLaMA adds extra text
    const jsonMatch = rawReply.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from AI");
    }
    
    const parsed = JSON.parse(jsonMatch[0]);

    res.json({
      explanation: parsed.explanation,
      toolIds: parsed.toolIds
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;