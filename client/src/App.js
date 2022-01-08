import { Container } from "@mui/material";
import React from "react";
import "./App.css";
import Main from "./features/main/Main";
import ResponsiveAppBar from "./features/navbar/ResponsiveAppBar";
import { NodeTypes } from "./features/nodetypes/NodeTypes";
import NodeTypesList from "./features/nodetypes/NodeTypesList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ResponsiveAppBar />
      </header>
      <Container maxWidth="sm">
        <Main />
      </Container>

      {/* NodeTypes creation view? Pane?*/}
      {/* <NodeTypes />
        <NodeTypesList /> */}
    </div>
  );
}

export default App;
