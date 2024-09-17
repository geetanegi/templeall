import { URLS } from '../../constants';
import apiClient from '../client';

const getGroupsApi = {
    getAllGroup: () => apiClient.post(URLS.allGroups, {}),
};

export default getGroupsApi;
