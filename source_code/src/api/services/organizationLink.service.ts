import { URLS } from '../../constants';
import apiClient from '../client';
const organizationLinkApi = {
    organizationLink: () => apiClient.post(URLS.organizationLink, {}),
    organizationName: ({ code }: { code: string | undefined }) =>
        apiClient.post(URLS.organizationName, { data: { code } }),
    organizationLocationByCode: ({ code }: { code: string | undefined }) =>
        apiClient.post(URLS.organizationLocationByCode, { data: { code } }),
    insurancesByCode: ({ code }: { code: string | undefined }) =>
        apiClient.post(URLS.insurancesByCode, { data: { code } }),
    servicesByCode: ({ code }: { code: string | undefined }) =>
        apiClient.post(URLS.servicesByCode, { data: { code } }),
};
export default organizationLinkApi;
