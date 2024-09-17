import { URLS } from '../../../constants';
import apiClient from '../../client';

const clientSessionApi = {
    clientSession: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.clientSession, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default clientSessionApi;
