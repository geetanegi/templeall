import { URLS } from '../../../constants';
import apiClient from '../../client';

const dischargeReason = {
    dischargeProgramBook: ({ data }: { data: any }) =>
        apiClient.post(URLS.dischargeProgramBook, {
            data,
        }),
    dischargeIntervention: ({ data }: { data: any }) =>
        apiClient.post(URLS.dischargeIntervention, {
            data,
        }),
};

export default dischargeReason;
