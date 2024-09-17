import { URLS } from '../../../constants';
import apiClient from '../../client';

const ClaimInboxGridApi = {
    inboxGrid: ({
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
        filterValue: string | null | undefined;
    }) =>
        apiClient.post(URLS.inboxGridApi, {
            data: {
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filterType: filterValue === '' ? '' : 'dateFilter',
                filter:
                    filterValue === ''
                        ? [
                              {
                                  filterKey: 'name',
                                  filterValue: filterValue || '',
                              },
                          ]
                        : filterValue,
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdOn',
                },
            },
        }),

    deletedClaim: ({
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
        apiClient.post(URLS.deletedClaimGrid, {
            data: {
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filterType: filterValue === '' ? '' : 'dateFilter',
                filter:
                    filterValue === ''
                        ? [
                              {
                                  filterKey: 'name',
                                  filterValue: filterValue || '',
                              },
                          ]
                        : filterValue,
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'deletedOn',
                },
            },
        }),
};

export default ClaimInboxGridApi;
