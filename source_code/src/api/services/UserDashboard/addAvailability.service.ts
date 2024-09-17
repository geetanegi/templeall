import { URLS } from '../../../constants';
import apiClient from '../../client';
const addAvailabilityAPI = {
    addAvailability: ({
        fromDate,
        toDate,
        slotList,
        technicianAvailabilityRequestId,
        profileUserId,
        profileOrgId,
    }: {
        fromDate: string;
        toDate: string;
        slotList: string[];
        technicianAvailabilityRequestId: string | number;
        profileUserId: string | number;
        profileOrgId: string | number;
    }) =>
        apiClient.post(URLS.addAvailability, {
            data: {
                fromDate,
                toDate,
                slotList,
                technicianAvailabilityRequestId,
                profileUserId,
                profileOrgId,
            },
        }),
};
export default addAvailabilityAPI;
