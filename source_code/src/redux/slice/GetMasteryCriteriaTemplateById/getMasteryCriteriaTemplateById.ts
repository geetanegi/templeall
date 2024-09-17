import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getMasteryCriteriaTemplateByIdAPI from '../../../api/services/MasterCriteriaTemplate/getMasteryCriteriaTemplateById.service';

const initialState = {
    value: [],
};

interface MyData {
    id: any;
}
export const getMasteryCriteriaTemplateByIdCall = createAsyncThunk(
    'getMasteryCriteriaTemplateByIdCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getMasteryCriteriaTemplateByIdAPI.getMasteryCriteriaTemplateById(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getMasteryCriteriaTemplateById = createSlice({
    name: 'getMasteryCriteriaTemplateById',
    initialState,
    reducers: {
        savingGetMasteryCriteriaTemplateDataById: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMasteryCriteriaTemplateByIdCall.pending, () => {})
            .addCase(
                getMasteryCriteriaTemplateByIdCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(getMasteryCriteriaTemplateByIdCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingGetMasteryCriteriaTemplateDataById } =
    getMasteryCriteriaTemplateById.actions;

export default getMasteryCriteriaTemplateById.reducer;
