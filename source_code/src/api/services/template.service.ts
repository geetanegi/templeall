import { URLS } from '../../constants';
import apiClient from '../client';
const templateAPIs = {
    create: ({
        type,
        isSystemGenerated,
        dataConfig,
        name,
        description,
        createdBy,
        modifiedBy,
        status,
        code,
        organizationLogo,
    }: {
        name: string;
        description: string;
        createdBy: string;
        modifiedBy: string;
        status: string;
        type: string;
        isSystemGenerated: boolean;
        dataConfig: any;
        code: string;
        organizationLogo: string;
    }) =>
        apiClient.post(URLS.createTemplate, {
            data: {
                type,
                isSystemGenerated,
                dataConfig,
                name,
                description,
                createdBy,
                modifiedBy,
                status,
                code,
                organizationLogo,
            },
        }),

    edit: ({
        type,
        templateId,
        isSystemGenerated,
        dataConfig,
        name,
        description,
        createdBy,
        modifiedBy,
        status,
        code,
        organizationLogo,
    }: {
        name: string;
        description: string;
        createdBy: string;
        modifiedBy: string;
        status: string;
        type: string;
        templateId: any;
        isSystemGenerated: boolean;
        dataConfig: any;
        code: string;
        organizationLogo: string;
    }) =>
        apiClient.post(URLS.editTemplate, {
            data: {
                type,
                isSystemGenerated,
                templateId,
                dataConfig,
                name,
                description,
                createdBy,
                modifiedBy,
                status,
                code,
                organizationLogo,
            },
        }),
    findById: ({
        templateId,
        organizationId,
        type,
    }: {
        templateId: any;
        organizationId: string;
        type: string;
    }) =>
        apiClient.post(URLS.findByTemplate, {
            data: {
                templateId,
                organizationId,
                type,
            },
        }),
    getAuthorizationCode: ({ codeType }: { codeType: string }) =>
        apiClient.post(URLS.authorizationBillableCode, {
            data: {
                codeType,
            },
        }),
    getNameOfNote: ({
        authorizationCode,
        appointmentId,
        sessionNotesDataId,
    }: {
        authorizationCode: string;
        appointmentId: string;
        sessionNotesDataId: string;
    }) =>
        apiClient.post(URLS.getNameOfNote, {
            data: {
                authorizationCode,
                appointmentId,
                sessionNotesDataId,
            },
        }),
};

export default templateAPIs;
