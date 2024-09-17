import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EditEmployeeApi from '../../../api/services/Users/getEmployeeById.service';

const initialState = {
    value: [],
    loading: false,
};

interface MyData {
    id: any;
}
export const getEmployeeByIdCall = createAsyncThunk(
    'getEmployeeByIdCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await EditEmployeeApi.getEmployeeById(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getEmployeeById = createSlice({
    name: 'getEmployeeById',
    initialState,
    reducers: {
        savingEmployee: (state, action) => {
            state.value = { ...action.payload };
        },
        clearDataById: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeeByIdCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getEmployeeByIdCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(getEmployeeByIdCall.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingEmployee, clearDataById } = getEmployeeById.actions;

export default getEmployeeById.reducer;
