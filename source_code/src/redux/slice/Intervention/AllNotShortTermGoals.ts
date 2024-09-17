import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNotInProgressShortGoals } from '../../../api/services/Intervention/getNotShortTermGoal.service';

const initialState = {
    value: [],
    error: false,
    loading: false,
};

interface Payload {
    longTermGoalId: string;
}

export const getAllNotShortTermGoal = createAsyncThunk(
    'getAllShortGoalCall',
    async (payload: Payload, { rejectWithValue }) => {
        try {
            const res =
                await getNotInProgressShortGoals.getShortTermGoal(payload);
            return { [payload?.longTermGoalId]: res.data.data };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const allShotTermGoalSlice = createSlice({
    name: 'InterventionShorts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotShortTermGoal.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllNotShortTermGoal.fulfilled, (state: any, action) => {
                state.value = { ...state.value, ...action.payload };
                state.loading = false;
            })
            .addCase(getAllNotShortTermGoal.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export default allShotTermGoalSlice.reducer;
