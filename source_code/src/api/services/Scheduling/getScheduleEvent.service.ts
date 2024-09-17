import { URLS } from '../../../constants';
import apiClient from '../../client';
const getScheduleEventAPI = {
    getScheduleEvent: ({
        providerId,
        groupId,
        childId,
    }: {
        groupId: any;
        providerId: any;
        childId: any;
    }) =>
        apiClient.post(URLS.getScheduleEvent, {
            data: {
                providerId,
                groupId,
                childId,
            },
        }),
};
export default getScheduleEventAPI;
