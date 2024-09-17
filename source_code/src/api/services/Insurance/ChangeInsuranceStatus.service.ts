import { URLS } from '../../../constants';
import apiClient from '../../client';

const ChangeInsuranceStatus = {
    ChangeInsuranceStatusApi: ({ id, isActive }: { id: any; isActive: any }) =>
        apiClient
            .post(URLS.insuranceProviderStatus, {
                data: {
                    id,
                    isActive,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default ChangeInsuranceStatus;
