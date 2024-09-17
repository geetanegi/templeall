import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    Sign: '',
    SignOfTemplate: '',
    nameOfSignature: '',
    sessionDataID: '',
};

const Signature = createSlice({
    name: 'SignatureData',
    initialState,
    reducers: {
        signData: (state, action) => {
            state.Sign = action.payload;
        },
        signDataTemplate: (state, action) => {
            state.SignOfTemplate = action.payload;
        },
        signDataName: (state, action) => {
            state.nameOfSignature = action.payload;
        },
        signDataSessionID: (state, action) => {
            state.sessionDataID = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { signData, signDataTemplate, signDataName, signDataSessionID } =
    Signature.actions;

export default Signature.reducer;
