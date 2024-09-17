import { URLS } from '../../../constants';
import apiClient from '../../client';
const sendOTPAPI = {
    sendOTP: ({
        username,
        organizationId,
        password,
    }: {
        username: any;
        organizationId: any;
        password: any;
    }) =>
        apiClient.post(URLS.sendOTP, {
            data: {
                username,
                organizationId,
                password,
            },
        }),
};
export default sendOTPAPI;
