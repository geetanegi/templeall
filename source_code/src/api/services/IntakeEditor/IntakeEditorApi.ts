import { URLS } from '../../../constants';
import apiClient from '../../client';
const IntakeEditorApi = {
    getQuestionsAndTherapy: () =>
        apiClient.post(URLS.getQuestionsAndTherapy, {
            data: {},
        }),
    getSelectedQuestion: ({
        clientIntakeFormId,
    }: {
        clientIntakeFormId: string;
    }) =>
        apiClient.post(URLS.getSelectedQuestion, {
            data: {
                clientIntakeFormId,
            },
        }),
    saveSelectedQuestion: ({ questionsData }: { questionsData: any }) =>
        apiClient.post(URLS.saveSelectedQuestion, {
            data: { questionsData },
        }),
    create: ({
        clientIntakeFormId,
        legalIntroduction,
        dataConfig,
        logo,
        questionsData,
        fullySaved,
    }: {
        clientIntakeFormId: string;
        legalIntroduction: string;
        dataConfig: any;
        logo: string;
        questionsData: any;
        fullySaved: boolean;
    }) =>
        apiClient.post(URLS.createFormBuilder, {
            data: {
                clientIntakeFormId,
                legalIntroduction,
                dataConfig,
                logo,
                questionsData,
                fullySaved,
            },
        }),

    getIntakeData: ({
        type,
        pagination,
        filterValue,
        order,
        name,
    }: {
        type: any;
        pagination: {
            startIndex: number;
            noOfRecords: number;
        };
        filterValue: any;
        order: any;
        name: any;
    }) =>
        apiClient.post(URLS.getClientIntakeForm, {
            data: {
                type,
                pagination,
                filter: [
                    {
                        filterKey: '',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    publish: ({ clientIntakeFormId }: { clientIntakeFormId: string }) => {
        return apiClient.post(URLS.publish, {
            data: {
                clientIntakeFormId,
            },
        });
    },
    unpublish: ({ clientIntakeFormId }: { clientIntakeFormId: string }) => {
        return apiClient.post(URLS.unpublish, {
            data: {
                clientIntakeFormId,
            },
        });
    },
};
export default IntakeEditorApi;
