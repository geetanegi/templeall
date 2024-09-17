import { URLS } from '../../../constants';
import apiClient from '../../client';

const dictionaryOfSessionNote = {
    getAllWords: ({
        id,
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
        serviceProviderId,
    }: {
        id?: string | undefined;
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
        serviceProviderId?: string;
    }) =>
        apiClient.post(URLS.getAllWords, {
            data: {
                id,
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filter: [
                    {
                        filterKey: 'word',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
                serviceProviderId: serviceProviderId,
            },
        }),
    saveAndEditWords: ({
        dictionaryId,
        word,
        meaning,
    }: {
        dictionaryId: string;
        word: string;
        meaning: string;
    }) =>
        apiClient.post(URLS.saveAndEditWords, {
            data: {
                dictionaryId,
                word,
                meaning,
            },
        }),
    deleteWords: ({ dictionaryId }: { dictionaryId: string }) =>
        apiClient.post(URLS.deleteWords, {
            data: {
                dictionaryId,
            },
        }),
};

export default dictionaryOfSessionNote;
