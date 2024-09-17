import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createDomainAPI from '../../../api/services/createDomain.service';

const initialState = {
    value: [],
};

interface MyData {
    programBookLibraryUUID: string;
    programBookUUID: any;
    templateDomainId: any;
    name: any;
    description: any;
    createdBy: any;
    modifiedBy: any;
}
export const createDomainCall = createAsyncThunk(
    'createDomainCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await createDomainAPI.createDomain(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const createDomain = createSlice({
    name: 'createDomain',
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
            .addCase(createDomainCall.pending, () => {})
            .addCase(createDomainCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(createDomainCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingDataDomain } = createDomain.actions;

export default createDomain.reducer;
