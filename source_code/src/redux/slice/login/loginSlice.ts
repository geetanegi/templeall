import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {},
    authed: false,
    token: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            state.value = { ...action.payload };
        },
        setAuthed: (state, action) => {
            state.authed = action.payload.authed;
            state.value = action.payload.data;
        },
    },
});

export const { setLoginData, setAuthed } = loginSlice.actions;

export default loginSlice.reducer;
