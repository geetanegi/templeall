import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FeeScheduleApi from '../../../api/services/Rate/getFeeSchedule.service';

const initialState = {
    value: [],
    loading: false,
};

export const feeScheduleCall = createAsyncThunk(
    'feeScheduleCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await FeeScheduleApi.getFeeSchedule();
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const feeScheduleSlice = createSlice({
    name: 'feeScheduleSlice',
    initialState,
    reducers: {
        savingFeeSchedule: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(feeScheduleCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(feeScheduleCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(feeScheduleCall.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingFeeSchedule } = feeScheduleSlice.actions;

export default feeScheduleSlice.reducer;
