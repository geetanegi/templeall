import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllEmployeesAndChildAPI = {
    getAllEmployeesAndChild: ({ organizationId }: { organizationId: any }) =>
        apiClient.post(URLS.getAllEmployeesAndChild, {
            data: {
                organizationId,
            },
        }),
};

export default getAllEmployeesAndChildAPI;
