import { URLS } from '../../../constants';
import apiClient from '../../client';
interface Values {
    uniqueId: string;
    username: string;
    organizationId: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string | null;
    gender: string;
    cellPhone: string;
    dateOfBirth: string;
    policy: boolean;
}
const registerClientApi = {
    saveRegisterClient: ({ data }: { data: Values }) =>
        apiClient.post(URLS.registerUser, {
            data,
        }),
};

export default registerClientApi;
