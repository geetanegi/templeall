import { URLS } from '../../../constants';
import apiClient from '../../client';

const RenameEntitiesInterventionApi = {
    RenameEntitiesIntervention: ({
        type,
        id,
        name,
        interventionPlanDomainId,
        interventionPlanLongTermGoalId,
        interventionPlanId,
    }: {
        type:
            | 'INTERVENTION'
            | 'DOMAIN'
            | 'LONG_TERM_GOAL'
            | 'SHORT_TERM_GOAL'
            | 'GOAL_LIBRARY';
        id: number;
        name: string;
        interventionPlanId: number | undefined;
        interventionPlanDomainId: number | undefined;
        interventionPlanLongTermGoalId: number | undefined;
    }) =>
        apiClient.post(URLS.renameEntitiesUrl, {
            data: {
                type,
                id,
                name,
                interventionPlanDomainId,
                interventionPlanLongTermGoalId,
                interventionPlanId,
            },
        }),
};

export default RenameEntitiesInterventionApi;
