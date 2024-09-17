import { URLS } from '../../../constants';
import apiClient from '../../client';

const authorizationsCardApi = {
    authorizations: ({
        profileUserId,
        profileOrgId,
        currentDate,
    }: {
        profileUserId: string;
        profileOrgId: string;
        currentDate: string;
    }) =>
        apiClient.post(URLS.authorizations, {
            data: {
                profileUserId,
                profileOrgId,
                currentDate,
            },
        }),
};

export default authorizationsCardApi;
