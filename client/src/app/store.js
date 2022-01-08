import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import nodeTypesReducer from "../features/nodetypes/nodeTypesSlice";
import gridReducer from "../features/grid/gridSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    nodeTypes: nodeTypesReducer,
    grid: gridReducer,
  },
});
