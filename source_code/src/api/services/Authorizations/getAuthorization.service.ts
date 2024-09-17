import { URLS } from '../../../constants';
import apiClient from '../../client';
const getAuthorizationAPI = {
    getAuthorization: ({ clientId }: { clientId: any }) =>
        apiClient.post(URLS.getAuthorizations, {
            data: {
                clientId,
            },
        }),
    deleteAuthorization: ({ id }: { id: any }) =>
        apiClient.post(URLS.deleteAuthorization, {
            data: {
                id,
            },
        }),
    getAuthorizationPatientNames: ({ parentUserId }: { parentUserId: any }) =>
        apiClient.post(URLS.getAuthorizationPatientNames, {
            data: {
                parentUserId,
            },
        }),
    getAuthorizationPayors: ({ clientId }: { clientId: any }) =>
        apiClient.post(URLS.getPayors, {
            data: {
                clientId,
            },
        }),
    getAuthorizationById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getAuthorizationById, {
            data: {
                id,
            },
        }),
    saveAuthorization: ({
        id,
        userChildId,
        documentName,
        description,
        validFrom,
        validTo,
        createdBy,
        authorizations,
        file,
        userInsuranceId,
        organizationId,
    }: {
        id: any;
        userChildId: any;
        documentName: any;
        description: any;
        validFrom: any;
        validTo: any;
        createdBy: any;
        authorizations: any;
        file: any;
        userInsuranceId: any;
        organizationId: any;
    }) =>
        apiClient.post(URLS.saveAuthorization, {
            data: {
                id,
                userChildId,
                documentName,
                description,
                validFrom,
                validTo,
                createdBy,
                authorizations,
                file,
                userInsuranceId,
                organizationId,
            },
        }),
};
export default getAuthorizationAPI;
