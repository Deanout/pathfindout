import React, { useEffect } from "react";
import MemoizedGrid from "../grid/Grid";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setLeftMouseButtonState,
  selectLeftMouseButtonState,
} from "../grid/gridSlice";
import NodeTypesList from "../nodetypes/NodeTypesList";

function Pathfindout(props) {
  const dispatch = useDispatch();

  return (
    <main>
      <MemoizedGrid nodeTypes={props.nodeTypes.nodeTypes} grid={props.grid} />
      <br />
      <NodeTypesList nodeTypes={props.nodeTypes.nodeTypes} />
    </main>
  );
}
const mapStateToProps = (state) => {
  return {
    nodeTypes: state.nodeTypes,
    grid: state.gridStore.grid,
  };
};
export default connect(mapStateToProps)(Pathfindout);
