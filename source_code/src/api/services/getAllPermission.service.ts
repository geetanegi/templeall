import { URLS } from '../../constants';
import apiClient from '../client';

const getAllPermissionApi = {
    getAllPermission: () => apiClient.post(URLS.getAllPermission, {}),
    getPrimaryRolePermission: ({ primaryRoleId }: { primaryRoleId: string }) =>
        apiClient.post(URLS.primaryRolePermission, { data: { primaryRoleId } }),
};

export default getAllPermissionApi;
