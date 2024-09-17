import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllCommentAPI from '../../../api/services/Comments/getAllComments.service';

const initialState = {
    value: [],
};

interface MyData {
    targetId: any;
}
export const getAllCommentCall = createAsyncThunk(
    'getAllCommentCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getAllCommentAPI.getAllComments(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getComments = createSlice({
    name: 'getComments',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCommentCall.pending, () => {})
            .addCase(getAllCommentCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getAllCommentCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingData } = getComments.actions;

export default getComments.reducer;
