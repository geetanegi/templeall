import { URLS } from '../../../constants';
import apiClient from '../../client';

const insurancePlanApi = {
    insurancePlan: () => apiClient.post(URLS.insurancePlan, {}),
};

export default insurancePlanApi;
