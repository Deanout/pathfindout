import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridSize: { width: 25, height: 25 },
  grid: [],
  leftMouseButtonState: 0,
};

/**
 * function createGrid(width, height) {
  let grid = [];
  for (let i = 0; i < width; i++) {
    grid.push([]);
    for (let j = 0; j < height; j++) {
      grid[i].push([]);
    }
  }
  return grid;
}
 */

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridSize: (state, action) => {
      state.gridSize = action.payload;
    },
    setLeftMouseButtonState: (state, action) => {
      state.leftMouseButtonState = action.payload;
      console.log("LMB is currently " + state.leftMouseButtonState);
    },
  },
});

export const { setGridSize, setLeftMouseButtonState } = gridSlice.actions;

/**
 * Selectors allow us to choose a value from the state. Here we're selecting the
 * Grid size from the state.
 */
export const selectGridSize = (state) => {
  if (state?.gridSize === undefined) {
    return initialState.gridSize;
  }
  return state.gridSize;
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLeftMouseButtonState = (state) =>
  state.grid.leftMouseButtonState;

export default gridSlice.reducer;
