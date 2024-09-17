import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getMasteryCriteriaTemplateAPI from '../../../api/services/MasterCriteriaTemplate/getMasteryCriteriaTemplate.service';

const initialState = {
    value: [],
    cardIndex: 1,
    formData: '',
    autoRegressId: '',
};

interface MyData {
    templateId: any;
    dataType: any;
    isProgram: boolean;
    temporaryId: string;
    addNew: any;
    isTarget: any;
    programId: any;
    targetId: any;
}
export const getMasteryCriteriaTemplateCall = createAsyncThunk(
    'getMasteryCriteriaTemplateCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res =
                await getMasteryCriteriaTemplateAPI.getMasteryCriteriaTemplate(
                    payload
                );
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const getMasteryCriteria = createSlice({
    name: 'getMasteryCriteria',
    initialState,
    reducers: {
        savingGetMasteryCriteriaTemplateData: (state, action) => {
            state.value = { ...action.payload };
        },
        getFormData: (state, action) => {
            state.formData = { ...action.payload };
        },
        setCardIndex: (state, action) => {
            state.cardIndex = action.payload;
        },
        editMasteryDataProgram: (state, action) => {
            state.value = action.payload;
        },
        clearGetMasteryData: (state) => {
            state.value = [];
        },
        setAutoRegressId: (state, action) => {
            state.autoRegressId = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMasteryCriteriaTemplateCall.pending, () => {})
            .addCase(
                getMasteryCriteriaTemplateCall.fulfilled,
                (state: any, action) => {
                    state.value = action.payload;
                }
            )
            .addCase(getMasteryCriteriaTemplateCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const {
    savingGetMasteryCriteriaTemplateData,
    getFormData,
    setCardIndex,
    editMasteryDataProgram,
    clearGetMasteryData,
    setAutoRegressId,
} = getMasteryCriteria.actions;

export default getMasteryCriteria.reducer;
