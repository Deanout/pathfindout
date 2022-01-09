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
  const nodeTypes = useSelector((state) => state.nodeTypes.nodeTypes);

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
          <div className="row" key={rowIdx} onDragStart={() => false}>
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
