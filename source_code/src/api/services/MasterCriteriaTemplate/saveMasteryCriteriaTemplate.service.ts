import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveMasteryCriteriaTemplateAPI = {
    saveMasterCriteriaTemplate: ({
        templateId,
        createdBy,
        modifiedBy,
        phase,
        timeFrame,
        dataType,
        timePeriod,
        operationType,
        accuracy,
        autoProgressId,
        autoProgressPhase,
        autoRegressId,
        prompts,
        durationMinutes,
        durationSeconds,
        latencyMinutes,
        latencySeconds,
        frequency,
        requireTwoProviders,
        masteryCriteriaTemplateId,
        indexCount,
        isProgram,
        addNew,
        temporaryId,
        isTarget,
        programId,
        targetId,
        score,
        ratingScale,
        rateHour,
        rateMinutes,
        rateSeconds,
        timeSamplingInterval,
    }: {
        templateId: any;
        createdBy: any;
        modifiedBy: any;
        phase: any;
        timeFrame: any;
        dataType: any;
        autoRegressId: any;
        timePeriod: any;
        operationType: any;
        accuracy: any;
        autoProgressId: any;
        autoProgressPhase: any;
        prompts: any;
        durationMinutes: any;
        durationSeconds: any;
        latencyMinutes: any;
        latencySeconds: any;
        frequency: any;
        requireTwoProviders: any;
        masteryCriteriaTemplateId: any;
        indexCount: any;
        isProgram: any;
        addNew: any;
        temporaryId: any;
        isTarget: any;
        programId: any;
        targetId: any;
        score: any;
        ratingScale: any;
        rateHour: any;
        rateMinutes: any;
        rateSeconds: any;
        timeSamplingInterval: any;
    }) =>
        apiClient.post(URLS.saveCriteriaTemplateForm, {
            data: {
                templateId,
                createdBy,
                modifiedBy,
                phase,
                timeFrame,
                dataType,
                timePeriod,
                operationType,
                accuracy,
                autoProgressId,
                autoRegressId,
                autoProgressPhase,
                prompts,
                durationMinutes,
                durationSeconds,
                latencyMinutes,
                latencySeconds,
                frequency,
                requireTwoProviders,
                masteryCriteriaTemplateId,
                indexCount,
                isProgram,
                addNew,
                temporaryId,
                isTarget,
                programId,
                targetId,
                score,
                ratingScale,
                rateHour,
                rateMinutes,
                rateSeconds,
                timeSamplingInterval,
            },
        }),
    publishMasteryCriteriaNameCall: ({ templateId }: { templateId: any }) =>
        apiClient.post(URLS.publishMasteryCriteria, {
            data: {
                templateId,
            },
        }),
    masteryCardsAvailable: ({ templateId }: { templateId: any }) =>
        apiClient.post(URLS.isMasteryCardsAvailable, {
            data: {
                templateId,
            },
        }),
    isToggleChange: ({
        templateId,
        isSynchronized,
    }: {
        templateId: any;
        isSynchronized: any;
    }) =>
        apiClient.post(URLS.isToggleChange, {
            data: {
                templateId,
                isSynchronized,
            },
        }),

    unPublishMasteryCriteriaNameCall: ({ templateId }: { templateId: any }) =>
        apiClient.post(URLS.unPublishMasteryCriteria, {
            data: {
                templateId,
            },
        }),
    copyMasteryCriteriaNameCall: ({
        templateId,
        name,
    }: {
        templateId: any;
        name: any;
    }) =>
        apiClient.post(URLS.copyMasteryCriteria, {
            data: {
                templateId,
                name,
            },
        }),
    // deleteMasteryCriteria: ({ templateId }: { templateId: any }) =>
    //     apiClient.post(URLS.deleteMasteryCriteriaTemplate, {
    //         data: {
    //             templateId,
    //         },
    //     }),
    deleteMaintenance: ({
        masteryCriteriaTemplateId,
        type,
        dataType,
    }: {
        masteryCriteriaTemplateId: any;
        type: any;
        dataType: string;
    }) =>
        apiClient.post(URLS.deleteMaintenance, {
            data: {
                masteryCriteriaTemplateId,
                type,
                dataType,
            },
        }),
    checkStatusActiveAndInactive: ({
        templateId,
        status,
    }: {
        templateId: any;
        status: any;
    }) =>
        apiClient.post(URLS.checkStatusActiveAndInactive, {
            data: {
                templateId,
                status,
            },
        }),
};
export default saveMasteryCriteriaTemplateAPI;
