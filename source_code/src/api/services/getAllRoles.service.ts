import { URLS } from '../../constants';
import apiClient from '../client';

const getAllRolesApi = {
    getAllRoles: ({
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
        isNotPaginated,
    }: {
        heading: string;
        roleId?: string;
        type: string;
        assignedTo: string;
        pagination: any;
        order: any;
        name: any;
        filterValue: any;
        isNotPaginated?: any;
    }) =>
        apiClient.post(URLS.getAllRoles, {
            data: {
                heading,
                roleId,
                isNotPaginated,
                type,
                pagination,
                filter: [
                    {
                        filterKey: 'name',
                        filterValue: filterValue || '',
                    },
                ],
                assignedTo,
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    getSecondaryRoles: ({ roleId }: { roleId: string }) =>
        apiClient.post(URLS.allSecondaryRoles, {
            data: { roleId },
        }),
};

export default getAllRolesApi;
