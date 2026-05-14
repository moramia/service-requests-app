import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import { loadPersistedAuth } from "../utils/authStorage";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persisted = loadPersistedAuth();

export const store = createStore(
  rootReducer,
  persisted
    ? { auth: { user: persisted.user, token: persisted.token } }
    : undefined
);
