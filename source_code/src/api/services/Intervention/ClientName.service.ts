import { URLS } from '../../../constants';
import apiClient from '../../client';

const ClientNameApi = {
    getClientName: () =>
        apiClient.post(URLS.getAllUsers, {
            data: {},
        }),
};

export default ClientNameApi;
