import { URLS } from '../../../constants';
import apiClient from '../../client';
const verifyOTPAPI = {
    verifyOTP: ({
        userId,
        username,
        otp,
        organizationId,
        isRestPassword,
        userLoginId,
    }: {
        userId: any;
        username: any;
        otp: any;
        organizationId: any;
        isRestPassword: any;
        userLoginId: any;
    }) =>
        apiClient.post(URLS.verifyOTP, {
            data: {
                userId,
                username,
                otp,
                organizationId,
                isRestPassword,
                userLoginId,
            },
        }),
};
export default verifyOTPAPI;
