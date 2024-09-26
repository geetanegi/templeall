import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiResponse,
  CourseListApiRes,
  HoleListApiRes,
  TeeListApiRes,
} from "./course";

export interface CoursesState {
  courseData: ApiResponse | null;
  courseList: CourseListApiRes | null;
  HoleList: HoleListApiRes | null;
  TeeList: TeeListApiRes | null;
}

// Define the initial state
const initialState: CoursesState = {
  courseData: null,
  courseList: null,
  HoleList: null,
  TeeList: null,
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
    // Define the action to set TeeList data
    setTeeList: (state, action: PayloadAction<TeeListApiRes | null>) => {
      state.TeeList = action.payload;
    },
  },
});

// Export actions and reducer
export const { setCourseData, setCourseList, setHoleList, setTeeList } =
  courseSlice.actions;
export default courseSlice.reducer;
