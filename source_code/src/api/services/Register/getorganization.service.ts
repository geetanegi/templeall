import { URLS } from '../../../constants';
import apiClient from '../../client';

const getOrganizationViaIntakeApi = {
    getOrganizationViaIntake: ({ uniqueId }: { uniqueId: string }) =>
        apiClient.post(URLS.getOrganizationViaIntake, {
            data: {
                uniqueId,
            },
        }),
};

export default getOrganizationViaIntakeApi;
