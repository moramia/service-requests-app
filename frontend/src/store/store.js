import { createStore, combineReducers } from "redux";
import requestReducer from "../reducers/requestReducer";
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
  requests: requestReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer);