import { grid } from "@mui/system";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Algorithms } from "../../algorithms/algorithms";
import { getInitialGridFromAPI } from "./GridAPI";
import produce from "immer";

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
  currentNodeType: {},
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
      return produce(state, (draftState) => {
        draftState.grid = action.payload;
        draftState.grid.data = convertGridNumbersToNodeTypes(
          action.payload.grid.data,
          action.payload.nodeTypes
        );
      });
    },
    setGridByAlgorithm: (state, action) => {
      const algorithm = action.payload.Algorithm;
      const nodeTypes = action.payload.nodeTypes;

      return produce(state, (draftState) => {
        switch (algorithm) {
          case Algorithms.Evens:
            draftState.grid.data = generateEvensGrid(
              state.grid.data,
              nodeTypes
            );
            break;
          default:
            console.log("Default case");
            break;
        }
      });
    },
    setLeftMouseButtonState: (state, action) => {
      if (action.payload !== state.leftMouseButtonState) {
        state.leftMouseButtonState = action.payload;
      }
    },
    /**
     * create a function to set a node type in the grid.
     */
    setNodeType: (state, action) => {
      const newNodeType = state.currentNodeType;
      const oldNodeType =
        state.grid.data[action.payload.row][action.payload.col];
      if (oldNodeType !== newNodeType && state.leftMouseButtonState === 1) {
        return produce(state, (draftState) => {
          draftState.grid.data[action.payload.row][action.payload.col] =
            draftState.currentNodeType;
        });
      }
    },
    setNodeTypeOnClick: (state, action) => {
      const newNodeType = state.currentNodeType;
      const oldNodeType =
        state.grid.data[action.payload.row][action.payload.col];
      if (oldNodeType !== newNodeType) {
        return produce(state, (draftState) => {
          draftState.grid.data[action.payload.row][action.payload.col] =
            draftState.currentNodeType;
        });
      }
    },
    /**
     * Sets the current node type that is applied with a left click on the grid.
     * @param {*} state The default state.
     * @param {*} action Should contain the list of NodeTypes, and the new current node type.
     */
    setCurrentNodeType: (state, action) => {
      console.log(action.payload);
      const nodeTypes = action.payload.nodeTypes;
      const result = nodeTypes.find((nodeType) => {
        return nodeType._id === action.payload.id;
      });
      state.currentNodeType = result;
    },
  },
});

function convertGridNumbersToNodeTypes(gridToConvert, nodeTypes) {
  const rowLength = gridToConvert[0].length;
  for (var i = 0; i < gridToConvert.length; i++) {
    for (var j = 0; j < gridToConvert[i].length; j++) {
      if ((rowLength * i + j) % 2 !== 0) {
        gridToConvert[i][j] = nodeTypes[0];
      } else {
        gridToConvert[i][j] = nodeTypes[1];
      }
      //convertedGrid[i][j] = nodeTypes[convertedGrid[i][j]];
    }
  }
  return gridToConvert;
}

function generateEvensGrid(gridToConvert, nodeTypes) {
  const rowLength = gridToConvert[0].length;
  for (var i = 0; i < gridToConvert.length; i++) {
    for (var j = 0; j < gridToConvert[i].length; j++) {
      if ((rowLength * i + j) % 2 === 0) {
        gridToConvert[i][j] = nodeTypes[1];
      } else {
        gridToConvert[i][j] = nodeTypes[1];
      }
      //convertedGrid[i][j] = nodeTypes[convertedGrid[i][j]];
    }
  }
  return gridToConvert;
}

export const {
  setGridSize,
  setLeftMouseButtonState,
  setGrid,
  setGridByAlgorithm,
  setNodeType,
  setCurrentNodeType,
  setNodeTypeOnClick,
} = gridStoreSlice.actions;

/**
 * Selectors allow us to choose a value from the state. Here we're selecting the
 * Grid size from the state.
 */
export const selectGridSize = (state) => {
  return { width: state.grid.width, height: state.grid.height };
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLeftMouseButtonState = (state) =>
  state.gridStore.leftMouseButtonState;

export const selectGridData = (state) => {
  return state.gridStore.grid.data;
};

export const selectGrid = (state) => {
  return state.gridStore.grid;
};

export default gridStoreSlice.reducer;
