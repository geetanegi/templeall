import { URLS } from '../../../constants';
import apiClient from '../../client';

const unpublishGuidelineTemplateAPI = {
    unpublishGuidelineTemplate: ({ templateId }: { templateId: any }) => {
        return apiClient.post(URLS.unpublishGuidelineTemplate, {
            data: {
                templateId,
            },
        });
    },
};

export default unpublishGuidelineTemplateAPI;
