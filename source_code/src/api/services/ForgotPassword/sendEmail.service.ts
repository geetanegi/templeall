import { URLS } from '../../../constants';
import apiClient from '../../client';

const forgotPassWord = {
    SendEmail: ({ username }: { username: any }) =>
        apiClient.post(URLS.sendEmailForForgotPassword, {
            data: {
                username,
            },
        }),
    SavePassword: ({ newPassword }: { newPassword: any }) =>
        apiClient.post(URLS.savePassword, {
            data: {
                newPassword,
            },
        }),
};

export default forgotPassWord;
