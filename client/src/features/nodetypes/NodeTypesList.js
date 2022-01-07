import React from "react";

function NodeTypesList(props) {
  console.log(props);
  return (
    <div>
      <h2>Node Types</h2>
      <ul>
        {props.nodeTypes?.nodeTypes?.map((nodeType, index) => (
          <li key={`nodetype-${index}`}>{nodeType.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NodeTypesList;
