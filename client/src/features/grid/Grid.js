import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Node from "../nodes/Node";
import "./Grid.css";
import { selectGridSize, selectGrid } from "./gridSlice";
import { selectNodeTypes } from "../nodetypes/nodeTypesSlice";

function Grid(props) {
  const dispatch = useDispatch();
  const grid = props.grid.data;
  const nodeTypes = props.nodeTypes;
  console.log("Grid rendered");
  function handleNodeClick(row, col) {}
  if (grid.length === 0) {
    return <div></div>;
  }
  if (nodeTypes.length === 0) {
    return <div></div>;
  }
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div className="col" key={rowIdx} onDragStart={() => false}>
            {row.map((col, colIdx) => {
              const node = grid[rowIdx][colIdx];
              return (
                <Node
                  key={colIdx}
                  row={rowIdx}
                  col={colIdx}
                  nodeType={node}
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
