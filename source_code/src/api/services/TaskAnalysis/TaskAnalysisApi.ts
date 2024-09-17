import { URLS } from '../../../constants';
import apiClient from '../../client';

export const taskAnalysis = {
    editSteps: ({
        id,
        order,
        stepDescription,
        stepPrompts,
        programId,
        targetId,
        addToAllSteps,
    }: {
        id: any;
        order: any;
        stepDescription: any;
        stepPrompts: any;
        programId: any;
        targetId: any;
        addToAllSteps: any;
    }) => {
        return apiClient.post(URLS.editStep, {
            data: {
                id,
                order,
                stepDescription,
                stepPrompts,
                programId,
                targetId,
                addToAllSteps,
            },
        });
    },
    editStepsAddTToAll: ({
        id,
        order,
        stepDescription,
        stepPrompts,
        programId,
        targetId,
        addToAllSteps,
    }: {
        id: any;
        order: any;
        stepDescription: any;
        stepPrompts: any;
        programId: any;
        targetId: any;
        addToAllSteps: any;
    }) => {
        return apiClient.post(URLS.editStepsAddTToAllSteps, {
            data: {
                id,
                order,
                stepDescription,
                stepPrompts,
                programId,
                targetId,
                addToAllSteps,
            },
        });
    },
    deleteSteps: ({ id }: { id: string }) => {
        return apiClient.post(URLS.deleteStep, {
            data: {
                id,
            },
        });
    },
    setStepOrder: ({ stepData }: { stepData: any }) => {
        return apiClient.post(URLS.saveStepOrder, {
            data: {
                stepData,
            },
        });
    },
};
