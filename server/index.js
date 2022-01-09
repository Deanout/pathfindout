const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const NodeTypeModel = require("./models/NodeTypesModel");
const GridModel = require("./models/GridModel");

const NodeTypes = require("./db/seedNodeTypes");
const Grids = require("./db/seedGrids");
require("dotenv").config();

const SERVER_PORT = 3001;
/**
 * Get DB password from .env file.
 */
const DB_PASSWORD = process.env.DB_PASSWORD;
/**
 * Get DB name from .env file.
 */
const DB_USER = process.env.DB_USER;
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@pathfindout.uu8xi.mongodb.net/pathfindout?retryWrites=true&w=majority`;
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
  seedNodeTypes(request, response);
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

async function seedNodeTypes() {
  for (let i = 0; i < NodeTypes.length; i++) {
    const nodeType = NodeTypes[i];
    try {
      console.log("Seeding nodetype.");
      await nodeType.save();
    } catch (error) {
      console.log(error);
    }
  }
}

app.get("/seedGrids", async (request, response) => {
  console.log("Seeding + " + Grids.length + " Grids...");
  for (let i = 0; i < Grids.length; i++) {
    const grid = Grids[i];
    try {
      console.log("Seeding grid.");
      await grid.save();
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const grids = await GridModel.find();
    response.send(grids);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getInitialGrid", async (request, response) => {
  console.log("Getting initial grid...");
  try {
    const grid = await GridModel.findOne({ name: "Initial Grid" });
    response.send(grid);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/destroyAllGrids", async (request, response) => {
  console.log("Destroying all grids...");

  try {
    await GridModel.deleteMany();
    const grids = await GridModel.find();
    response.send(grids);
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
