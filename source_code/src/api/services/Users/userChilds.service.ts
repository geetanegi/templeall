import { URLS } from '../../../constants';
import apiClient from '../../client';

const UserChildByUserIdApi = {
    getUserChild: ({ parentUserId }: { parentUserId: number }) =>
        apiClient.post(URLS.userChild, {
            data: {
                parentUserId,
            },
        }),
};

export default UserChildByUserIdApi;
