import { URLS } from '../../constants';
import apiClient from '../client';
const getAllClientInquiryDetailsApi = {
    getClientInsurance: ({ type }: { type: any }) =>
        apiClient.post(URLS.getClientInsurance, {
            data: { type },
        }),
    getClientServices: ({ type }: { type: any }) =>
        apiClient.post(URLS.getClientServices, {
            data: { type },
        }),
    getClientServicesIntervention: () =>
        apiClient.post(URLS.getClientServicesIntervention, {
            data: {},
        }),
    getClientLocation: () =>
        apiClient.post(URLS.getClientLocations, {
            data: {},
        }),

    getClientAvailabilityStatus: ({ type }: { type: any }) =>
        apiClient.post(URLS.getClientAvailabilityStatus, {
            data: {
                type,
            },
        }),
    getOrganizationLocations: () =>
        apiClient.post(URLS.organizationLocation, {}),
};
export default getAllClientInquiryDetailsApi;
