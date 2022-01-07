import React from "react";
import "./App.css";
import { NodeTypes } from "./features/nodetypes/NodeTypes";
import NodeTypesList from "./features/nodetypes/NodeTypesList";
import {
  selectNodeTypes,
  addNodeType,
} from "./features/nodetypes/nodeTypesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  let nodeTypes = useSelector(selectNodeTypes);
  window.nodeTypes = nodeTypes;
  function handleSubmit(nodeType) {
    nodeTypes = dispatch(addNodeType(nodeType));
  }
  return (
    <div className="App">
      <header className="App-header">
        <NodeTypes handleSubmit={handleSubmit.bind(this)} />
        <NodeTypesList nodeTypes={nodeTypes} />
      </header>
    </div>
  );
}

export default App;
