import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAssignToApi from '../../../api/services/Intervention/AssignToValue.service';

const initialState = {
    value: [],
    userData: '',
};
interface MyData {
    type: any;
}
export const getAllAssignToCall = createAsyncThunk(
    'getAllAssignTo',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getAssignToApi?.getAssignToValue(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const getUser = createSlice({
    name: 'getInterventionAssignToo',
    initialState,
    reducers: {
        savingGetUserData: (state, action) => {
            state.value = { ...action.payload };
        },

        getUserData: (state, action) => {
            state.userData = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllAssignToCall.pending, () => {})
            .addCase(getAllAssignToCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getAllAssignToCall.rejected, () => {});
    },
});

export const { savingGetUserData, getUserData } = getUser.actions;

export default getUser.reducer;
