import { URLS } from '../../../constants';
import apiClient from '../../client';
const getAllClaimByIdTypeAPI = {
    getAllClaimByIdType: () =>
        apiClient.post(URLS.getAllClaimByIdType, {
            data: {},
        }),
};
export default getAllClaimByIdTypeAPI;
