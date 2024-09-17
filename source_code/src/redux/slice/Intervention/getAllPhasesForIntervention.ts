import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GetAllPhase from '../../../api/services/Intervention/GetAllPhase.service';

const initialState = {
    value: [],
    userData: '',
};
interface MyData {
    type: any;
}
export const getAllPhases = createAsyncThunk(
    'getAllPhase',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await GetAllPhase?.getGetAllPhase(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getUser = createSlice({
    name: 'getAllInterventionPhase',
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
            .addCase(getAllPhases.pending, () => {})
            .addCase(getAllPhases.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getAllPhases.rejected, () => {});
    },
});

export const { savingGetUserData, getUserData } = getUser.actions;

export default getUser.reducer;
