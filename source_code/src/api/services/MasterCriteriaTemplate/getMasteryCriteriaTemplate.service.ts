import { URLS } from '../../../constants';
import apiClient from '../../client';

const getMasteryCriteriaTemplateAPI = {
    getMasteryCriteriaTemplate: ({
        templateId,
        dataType,
        isProgram,
        temporaryId,
        addNew,
        isTarget,
        programId,
        targetId,
    }: {
        templateId: any;
        dataType: any;
        isProgram: any;
        temporaryId: any;
        addNew: any;
        isTarget: any;
        programId: any;
        targetId: any;
    }) =>
        apiClient.post(URLS.getMasteryCriteriaTemplate, {
            data: {
                templateId,
                dataType,
                isProgram,
                temporaryId,
                addNew,
                isTarget,
                programId,
                targetId,
            },
        }),
};

export default getMasteryCriteriaTemplateAPI;
