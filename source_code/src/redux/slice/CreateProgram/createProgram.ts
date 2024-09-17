import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createProgramAPI from '../../../api/services/createProgram.service';

const initialState = {
    value: [],
    tempName: [],
    programTypes: [],
    masteryCriteriaName: [],
    templateId: '',
    isMasteryAvailable: false,
};

interface MyData {
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
    domainId: any;
    startDate: any;
    programBookUUID: any;
    addMasteryTemplateToChild: any;
    masteryCriteriaTemplateData: any;
    templateForMasteryCriteria: any;
    addNew: any;
    sdInstructionsAllowed: any;
    addSdInstructionsToChild: any;
    sdInstructions: any;
    addTimeSamplingToChild: any;
    timeSamplingSeconds: any;
    timeSamplingMinutes: any;
    timeSamplingIntervals: any;
    addToAllSteps: any;
    stepData: any;
    taskAnalysisType: any;
    targetData: any;
}
interface value {
    type: string;
    publishStatus: string;
}
interface programType {
    type: any;
}
interface dataType {
    dataType: string;
    publishStatus: string;
}
export const createProgramCall = createAsyncThunk(
    'createProgramCall',
    async (payload: MyData, { rejectWithValue }) => {
        try {
            const res = await createProgramAPI.createProgram(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);
export const getTemplateName = createAsyncThunk(
    'templateName',
    async (payload: value, { rejectWithValue }) => {
        try {
            const res = await createProgramAPI.getTemplateName(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

export const getProgramType = createAsyncThunk(
    'getProgramType',
    async (payload: programType, { rejectWithValue }) => {
        try {
            const res = await createProgramAPI.getProgramTypes(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

export const getMasteryCriteriaName = createAsyncThunk(
    'getMasteryCriteriaName',
    async (payload: dataType, { rejectWithValue }) => {
        try {
            const res = await createProgramAPI.getMasteryCriteriaName(payload);
            return res.data;
        } catch (err) {
            rejectWithValue('Error in Response');
        }
    }
);

const createProgram = createSlice({
    name: 'createProgram',
    initialState,
    reducers: {
        savingDataProgram: (state, action) => {
            state.value = { ...action.payload };
        },
        savingProgramTemplateId: (state, action) => {
            state.templateId = action.payload;
        },
        clearMasteryCriteriaName: (state, action) => {
            state.masteryCriteriaName = action.payload;
        },
        setMasteryCriteria: (state, action) => {
            state.isMasteryAvailable = action.payload;
        },
        clearCreateProgram: (state) => {
            state.value = [];
            state.tempName = [];
            state.programTypes = [];
            state.masteryCriteriaName = [];
            state.templateId = '';
            state.isMasteryAvailable = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProgramCall.pending, () => {})
            .addCase(createProgramCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
            })
            .addCase(createProgramCall.rejected, () => {})
            .addCase(getTemplateName.fulfilled, (state: any, action) => {
                state.tempName = action.payload;
            })
            .addCase(getProgramType.fulfilled, (state: any, action) => {
                state.programTypes = action.payload;
            })
            .addCase(getMasteryCriteriaName.fulfilled, (state: any, action) => {
                state.masteryCriteriaName = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    savingDataProgram,
    savingProgramTemplateId,
    clearMasteryCriteriaName,
    setMasteryCriteria,
    clearCreateProgram,
} = createProgram.actions;

export default createProgram.reducer;
