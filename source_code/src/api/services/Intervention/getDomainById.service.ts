import { URLS } from '../../../constants';
import apiClient from '../../client';

export const DomainsByUserTypeApi = {
    getDomainByType: ({
        providerId,
        clientId,
    }: {
        providerId: string;
        clientId: string;
    }) =>
        apiClient.post(URLS.getDomainsByUserType, {
            data: {
                providerId,
                clientId,
            },
        }),
};
