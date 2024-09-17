import { URLS } from '../../../constants';
import apiClient from '../../client';

const FeeScheduleApi = {
    getFeeSchedule: () => apiClient.post(URLS.feeSchedule, {}),
};

export default FeeScheduleApi;
