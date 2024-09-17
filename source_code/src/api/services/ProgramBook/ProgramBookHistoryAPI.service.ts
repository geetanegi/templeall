import { URLS } from '../../../constants';
import apiClient from '../../client';

const ProgramBookHistoryAPI = {
    getProgramBookDataHistoryGrid: ({
        id,
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
    }: {
        id?: any;
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
        apiClient.post(URLS.programBookHistoryUrl, {
            data: {
                programBookUUID: id,
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
                    fieldName: name || 'executedOn',
                },
            },
        }),
};
export default ProgramBookHistoryAPI;
