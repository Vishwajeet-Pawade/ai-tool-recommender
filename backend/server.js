const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(
"mongodb://admin4343:Vishwajeet4343@ac-jdaltqn-shard-00-00.tpyd8gw.mongodb.net:27017,ac-jdaltqn-shard-00-01.tpyd8gw.mongodb.net:27017,ac-jdaltqn-shard-00-02.tpyd8gw.mongodb.net:27017/ai_tools?ssl=true&replicaSet=atlas-t05zy7-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

const toolRoutes = require("./routes/tools")
const chatRoutes = require("./routes/chat")

app.use("/tools", toolRoutes)
app.use("/chat", chatRoutes)

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})

const workflowRoutes = require("./routes/workflow");
app.use("/workflow", workflowRoutes);