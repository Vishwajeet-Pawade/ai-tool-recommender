const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb://admin4343:Vishwajeet4343@ac-jdaltqn-shard-00-00.tpyd8gw.mongodb.net:27017,ac-jdaltqn-shard-00-01.tpyd8gw.mongodb.net:27017,ac-jdaltqn-shard-00-02.tpyd8gw.mongodb.net:27017/ai_tools?ssl=true&replicaSet=atlas-t05zy7-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// 🔥 ROUTES (FIXED)
const toolRoutes = require("./routes/tools");
app.use("/tools", toolRoutes)

// Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});