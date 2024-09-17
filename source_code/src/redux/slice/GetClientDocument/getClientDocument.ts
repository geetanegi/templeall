import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getClientDocumentById from '../../../api/services/getClientDocumentById.service';

const initialState = {
    value: [],
};

interface MyData {
    id: any;
}
export const getDocumentCall = createAsyncThunk(
    'getDocumentCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getClientDocumentById.getDocumentById(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getDocument = createSlice({
    name: 'getDocument',
    initialState,
    reducers: {
        savingDocument: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDocumentCall.pending, () => {})
            .addCase(getDocumentCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getDocumentCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingDocument } = getDocument.actions;

export default getDocument.reducer;
