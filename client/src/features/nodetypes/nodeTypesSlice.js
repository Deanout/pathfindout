import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNodeTypesFromAPI } from "./NodeTypesAPI";

const initialState = {
  nodeTypes: [
    {
      id: 1,
      name: "Air",
      weight: 0,
      color: "#fff",
    },
  ],
};

export const retrieveNodeTypes = createAsyncThunk("getNodeTypes", async () => {
  const response = await getNodeTypesFromAPI();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

// create a nodetypes slice function that contains reducers for:
// adding a nodetype
// deleting a nodetype
// editing a nodetype
export const nodeTypesSlice = createSlice({
  name: "nodeTypes",
  initialState,
  reducers: {
    addNodeType: (state, action) => {
      state.nodeTypes.push(action.payload);
    },
    deleteNodeType: (state, action) => {
      state.nodeTypes = state.nodeTypes.filter(
        (nodeType) => nodeType.id !== action.payload
      );
    },
    editNodeType: (state, action) => {
      state.nodeTypes = state.nodeTypes.map((nodeType) => {
        if (nodeType.id === action.payload.id) {
          return action.payload;
        }
        return nodeType;
      });
    },
    setNodeTypes: (state, action) => {
      state.nodeTypes = action.payload;
    },
  },
});

export const { addNodeType, deleteNodeType, editNodeType, setNodeTypes } =
  nodeTypesSlice.actions;

/**
 * Selectors allow us to choose a value from the state. Here we're selecting the
 * nodetypes from the state.
 */
export const selectNodeTypes = (state) => {
  return state.nodeTypes;
};
/**
 * Select a nodetype from the state by id.
 * @param {number} id - The id of the nodetype to select.
 */
export const selectNodeType = (state, id) => {
  return selectNodeTypes(state).find((nodeType) => nodeType.id === id);
};

export default nodeTypesSlice.reducer;
