import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllClientForRateApi = {
    getAllClient: ({ authorizationCodeId }: { authorizationCodeId: any }) =>
        apiClient.post(URLS.allClientForRate, {
            data: {
                authorizationCodeId,
            },
        }),
};

export default getAllClientForRateApi;
