import { URLS } from '../../../constants';
import apiClient from '../../client';

const diagnosisCode = {
    getPrimaryDiagnosisCode: () =>
        apiClient.post(URLS.primaryDiagnosisCode, {}),
};

export default diagnosisCode;
