import React, { useState } from "react";

export function NodeTypes(props) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [color, setColor] = useState("");

  function handleClick(value) {
    const nodeType = {
      name: name,
      weight: weight,
      color: color,
    };
    setName("");
    setWeight(0);
    setColor("");
    props.handleSubmit(nodeType);
  }

  function handleNameChange(value) {
    setName(value);
  }

  function handleWeightChange(value) {
    setWeight(value);
  }

  function handleColorChange(value) {
    setColor(value);
  }

  return (
    <div>
      <div>
        <div className="form-control">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Weight</label>
          <input
            value={weight}
            onChange={(e) => handleWeightChange(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Color</label>
          <input
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
        <button onClick={(event) => handleClick(event.target.value)}>
          Add node type{" "}
        </button>
      </div>
    </div>
  );
}
