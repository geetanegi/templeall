import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveCriteriaTemplateAPI = {
    saveCriteriaTemplate: ({
        templateId,
        type,
        isSystemGenerated,
        name,
        description,
        createdBy,
        modifiedBy,
    }: {
        templateId: any;
        type: any;
        isSystemGenerated: any;
        name: any;
        description: any;
        createdBy: any;
        modifiedBy: any;
    }) =>
        apiClient.post(URLS.saveCriteriaTemplate, {
            data: {
                templateId,
                type,
                isSystemGenerated,
                name,
                description,
                createdBy,
                modifiedBy,
            },
        }),
};
export default saveCriteriaTemplateAPI;
