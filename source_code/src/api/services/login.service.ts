import { URLS } from '../../constants';
import apiClient from '../client';

const loginApi = {
    userLogin: ({ username, password }: { username: any; password: any }) =>
        apiClient.post(URLS.login, {
            data: {
                username,
                password,
            },
        }),
    userLogout: () =>
        apiClient.post(URLS.logout, {
            data: {},
        }),
};

export default loginApi;
