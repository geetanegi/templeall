import { URLS } from '../../../constants';
import apiClient from '../../client';

const AssigneeInterventionApi = {
    AssigneeIntervention: ({
        assignedTo,
        interventionPlanId,
    }: {
        interventionPlanId: any;
        assignedTo: any;
    }) =>
        apiClient
            .post(URLS.changeAssigneeIntervention, {
                data: {
                    interventionPlanId,
                    assignedTo,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default AssigneeInterventionApi;
