import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getPhaseForProgram from '../../../api/services/getPhaseForProgram.service';

const initialState = {
    value: [],
    loading: false,
};
interface MyData {
    data: '';
}
export const getPhaseForProgramCall = createAsyncThunk(
    'getPhaseCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getPhaseForProgram.phaseForProgram(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const savePhaseForProgram = createSlice({
    name: 'getPhase',
    initialState,
    reducers: {
        phaseDropdownFroProgram: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPhaseForProgramCall.pending, (state: any) => {
                state.openNotification = false;
                state.loading = true;
            })
            .addCase(getPhaseForProgramCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.openNotification = true;
                state.loading = false;
            })
            .addCase(getPhaseForProgramCall.rejected, (state: any) => {
                state.openNotification = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { phaseDropdownFroProgram } = savePhaseForProgram.actions;

export default savePhaseForProgram.reducer;
