import { URLS } from '../../../constants';
import apiClient from '../../client';

const SaveSecondaryDiagnosisCodeApi = {
    SaveSecondary: ({
        InterventionPlanId,
        diagnosisCodes,
        clientId,
        therapyType,
    }: {
        InterventionPlanId: any;
        diagnosisCodes: any;
        clientId: any;
        therapyType: any;
    }) =>
        apiClient
            .post(URLS.saveSecondaryDiagnosisCode, {
                data: {
                    interventionPlanId: InterventionPlanId,
                    diagnosisCodes,
                    clientId,
                    therapyType,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default SaveSecondaryDiagnosisCodeApi;
