const NodeTypeModel = require("../models/NodeTypes");

const Air = new NodeTypeModel({
  name: "Air",
  weight: 0,
  color: "#FFF",
  walkable: true,
});
const Wall = new NodeTypeModel({
  name: "Wall",
  weight: Infinity,
  color: "#0c3547",
  walkable: false,
});
const Water = new NodeTypeModel({
  name: "Water",
  weight: 1,
  color: "#0080ff",
  walkable: true,
});
const Nodetypes = [Air, Wall, Water];
module.exports = Nodetypes;
