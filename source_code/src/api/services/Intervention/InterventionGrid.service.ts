import { URLS } from '../../../constants';
import apiClient from '../../client';

const InterventionGrids = {
    getInterventionGrid: ({
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
        apiClient.post(URLS.InterventionGrid, {
            data: {
                heading,
                roleId,
                type:
                    type === 'mine '
                        ? 'mine'
                        : type === 'all '
                          ? 'all'
                          : type === 'discharged '
                            ? 'discharged'
                            : '',
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
                    fieldName:
                        type === 'discharged '
                            ? 'modifiedDate'
                            : name || 'createdDate',
                },
            },
        }),
};

export default InterventionGrids;
