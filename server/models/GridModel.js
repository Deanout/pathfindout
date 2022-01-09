const mongoose = require("mongoose");

const GridSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  },
  width: {
    type: Number,
    required: true,
    default: 25,
  },
  height: {
    type: Number,
    required: true,
    default: 25,
  },
  data: {
    type: Array,
    required: true,
    default: [],
  },
});

const Grid = mongoose.model("Grid", GridSchema);
module.exports = Grid;
