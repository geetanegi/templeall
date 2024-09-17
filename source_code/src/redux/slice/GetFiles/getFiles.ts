import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getFilesById from '../../../api/services/getFiles.service';

const initialState = {
    value: [],
};

interface MyData {
    programBookUUID: string | undefined;
}
export const getFilesCall = createAsyncThunk(
    'getFilesCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getFilesById.getFiles(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getFiles = createSlice({
    name: 'getFiles',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFilesCall.pending, () => {})
            .addCase(getFilesCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getFilesCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingData } = getFiles.actions;

export default getFiles.reducer;
