import { URLS } from '../../../constants';
import apiClient from '../../client';

const deleteGuidelineTemplateAPI = {
    deleteGuidelineTemplate: ({ templateId }: { templateId: any }) => {
        return apiClient.post(URLS.deleteGuidelineTemplate, {
            data: {
                templateId,
            },
        });
    },
};

export default deleteGuidelineTemplateAPI;
