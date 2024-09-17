import { URLS } from '../../../constants';
import apiClient from '../../client';

export const DiagnosisCodeApi = {
    DiagnosisCodes: ({ interventionId }: { interventionId: any }) =>
        apiClient.post(URLS.diagnosisCodeUrl, {
            data: {
                interventionId,
            },
        }),
};
