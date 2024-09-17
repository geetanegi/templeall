import { URLS } from '../../constants';
import apiClient from '../client';

const changePasswordApi = {
    changePassword: ({
        username,
        password,
        updatedPassword,
    }: {
        username: string;
        password: string;
        updatedPassword: string;
    }) =>
        apiClient.post(URLS.changePassword, {
            data: {
                username,
                password,
                updatedPassword,
            },
        }),
};

export default changePasswordApi;
