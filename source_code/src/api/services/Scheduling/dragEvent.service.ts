import { URLS } from '../../../constants';
import apiClient from '../../client';
const dragEventAPI = {
    dragEvent: ({
        id,
        startTime,
        endTime,
        reason,
        duration,
    }: {
        id: any;
        startTime: any;
        endTime: any;
        reason: any;
        duration: any;
    }) =>
        apiClient.post(URLS.dragEvent, {
            data: {
                id,
                startTime,
                endTime,
                reason,
                duration,
            },
        }),
};
export default dragEventAPI;
