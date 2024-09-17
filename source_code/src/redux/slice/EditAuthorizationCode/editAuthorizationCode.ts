import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { editAuthorizationCode } from '../../../api/services/saveAuthorizationCode.service';

const initialState = {
    value: [],
    viewMode: false,
};

interface MyData {
    authorizationCodeId: any;
}
export const editAuthorizationCodeCall = createAsyncThunk(
    'editDomainCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await editAuthorizationCode.editAuthorizationCodeApi(payload);
            return res.data?.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const editAuthorization = createSlice({
    name: 'editDomain',
    initialState,
    reducers: {
        clearMetaData: (state: any) => {
            state.value = [];
            state.viewMode = false;
        },
        viewOnlyMode: (state: any, action) => {
            state.viewMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editAuthorizationCodeCall.pending, () => {})
            .addCase(
                editAuthorizationCodeCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(editAuthorizationCodeCall.rejected, () => {});
    },
});

export const { clearMetaData, viewOnlyMode } = editAuthorization.actions;

export default editAuthorization.reducer;
