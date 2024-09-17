import { URLS } from '../../../constants';
import apiClient from '../../client';

const DeleteRoleApi = {
    deleteRole: ({ roleId }: { roleId: any }) =>
        apiClient.post(URLS.deleteRole, {
            data: {
                roleId,
            },
        }),
};

export default DeleteRoleApi;
