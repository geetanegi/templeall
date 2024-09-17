import { URLS } from '../../constants';
import apiClient from '../client';

const checkDuplicateTemplateAPI = {
    checkDuplicateTemplate: ({
        templateName,
        templateId,
    }: {
        templateName: any;
        templateId: any;
    }) =>
        apiClient.post(URLS.checkDuplicateTemplate, {
            data: {
                templateName,
                templateId,
            },
        }),
};

export default checkDuplicateTemplateAPI;
