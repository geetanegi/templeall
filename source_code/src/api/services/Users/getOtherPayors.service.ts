import { URLS } from '../../../constants';
import apiClient from '../../client';
const getOtherPayorAPI = {
    getOtherPayor: ({ clientId }: { clientId: number }) =>
        apiClient.post(URLS.getOtherPayor, {
            data: {
                clientId,
            },
        }),
};
export default getOtherPayorAPI;
