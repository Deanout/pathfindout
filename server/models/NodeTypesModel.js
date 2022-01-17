const mongoose = require("mongoose");

const NodeTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  walkable: {
    type: Boolean,
    required: true,
    default: false,
  },
  previousNodeType: {
    type: Number,
    required: false,
  },
});

const NodeTypes = mongoose.model("NodeTypes", NodeTypesSchema);
module.exports = NodeTypes;
