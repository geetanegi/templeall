import { URLS } from '../../../constants';
import apiClient from '../../client';

const AddInterventionApi = {
    SaveIntervention: ({
        clientName,
        interventionPlanName,
        therapyType,
        assignedTo,
    }: {
        clientName: any;
        interventionPlanName: any;
        therapyType: any;
        assignedTo: any;
    }) =>
        apiClient
            .post(URLS.InterventionCreate, {
                data: {
                    id: '',
                    userChildId: parseInt(clientName),
                    name: interventionPlanName,
                    therapyType: therapyType,
                    assignedTo: parseInt(assignedTo),
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default AddInterventionApi;
