import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectLeftMouseButtonState } from "../grid/gridSlice";
import { selectCurrentNodeType } from "../nodetypes/nodeTypesSlice";
import "./Node.css";
function Node(props) {
  const [nodeStyle, setNodeStyle] = useState({});
  const leftMouseButtonState = useSelector(selectLeftMouseButtonState);
  const currentNodeType = useSelector(selectCurrentNodeType);

  function handleClick() {
    modifyNode(currentNodeType);
  }
  /**
   * Check if the left mouse button is down.
   * If the mouse button is down, console.log("Mouse is down")
   */
  function handleMouseEnter() {
    console.log(leftMouseButtonState);
    console.log(currentNodeType);
    if (leftMouseButtonState === 1) {
      modifyNode(currentNodeType);
    }
  }

  function modifyNode() {
    setNodeStyle({ backgroundColor: currentNodeType.color });
  }
  const nodeContainer = (
    <div
      id={`node-${props.row}-${props.col}`}
      className={"node"}
      style={nodeStyle}
      onDragStart={() => false}
      draggable="false"
      onClick={() => handleClick()}
      onMouseEnter={() => handleMouseEnter()}
    ></div>
  );
  return nodeContainer;
}

export default Node;
