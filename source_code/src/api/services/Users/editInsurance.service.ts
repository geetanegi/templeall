import { URLS } from '../../../constants';
import apiClient from '../../client';

const editInsuranceApi = {
    getInsuranceById: ({ id }: { id: number }) =>
        apiClient.post(URLS.editInsurance, {
            data: {
                id,
            },
        }),
};

export default editInsuranceApi;
