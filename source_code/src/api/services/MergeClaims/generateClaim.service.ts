import { URLS } from '../../../constants';
import apiClient from '../../client';
const generateClaimAPI = {
    generateClaim: ({ data }: { data: any }) =>
        apiClient.post(URLS.generateClaim, {
            data: {
                data,
            },
        }),
};
export default generateClaimAPI;
