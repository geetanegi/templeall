import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthorizedCodeMetaData from '../../../api/services/AuthorizationCode/authorizationCodeMetaData.service';

const initialState = {
    value: [],
    loading: false,
};

export const getMetaDataAuthorizationCodeCall = createAsyncThunk(
    'metaDataCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await AuthorizedCodeMetaData.getMetaData();
            return res.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const metaDataAuthorization = createSlice({
    name: 'getMetaData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMetaDataAuthorizationCodeCall.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(
                getMetaDataAuthorizationCodeCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getMetaDataAuthorizationCodeCall.rejected, () => {});
    },
});

export default metaDataAuthorization.reducer;
