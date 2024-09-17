import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getUsers from '../../../api/services/getUsers.service';

const initialState = {
    value: [],
    userData: '',
};

export const getUsersDetailCall = createAsyncThunk(
    'getUsersDetailCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getUsers?.getUsersDetail();
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const getUser = createSlice({
    name: 'getUsers',
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
            .addCase(getUsersDetailCall.pending, () => {})
            .addCase(getUsersDetailCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getUsersDetailCall.rejected, () => {});
    },
});

export const { savingGetUserData, getUserData } = getUser.actions;

export default getUser.reducer;
