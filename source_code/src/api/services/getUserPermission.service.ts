import { URLS } from '../../constants';
import apiClient from '../client';

const getUserPermissions = {
    userPermission: (
        profileUserId: any = undefined,
        profileOrgId: any = undefined
    ) =>
        apiClient.post(URLS.getUserPermission, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default getUserPermissions;
