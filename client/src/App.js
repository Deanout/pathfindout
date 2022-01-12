import { Container } from "@mui/material";
import React, { useEffect } from "react";
import "./App.css";
import Pathfindout from "./features/pathfindout/Pathfindout";
import ResponsiveAppBar from "./features/navbar/ResponsiveAppBar";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getInitialGrid,
  selectGridData,
  setGrid,
} from "./features/grid/gridSlice";
import {
  retrieveNodeTypes,
  selectNodeTypes,
  setNodeTypes,
} from "./features/nodetypes/nodeTypesSlice";

function App(props) {
  const dispatch = useDispatch();

  let nodeTypes = [];
  useEffect(() => {
    let mounted = true;
    dispatch(retrieveNodeTypes()).then((nodeTypeResponse) => {
      nodeTypes = nodeTypeResponse.payload;
      dispatch(setNodeTypes(nodeTypes));
    });
    dispatch(getInitialGrid()).then((response) => {
      response.nodeTypes = props.nodeTypes;
      const data = {
        grid: response.payload,
        nodeTypes: nodeTypes,
      };
      dispatch(setGrid(data));
      return response.payload.data;
    });
    return () => (mounted = false);
  }, []);

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
