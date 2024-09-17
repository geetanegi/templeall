import { URLS } from '../../../constants';
import apiClient from '../../client';

export const getNotInProgressShortGoals = {
    getShortTermGoal: ({ longTermGoalId }: { longTermGoalId: string }) =>
        apiClient.post(URLS.getNotInprogressGoals, {
            data: {
                longTermGoalId,
            },
        }),
};
