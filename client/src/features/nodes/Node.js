import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectLeftMouseButtonState } from "../grid/gridSlice";
import { selectCurrentNodeType } from "../nodetypes/nodeTypesSlice";
import "./Node.css";
function Node(props) {
  const initialClass = "node ";
  const [nodeClass, setNodeClass] = useState(initialClass);
  const leftMouseButtonState = useSelector(selectLeftMouseButtonState);
  const currentNodeType = useSelector(selectCurrentNodeType);

  function handleClick() {
    props.onClickCallback(props.row, props.col);
    const newClass = currentNodeType.name;
    createNodeClass(newClass);
  }
  /**
   * Check if the left mouse button is down.
   * If the mouse button is down, console.log("Mouse is down")
   */
  function handleMouseEnter() {
    console.log(leftMouseButtonState);
    console.log(currentNodeType);
    if (leftMouseButtonState === 1) {
      console.log("True");
      const newClass = currentNodeType.name;
      createNodeClass(newClass);
    }
  }

  function createNodeClass(newClass) {
    setNodeClass(initialClass + newClass);
  }
  return (
    <div
      className={nodeClass}
      onDragStart={() => false}
      draggable="false"
      onClick={() => handleClick()}
      onMouseEnter={() => handleMouseEnter()}
    ></div>
  );
}

export default Node;
