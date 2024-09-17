import { URLS } from '../../../constants';
import apiClient from '../../client';
const deleteClaimApi = {
    deleteClaim: ({ id }: { id: string }) =>
        apiClient
            .post(URLS.deleteClaim, { data: { id } })
            .then((response) => {
                return response;
            })
            .catch(() => {}),
};
export default deleteClaimApi;
