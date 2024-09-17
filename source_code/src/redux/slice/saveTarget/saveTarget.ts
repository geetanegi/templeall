import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import saveTarget from '../../../api/services/saveTarget.service';
import editTargets from '../../../api/services/TargetsApi/editTargets.service';

const initialState = {
    value: [],
    openNotification: false,
};
interface MyData {
    domainName: string;
    programName: string;
    targetName: string;
    targetGoal: string;
    initiatedTime: string;
    minTrials: number;
    maxTrials: number;
    targetType: string;
    targetLocation: string;
    isCommentsAllowed: boolean;
    isAutoProgressAllowed: boolean;
    targetId: string;
    createdBy: string;
    modifiedBy: string;
    templateData: string;
    domainId: string;
    programId: string;
    guidelineTemplateId: string;
    masteryCriteriaTemplateData: any;
    isEdit: boolean;
    sdInstructionsAllowed: boolean;
    sdInstructions: string;
    addTimeSamplingToChild: any;
    timeSamplingSeconds: any;
    timeSamplingMinutes: any;
    timeSamplingIntervals: any;
    stepData: any;
    taskAnalysisType: any;
}
export const saveTargetCall = createAsyncThunk(
    'saveTargetCall',
    async (payload: MyData, { rejectWithValue }) => {
        if (payload?.isEdit) {
            try {
                const res = await editTargets?.editTargetsData(payload);
                return res.data;
            } catch (err) {
                rejectWithValue('Error in Response');
            }
        } else {
            try {
                const res = await saveTarget.saveTargetData(payload);
                return res.data;
            } catch (err) {
                rejectWithValue('Error in Response');
            }
        }
    }
);

const addTarget = createSlice({
    name: 'addTarget',
    initialState,
    reducers: {
        savingTargetData: (state, action) => {
            state.value = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveTargetCall.pending, (state: any) => {
                state.openNotification = false;
            })
            .addCase(saveTargetCall.fulfilled, (state: any, action) => {
                state.value = action.payload;
                state.openNotification = true;
            })
            .addCase(saveTargetCall.rejected, (state: any) => {
                state.openNotification = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { savingTargetData } = addTarget.actions;

export default addTarget.reducer;
