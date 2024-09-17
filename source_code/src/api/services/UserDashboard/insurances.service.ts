import { URLS } from '../../../constants';
import apiClient from '../../client';

const insurancesApi = {
    insurances: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.insurances, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default insurancesApi;
