import { URLS } from '../../../constants';
import apiClient from '../../client';

const customRateApi = {
    saveCustomRate: ({
        id,
        client,
        clientRate,
        employee,
        employeeRate,
        authorizationCodeId,
    }: {
        id: string;
        client: string;
        clientRate: string;
        employee: string;
        employeeRate: string;
        authorizationCodeId: string;
    }) =>
        apiClient.post(URLS.saveCustomRate, {
            data: {
                id,
                client,
                clientRate,
                employee,
                employeeRate,
                authorizationCodeId,
            },
        }),
};

export default customRateApi;
