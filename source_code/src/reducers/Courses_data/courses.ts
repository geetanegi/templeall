import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "./course";

export interface CoursesState {
  courseData: ApiResponse | null;
}

// Define the initial state
const initialState: CoursesState = {
  courseData: null,
};

// Create the slice
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Define the action to set course data
    setCourseData: (state, action: PayloadAction<ApiResponse | null>) => {
      state.courseData = action.payload;
    },
  },
});

// Export actions and reducer
export const { setCourseData } = courseSlice.actions;
export default courseSlice.reducer;
