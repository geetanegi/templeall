import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getInProgressLongTermApi,
    getInProgressShortTermApi,
} from '../../../api/services/Intervention/allInprogressGoals';

const initialState = {
    inProgressLongTerm: [],
    inProgressShortTerm: [],
    error: false,
    loading: false,
};

interface Payload {
    providerId: string;
    clientId: string;
}

export const callLongInProgressGoals = createAsyncThunk(
    'callLongInProgressGoals',
    async (payload: Payload, { rejectWithValue }) => {
        try {
            const res = await getInProgressLongTermApi.getLongTermGoal(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const callShortInProgressGoals = createAsyncThunk(
    'callShortInProgressGoals',
    async (payload: Payload, { rejectWithValue }) => {
        try {
            const res =
                await getInProgressShortTermApi.getShortTermGoal(payload);
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const allInProgressGoals = createSlice({
    name: 'allInProgressGoals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(callLongInProgressGoals.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                callLongInProgressGoals.fulfilled,
                (state: any, action) => {
                    state.inProgressLongTerm = action.payload;
                    state.loading = false;
                }
            )
            .addCase(callLongInProgressGoals.rejected, (state) => {
                state.error = true;
                state.loading = false;
            })
            .addCase(callShortInProgressGoals.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                callShortInProgressGoals.fulfilled,
                (state: any, action) => {
                    state.inProgressShortTerm = action.payload;
                    state.loading = false;
                }
            )
            .addCase(callShortInProgressGoals.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export default allInProgressGoals.reducer;
