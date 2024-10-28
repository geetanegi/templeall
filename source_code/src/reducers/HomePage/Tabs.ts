import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface tabsState {
  selectedTab: number;
}

const initialState: tabsState = {
  selectedTab: 1,
};

const HomePageTabs = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = HomePageTabs.actions;

export default HomePageTabs.reducer;
