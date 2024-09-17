/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProgramBookLibraryDataByIdApi from '../../../api/services/ProgramBookLibrary/getProgramBookLibraryDataByIdApi.service';

const initialState = {
    value: [],
    loading: false,
    Name: '',
};

interface MyData {
    ProgramBookUUID: string;
}
export const getProgramBookLibraryByIdAsync = createAsyncThunk(
    'getProgramBookLibraryByIdAsync',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getProgramBookLibraryDataByIdApi.getProgramBookLibraryDataByIdApiData(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getProgramBookLibraryByIdSlice = createSlice({
    name: 'getProgramBookLibraryByIdSlice',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingDataName: (state, action) => {
            state.Name = { ...action.payload };
        },
        clearLibraryId: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProgramBookLibraryByIdAsync.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(
                getProgramBookLibraryByIdAsync.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getProgramBookLibraryByIdAsync.rejected, (state: any) => {
                state.loading = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingData, savingDataName, clearLibraryId } =
    getProgramBookLibraryByIdSlice.actions;

export default getProgramBookLibraryByIdSlice.reducer;
