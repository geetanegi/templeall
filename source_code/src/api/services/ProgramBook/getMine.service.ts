import { URLS } from '../../../constants';
import apiClient from '../../client';

const getMineAPI = {
    getMine: ({
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
        appointmentId,
        authorizationCode,
    }: {
        heading: string;
        roleId: string;
        type: string;
        assignedTo: string;
        pagination: any;
        order: any;
        name: any;
        filterValue: any;
        appointmentId?: number;
        authorizationCode?: number;
    }) =>
        apiClient.post(URLS.getMine, {
            data: {
                heading,
                roleId,
                type,
                appointmentId,
                authorizationCode,
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
                    fieldName: name || 'modifiedDate',
                },
            },
        }),
};

export default getMineAPI;
