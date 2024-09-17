import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getStatus from '../../../api/services/getStatus.service';
const initialState = {
    value: [],
    openNotification: false,
};
interface MyData {
    data: '';
}
export const getStatusCall = createAsyncThunk(
    'saveStatusCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getStatus.getStatusData(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getStatusReducer = createSlice({
    name: 'getPhase',
    initialState,
    reducers: {
        savingStatus: (state, action) => {
            state.value = { ...action.payload };
        },
        openNotification: (state, action) => {
            state.openNotification = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStatusCall.pending, (state: any) => {
                state.openNotification = false;
            })
            .addCase(getStatusCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.openNotification = true;
            })
            .addCase(getStatusCall.rejected, (state: any) => {
                state.openNotification = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingStatus, openNotification } = getStatusReducer.actions;

export default getStatusReducer.reducer;
