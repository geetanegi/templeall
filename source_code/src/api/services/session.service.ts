/* eslint-disable max-lines */
import { URLS } from '../../constants';
import apiClient from '../client';

const sessionApis = {
    createSession: ({
        name,
        createdFor,
        createdBy,
        modifiedBy,
        programBookUUID,
        target,
    }: {
        name: string;
        createdFor: string;
        createdBy: number;
        modifiedBy: number;
        programBookUUID: string;
        target: any;
    }) => {
        const data = {
            name,
            createdFor,
            createdBy,
            modifiedBy,
            programBookUUID,
            target,
        };
        return apiClient.post(URLS.createSession, {
            data: {
                ...data,
            },
        });
    },
    checkDuplicateName: ({ name }: { name: string }) => {
        return apiClient.post(URLS.checkDuplicateSessionName, {
            data: {
                modifiedSessionName: name,
            },
        });
    },
    getSessionTargets: ({
        sessionId,
        type,
    }: {
        sessionId: string;
        type: string;
    }) => {
        return apiClient.post(URLS.getSessionTargets, {
            data: {
                sessionId,
                type,
            },
        });
    },
    runSession: ({
        sessionId,
        createdBy,
        modifiedBy,
        startTime,
    }: {
        sessionId: string;
        createdBy: number;
        modifiedBy: number;
        startTime: string;
    }) => {
        return apiClient.post(URLS.runSession, {
            data: {
                sessionId,
                createdBy,
                modifiedBy,
                startTime,
            },
        });
    },
    getTrialsByTarget: ({
        sessionId,
        targetId,
    }: {
        sessionId: string;
        targetId: string;
    }) => {
        return apiClient.post(URLS.getTrialsByTarget, {
            data: {
                sessionId,
                targetId,
            },
        });
    },
    saveTrial: ({
        commentsId,
        sessionId,
        targetId,
        comments,
        prompts,
        frequency,
        phase,
        trailCount,
        duration,
        createdBy,
        modifiedBy,
        sessionRunId,
        phaseCount,
        trialId = '',
        positiveCount,
        negativeCount,
    }: {
        commentsId: string;
        sessionId: string;
        targetId: string;
        comments: string;
        prompts: string;
        frequency: string;
        phase: string;
        trailCount: string;
        duration: string;
        createdBy: number;
        modifiedBy: number;
        sessionRunId: string;
        phaseCount: string;
        trialId?: string;
        positiveCount: string;
        negativeCount: string;
    }) => {
        return apiClient.post(URLS.saveTrial, {
            data: {
                commentsId,
                sessionId,
                targetId,
                comments,
                prompts,
                phase,
                trailCount,
                duration,
                createdBy,
                modifiedBy,
                sessionRunId,
                trialId,
                frequency,
                phaseCount,
                positiveCount,
                negativeCount,
            },
        });
    },
    getSessionById: ({ sessionId }: { sessionId: string }) => {
        return apiClient.post(URLS.getSessionById, {
            data: {
                sessionId,
            },
        });
    },
    endSession: ({
        sessionRunId,
        duration,
        endTime,
    }: {
        sessionRunId: string;
        duration: string;
        endTime: string;
    }) => {
        return apiClient.post(URLS.endSession, {
            data: {
                sessionRunId,
                duration,
                endTime,
            },
        });
    },
    getAllTargetsBySession: ({ sessionId }: { sessionId: string }) => {
        return apiClient.post(URLS.getAllTargetsBySession, {
            data: {
                sessionId,
            },
        });
    },
    getTargetRunSummary: ({ sessionRunId }: { sessionRunId: string }) => {
        return apiClient.post(URLS.getTargetRunSummary, {
            data: {
                sessionRunId,
            },
        });
    },

    editSession: ({
        sessionId,
        name,
        modifiedBy,
        target,
    }: {
        sessionId: string;
        name: string;
        modifiedBy: number;
        target: any;
    }) => {
        return apiClient.post(URLS.editSession, {
            data: {
                sessionId,
                name,
                modifiedBy,
                target,
            },
        });
    },
    deleteSession: ({ sessionNoteDataId }: { sessionNoteDataId: any }) => {
        return apiClient.post(URLS.deleteSession, {
            data: {
                sessionNoteDataId,
            },
        });
    },
    fetchSessionsByClientId: ({ clientId }: { clientId?: string }) => {
        return apiClient.post(URLS.fetchSessionsByClientId, {
            data: {
                clientId,
            },
        });
    },
    fetchSelectedSummary: ({
        clientId,
        date,
        providerId,
    }: {
        clientId?: string;
        date?: any;
        providerId?: any;
    }) => {
        return apiClient.post(URLS.fetchSessionSummary, {
            data: {
                clientId,
                date,
                providerId,
            },
        });
    },
    getAllABCDropdownData: () => {
        return apiClient.post(URLS.getAllABCDropdownData, {
            data: {},
        });
    },
    saveABCSessionData: (data: any) => {
        return apiClient.post(URLS.saveABCSessionData, {
            data: {
                data,
            },
        });
    },
    getABCSessionData: (sessionId: string) => {
        return apiClient.post(URLS.getABCSessionData, {
            data: {
                sessionId,
            },
        });
    },
    sessionHistory: ({ sessionId }: { sessionId: any }) => {
        return apiClient.post(URLS.sessionHistory, {
            data: {
                sessionId,
            },
        });
    },
    saveTrialForTaskAnalysis: ({
        commentsId,
        sessionId,
        targetId,
        comments,
        phase,
        trailCount,
        userId,
        createdBy,
        modifiedBy,
        sessionRunId,
        trialId,
        response,
    }: {
        commentsId: string;
        sessionId: string;
        targetId: string;
        comments: string;
        phase: string;
        trailCount: string;
        userId: string;
        createdBy: string;
        modifiedBy: string;
        sessionRunId: string;
        trialId: string;
        response: any;
    }) => {
        return apiClient.post(URLS.saveTrialForTaskAnalysis, {
            data: {
                commentsId,
                sessionId,
                targetId,
                comments,
                phase,
                trailCount,
                userId,
                createdBy,
                modifiedBy,
                sessionRunId,
                trialId,
                response,
            },
        });
    },
};

export default sessionApis;
