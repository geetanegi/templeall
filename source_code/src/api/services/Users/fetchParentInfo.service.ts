import { URLS } from '../../../constants';
import apiClient from '../../client';

const parentInfoApi = {
    getParentInfo: ({ parentId }: { parentId: number }) =>
        apiClient.post(URLS.parentInfo, {
            data: {
                parentId,
            },
        }),
};

export default parentInfoApi;
