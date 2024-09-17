// src/reducers/reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import your reducers here
import authReducer from "./login/login";
import loaderReducer from "./loader/loader";

// Define the shape of the root state
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  loader: ReturnType<typeof loaderReducer>;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Add the reducers you want to persist here shiv
};

// Combine reducers with the proper key names
const combinedReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
});

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

// Wrap the rootReducer with persistReducer
export default persistReducer(persistConfig, rootReducer);
