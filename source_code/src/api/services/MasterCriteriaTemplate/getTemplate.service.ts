import { URLS } from '../../../constants';
import apiClient from '../../client';

const getTemplateAPI = {
    getTemplate: ({ id }: { id: any }) =>
        apiClient.post(URLS.getTemplate, {
            data: {
                id,
            },
        }),
};

export default getTemplateAPI;
