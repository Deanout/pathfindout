const mongoose = require("mongoose");

const NodeTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const NodeTypes = mongoose.model("NodeTypes", NodeTypesSchema);
module.exports = NodeTypes;
