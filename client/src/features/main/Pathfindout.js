import React from "react";
import Grid from "../grid/Grid";
import { useDispatch } from "react-redux";
import { setLeftMouseButtonState } from "../grid/gridSlice";
import NodeTypesList from "../nodetypes/NodeTypesList";

var prevMouseState;
/**
 * Sets the mouse button state to track whether the LMB is up or down.
 * This is used to determine whether to set node types or not.
 *
 * See reference for details on additional buttons.
 * @reference https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
 */
function initMouseButtonListeners(dispatch) {
  document.addEventListener("mouseup", setButtonStates);
  document.addEventListener("mousedown", setButtonStates);
  /**
   * Sets the mouse button state in the store.
   * Also sets the mouse button state to the previous state.
   * @param {*} e
   */
  function setButtonStates(e) {
    console.log(e.buttons + " " + prevMouseState);
    switch (e.buttons) {
      case prevMouseState:
        break;
      case 0:
        dispatch(setLeftMouseButtonState(0));
        break;
      case 1:
        dispatch(setLeftMouseButtonState(1));
        break;
      default:
        dispatch(setLeftMouseButtonState(0));
        break;
    }
    prevMouseState = e.buttons;
  }
}

function Pathfindout() {
  const dispatch = useDispatch();
  prevMouseState = 0;
  initMouseButtonListeners(dispatch);

  return (
    <main>
      <Grid />
      <br />
      <NodeTypesList />
    </main>
  );
}

export default Pathfindout;
