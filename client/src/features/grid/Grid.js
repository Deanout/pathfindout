import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Node from "../nodes/Node";
import "./Grid.css";
import { selectGridSize } from "./gridSlice";
import { selectNodeTypes } from "../nodetypes/nodeTypesSlice";

function Grid() {
  const dispatch = useDispatch();
  const gridSize = selectGridSize();
  const nodeTypes = useSelector(selectNodeTypes);

  let width = gridSize.width;
  let height = gridSize.height;

  function handleNodeClick(row, col) {
    console.log(row + ", " + col);
  }

  return (
    <div className="grid">
      {createGrid(width, height).map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((col, colIdx) => {
              return (
                <Node
                  key={colIdx}
                  row={rowIdx}
                  col={colIdx}
                  onClickCallback={() => handleNodeClick(rowIdx, colIdx)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
function createGrid(width, height) {
  let grid = [];
  for (let i = 0; i < width; i++) {
    grid.push([]);
    for (let j = 0; j < height; j++) {
      grid[i].push([]);
    }
  }
  return grid;
}
export default Grid;
