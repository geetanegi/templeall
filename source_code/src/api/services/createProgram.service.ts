import { URLS } from '../../constants';
import apiClient from '../client';

const createProgramAPI = {
    createProgram: ({
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
        domainId,
        startDate,
        programBookUUID,
        addMasteryTemplateToChild,
        masteryCriteriaTemplateData,
        templateForMasteryCriteria,
        addNew,
        sdInstructionsAllowed,
        addSdInstructionsToChild,
        sdInstructions,
        addTimeSamplingToChild,
        timeSamplingSeconds,
        timeSamplingMinutes,
        timeSamplingIntervals,
        addToAllSteps,
        stepData,
        taskAnalysisType,
        targetData,
    }: {
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
    }) =>
        apiClient.post(URLS.createProgram, {
            data: {
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
                domainId,
                startDate,
                programBookUUID,
                addMasteryTemplateToChild,
                masteryCriteriaTemplateData,
                templateForMasteryCriteria,
                addNew,
                sdInstructionsAllowed,
                addSdInstructionsToChild,
                sdInstructions,
                addTimeSamplingToChild,
                timeSamplingSeconds,
                timeSamplingMinutes,
                timeSamplingIntervals,
                addToAllSteps,
                stepData,
                taskAnalysisType,
                targetData,
            },
        }),
    getTemplateName: ({
        type,
        publishStatus,
    }: {
        type: string;
        publishStatus: string;
    }) =>
        apiClient.post(URLS.getTemplateName, {
            data: {
                type,
                publishStatus,
            },
        }),

    getProgramTypes: ({ type }: { type: any }) =>
        apiClient.post(URLS.programTypes, {
            data: {
                type,
            },
        }),

    getMasteryCriteriaName: ({
        dataType,
        publishStatus,
    }: {
        dataType: any;
        publishStatus: any;
    }) =>
        apiClient.post(URLS.getMasteryCriteriaName, {
            data: {
                dataType,
                publishStatus,
            },
        }),
};

export default createProgramAPI;
