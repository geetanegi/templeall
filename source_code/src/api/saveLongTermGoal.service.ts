import { URLS } from '../constants';
import apiClient from './client';

const saveLongTermGoal = {
    createGoal: ({
        interventionPlanDomainId,
        name,
        description,
        isCreatedFromSessionNote,
    }: {
        interventionPlanDomainId: any;
        description: any;
        name: any;
        isCreatedFromSessionNote: any;
    }) =>
        apiClient.post(URLS.saveLongTermGoal, {
            data: {
                interventionPlanDomainId,
                name,
                description,
                isCreatedFromSessionNote,
            },
        }),
};

export default saveLongTermGoal;
