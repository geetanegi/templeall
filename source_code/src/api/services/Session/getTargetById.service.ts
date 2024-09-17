import { URLS } from '../../../constants';
import apiClient from '../../client';

const getTargetById = {
    getTarget: ({ targetId }: { targetId: any }) =>
        apiClient.post(URLS.getTargetById, {
            data: {
                targetId,
            },
        }),
};

export default getTargetById;
