import { URLS } from '../../../constants';
import apiClient from '../../client';

const copyGuidlineTemplateAPI = {
    copyGuidelineTemplate: ({
        templateId,
        name,
    }: {
        templateId: any;
        name: any;
    }) => {
        return apiClient.post(URLS.copyGuidelineTemplate, {
            data: {
                templateId,
                name,
            },
        });
    },
};

export default copyGuidlineTemplateAPI;
