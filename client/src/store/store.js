import { createStore } from "redux";
import reducers from "./reducers/index";

const state = {};

export const store = createStore(reducers, state);
