import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllCommentAPI = {
    getAllComments: ({ targetId }: { targetId: any }) =>
        apiClient.post(URLS.getComments, {
            data: {
                targetId,
            },
        }),
};

export default getAllCommentAPI;
