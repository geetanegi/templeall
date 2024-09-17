import { URLS } from '../../../constants';
import apiClient from '../../client';

const ServiceTypeByIntervention = {
    serviceType: () => apiClient.post(URLS.serviceTypeByIntervention, {}),
};

export default ServiceTypeByIntervention;
