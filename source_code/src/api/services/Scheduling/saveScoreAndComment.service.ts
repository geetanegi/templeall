import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveScoreAndComment = {
    saveScore: ({ data }: { data: any }) =>
        apiClient.post(URLS.saveScore, {
            data: {
                list: data,
            },
        }),
    getScore: ({ shortTermGoalId }: { shortTermGoalId: string }) =>
        apiClient.post(URLS.getScore, {
            data: {
                shortTermGoalId,
            },
        }),
};

export default saveScoreAndComment;
