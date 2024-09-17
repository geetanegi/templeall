import { URLS } from '../../../constants';
import apiClient from '../../client';

const QuestionBankManagementApi = {
    QuestionBankManagementGrid: ({
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
        apiClient.post(URLS.questionBankManagementGridApi, {
            data: {
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filter: [
                    {
                        filterKey: 'questionStatement',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    deleteQuestionBankManagement: ({
        questionBankManagementId,
    }: {
        questionBankManagementId: any;
    }) =>
        apiClient.post(URLS.questionaBankManagementDelete, {
            data: {
                questionBankManagementId,
            },
        }),
    questionBankManagementById: (id: number) =>
        apiClient.post(URLS.questionById, {
            data: {
                questionBankManagementId: id,
            },
        }),
    questionType: () =>
        apiClient.post(URLS.questionType, {
            data: {},
        }),
    answerType: () =>
        apiClient.post(URLS.answerType, {
            data: {},
        }),
    // Update this type definition to include options if needed
    saveQuestionBankManagement: ({ data }: { data: any; options?: any }) =>
        apiClient.post(URLS.saveQuestion, {
            data,
        }),
};

export default QuestionBankManagementApi;
