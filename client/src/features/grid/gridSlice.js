import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridSize: { width: 25, height: 25 },
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridSize: (state, action) => {
      state.gridSize = action.payload;
    },
  },
});

export const { setGridSize } = gridSlice.actions;

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

export default gridSlice.reducer;
