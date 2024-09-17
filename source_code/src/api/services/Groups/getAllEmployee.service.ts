import { URLS } from '../../../constants';
import apiClient from '../../client';

const allEmployeeApi = {
    getAllEmployee: () =>
        apiClient.post(URLS.getAllEmployee, {
            data: {},
        }),
};

export default allEmployeeApi;
