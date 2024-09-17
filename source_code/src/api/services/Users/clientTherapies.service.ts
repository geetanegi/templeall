import { URLS } from '../../../constants';
import apiClient from '../../client';

const allClientTherapyApi = {
    getAllClientTherapy: () =>
        apiClient.post(URLS.clientTherapy, {
            data: {},
        }),
    getClientTherapyById: ({ childId }: { childId: any }) =>
        apiClient.post(URLS.clientTherapyById, {
            data: {
                childId,
            },
        }),
};

export default allClientTherapyApi;
