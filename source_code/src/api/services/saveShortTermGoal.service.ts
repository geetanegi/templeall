import { URLS } from '../../constants';
import apiClient from '../client';

const saveShortTermGoal = {
    createGoal: ({
        interventionPlanShortTermGoalId,
        interventionPlanDomainId,
        interventionPlanLongTermGoalId,
        name,
        description,
        isCreatedFromSessionNote,
        attainmentScalingData,
        scoreType,
        goalScore,
    }: {
        interventionPlanShortTermGoalId: any;
        interventionPlanDomainId: any;
        interventionPlanLongTermGoalId: any;
        description: any;
        name: any;
        isCreatedFromSessionNote: any;
        attainmentScalingData: any;
        scoreType: any;
        goalScore: any;
    }) =>
        apiClient.post(URLS.saveShortTermGoal, {
            data: {
                interventionPlanShortTermGoalId,
                interventionPlanDomainId,
                interventionPlanLongTermGoalId,
                name,
                description,
                isCreatedFromSessionNote,
                attainmentScalingData,
                scoreType,
                goalScore,
            },
        }),
};

export default saveShortTermGoal;
