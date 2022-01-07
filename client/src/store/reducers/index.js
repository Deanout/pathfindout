import nodeTypesReducer from "./nodeTypesReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  nodeTypes: nodeTypesReducer,
});

export default reducers;
