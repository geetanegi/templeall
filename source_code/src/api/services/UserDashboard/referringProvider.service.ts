import { URLS } from '../../../constants';
import apiClient from '../../client';

const referringProviderApi = {
    referringProvider: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.referringProvider, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default referringProviderApi;
