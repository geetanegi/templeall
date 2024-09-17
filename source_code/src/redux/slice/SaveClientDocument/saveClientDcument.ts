import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import saveClientDocument from '../../../api/services/saveClientDocument.service';

const initialState = {
    value: [],
    openNotification: false,
};

interface MyData {
    programBookUUID: any;
    name: any;
    description: any;
    createdBy: any;
    modifiedBy: any;
    intakeLocation: any;
    isUserCreated: any;
    type: any;
    id: any;
}
export const saveClientDocumentCall = createAsyncThunk(
    'saveDocumentCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await saveClientDocument.saveDocument(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const saveDocument = createSlice({
    name: 'saveDocument',
    initialState,
    reducers: {
        savingDataDomain: (state, action) => {
            state.value = { ...action.payload };
        },
        openNotification: (state, action) => {
            state.openNotification = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveClientDocumentCall.pending, (state: any) => {
                state.openNotification = false;
            })
            .addCase(saveClientDocumentCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.openNotification = true;
            })
            .addCase(saveClientDocumentCall.rejected, (state: any) => {
                state.openNotification = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingDataDomain, openNotification } = saveDocument.actions;

export default saveDocument.reducer;
