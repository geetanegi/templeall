import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveShortTermsGoalsTree = {
    saveGoals: ({ shortTermGoalIds }: { shortTermGoalIds: any }) =>
        apiClient.post(URLS.saveAddShortTermGoalTree, {
            data: {
                shortTermGoalIds,
            },
        }),
};
export const saveLongTermsGoalsTree = {
    saveGoals: ({ longTermGoalIds }: { longTermGoalIds: any }) =>
        apiClient.post(URLS.saveAddLongTermGoalTree, {
            data: {
                longTermGoalIds,
            },
        }),
};

export default saveShortTermsGoalsTree;
