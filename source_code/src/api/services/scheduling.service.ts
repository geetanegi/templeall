import { URLS } from '../../constants';
import apiClient from '../client';
const schedulingApis = {
    getScheduleEventById: ({ id }: { id: string }) => {
        return apiClient.post(URLS.getScheduleEventById, {
            data: {
                id,
            },
        });
    },
    getNewNoteByCode: ({
        sessionNoteTemplateId,
    }: {
        sessionNoteTemplateId: any;
    }) => {
        return apiClient.post(URLS.getNoteByCode, {
            data: {
                sessionNoteTemplateId,
            },
        });
    },
    getMultipleNoteByCode: ({
        authorizationCode,
    }: {
        authorizationCode: any;
    }) => {
        return apiClient.post(URLS.getMultipleNoteByCode, {
            data: {
                authorizationCode,
            },
        });
    },
    checkSessionNoteExists: ({
        appointmentId,
        sessionNoteDataId,
        billingCode,
    }: {
        appointmentId: any;
        sessionNoteDataId: string;
        billingCode: string;
    }) => {
        return apiClient.post(URLS.checkSessionNoteExists, {
            data: {
                appointmentId,
                sessionNoteDataId,
                billingCode,
            },
        });
    },
    getNoteById: ({ sessionNoteDataId }: { sessionNoteDataId: any }) => {
        return apiClient.post(URLS.getNoteById, {
            data: {
                sessionNoteDataId,
            },
        });
    },
    copySessionNoteById: ({
        sessionNoteDataId,
        appointmentWith,
    }: {
        sessionNoteDataId: any;
        appointmentWith: any;
    }) => {
        return apiClient.post(URLS.copySessionNote, {
            data: {
                sessionNoteDataId,
                appointmentWith,
            },
        });
    },
    getClientProviderDetails: ({
        providerId,
        clientId,
        appointmentId,
    }: {
        providerId: any;
        clientId: any;
        appointmentId: any;
    }) => {
        return apiClient.post(URLS.clientProviderDetails, {
            data: {
                providerId,
                clientId,
                appointmentId,
            },
        });
    },
    saveNoteByCode: ({
        appointmentId,
        authorizationCode,
        sessionTemplateId,
        sessionNoteData,
        createdBy,
        modifiedBy,
        sessionNotesDataId,
        appointmentWith,
        organizationLogo,
        authorizationCodes,
    }: {
        appointmentId: any;
        authorizationCode: any;
        sessionTemplateId: any;
        sessionNoteData: any;
        createdBy: any;
        modifiedBy: any;
        sessionNotesDataId: any;
        appointmentWith: any;
        organizationLogo: string;
        authorizationCodes: any;
    }) => {
        return apiClient.post(URLS.saveAddNewNote, {
            data: {
                appointmentId,
                authorizationCode,
                sessionTemplateId,
                sessionNoteData,
                createdBy,
                modifiedBy,
                sessionNotesDataId,
                appointmentWith,
                organizationLogo,
                authorizationCodes,
            },
        });
    },
    editScheduleEvent: ({
        eventId,
        signature,
        startTime,
        endTime,
        modifiedBy,
        authorizationCodes,
        primaryProviderId,
        providersNameSignature,
        unitOfService,
        duration,
        timezone,
        isAuthorizationCodesEdited,
    }: {
        eventId: string;
        signature: string;
        startTime: string;
        endTime: string;
        modifiedBy: string;
        authorizationCodes: any;
        primaryProviderId: any;
        providersNameSignature: string;
        unitOfService: any;
        duration: any;
        timezone: any;
        isAuthorizationCodesEdited: any;
    }) => {
        return apiClient.post(URLS.editScheduleEvent, {
            data: {
                eventId,
                signature,
                startTime,
                endTime,
                modifiedBy,
                authorizationCodes,
                primaryProviderId,
                providersNameSignature,
                unitOfService,
                duration,
                timezone,
                isAuthorizationCodesEdited,
            },
        });
    },
    completeScheduleEvent: ({
        appointmentId,
        sessionNotesDataId,
    }: {
        appointmentId: any;
        sessionNotesDataId: any;
    }) => {
        return apiClient.post(URLS.completeScheduleEvent, {
            data: {
                appointmentId,
                sessionNotesDataId,
            },
        });
    },
};
export default schedulingApis;
