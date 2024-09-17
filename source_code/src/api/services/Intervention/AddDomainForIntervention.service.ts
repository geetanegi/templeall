import { URLS } from '../../../constants';
import apiClient from '../../client';

const AddDomainIntervention = {
    saveDomainApi: ({
        interventionPlanId,
        name,
    }: {
        interventionPlanId: any;
        name: any;
    }) =>
        apiClient.post(URLS.addDomainForIntervention, {
            data: {
                interventionPlanId,
                name,
            },
        }),
};

export default AddDomainIntervention;
