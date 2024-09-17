import { URLS } from '../../../constants';
import apiClient from '../../client';

const getMasteryCriteriaTemplateByIdAPI = {
    getMasteryCriteriaTemplateById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getMasteryCriteriaTemplateById, {
            data: {
                id,
            },
        }),
};

export default getMasteryCriteriaTemplateByIdAPI;
