import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllEmployeeForRateApi = {
    getAllEmployee: ({ authorizationCodeId }: { authorizationCodeId: any }) =>
        apiClient.post(URLS.allEmployeeForRate, {
            data: { authorizationCodeId },
        }),
};

export default getAllEmployeeForRateApi;
