import React from "react";
import "./Node.css";
function Node(props) {
  function handleClick() {
    props.onClickCallback(props.row, props.col);
  }
  return <div className="node" onClick={() => handleClick()}></div>;
}

export default Node;
