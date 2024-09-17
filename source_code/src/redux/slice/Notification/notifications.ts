import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    isOpen: false,
    title: '',
    description: '',
    success: false,
};

const notifications = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        openNotification: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.success = action.payload.success;
        },
        closeNotification: (state) => {
            state.isOpen = false;
            state.title = '';
            state.description = '';
            state.success = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { openNotification, closeNotification } = notifications.actions;

export default notifications.reducer;
