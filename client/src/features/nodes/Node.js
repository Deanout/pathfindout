import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setNodeType,
  setLeftMouseButtonState,
  setNodeTypeOnClick,
} from "../grid/gridSlice";

import "./Node.css";
function Node(props) {
  const dispatch = useDispatch();
  const [LMB, setLMB] = useState(0);
  const [nodeStyle, setNodeStyle] = useState({
    backgroundColor: props.nodeType.color,
  });
  useEffect(() => {
    setNodeStyle({ backgroundColor: props.nodeType.color });
  }, [props.nodeType]);

  function handleClick(e) {
    dispatch(
      setNodeTypeOnClick({
        row: props.row,
        col: props.col,
      })
    );
  }
  /**
   * Check if the left mouse button is down.
   * If the mouse button is down, console.log("Mouse is down")
   */
  function handleMouseEnter(e) {
    const currentLMB = e.buttons;
    if (currentLMB === 1) {
      setLMB(currentLMB);
      dispatch(setLeftMouseButtonState(currentLMB));
      dispatch(
        setNodeType({
          row: props.row,
          col: props.col,
        })
      );
    }
  }

  return (
    <div
      id={`node-${props.row}-${props.col}`}
      className={`node ${props.nodeType.name}`}
      style={nodeStyle}
      onDragStart={() => false}
      draggable="false"
      onClick={() => handleClick()}
      onMouseEnter={(e) => handleMouseEnter(e)}
    ></div>
  );
}

export default memo(Node);
