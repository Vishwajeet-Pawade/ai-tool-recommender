const express = require("express")
const router = express.Router()

const Tool = require("../models/Tool")

// GET all tools
router.get("/", async (req,res)=>{
 const tools = await Tool.find()
 res.json(tools)
})

module.exports = router