import { URLS } from '../../../constants';
import apiClient from '../../client';

const copySessionNoteAPI = {
    copySessionNote: ({
        templateId,
        name,
    }: {
        templateId: any;
        name: string;
    }) => {
        return apiClient.post(URLS.copySessionNoteTemplate, {
            data: {
                templateId,
                name,
            },
        });
    },
};

export default copySessionNoteAPI;
