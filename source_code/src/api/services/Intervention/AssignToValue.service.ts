import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAssignToApi = {
    getAssignToValue: ({ type }: { type: any }) =>
        apiClient.post(URLS.getClientAssignToIntervention, {
            data: {
                type,
            },
        }),
};

export default getAssignToApi;
