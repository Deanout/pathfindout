import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import nodeTypesReducer from "../features/nodetypes/nodeTypesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    nodeTypes: nodeTypesReducer,
  },
});
