import { URLS } from '../../../constants';
import apiClient from '../../client';

const guidelineTemplateGridApi = {
    getGuidelineTemplateGridData: ({
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
        apiClient.post(URLS.templateGridApiUrl, {
            data: {
                heading,
                roleId,
                type,
                pagination,
                filter: [
                    {
                        filterKey: 'name',
                        filterValue: filterValue || '',
                    },
                ],
                assignedTo,
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
};

export default guidelineTemplateGridApi;
