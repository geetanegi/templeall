import { URLS } from '../../../constants';
import apiClient from '../../client';

const SaveDiagnosisCodeApi = {
    saveDiagnosisCode: ({
        diagnosisCodeId,
        code,
        name,
        description,
        status,
    }: {
        diagnosisCodeId: string;
        name: string;
        code: string;
        description: string;
        status: boolean;
    }) =>
        apiClient.post(URLS.saveDiagnosisCode, {
            data: {
                diagnosisCodeId,
                code,
                name,
                description,
                status,
            },
        }),
    getDiagnosisCodeById: ({ diagnosisCodeId }: { diagnosisCodeId: string }) =>
        apiClient.post(URLS.getDiagnosisCodeById, {
            data: {
                diagnosisCodeId,
            },
        }),
};

export default SaveDiagnosisCodeApi;
