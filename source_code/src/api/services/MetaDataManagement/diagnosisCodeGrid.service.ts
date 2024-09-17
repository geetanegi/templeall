import { URLS } from '../../../constants';
import apiClient from '../../client';

const diagnosisCodeGridApi = {
    diagnosisCodeGrid: ({
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
        apiClient.post(URLS.diagnosisCodeGrid, {
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
    changeDiagnosisCodeStatusApi: ({
        diagnosisCodeId,
        status,
    }: {
        diagnosisCodeId: string;
        status: boolean;
    }) =>
        apiClient.post(URLS.changeDiagnosisCodeStatus, {
            data: {
                diagnosisCodeId,
                status,
            },
        }),
};

export default diagnosisCodeGridApi;
