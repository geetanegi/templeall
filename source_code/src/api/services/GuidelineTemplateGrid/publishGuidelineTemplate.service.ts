import { URLS } from '../../../constants';
import apiClient from '../../client';

const publishGuidelineTemplateAPI = {
    publishGuidelineTemplate: ({ templateId }: { templateId: any }) => {
        return apiClient.post(URLS.publishGuidelineTemplate, {
            data: {
                templateId,
            },
        });
    },
};

export default publishGuidelineTemplateAPI;
