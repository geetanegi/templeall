import { URLS } from '../../constants';
import apiClient from '../client';

export const LongTermGoalByUserType = {
    LongTermGoals: ({
        interventionPlanDomainId,
    }: {
        interventionPlanDomainId: any;
    }) =>
        apiClient.post(URLS.getLongTermGoalsByUserType, {
            data: {
                interventionPlanDomainId,
            },
        }),
};
