import { URLS } from '../../../constants';
import apiClient from '../../client';

const currentGoalApi = {
    currentGoal: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.currentGoal, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default currentGoalApi;
