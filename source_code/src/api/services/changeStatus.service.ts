import { URLS } from '../../constants';
import apiClient from '../client';

const changeStatus = {
    changeStatus: ({ id, status, type }: { id: any; status: any; type: any }) =>
        apiClient.post(URLS.statusChange, {
            data: {
                id,
                type,
                status,
            },
        }),
};

export default changeStatus;
