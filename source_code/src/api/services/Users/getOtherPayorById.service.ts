import { URLS } from '../../../constants';
import apiClient from '../../client';
const getOtherPayorByIdAPI = {
    getOtherPayorById: ({ id }: { id: number }) =>
        apiClient.post(URLS.getOtherPayorById, {
            data: {
                id,
            },
        }),
};
export default getOtherPayorByIdAPI;
