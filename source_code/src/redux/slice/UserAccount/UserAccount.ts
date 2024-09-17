import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAccountApi from '../../../api/services/UserAccount/UserAccount.service';

const initialState = {
    userDetails: {},
    isAccount: false,
    loading: false,
    error: false,
};

type Data = {
    id: string | undefined;
};

export const userAccountCall = createAsyncThunk(
    'userAccountCall',
    async (payload: Data, { rejectWithValue }) => {
        try {
            const res = await UserAccountApi.UserAccount(payload);
            return res?.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const userAccount = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        account: (state, action) => {
            state.isAccount = action.payload;
        },
        clearAccountData: (state) => {
            state.userDetails = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userAccountCall.pending, () => {})
            .addCase(userAccountCall.fulfilled, (state: any, action) => {
                state.userDetails = action.payload;
                state.loading = false;
            })
            .addCase(userAccountCall.rejected, (state) => {
                state.loading = false;
            });
    },
});
export const { account, clearAccountData } = userAccount.actions;

export default userAccount.reducer;
