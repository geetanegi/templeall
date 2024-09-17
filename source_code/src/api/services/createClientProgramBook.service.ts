import { URLS } from '../../constants';
import apiClient from '../client';

const createClientProgramBookAPI = {
    createClientProgramBook: ({
        programName,
        isTemplate,
        createdBy,
        assignedTo,
        domainCount,
        domainCountAchieved,
        programCountAchieved,
        targetCount,
        programCount,
        targetGoalsCount,
        status,
        userChildId,
        therapyType,
    }: {
        programName: string;
        isTemplate: string;
        createdBy: string;
        assignedTo: string;
        domainCount: string;
        domainCountAchieved: string;
        programCountAchieved: string;
        targetCount: string;
        programCount: string;
        targetGoalsCount: string;
        status: string;
        userChildId: string;
        therapyType: string;
    }) =>
        apiClient.post(URLS.createClientProgramBook, {
            data: {
                programName,
                isTemplate,
                createdBy,
                assignedTo,
                domainCount,
                domainCountAchieved,
                programCountAchieved,
                targetCount,
                programCount,
                targetGoalsCount,
                status,
                userChildId,
                therapyType,
            },
        }),
};

export default createClientProgramBookAPI;
