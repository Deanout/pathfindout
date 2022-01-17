import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getNodeTypesFromAPI,
  addNodeTypeToDatabase,
  destroyAllNodeTypes,
  destroyNodeType,
} from "./NodeTypesAPI";

const initialState = {
  nodeTypes: [],
};
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const retrieveNodeTypes = createAsyncThunk("/getNodeTypes", async () => {
  var response = await getNodeTypesFromAPI();
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const addNodeTypeToAPI = createAsyncThunk(
  "/addNodeType",
  async (payload) => {
    console.log("Calling addNodeTypeToAPI...");
    const response = await addNodeTypeToDatabase(payload);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

// create a function to delete a node type from the api by _id
export const deleteNodeTypeFromAPI = createAsyncThunk(
  "/destroyNodeType",
  async (payload) => {
    const response = await destroyNodeType(payload);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const deleteAllNodeTypesFromAPI = createAsyncThunk(
  "/destroyAllNodeTypes",
  async () => {
    const response = await destroyAllNodeTypes();
    window.response = response;
    return response;
  }
);
export const nodeTypesSlice = createSlice({
  name: "nodeTypes",
  initialState,
  reducers: {
    setNodeTypes: (state, action) => {
      state.nodeTypes = action.payload;
    },
  },
});

export const {
  addNodeType,
  deleteNodeType,
  editNodeType,
  setNodeTypes,
  setNodeType,
  deleteAllNodeTypes,
} = nodeTypesSlice.actions;

/**
 * Selectors allow us to choose a value from the state. Here we're selecting the
 * nodetypes from the state.
 */
export const selectNodeTypes = (state) => {
  console.log(state);
  return state.nodeTypes;
};
/**
 * Select a nodetype from the state by id.
 * @param {number} id - The id of the nodetype to select.
 */
export const selectNodeType = (state, id) => {
  return selectNodeTypes(state).find((nodeType) => nodeType.id === id);
};

export const selectCurrentNodeType = (state) => state.nodeTypes.currentNodeType;
export const selectNodeTypesState = (state) => state;
export default nodeTypesSlice.reducer;
