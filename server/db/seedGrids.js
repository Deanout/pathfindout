const GridModel = require("../models/GridModel");

const initGridWidth = 5;
const initGridHeight = 5;

const InitialGrid = new GridModel({
  name: "Initial Grid",
  width: initGridWidth,
  height: initGridHeight,
  data: initGrid(initGridWidth, initGridHeight),
});

const Grids = [InitialGrid];
module.exports = Grids;

function initGrid(width, height) {
  let grid = [];
  for (let i = 0; i < width; i++) {
    grid.push([]);
    for (let j = 0; j < height; j++) {
      grid[i].push([0]);
    }
  }
  console.log(grid);
  return grid;
}
