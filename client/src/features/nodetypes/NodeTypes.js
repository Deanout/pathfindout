import React, { useState } from "react";
import {
  retrieveNodeTypes,
  addNodeTypeToAPI,
  setNodeTypes,
} from "./nodeTypesSlice";
import { useDispatch } from "react-redux";

export function NodeTypes(props) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  function handleClick() {
    const nodeType = {
      name: name,
      weight: weight,
      color: color,
    };
    setName("");
    setWeight(0);
    setColor("");
    console.log(`Submitting ${JSON.stringify(nodeType)}`);
    dispatch(addNodeTypeToAPI(nodeType)).then(() => {
      dispatch(retrieveNodeTypes()).then((response) => {
        dispatch(setNodeTypes(response.payload));
      });
    });
    //props.onSubmit(nodeType);
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
        <button onClick={() => handleClick()}>Add node type </button>
      </div>
    </div>
  );
}
