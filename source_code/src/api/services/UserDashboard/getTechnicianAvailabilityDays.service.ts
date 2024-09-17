import { URLS } from '../../../constants';
import apiClient from '../../client';
const getTechnicianAvailabilityDaysAPI = {
    getTechnicianAvailabilityDays: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: string | number;
        profileOrgId: string | number;
    }) =>
        apiClient.post(URLS.getTechnicianAvailabilityDays, {
            data: { profileUserId, profileOrgId },
        }),
    getUnapprovedAvailabilityRequest: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: string | number;
        profileOrgId: string | number;
    }) =>
        apiClient.post(URLS.getUnapprovedAvailabilityRequest, {
            data: { profileUserId, profileOrgId },
        }),
};
export default getTechnicianAvailabilityDaysAPI;
