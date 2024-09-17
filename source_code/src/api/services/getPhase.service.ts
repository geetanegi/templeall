import { URLS } from '../../constants';
import apiClient from '../client';

const getPhase = {
    getStatusData: (data: any) =>
        apiClient.post(URLS.getPhase, {
            data,
        }),
};

export default getPhase;
