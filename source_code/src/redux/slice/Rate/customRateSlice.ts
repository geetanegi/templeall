import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllEmployeeForRateApi from '../../../api/services/Rate/getAllEmployee.service';
import getAllClientForRateApi from '../../../api/services/Rate/getAllClient.service';

const initialState = {
    employee: [],
    client: [],
};
interface Data {
    authorizationCodeId: string;
}
export const getAllEmployeeForRateCall = createAsyncThunk(
    'getAllEmployeeForRateCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await getAllEmployeeForRateApi.getAllEmployee(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllClientForRateCall = createAsyncThunk(
    'getAllClientForRateCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await getAllClientForRateApi.getAllClient(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const customRateSlice = createSlice({
    name: 'customRateSlice',
    initialState,
    reducers: {
        savingEmployee: (state, action) => {
            state.employee = { ...action.payload };
        },
        savingClient: (state, action) => {
            state.client = { ...action.payload };
        },
        clearData: (state) => {
            state.employee = [];
            state.client = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployeeForRateCall.pending, (state: any) => {
                state.openNotification = false;
            })
            .addCase(
                getAllEmployeeForRateCall.fulfilled,
                (state: any, action) => {
                    state.employee = action.payload;
                    state.openNotification = true;
                }
            )
            .addCase(
                getAllClientForRateCall.fulfilled,
                (state: any, action) => {
                    state.client = action.payload;
                    state.openNotification = true;
                }
            )
            .addCase(getAllEmployeeForRateCall.rejected, (state: any) => {
                state.openNotification = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingEmployee, clearData, savingClient } =
    customRateSlice.actions;

export default customRateSlice.reducer;
