import { URLS } from '../../constants';
import apiClient from '../client';

const getUsers = {
    getUsersDetail: () => apiClient.post(URLS.getUsers, {}),
};

export default getUsers;
