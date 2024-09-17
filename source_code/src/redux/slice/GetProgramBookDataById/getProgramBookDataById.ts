import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProgramBookDataByIdAPI from '../../../api/services/ProgramBook/getProgramBookDataById.service';

const initialState = {
    value: [],
};

interface MyData {
    programBookUUID: string;
}
export const getProgramBookDataByIdCall = createAsyncThunk(
    'getProgramBookDataByIdCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getProgramBookDataByIdAPI.getProgramBookDataById(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

interface ProgramBookDataByLibraryId {
    programBookLibraryUUID: any;
}

export const getProgramBookDataByLibraryIdCall = createAsyncThunk(
    'getProgramBookDataByLibraryIdCall',
    async (payload: ProgramBookDataByLibraryId, { rejectWithValue }) => {
        try {
            const res =
                await getProgramBookDataByIdAPI.getProgramBookDataByLibraryId(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getProgramBookDataById = createSlice({
    name: 'getProgramBookDataById',
    initialState,
    reducers: {
        savingProgramBookData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProgramBookDataByIdCall.pending, () => {})
            .addCase(
                getProgramBookDataByIdCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(getProgramBookDataByIdCall.rejected, () => {})
            .addCase(getProgramBookDataByLibraryIdCall.pending, () => {})
            .addCase(
                getProgramBookDataByLibraryIdCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(getProgramBookDataByLibraryIdCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingProgramBookData } = getProgramBookDataById.actions;

export default getProgramBookDataById.reducer;
