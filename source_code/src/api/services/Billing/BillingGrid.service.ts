import { URLS } from '../../../constants';
import apiClient from '../../client';

const BillingGrids = {
    getBillingGrid: ({
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
        filterValue: any;
    }) =>
        apiClient.post(URLS.billingRateGrid, {
            data: {
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filterType: typeof filterValue === 'string' ? '' : 'dateFilter',
                filter:
                    typeof filterValue === 'string'
                        ? [
                              {
                                  filterKey: 'name',
                                  filterValue: filterValue || '',
                              },
                          ]
                        : filterValue,
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    deleteBillingGrid: ({ billingId }: { billingId: any }) =>
        apiClient.post(URLS.deleteBillingGrid, {
            data: {
                billingId,
            },
        }),
};

export default BillingGrids;
