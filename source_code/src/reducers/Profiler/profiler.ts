import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface profilerState {
    profile: any;
    profileImage: string | null
}

const initialState: profilerState = {
    profile: {},
    profileImage: ""
};

const profilerSlice = createSlice({
    name: "profiler",
    initialState,
    reducers: {
        updateProfile: (
            state,
            action: PayloadAction<{
                profiler: any;
            }>,
        ) => {
            debugger;
            state.profile = action.payload.profiler
        },
        updateProfileImage: (
            state,
            action: PayloadAction<{
                profileImage: string;
            }>,
        ) => {
            state.profileImage = action.payload.profileImage
        },
    },
});


export const {
    updateProfile,
    updateProfileImage
} = profilerSlice.actions;
export default profilerSlice.reducer;