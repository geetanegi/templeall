import { URLS } from '../../../constants';
import apiClient from '../../client';

const EditEmployeeApi = {
    getEmployeeById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getEmployeeById, {
            data: {
                id,
            },
        }),
};

export default EditEmployeeApi;
