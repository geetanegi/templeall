import { URLS } from '../../constants';
import apiClient from '../client';

const saveTarget = {
    saveTargetData: ({
        domainName,
        programName,
        targetName,
        targetGoal,
        initiatedTime,
        minTrials,
        maxTrials,
        targetType,
        targetLocation,
        isCommentsAllowed,
        isAutoProgressAllowed,
        targetId,
        createdBy,
        modifiedBy,
        templateData,
        domainId,
        programId,
        guidelineTemplateId,
        masteryCriteriaTemplateData,
        sdInstructionsAllowed,
        sdInstructions,
        addTimeSamplingToChild,
        timeSamplingSeconds,
        timeSamplingMinutes,
        timeSamplingIntervals,
        stepData,
        taskAnalysisType,
    }: {
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
        sdInstructionsAllowed: boolean;
        sdInstructions: string;
        addTimeSamplingToChild: any;
        timeSamplingSeconds: any;
        timeSamplingMinutes: any;
        timeSamplingIntervals: any;
        stepData: any;
        taskAnalysisType: any;
    }) =>
        apiClient.post(URLS.saveTarget, {
            data: {
                domainName,
                programName,
                targetName,
                targetGoal,
                initiatedTime,
                minTrials,
                maxTrials,
                targetType,
                targetLocation,
                isCommentsAllowed,
                isAutoProgressAllowed,
                targetId,
                createdBy,
                modifiedBy,
                templateData,
                domainId,
                programId,
                guidelineTemplateId,
                sdInstructionsAllowed,
                sdInstructions,
                masteryCriteriaTemplateData,
                addTimeSamplingToChild,
                timeSamplingSeconds,
                timeSamplingMinutes,
                timeSamplingIntervals,
                stepData,
                taskAnalysisType,
            },
        }),
};

export default saveTarget;
