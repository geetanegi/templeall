import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import editDomainAPI from '../../../api/services/editDomain.service';

const initialState = {
    value: [],
};

interface MyData {
    domainId: any;
    programBookUUID: any;
    modifiedDomainName: any;
}
export const editDomainCall = createAsyncThunk(
    'editDomainCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await editDomainAPI.editDomain(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const editDomain = createSlice({
    name: 'editDomain',
    initialState,
    reducers: {
        savingDataDomain: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editDomainCall.pending, () => {})
            .addCase(editDomainCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(editDomainCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingDataDomain } = editDomain.actions;

export default editDomain.reducer;
