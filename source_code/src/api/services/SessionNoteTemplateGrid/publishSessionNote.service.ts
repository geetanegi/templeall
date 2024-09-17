import { URLS } from '../../../constants';
import apiClient from '../../client';

const publishSessionNoteAPI = {
    publishSessionNote: ({ templateId }: { templateId: any }) => {
        return apiClient.post(URLS.publishSessionNote, {
            data: {
                templateId,
            },
        });
    },
};

export default publishSessionNoteAPI;
