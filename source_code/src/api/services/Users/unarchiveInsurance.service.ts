import { URLS } from '../../../constants';
import apiClient from '../../client';

const unarchiveInsuranceApi = {
    unarchiveInsurance: ({ id }: { id: any }) =>
        apiClient.post(URLS.unarchiveInsurance, {
            data: {
                id,
            },
        }),
};

export default unarchiveInsuranceApi;
