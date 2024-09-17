import { URLS } from '../../constants';
import apiClient from '../client';

const organizationApis = {
    getAllUsers: () => {
        return apiClient.post(URLS.getAllUsers, {});
    },
};

export default organizationApis;
