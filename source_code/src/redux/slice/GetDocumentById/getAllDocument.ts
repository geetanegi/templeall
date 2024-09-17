import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllDocument from '../../../api/services/getAllDcument.service';
import getProgrambookDocumentsByProgramBookIdAPI from '../../../api/services/Session/getProgrambookDocumentsByProgramBookId.service';

const initialState = {
    value: [],
};

interface MyData1 {
    programBookUUID: string | undefined;
}
interface MyData2 {
    programBookId: string | undefined;
}
export const getAllDocumentByIdCall = createAsyncThunk(
    'getProgramsByDomainIdCall',
    async (payload: MyData1, { rejectWithValue }) => {
        try {
            const res = await getAllDocument.getAllDocumentById(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getAllDocumentByProgramBookIdCall = createAsyncThunk(
    'getAllDocumentByProgramBookIdCall',
    async (payload: MyData2, { rejectWithValue }) => {
        try {
            const res =
                await getProgrambookDocumentsByProgramBookIdAPI.getProgrambookDocumentsByProgramBookId(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getAllDocumentById = createSlice({
    name: 'getAllDocumentById',
    initialState,
    reducers: {
        savingData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDocumentByIdCall.pending, () => {})
            .addCase(getAllDocumentByIdCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(
                getAllDocumentByProgramBookIdCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(getAllDocumentByIdCall.rejected, () => {});
    },
});
export const { savingData } = getAllDocumentById.actions;

export default getAllDocumentById.reducer;
