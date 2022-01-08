import React from "react";
import "./App.css";
import { NodeTypes } from "./features/nodetypes/NodeTypes";
import NodeTypesList from "./features/nodetypes/NodeTypesList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Navbar*/}
        {/* Grid */}

        {/* NodeTypes creation view? Pane?*/}
        <NodeTypes />
        <NodeTypesList />
      </header>
    </div>
  );
}

export default App;
