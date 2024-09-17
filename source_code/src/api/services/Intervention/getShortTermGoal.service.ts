import { URLS } from '../../../constants';
import apiClient from '../../client';

const ShortTermGoalByIdApi = {
    getShortTermGoalById: ({
        interventionPlanShortTermGoalId,
    }: {
        interventionPlanShortTermGoalId: any;
    }) =>
        apiClient.post(URLS.getShortTermGoalById, {
            data: {
                interventionPlanShortTermGoalId,
            },
        }),
};

export default ShortTermGoalByIdApi;
