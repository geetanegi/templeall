import { URLS } from '../../../constants';
import apiClient from '../../client';

const AuthorizedCodeGrid = {
    getAuthorizedGridApi: ({
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
        pagination: {
            startIndex: number;
            noOfRecords: number;
        };
        name: string;
        order: string;
        filterValue: string;
    }) =>
        apiClient.post(URLS.authorizationCodeGrid, {
            data: {
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filter: [
                    {
                        filterKey: 'name',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    changeBillingCodeStatus: ({
        authorizationCodeId,
        status,
    }: {
        authorizationCodeId: any;
        status: any;
    }) =>
        apiClient.post(URLS.changeBillingStatus, {
            data: { authorizationCodeId, status },
        }),
};

export default AuthorizedCodeGrid;
