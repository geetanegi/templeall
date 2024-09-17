import { URLS } from '../../../constants';
import apiClient from '../../client';
const getClaimByIdAPI = {
    getClaimById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getClaimById, {
            data: {
                id,
            },
        }),
};
export default getClaimByIdAPI;
