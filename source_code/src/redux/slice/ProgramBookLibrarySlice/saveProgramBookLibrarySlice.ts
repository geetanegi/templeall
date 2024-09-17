/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import saveProgramBookLibrary from '../../../api/services/ProgramBookLibrary/saveProgramBookLibrary.service';
const initialState = {
    value: [],
    loading: false,
    library: false,
};
interface MyData {
    id: string;
    name: string | undefined;
    description: string | undefined;
    createdBy: string;
    modifiedBy: string;
}
export const saveProgramBookLibraryActiveAsync = createAsyncThunk(
    'saveProgramBookLibraryActiveAsync',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await saveProgramBookLibrary.saveProgramBookLibraryApi(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const saveProgramBookLibrarySlice = createSlice({
    name: 'saveProgramBookLibrarySlice',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
        savingLibraryData: (state, action) => {
            state.library = action.payload.tab;
        },
        clearLibraryData: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                saveProgramBookLibraryActiveAsync.pending,
                (state: any) => {
                    state.loading = true;
                }
            )
            .addCase(
                saveProgramBookLibraryActiveAsync.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                saveProgramBookLibraryActiveAsync.rejected,
                (state: any) => {
                    state.loading = true;
                }
            );
    },
});
// Action creators are generated for each case reducer function
export const { savingData, clearLibraryData } =
    saveProgramBookLibrarySlice.actions;
export default saveProgramBookLibrarySlice.reducer;
