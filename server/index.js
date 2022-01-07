const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const NodeTypeModel = require("./models/NodeTypes");

const SERVER_PORT = 3001;
const CONNECTION_STRING =
  "mongodb+srv://deanout:nwj5kjv2ynf7VMH-ktf@pathfindout.uu8xi.mongodb.net/pathfindout?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });

const airNode = new NodeTypeModel({
  name: "Air",
  weight: 0,
  color: "#FFF",
});

app.get("/", async (request, response) => {
  try {
    await airNode.save();
    response.send("Saved");
  } catch (error) {
    console.log(error);
  }
});

app.get("/getNodeTypes", async (request, response) => {
  try {
    const nodeTypes = await NodeTypeModel.find();
    response.send(nodeTypes);
  } catch (error) {
    console.log(error);
  }
});

app.listen(SERVER_PORT, () => {
  console.log("Server is running on port " + SERVER_PORT);
});
