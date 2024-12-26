// src/reducers/login.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPermissionState } from "./userPermissions";

// Define and export the shape of the auth state
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: { username: string; password: string; userId: string } | string;
  userPermissions: any; // Add the new key here
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null, // Initialize token as null
  userInfo: "",
  userPermissions: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        userInfo: { username: string; password: string; userId: string };
      }>,
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    loginWithoutRemember: (state, action: PayloadAction<{ token: string,
      userInfo: { username: string; password: string; userId: string }
     }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token; // Save the token
      state.userInfo = action.payload.userInfo; // Do not save user info
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    clearUserInfo: (state) => {
      state.userInfo = ""; // Clear user info if needed
    },
    saveLoginUserInfo: (
      state,
      action: PayloadAction<{
        userInfo: { userId: string; username: string; password: string };
      }>,
    ) => {
      state.userInfo = action.payload.userInfo;
    },
    loginUserDetails: (
      state,
      action: PayloadAction<UserPermissionState | null>,
    ) => {
      state.userPermissions = action.payload;
    },
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Export actions and reducer
export const { login, logout, loginWithoutRemember, clearUserInfo } =
  authSlice.actions;
export default authSlice.reducer;
