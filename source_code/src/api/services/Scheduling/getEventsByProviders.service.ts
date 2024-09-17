import { URLS } from '../../../constants';
import apiClient from '../../client';

const getEventsByProvidersAPI = {
    getEventsByProviders: ({ userIds }: { userIds: any }) =>
        apiClient.post(URLS.getEventsByProviders, {
            data: {
                userIds,
            },
        }),
};

export default getEventsByProvidersAPI;
