import { URLS } from '../../../constants';
import apiClient from '../../client';

export const getInProgressLongTermApi = {
    getLongTermGoal: ({
        providerId,
        clientId,
    }: {
        providerId: string;
        clientId: string;
    }) =>
        apiClient.post(URLS.getInProgressLongTerm, {
            data: {
                providerId,
                clientId,
            },
        }),
};
export const getInProgressShortTermApi = {
    getShortTermGoal: ({
        providerId,
        clientId,
    }: {
        providerId: string;
        clientId: string;
    }) =>
        apiClient.post(URLS.getInProgressShortTerm, {
            data: {
                providerId,
                clientId,
            },
        }),
};
