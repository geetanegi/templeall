import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllUserAndGroupNamesAPI = {
    getAllUserAndGroupNames: ({ organizationId }: { organizationId: any }) =>
        apiClient.post(URLS.getAllUserAndGroupNames, {
            data: {
                organizationId,
            },
        }),
};

export default getAllUserAndGroupNamesAPI;
