import { URLS } from '../../constants';
import apiClient from '../client';

const saveLongTermGoal = {
    createGoal: ({
        interventionPlanDomainId,
        name,
        description,
    }: {
        interventionPlanDomainId: any;
        description: any;
        name: any;
    }) =>
        apiClient.post(URLS.saveLongTermGoal, {
            data: {
                interventionPlanDomainId,
                name,
                description,
            },
        }),
};

export default saveLongTermGoal;
