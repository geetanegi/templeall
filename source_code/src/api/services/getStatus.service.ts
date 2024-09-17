import { URLS } from '../../constants';
import apiClient from '../client';

const getStatus = {
    getStatusData: (data: any) =>
        apiClient.post(URLS.getStatus, {
            data,
        }),
};

export default getStatus;
