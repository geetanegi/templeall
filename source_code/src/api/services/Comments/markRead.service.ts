import { URLS } from '../../../constants';
import apiClient from '../../client';

const markReadAPI = {
    markRead: ({ commentsId, targetId }: { commentsId: any; targetId: any }) =>
        apiClient.post(URLS.markRead, {
            data: {
                commentsId,
                targetId,
            },
        }),
};

export default markReadAPI;
