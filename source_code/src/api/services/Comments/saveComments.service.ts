import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveCommentsAPI = {
    saveComments: ({
        commentsId,
        createdBy,
        modifiedBy,
        name,
        comments,
        targetId,
        sessionRunId,
    }: {
        commentsId: any;
        createdBy: any;
        modifiedBy: any;
        name: any;
        comments: any;
        targetId: any;
        sessionRunId: any;
    }) =>
        apiClient.post(URLS.saveComment, {
            data: {
                commentsId,
                createdBy,
                modifiedBy,
                name,
                comments,
                targetId,
                sessionRunId,
            },
        }),
};

export default saveCommentsAPI;
