import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
// import reducer from "../reducers/reducers";
import persistedReducer from "../reducers/reducers"; // Import the persistedReducer

export const store = configureStore({
  reducer: persistedReducer, // Use the persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  //   reducer,
});

export const persistor = persistStore(store);

// Define RootState based on combinedReducer
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
