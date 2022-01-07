import React from "react";

function NodeTypesForm() {
  return (
    <div>
      <label>Name</label>
      <input type="text" />
      <label>Weight</label>
      <input type="number" />
      <label>Color</label>
      <input type="text" />
      <button>Create NodeType</button>
    </div>
  );
}

export default NodeTypesForm;
