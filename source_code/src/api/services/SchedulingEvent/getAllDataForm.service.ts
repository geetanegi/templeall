import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllData = {
    getTechnicianAndClinician: () =>
        apiClient.post(URLS.primaryProvider, {
            data: {},
        }),
    getPlaceAndService: () =>
        apiClient.post(URLS.placeService, {
            data: {},
        }),
    getAuthorizationAndNonBillable: ({
        codeType,
        clientId,
        serviceProviderId,
    }: {
        codeType: string;
        clientId: any;
        serviceProviderId: any;
    }) =>
        apiClient.post(URLS.authorizationNonBillable, {
            data: { codeType, clientId, serviceProviderId },
        }),
    servicePlaces: () =>
        apiClient.post(URLS.getServicePlaces, {
            data: {},
        }),
};

export default getAllData;
