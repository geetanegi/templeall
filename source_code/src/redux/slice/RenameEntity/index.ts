import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { renameProgramLibAPI } from '../../../api/services/RenameEntityLib/renameEntityLib';

const initialState = {
    value: [],
    programData: [],
};

interface MyData {
    domainId: any;
    programId: any;
    modifiedProgramName: any;
}
export const renameProgramEntityCall = createAsyncThunk(
    'renameProgramCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await renameProgramLibAPI.renameProgram(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
const renameProgramEntity = createSlice({
    name: 'renameProgram',
    initialState,
    reducers: {
        savingDataRenameProgram: (state, action) => {
            state.value = { ...action.payload };
        },
        savingProgramData: (state, action) => {
            state.programData = {
                ...state.programData,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(renameProgramEntityCall.pending, () => {})
            .addCase(
                renameProgramEntityCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(renameProgramEntityCall.rejected, () => {});
    },
});

export const { savingDataRenameProgram, savingProgramData } =
    renameProgramEntity.actions;

export default renameProgramEntity.reducer;
