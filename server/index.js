const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const NodeTypeModel = require("./models/NodeTypes");
const NodeTypes = require("./db/seedNodeTypes");

const SERVER_PORT = 3001;
const CONNECTION_STRING =
  "mongodb+srv://deanout:nwj5kjv2ynf7VMH-ktf@pathfindout.uu8xi.mongodb.net/pathfindout?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });

app.get("/", async (request, response) => {
  try {
    await airNode.save();
    response.send("Saved");
  } catch (error) {
    console.log(error);
  }
});

app.get("/seedNodeTypes", async (request, response) => {
  console.log("Seeding + " + NodeTypes.length + " NodeTypes...");
  for (let i = 0; i < NodeTypes.length; i++) {
    const nodeType = NodeTypes[i];
    try {
      console.log("Seeding nodetype.");
      await nodeType.save();
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const nodeTypes = await NodeTypeModel.find();
    response.send(nodeTypes);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getNodeTypes", async (request, response) => {
  console.log("Getting node types...");
  try {
    const nodeTypes = await NodeTypeModel.find();
    response.send(nodeTypes);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addNodeType", async (request, response) => {
  console.log("Adding a node type...");
  try {
    const nodeType = await NodeTypeModel.create(request.body);
    response.send(nodeType);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/destroyAllNodeTypes", async (request, response) => {
  console.log("Destroying all node types...");

  try {
    await NodeTypeModel.deleteMany();
    const nodeTypes = await NodeTypeModel.find();
    response.send(nodeTypes);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/destroyNodeType", async (request, response) => {
  console.log("Destroying a node type...");
  const nodeToDelete = request.body.payload._id;
  console.log(request.body);
  console.log(nodeToDelete);
  try {
    await NodeTypeModel.deleteOne({ _id: nodeToDelete });
    const nodeTypes = await NodeTypeModel.find();
    response.send(nodeTypes);
  } catch (error) {
    console.log(error);
  }
});

app.listen(SERVER_PORT, () => {
  console.log("Server is running on port " + SERVER_PORT);
});
