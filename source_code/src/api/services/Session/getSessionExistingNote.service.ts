import { URLS } from '../../../constants';
import apiClient from '../../client';

const getSessionExistingNote = {
    getSessionExistingNoteApi: ({
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
        appointmentWith,
    }: {
        heading: string;
        roleId: string;
        appointmentId?: number;
        authorizationCode?: number;
        type: string;
        assignedTo: string;
        pagination: {
            startIndex: number;
            noOfRecords: number;
        };
        name: string;
        order: string;
        filterValue: string;
        appointmentWith: string;
        publishStatus: string;
    }) =>
        apiClient.post(URLS.sessionExistingNote, {
            data: {
                heading,
                roleId,
                appointmentId,
                authorizationCode,
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
                appointmentWith,
                publishStatus: 'Published',
            },
        }),
};

export default getSessionExistingNote;
