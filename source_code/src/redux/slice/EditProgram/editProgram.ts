import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import editProgramAPI from '../../../api/services/editProgram.service';

const initialState = {
    value: [],
};

interface MyData {
    id: any;
    name: any;
    programGoal: any;
    addGoalToChild: any;
    programType: any;
    isCommentsAllowed: any;
    addCommentsToChild: any;
    isAutoProgressAllowed: any;
    addAutoProgressToChild: any;
    instructionTemplateId: any;
    addInstructionTemplateToChild: any;
    instructionTemplateData: any;
    createdBy: any;
    modifiedBy: any;
    startDate: any;
    domainId: any;
    addMasteryTemplateToChild: any;
    masteryCriteriaTemplateData: any;
    addNew: any;
    templateForMasteryCriteria: any;
    programBookUUID: any;
    sdInstructionsAllowed: any;
    addSdInstructionsToChild: any;
    sdInstructions: any;
    addTimeSamplingToChild: any;
    timeSamplingSeconds: any;
    timeSamplingMinutes: any;
    timeSamplingIntervals: any;
    taskAnalysisType: any;
}
export const editProgramCall = createAsyncThunk(
    'editProgramCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await editProgramAPI.editProgram(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const editProgram = createSlice({
    name: 'createProgram',
    initialState,
    reducers: {
        savingDataProgram: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(editProgramCall.pending, () => {})
            .addCase(editProgramCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(editProgramCall.rejected, () => {});
    },
});

// Action creators are generated for each case reducer function
export const { savingDataProgram } = editProgram.actions;

export default editProgram.reducer;
