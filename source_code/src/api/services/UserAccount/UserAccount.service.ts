import { URLS } from '../../../constants';
import apiClient from '../../client';

const UserAccountApi = {
    UserAccount: ({ id }: { id: string | undefined }) =>
        apiClient.post(URLS.userAccount, {
            data: { id },
        }),
};

export default UserAccountApi;
