import { URLS } from '../../../constants';
import apiClient from '../../client';

const unpublishSessionNoteAPI = {
    unpublishSessionNote: ({ templateId }: { templateId: any }) => {
        return apiClient.post(URLS.unpublishSessionNote, {
            data: {
                templateId,
            },
        });
    },
};

export default unpublishSessionNoteAPI;
