import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getPhase from '../../../api/services/getPhase.service';

const initialState = {
    value: [],
    openNotification: false,
};
interface MyData {
    data: '';
}
export const getPhaseCall = createAsyncThunk(
    'getPhaseCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getPhase.getStatusData(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getPhaseReducer = createSlice({
    name: 'getPhase',
    initialState,
    reducers: {
        savingPhase: (state, action) => {
            state.value = { ...action.payload };
        },
        openNotification: (state, action) => {
            state.openNotification = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPhaseCall.pending, (state: any) => {
                state.openNotification = false;
            })
            .addCase(getPhaseCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.openNotification = true;
            })
            .addCase(getPhaseCall.rejected, (state: any) => {
                state.openNotification = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingPhase, openNotification } = getPhaseReducer.actions;

export default getPhaseReducer.reducer;
