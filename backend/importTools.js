
const mongoose = require("mongoose");
const Tool = require("./models/Tool");
const tools = require("./toolsData")

mongoose.connect(
"mongodb://admin4343:Vishwajeet4343@ac-jdaltqn-shard-00-00.tpyd8gw.mongodb.net:27017,ac-jdaltqn-shard-00-01.tpyd8gw.mongodb.net:27017,ac-jdaltqn-shard-00-02.tpyd8gw.mongodb.net:27017/ai_tools?ssl=true&replicaSet=atlas-t05zy7-shard-0&authSource=admin&appName=Cluster0"
)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));



async function insertTools(){
  for (let tool of tools) {
    await Tool.updateOne(
      { id: tool.id },     // check by id
      { $set: tool },      // update data
      { upsert: true }     // insert if not exists
    )
  }
  console.log("Tools inserted/updated")
  process.exit()
}

insertTools();
