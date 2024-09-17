import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getTemplateAPI from '../../../api/services/MasterCriteriaTemplate/getTemplate.service';

const initialState = {
    value: [],
    templateData: '',
};

interface MyData {
    id: any;
}
export const getTemplateCall = createAsyncThunk(
    'getTemplateCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await getTemplateAPI.getTemplate(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getTemplate = createSlice({
    name: 'getTemplate',
    initialState,
    reducers: {
        savingGetTemplateData: (state, action) => {
            state.value = { ...action.payload };
        },

        getTemplateData: (state, action) => {
            state.templateData = { ...action.payload };
        },
        clearTemplateData: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTemplateCall.pending, () => {})
            .addCase(getTemplateCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(getTemplateCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingGetTemplateData, getTemplateData, clearTemplateData } =
    getTemplate.actions;

export default getTemplate.reducer;
