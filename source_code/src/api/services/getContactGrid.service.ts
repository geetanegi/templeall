import { URLS } from '../../constants';
import apiClient from '../client';

const getContactGridApi = {
    getContactDetails: ({
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
    }: {
        heading: string;
        roleId: string;
        type: string;
        assignedTo: string;
        pagination: any;
        order: any;
        name: any;
        filterValue: any;
    }) =>
        apiClient.post(URLS.getContactGrid, {
            data: {
                heading,
                roleId,
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
    getHistoryById: ({
        id,
        organizationSpecificId,
    }: {
        id: string;
        organizationSpecificId: string;
    }) =>
        apiClient.post(URLS.getHistoryById, {
            data: {
                id,
                organizationSpecificId,
            },
        }),
};
export default getContactGridApi;
