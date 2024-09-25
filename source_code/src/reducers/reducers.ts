// src/reducers/reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import your reducers here
import authReducer from "./login/login";
import loaderReducer from "./loader/loader";
import coursesReducer from "./Courses_data/courses";
import profileReducer from "./Profiler/profiler";
import permissions from "./permissions/permissions";

// Define the shape of the root state
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  loader: ReturnType<typeof loaderReducer>;
  courses: ReturnType<typeof coursesReducer>;
  profiler: ReturnType<typeof profileReducer>;
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
  courses: coursesReducer,
  profiler: profileReducer,
  permissions: permissions,
});

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

// Wrap the rootReducer with persistReducer
export default persistReducer(persistConfig, rootReducer);
