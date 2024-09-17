import { URLS } from '../../../constants';
import apiClient from '../../client';

const resetPasswordLinkApi = {
    resetLink: ({ resetEmail }: { resetEmail: string }) =>
        apiClient.post(URLS.resetLink, {
            data: {
                resetEmail,
            },
        }),
};

export default resetPasswordLinkApi;
