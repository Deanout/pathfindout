import React, { memo } from "react";

import MemoizedNode from "../nodes/Node";
import "./Grid.css";

function Grid(props) {
  var grid = props.grid.data;
  const nodeTypes = props.nodeTypes;

  if (grid.length === 0) {
    return <div></div>;
  }
  if (nodeTypes.length === 0) {
    return <div></div>;
  }
  return (
    <div className="grid" onDragStart={() => false} draggable="false">
      {grid.map((row, rowIdx) => {
        return (
          <div
            className="col"
            key={rowIdx}
            onDragStart={() => false}
            draggable="false"
          >
            {row.map((col, colIdx) => {
              var node = grid[rowIdx][colIdx];
              return (
                <MemoizedNode
                  key={colIdx}
                  row={rowIdx}
                  col={colIdx}
                  nodeType={node}
                  nodeTypes={props.nodeTypes}
                  onDragStart={() => false}
                  draggable="false"
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default memo(Grid);
