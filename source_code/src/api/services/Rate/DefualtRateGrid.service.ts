import { URLS } from '../../../constants';
import apiClient from '../../client';

const DefaultRateGridApi = {
    getDefaultGridApi: ({
        authorizationCodeId,
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
    }: {
        authorizationCodeId?: any;
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
        apiClient.post(URLS.defaultRateGrid, {
            data: {
                authorizationCodeId: authorizationCodeId || '1',
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filter: [
                    {
                        filterKey: 'feeSchedule.name',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
};

export default DefaultRateGridApi;
