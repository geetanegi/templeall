import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    viewOnlyValue: false,
    viewOnlyValueLibrary: false,
    libraryId: '',
    libraryName: '',
};

const viewValue = createSlice({
    name: 'ViewOnly',
    initialState,
    reducers: {
        viewOnlyValueData: (state, action) => {
            state.viewOnlyValue = action.payload;
        },
        viewOnlyValueLibrary: (state, action) => {
            state.viewOnlyValueLibrary = action.payload;
        },
        viewOnlyValueLibraryById: (state, action) => {
            state.libraryId = action.payload;
        },
        viewOnlyValueLibraryName: (state, action) => {
            state.libraryName = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    viewOnlyValueData,
    viewOnlyValueLibrary,
    viewOnlyValueLibraryById,
    viewOnlyValueLibraryName,
} = viewValue.actions;

export default viewValue.reducer;
