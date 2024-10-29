import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiResponse,
  ContestListApiRes,
  CourseListApiRes,
  HoleListApiRes,
  TeeListApiRes,
} from "./course";

export interface CoursesState {
  courseData: ApiResponse | null;
  courseList: CourseListApiRes | null;
  HoleList: HoleListApiRes | null;
  TeeList: TeeListApiRes | null;
  contestList: ContestListApiRes | null;
  selectedCourseId: number | null;
  selectedHoleId: number | null;
  selectedTeeId: number | null;
  selectedTeeType: string | null;
  selectedContests: { [key: string]: any[] }; // Object to hold selected contests by tee type
  courseName: string | null;
  holeNumber: number | null;
  par: number | null;
  yardage: number | null;
  TotalPrice: number | null;
}

// Define the initial state
const initialState: CoursesState = {
  courseData: null,
  courseList: null,
  HoleList: null,
  TeeList: null,
  contestList: null,
  selectedCourseId: null,
  selectedHoleId: null,
  selectedTeeId: null,
  selectedTeeType: null,
  selectedContests: {}, // Initialize as an empty object
  courseName: null,
  holeNumber: null,
  par: null,
  yardage: null,
  TotalPrice: null,
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
    // Define the action to set TeeList data
    setContestList: (
      state,
      action: PayloadAction<ContestListApiRes | null>,
    ) => {
      state.contestList = action.payload;
    },
    addSelectedContest: (
      state,
      action: PayloadAction<{ teeType: string; contest: any }>,
    ) => {
      const { teeType, contest } = action.payload;

      // Clear previously selected contests for all other tee types
      Object.keys(state.selectedContests).forEach((key) => {
        if (key !== teeType) {
          delete state.selectedContests[key]; // Remove contests for other tee types
        }
      });

      // Initialize the array for the current tee type if it doesn't exist yet
      if (!state.selectedContests[teeType]) {
        state.selectedContests[teeType] = [];
      }

      // Add the new contest to the array for this tee type
      state.selectedContests[teeType].push(contest);
    },
    // Define the action to remove a selected contest
    removeSelectedContest: (
      state,
      action: PayloadAction<{ teeType: string; contestId: number }>,
    ) => {
      const { teeType, contestId } = action.payload;
      if (state.selectedContests[teeType]) {
        state.selectedContests[teeType] = state.selectedContests[
          teeType
        ].filter((contest) => contest.contestId !== contestId);

        // If no contests are left for this tee type, delete it from selectedContests
        if (state.selectedContests[teeType].length === 0) {
          delete state.selectedContests[teeType];
        }
      }
    },
    // Clear all selected contests
    clearAllSelectedContests: (state) => {
      state.selectedContests = {};
    },
    // Define the action to set the selected course ID
    setSelectedCourseId: (state, action: PayloadAction<number | null>) => {
      state.selectedCourseId = action.payload;
    },
    // Define the action to set the selected hole ID
    setSelectedHoleId: (state, action: PayloadAction<number | null>) => {
      state.selectedHoleId = action.payload;
    },
    // Define the action to set the selected tee ID
    setSelectedTeeId: (state, action: PayloadAction<number | null>) => {
      state.selectedTeeId = action.payload;
    },
    // Define the action to set the selected tee type
    setSelectedTeeType: (state, action: PayloadAction<string | null>) => {
      state.selectedTeeType = action.payload;
      // state.selectedContests = {}; // Clear selectedContests when tee type changes
    },

    // breadcrum states
    // // Define the action to set the course name
    setCourseName: (state, action: PayloadAction<string | null>) => {
      state.courseName = action.payload;
    },
    // Define the action to set the hole number
    setHoleNumber: (state, action: PayloadAction<number | null>) => {
      state.holeNumber = action.payload;
    },
    // Define the action to set the par
    setPar: (state, action: PayloadAction<number | null>) => {
      state.par = action.payload;
    },
    // Define the action to set the yardage
    setYardage: (state, action: PayloadAction<number | null>) => {
      state.yardage = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number | null>) => {
      state.TotalPrice = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setCourseData,
  setCourseList,
  setHoleList,
  setTeeList,
  setContestList,
  addSelectedContest,
  removeSelectedContest,
  clearAllSelectedContests,
  setSelectedCourseId,
  setSelectedHoleId,
  setSelectedTeeId,
  setSelectedTeeType,
  setCourseName,
  setHoleNumber,
  setPar,
  setYardage,
  setTotalPrice,
} = courseSlice.actions;
export default courseSlice.reducer;
