import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import programBookLibraryApis from '../../../api/services/programBookLibrary.service';

const initialState = {
    value: [],
    error: false,
    loading: false,
};

export const getAllProgramBookLibraries = createAsyncThunk(
    'getAllProgramBookLibrariesCall',
    async (_, { rejectWithValue }) => {
        try {
            const res = await programBookLibraryApis.getAllProgramLibraries();
            return res.data.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const programBookLibrarySlice = createSlice({
    name: 'programBookLibraries',
    initialState,
    reducers: {
        setLibraiesData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProgramBookLibraries.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getAllProgramBookLibraries.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getAllProgramBookLibraries.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const { setLibraiesData } = programBookLibrarySlice.actions;

export default programBookLibrarySlice.reducer;
