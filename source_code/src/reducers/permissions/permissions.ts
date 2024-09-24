// src/reducers/login.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "./userPermissions";

// Define and export the shape of the auth state
export interface AuthState {
  userPermissions: Data | null; // Add the new key here
}

const initialState: AuthState = {
  userPermissions: null,
};

// Create the auth slice
const permissionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserDetails: (state, action: PayloadAction<Data | null>) => {
      state.userPermissions = action.payload;
    },
  },
});

// Export actions and reducer
export const { loginUserDetails } = permissionSlice.actions;
export default permissionSlice.reducer;
