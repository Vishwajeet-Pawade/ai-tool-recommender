const mongoose = require("mongoose")

const ToolSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: String,
  logo: String,
  description: String,
  detailedDescription: String,
  rating: Number,
  reviews: Number,
  humanEval: Number,
  mbpp: Number,

  tags: { type: [String], default: [] },
  purposes: { type: [String], default: [] },
  skillLevel: { type: [String], default: [] },

  pricing: String,

  platforms: { type: [String], default: [] },
  languages: { type: [String], default: [] },

  privacy: String,
  accuracy: String,

  speed: Number,
  popularity: Number,

  ideIntegration: { type: [String], default: [] },

  website: String,

  pros: { type: [String], default: [] },
  cons: { type: [String], default: [] }
})

module.exports = mongoose.model("Tool", ToolSchema)