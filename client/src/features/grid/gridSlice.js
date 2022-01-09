import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInitialGridFromAPI } from "./GridAPI";

const initialState = {
  gridSize: { width: 25, height: 25 },
  grid: {
    _id: 1,
    name: "",
    width: 25,
    height: 25,
    data: [],
  },
  leftMouseButtonState: 0,
};

/**
 * Get the initial grid from getInitialGridFromAPI.
 */
export const getInitialGrid = createAsyncThunk("/getInitialGrid", async () => {
  var response = await getInitialGridFromAPI();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const gridStoreSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridSize: (state, action) => {
      state.gridSize = { width: state.grid.width, height: state.grid.height };
    },
    setGrid: (state, action) => {
      const convertedGrid = convertGridNumbersToNodeTypes(
        action.payload.data,
        action.payload.nodeTypes
      );
      state.grid.data = convertedGrid;
    },
    setLeftMouseButtonState: (state, action) => {
      state.leftMouseButtonState = action.payload;
      console.log("LMB is currently " + state.leftMouseButtonState);
    },
  },
});

function convertGridNumbersToNodeTypes(gridToConvert, nodeTypes) {
  for (var i = 0; i < gridToConvert.length; i++) {
    for (var j = 0; j < gridToConvert[i].length; j++) {
      if (j % 2 === 0) {
        gridToConvert[i][j] = nodeTypes[0];
      } else {
        gridToConvert[i][j] = nodeTypes[1];
      }
      //gridToConvert[i][j] = nodeTypes[gridToConvert[i][j]];
    }
  }
  return gridToConvert;
}

export const { setGridSize, setLeftMouseButtonState, setGrid } =
  gridStoreSlice.actions;

/**
 * Selectors allow us to choose a value from the state. Here we're selecting the
 * Grid size from the state.
 */
export const selectGridSize = (state) => {
  if (state?.gridSize === undefined && state?.grid === undefined) {
    return initialState.gridSize;
  }
  if (state?.gridSize !== undefined) {
    return state.gridSize;
  }
  if (state?.grid !== undefined) {
    return { width: state.grid.width, height: state.grid.height };
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLeftMouseButtonState = (state) =>
  state.gridStore.leftMouseButtonState;

export const selectGrid = (state) => {
  return state.gridStore.grid.data;
};

export default gridStoreSlice.reducer;
