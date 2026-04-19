import { createStore, combineReducers } from "redux";
import requestReducer from "../reducers/requestReducer";

const store = createStore(requestReducer);

export default store;
