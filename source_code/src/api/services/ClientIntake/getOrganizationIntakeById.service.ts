import { URLS } from '../../../constants';
import apiClient from '../../client';
const getOrganizationIntakeByIdAPI = {
    getOrganizationIntakeById: ({ id }: { id: string | undefined }) =>
        apiClient.post(URLS.getOrganizationIntakeById, {
            data: {
                id,
            },
        }),
};
export default getOrganizationIntakeByIdAPI;
