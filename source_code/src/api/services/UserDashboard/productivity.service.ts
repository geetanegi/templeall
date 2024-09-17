import { URLS } from '../../../constants';
import apiClient from '../../client';

const productivityApi = {
    productivity: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.productivity, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default productivityApi;
