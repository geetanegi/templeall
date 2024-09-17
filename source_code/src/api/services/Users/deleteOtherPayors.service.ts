import { URLS } from '../../../constants';
import apiClient from '../../client';
const deleteOtherPayorsAPI = {
    deleteOtherPayors: ({ id }: { id: number }) =>
        apiClient.post(URLS.deleteOtherPayors, {
            data: {
                id,
            },
        }),
};
export default deleteOtherPayorsAPI;
