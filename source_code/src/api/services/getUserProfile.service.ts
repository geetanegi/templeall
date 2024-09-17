import { URLS } from '../../constants';
import apiClient from '../client';

const GetUserProfile = {
    userProfileData: (
        profileUserId: any = undefined,
        profileOrgId: any = undefined
    ) =>
        apiClient.post(URLS.userProfileData, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default GetUserProfile;
