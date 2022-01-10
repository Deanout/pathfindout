import { Container } from "@mui/material";
import React, { useEffect } from "react";
import "./App.css";
import Pathfindout from "./features/pathfindout/Pathfindout";
import ResponsiveAppBar from "./features/navbar/ResponsiveAppBar";
import { connect, useDispatch, useSelector } from "react-redux";
import { getInitialGrid, selectGrid, setGrid } from "./features/grid/gridSlice";
import {
  retrieveNodeTypes,
  selectNodeTypes,
  setNodeTypes,
} from "./features/nodetypes/nodeTypesSlice";

function App(props) {
  const dispatch = useDispatch();
  // dispatch(retrieveNodeTypes())
  //   .then((response) => {
  //     return response.payload;
  //   })
  //   .then((response) => {
  //     dispatch(setNodeTypes(response));
  //     const nodeTypes = response;

  //     dispatch(getInitialGrid())
  //       .then((response) => response.payload)
  //       .then((response) => {
  //         response.nodeTypes = nodeTypes;
  //         dispatch(setGrid(response));
  //       });
  //   });
  // dispatch(retrieveNodeTypes());
  // dispatch(getInitialGrid());
  let nodeTypes = [];
  useEffect(() => {
    dispatch(retrieveNodeTypes()).then((nodeTypeResponse) => {
      console.log(nodeTypeResponse.payload);
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
