import { URLS } from '../../../constants';
import apiClient from '../../client';
const getMultipleUsersOrganizationInfoAPI = {
    getMultipleUsersOrganizationInfo: ({
        userId,
        username,
        userLoginId,
        orgId,
    }: {
        userId: any;
        username: any;
        userLoginId: any;
        orgId: any;
    }) =>
        apiClient.post(URLS.getMultipleUsersOrganizationInfo, {
            data: {
                userId,
                username,
                userLoginId,
                orgId,
            },
        }),
};
export default getMultipleUsersOrganizationInfoAPI;
