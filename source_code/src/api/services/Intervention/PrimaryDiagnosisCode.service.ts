import { URLS } from '../../../constants';
import apiClient from '../../client';

export const PrimaryDiagnosisCodeApi = {
    PrimaryDiagnosisCodes: ({ clientId }: { clientId: any }) =>
        apiClient.post(URLS.PrimaryDiagnosisCode, {
            data: {
                clientId,
            },
        }),
};
