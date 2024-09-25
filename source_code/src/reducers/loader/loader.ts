import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoaderState {
  isLoading: boolean;
}

const initialkStateb: LoaderState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialkStateb,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
