/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProgramBookLibraryFolderApi from '../../../api/services/ProgramBookLibrary/getProgramBookLibraryFolderApi.service';

const initialState = {
    value: [],
    loading: false,
    library: false,
};

interface MyData {
    ProgramBookUUID: string;
}
export const getProgramBookLibraryDomainFolderAsync = createAsyncThunk(
    'getProgramBookLibraryDomainFolderAsync',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getProgramBookLibraryFolderApi.getProgramBookLibraryFolderApiData(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getProgramBookLibraryDomainFolderSlice = createSlice({
    name: 'getProgramBookLibraryDomainFolderSlice',
    initialState,
    reducers: {
        savingData: (state: any, action: any) => {
            state.value = { ...action.payload };
        },
        clearDomainLibrary: (state) => {
            state.value = [];
            state.library = false;
        },
        setFromLibrary: (state: any, action: any) => {
            state.library = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getProgramBookLibraryDomainFolderAsync.pending,
                (state: any) => {
                    state.loading = true;
                }
            )
            .addCase(
                getProgramBookLibraryDomainFolderAsync.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                getProgramBookLibraryDomainFolderAsync.rejected,
                (state: any) => {
                    state.loading = true;
                }
            );
    },
});

// Action creators are generated for each case reducer function
export const { savingData, clearDomainLibrary, setFromLibrary } =
    getProgramBookLibraryDomainFolderSlice.actions;

export default getProgramBookLibraryDomainFolderSlice.reducer;
