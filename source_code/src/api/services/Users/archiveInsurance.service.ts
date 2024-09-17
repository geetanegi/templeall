import { URLS } from '../../../constants';
import apiClient from '../../client';

const archiveInsuranceApi = {
    archiveInsurance: ({ id }: { id: any }) =>
        apiClient.post(URLS.archiveInsurance, {
            data: {
                id,
            },
        }),
};

export default archiveInsuranceApi;
