import { Container } from "@mui/material";
import React from "react";
import "./App.css";
import Pathfindout from "./features/main/Pathfindout";
import ResponsiveAppBar from "./features/navbar/ResponsiveAppBar";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <ResponsiveAppBar />
      </div>
      <Container maxWidth="sm">
        <Pathfindout />
      </Container>

      {/* NodeTypes creation view? Pane?*/}
      {/* <NodeTypes />
        <NodeTypesList /> */}
    </div>
  );
}

export default App;
