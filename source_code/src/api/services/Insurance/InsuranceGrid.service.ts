import { URLS } from '../../../constants';
import apiClient from '../../client';
const InsuranceGridApi = {
    getInsuranceGridApi: ({
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
        apiClient.post(URLS.insuranceGridUrl, {
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
    addNewInsurance: ({ id, name }: { id: any; name: any }) =>
        apiClient.post(URLS.insuranceAddNew, {
            data: {
                id,
                name,
            },
        }),
};
export default InsuranceGridApi;
