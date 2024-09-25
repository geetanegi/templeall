import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, CourseListApiRes, HoleListApiRes } from "./course";

export interface CoursesState {
  courseData: ApiResponse | null;
  courseList: CourseListApiRes | null;
  HoleList: HoleListApiRes | null;
}

// Define the initial state
const initialState: CoursesState = {
  courseData: null,
  courseList: null,
  HoleList: null,
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
    // Define the action to set course list data
    setCourseList: (state, action: PayloadAction<CourseListApiRes | null>) => {
      state.courseList = action.payload;
    },
    // Define the action to set TeeList data
    setHoleList: (state, action: PayloadAction<HoleListApiRes | null>) => {
      state.HoleList = action.payload;
    },
  },
});

// Export actions and reducer
export const { setCourseData, setCourseList, setHoleList } =
  courseSlice.actions;
export default courseSlice.reducer;
