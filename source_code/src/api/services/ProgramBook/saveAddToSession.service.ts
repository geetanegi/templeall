import { URLS } from '../../../constants';
import apiClient from '../../client';

export const saveAddToSessionTarget = {
    addToSession: ({
        targetId,
        sessionIds,
    }: {
        sessionIds: any;
        targetId: any;
    }) =>
        apiClient.post(URLS.addToSession, {
            data: {
                targetId,
                sessionIds,
            },
        }),
};
