import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GetUserProfile from '../../../api/services/getUserProfile.service';

const initialState = {
    value: [],
};

export const getUserProfileDataCall = createAsyncThunk(
    'getUserProfileDataCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await GetUserProfile.userProfileData();
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getUserProfileData = createSlice({
    name: 'getUserProfileData',
    initialState,
    reducers: {
        savingUserProfileData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfileDataCall.pending, () => {})
            .addCase(getUserProfileDataCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(getUserProfileDataCall.rejected, (state: any) => {
                state.loading = false;
            });
    },
});
export const { savingUserProfileData } = getUserProfileData.actions;

export default getUserProfileData.reducer;
