import { URLS } from '../../../constants';
import apiClient from '../../client';

const CreateRoleApi = {
    CreateRole: ({
        roleId,
        name,
        type,
        description,
        createdBy,
        permissions,
    }: {
        roleId: any;
        name: any;
        type: any;
        description: any;
        createdBy: any;
        permissions: any;
    }) =>
        apiClient.post(URLS.CreateRole, {
            data: {
                roleId,
                name,
                type,
                description,
                createdBy,
                permissions,
            },
        }),
};

export default CreateRoleApi;
