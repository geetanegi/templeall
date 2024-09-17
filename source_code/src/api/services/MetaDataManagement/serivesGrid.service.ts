import { URLS } from '../../../constants';
import apiClient from '../../client';

const servicesGridApi = {
    servicesGrid: ({
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
        apiClient.post(URLS.servicesGrid, {
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
                    fieldName: name || 'name',
                },
            },
        }),
    changeServiceStatusApi: ({ id, isActive }: { id: any; isActive: any }) =>
        apiClient.post(URLS.changeServiceStatus, {
            data: {
                id,
                isActive,
            },
        }),
    emailGrid: ({
        pagination,
        filterValue,
        order,
        name,
    }: {
        pagination: {
            startIndex: number;
            noOfRecords: number;
        };
        name: string;
        order: string;
        filterValue: string;
    }) =>
        apiClient.post(URLS.emailFormatGrid, {
            data: {
                pagination,
                filter: [
                    {
                        filterKey: 'event',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'event',
                },
            },
        }),
    getEmailByIdApi: ({ id }: { id: any }) =>
        apiClient.post(URLS.getEmailById, {
            data: {
                id,
            },
        }),
    saveEmail: ({
        subject,
        emailBody,
        emailBodyEditor,
        event,
        id,
    }: {
        subject: any;
        emailBody: any;
        emailBodyEditor: any;
        event: any;
        id: any;
    }) =>
        apiClient.post(URLS.saveEmail, {
            data: {
                subject,
                emailBody,
                emailBodyEditor,
                event,
                id,
            },
        }),
};

export default servicesGridApi;
