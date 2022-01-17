import { grid } from "@mui/system";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Algorithms } from "../../algorithms/algorithms";
import { getInitialGridFromAPI } from "./GridAPI";
import produce from "immer";
import { generateGridFrom2DSimplex } from "../../algorithms/simplex";

const initialState = {
  gridSize: { width: 25, height: 25 },
  nodeSize: { width: 25, height: 25 },
  start: { row: 3, col: 3, previousNodeType: "Air" },
  end: { row: 18, col: 18, previousNodeType: "Air" },
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
        setStartAndEndNodePreviousNodes(draftState);
      });
    },
    setGridByAlgorithm: (state, action) => {
      const algorithm = action.payload.Algorithm;
      const nodeTypes = action.payload.nodeTypes;

      return produce(state, (draftState) => {
        switch (algorithm) {
          case Algorithms.Clear:
            console.log("Clearing grid");
            draftState.grid.data = clearGrid(state.grid.data, nodeTypes);
            break;
          case Algorithms.Evens:
            console.log("Generating evens grid");
            draftState.grid.data = generateEvensGrid(
              state.grid.data,
              nodeTypes
            );
            break;
          case Algorithms.Random:
            console.log("Generating random grid");
            draftState.grid.data = generateRandomGrid(
              state.grid.data,
              nodeTypes
            );
            break;
          case Algorithms.Simplex:
            console.log("Generating Simplex Grid");
            draftState.grid.data = generateGridFrom2DSimplex(
              state.grid.data[0].length,
              state.grid.data.length,
              nodeTypes
            );
            break;
          default:
            console.log("Default case");
            break;
        }
        setStartAndEndNodePreviousNodes(draftState);
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
          if (newNodeType.name === "Start") {
            draftState.grid.data[draftState.start.row][draftState.start.col] =
              draftState.start.previousNodeType;
            draftState.start = {
              row: action.payload.row,
              col: action.payload.col,
              previousNodeType: oldNodeType,
            };
          } else if (newNodeType.name === "End") {
            draftState.grid.data[draftState.end.row][draftState.end.col] =
              draftState.end.previousNodeType;
            draftState.end = {
              row: action.payload.row,
              col: action.payload.col,
              previousNodeType: oldNodeType,
            };
          }
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
      const nodeTypes = action.payload.nodeTypes;
      const result = nodeTypes.find((nodeType) => {
        return nodeType._id === action.payload.id;
      });
      state.currentNodeType = result;
    },
    setGridByDimensions: (state, action) => {
      const width = action.payload.width;
      const height = action.payload.height;
      const nodeWidth = state.nodeSize.width;
      const nodeHeight = state.nodeSize.height;
      const nodeTypes = action.payload.nodeTypes;
      produce(state, (draftState) => {
        const gridToRevert = createGridByDimensions(
          width,
          height,
          nodeWidth,
          nodeHeight
        );
        draftState.grid.data = convertGridNumbersToNodeTypes(
          gridToRevert,
          nodeTypes
        );
      });
    },
  },
});

function setStartAndEndNodePreviousNodes(draftState) {
  const startRow = draftState.start.row;
  const startCol = draftState.start.col;
  const endRow = draftState.end.row;
  const endCol = draftState.end.col;
  draftState.start = {
    row: 3,
    col: 3,
    previousNodeType: draftState.grid.data[startRow][startCol],
  };
  draftState.end = {
    row: 18,
    col: 18,
    previousNodeType: draftState.grid.data[endRow][endCol],
  };
  return draftState;
}

function clearGrid(gridToClear, nodeTypes) {
  const grid = gridToClear.map((row) => {
    return row.map((node) => {
      return nodeTypes[0];
    });
  });
  return grid;
}

function createGridByDimensions(width, height, nodeWidth, nodeHeight) {
  const grid = [];
  const normalizedWidth = Math.floor(width / nodeWidth);
  const normalizedHeight = Math.floor(height / nodeHeight);
  for (var i = 0; i < normalizedHeight; i++) {
    grid.push([]);
    for (var j = 0; j < normalizedWidth; j++) {
      grid[i].push();
    }
  }
  return grid;
}

function convertGridNumbersToNodeTypes(gridToConvert, nodeTypes) {
  for (var i = 0; i < gridToConvert.length; i++) {
    for (var j = 0; j < gridToConvert[i].length; j++) {
      const node = gridToConvert[i][j];
      gridToConvert[i][j] = nodeTypes[node];
    }
  }
  return gridToConvert;
}

function generateRandomGrid(gridToConvert, nodeTypes) {
  const selectableNodeTypes = nodeTypes.filter(
    (nodeType) => nodeType.name !== "Start" && nodeType.name !== "End"
  );
  const numberOfNodeTypes = selectableNodeTypes.length;
  const grid = gridToConvert.map((row) => {
    return row.map((node) => {
      return selectableNodeTypes[Math.floor(Math.random() * numberOfNodeTypes)];
    });
  });
  return grid;
}

function generateEvensGrid(gridToConvert, nodeTypes) {
  const rowLength = gridToConvert[0].length;
  const grid = gridToConvert.map((row) => {
    return row.map((node) => {
      if (row.indexOf(node) % 2 === 0) {
        return nodeTypes[0];
      } else {
        return nodeTypes[1];
      }
    });
  });
  return grid;
}

export const {
  setGridSize,
  setLeftMouseButtonState,
  setGrid,
  setGridByAlgorithm,
  setNodeType,
  setCurrentNodeType,
  setNodeTypeOnClick,
  setGridByDimensions,
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
