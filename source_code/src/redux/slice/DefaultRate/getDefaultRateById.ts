import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import defaultRateByIdAPi from '../../../api/services/Rate/getDefaultRateById.service';

const initialState = {
    defaultRate: {},
    loading: false,
};

interface MyData {
    id: any;
}
export const getDefaultRateByIdCall = createAsyncThunk(
    'getDefaultRateByIdCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await defaultRateByIdAPi.getDefaultRateById(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const EditDefaultRate = createSlice({
    name: 'EditDefaultRate',
    initialState,
    reducers: {
        clearData: (state) => {
            state.defaultRate = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDefaultRateByIdCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getDefaultRateByIdCall.fulfilled, (state: any, action) => {
                state.defaultRate = action.payload;
                state.loading = false;
            })
            .addCase(getDefaultRateByIdCall.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { clearData } = EditDefaultRate.actions;

export default EditDefaultRate.reducer;
