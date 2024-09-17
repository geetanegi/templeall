import { URLS } from '../../constants';
import apiClient from '../client';

const addFromLibraryApis = {
    addFromLibrary: ({
        createdBy,
        programBookLibraryUUID,
        programBookId,
        domainId,
        programId,
        itemType,
        configuration,
    }: {
        createdBy: number;
        programBookLibraryUUID: string;
        programBookId: string;
        domainId: any;
        programId: any;
        itemType: string;
        configuration: any;
    }) => {
        return apiClient.post(URLS.addFromLibrary, {
            data: {
                createdBy,
                programBookLibraryUUID,
                programBookId,
                domainId,
                programId,
                itemType,
                configuration,
            },
        });
    },
    addFromGoalLibrary: ({
        targetId,
        itemType,
        configuration,
    }: {
        targetId: string;
        itemType: string;
        configuration: any;
    }) => {
        return apiClient.post(URLS.addFromGoalLibrary, {
            data: {
                targetId,
                itemType,
                configuration,
            },
        });
    },
    getAllGoalLibraries: () => {
        const requestData = {
            noPagination: true,
        };
        return apiClient.post(URLS.getAllInterventionLibrary, {
            data: requestData,
        });
    },
    deleteGoalLibrary: ({ id, type }: { id: any; type: any }) => {
        return apiClient.post(URLS.deleteInterventionibrary, {
            data: {
                id,
                type,
            },
        });
    },
    checkDuplicateInProgramBookLibrary: ({
        name,
        itemType,
        programBookId,
        domainId,
        programId,
    }: {
        name: string;
        itemType: string;
        programBookId?: string;
        domainId?: string;
        programId?: string;
    }) => {
        return apiClient.post(URLS.checkDuplicateInProgramBookLibrary, {
            data: {
                name,
                itemType,
                programBookId,
                domainId,
                programId,
            },
        });
    },
    checkDuplicateInGoalLibrary: ({
        name,
        itemType,
        interventionPlanId,
        domainId,
        longTermGoalId,
    }: {
        name: string;
        itemType: string;
        interventionPlanId: string;
        domainId: string;
        longTermGoalId: string;
    }) => {
        return apiClient.post(URLS.checkDuplicateInGoalLibrary, {
            data: {
                name,
                itemType,
                interventionPlanId,
                domainId,
                longTermGoalId,
            },
        });
    },
};

export default addFromLibraryApis;
