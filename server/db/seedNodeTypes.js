const NodeTypeModel = require("../models/NodeTypesModel");

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
  weight: 50,
  color: "#0080ff",
  walkable: true,
});
const Lava = new NodeTypeModel({
  name: "Lava",
  weight: Infinity,
  color: "#ff0000",
  walkable: false,
});
const Sand = new NodeTypeModel({
  name: "Sand",
  weight: 7,
  color: "#f0e68c",
  walkable: true,
});
const Grass = new NodeTypeModel({
  name: "Grass",
  weight: 5,
  color: "#00ff00",
  walkable: true,
});
const Dirt = new NodeTypeModel({
  name: "Dirt",
  weight: 4,
  color: "#8b4513",
  walkable: true,
});
const Stone = new NodeTypeModel({
  name: "Stone",
  weight: 3,
  color: "#7f7f7f",
  walkable: true,
});
const Start = new NodeTypeModel({
  name: "Start",
  weight: 0,
  color: "#00ff00",
  walkable: true,
});
const End = new NodeTypeModel({
  name: "End",
  weight: 0,
  color: "#ff0000",
  walkable: true,
});
const Nodetypes = [
  Air,
  Wall,
  Water,
  Lava,
  Sand,
  Grass,
  Dirt,
  Stone,
  Start,
  End,
];
module.exports = Nodetypes;
