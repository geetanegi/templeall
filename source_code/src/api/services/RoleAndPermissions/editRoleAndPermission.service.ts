import { URLS } from '../../../constants';
import apiClient from '../../client';

const EditRoleApi = {
    EditRole: ({ roleId }: { roleId: any }) =>
        apiClient.post(URLS.editRole, {
            data: {
                roleId,
            },
        }),
};

export default EditRoleApi;
