import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LongTermGoalByUserType } from '../../../api/services/AllLongTermGoal.service';

const initialState = {
    value: [],
    error: false,
    loading: false,
};

interface Payload {
    interventionPlanDomainId: any;
}
export const getLongTermGoalByUserType = createAsyncThunk(
    'getLongTermGoalByUserTypeCall',
    async (payload: Payload, { rejectWithValue }) => {
        try {
            const res = await LongTermGoalByUserType.LongTermGoals(payload);
            return {
                [payload?.interventionPlanDomainId]: res.data.data,
            };
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const LongTermGoalByUserTypeSlice = createSlice({
    name: 'SessionNoteLongTermGoal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLongTermGoalByUserType.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getLongTermGoalByUserType.fulfilled,
                (state: any, action) => {
                    state.value = { ...state.value, ...action.payload };
                    state.loading = false;
                }
            )
            .addCase(getLongTermGoalByUserType.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export default LongTermGoalByUserTypeSlice.reducer;
