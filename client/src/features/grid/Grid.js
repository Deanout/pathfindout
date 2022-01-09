import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Node from "../nodes/Node";
import "./Grid.css";
import { selectGridSize, selectGrid } from "./gridSlice";
import { selectNodeTypes } from "../nodetypes/nodeTypesSlice";

const mapStateToProps = (state) => {
  return {
    grid: selectGrid(state),
  };
};

function Grid() {
  const dispatch = useDispatch();
  const grid = useSelector(selectGrid);
  console.log("Logging the grid: ");
  console.log(grid);
  const nodeTypes = useSelector(selectNodeTypes);

  function handleNodeClick(row, col) {
    console.log(row + ", " + col);
  }

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx} onDragStart={() => false}>
            {row.map((col, colIdx) => {
              return (
                <Node
                  key={colIdx}
                  row={rowIdx}
                  col={colIdx}
                  onClickCallback={() => handleNodeClick(rowIdx, colIdx)}
                  onDragStart={() => false}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default Grid;
