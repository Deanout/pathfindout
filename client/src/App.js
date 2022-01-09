import { Container } from "@mui/material";
import React from "react";
import "./App.css";
import Pathfindout from "./features/pathfindout/Pathfindout";
import ResponsiveAppBar from "./features/navbar/ResponsiveAppBar";
import { useDispatch, useSelector } from "react-redux";
import { getInitialGrid, selectGrid, setGrid } from "./features/grid/gridSlice";
import {
  retrieveNodeTypes,
  selectNodeTypes,
  setNodeTypes,
} from "./features/nodetypes/nodeTypesSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(retrieveNodeTypes())
    .then((response) => {
      return response.payload;
    })
    .then((response) => {
      dispatch(setNodeTypes(response));
      const nodeTypes = response;

      dispatch(getInitialGrid())
        .then((response) => response.payload)
        .then((response) => {
          response.nodeTypes = nodeTypes;
          dispatch(setGrid(response));
        });
    });

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
