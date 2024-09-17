import { URLS } from '../../constants';
import apiClient from '../client';

const editProgramAPI = {
    editProgram: ({
        id,
        name,
        programGoal,
        addGoalToChild,
        programType,
        isCommentsAllowed,
        addCommentsToChild,
        isAutoProgressAllowed,
        addAutoProgressToChild,
        instructionTemplateId,
        addInstructionTemplateToChild,
        instructionTemplateData,
        createdBy,
        modifiedBy,
        startDate,
        domainId,
        addMasteryTemplateToChild,
        masteryCriteriaTemplateData,
        addNew,
        templateForMasteryCriteria,
        programBookUUID,
        sdInstructionsAllowed,
        addSdInstructionsToChild,
        sdInstructions,
        addTimeSamplingToChild,
        timeSamplingSeconds,
        timeSamplingMinutes,
        timeSamplingIntervals,
        taskAnalysisType,
    }: {
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
    }) =>
        apiClient.post(URLS.editProgram, {
            data: {
                id,
                name,
                programGoal,
                addGoalToChild,
                programType,
                isCommentsAllowed,
                addCommentsToChild,
                isAutoProgressAllowed,
                addAutoProgressToChild,
                instructionTemplateId,
                addInstructionTemplateToChild,
                instructionTemplateData,
                createdBy,
                modifiedBy,
                startDate,
                domainId,
                addMasteryTemplateToChild,
                masteryCriteriaTemplateData,
                addNew,
                templateForMasteryCriteria,
                programBookUUID,
                sdInstructionsAllowed,
                addSdInstructionsToChild,
                sdInstructions,
                addTimeSamplingToChild,
                timeSamplingSeconds,
                timeSamplingMinutes,
                timeSamplingIntervals,
                taskAnalysisType,
            },
        }),
};

export default editProgramAPI;
