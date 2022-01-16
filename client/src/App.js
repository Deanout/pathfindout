import { Container } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import "./App.css";
import Pathfindout from "./features/pathfindout/Pathfindout";
import ResponsiveAppBar from "./features/navbar/ResponsiveAppBar";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setGridByDimensions,
  getInitialGrid,
  setGrid,
  setCurrentNodeType,
} from "./features/grid/gridSlice";
import {
  retrieveNodeTypes,
  setNodeTypes,
} from "./features/nodetypes/nodeTypesSlice";
import _ from "lodash";

function App(props) {
  const dispatch = useDispatch();
  let nodeTypes;
  useEffect(() => {
    nodeTypes = setupPathfindout(dispatch);
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <ResponsiveAppBar />
      </div>
      <Container>
        <h1>Pathfindout</h1>
        <p>If life can find a way, so can your algorithms.</p>
        <div id="pathfindout_container">
          <Pathfindout />
        </div>
      </Container>
      {/* NodeTypes creation view? Pane?*/}
      {/* <NodeTypes />
        <NodeTypesList /> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    nodeTypes: state.nodeTypes,
  };
};
export default connect(mapStateToProps)(App);

function setupPathfindout(dispatch, props) {
  let nodeTypes;
  dispatch(retrieveNodeTypes()).then((nodeTypeResponse) => {
    nodeTypes = nodeTypeResponse.payload;
    dispatch(setNodeTypes(nodeTypes));
    dispatch(
      setCurrentNodeType({ nodeTypes: nodeTypes, id: nodeTypes[0]._id })
    );
  });

  dispatch(getInitialGrid()).then((response) => {
    const data = {
      grid: response.payload,
      nodeTypes: nodeTypes,
    };
    dispatch(setGrid(data));
  });
  return nodeTypes;
}
