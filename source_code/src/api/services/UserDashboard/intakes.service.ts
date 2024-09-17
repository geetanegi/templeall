import { URLS } from '../../../constants';
import apiClient from '../../client';

const IntakesApi = {
    Intakes: ({
        profileUserId,
        profileOrgId,
        name,
    }: {
        profileUserId: string;
        profileOrgId: string;
        name: string;
    }) =>
        apiClient.post(URLS.intakes, {
            data: {
                profileUserId,
                profileOrgId,
                name,
            },
        }),
};
export default IntakesApi;
