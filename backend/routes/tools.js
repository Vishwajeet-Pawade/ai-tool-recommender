const express = require("express");
const router = express.Router();

const Tool = require("../models/Tool");

// GET all tools
router.get("/", async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;