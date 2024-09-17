import { URLS } from '../../../constants';
import apiClient from '../../client';

const deleteSessionNoteAPI = {
    deleteSessionNote: ({ templateId }: { templateId: any }) => {
        return apiClient.post(URLS.deleteSessionNoteTemplate, {
            data: {
                templateId,
            },
        });
    },
};

export default deleteSessionNoteAPI;
