import { URLS } from '../../../constants';
import apiClient from '../../client';

const deleteCommentAPI = {
    deleteComments: ({
        commentsId,
        targetId,
    }: {
        commentsId: any;
        targetId: any;
    }) =>
        apiClient.post(URLS.deleteComment, {
            data: {
                commentsId,
                targetId,
            },
        }),
};

export default deleteCommentAPI;
