import { URLS } from '../../../constants';
import apiClient from '../../client';

const getInsurancePlanAPI = {
    getInsurancePlan: ({ clientId }: { clientId: any }) =>
        apiClient.post(URLS.getInsurancePlan, {
            data: {
                clientId,
            },
        }),
};

export default getInsurancePlanAPI;
