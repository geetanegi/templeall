import { URLS } from '../../../constants';
import apiClient from '../../client';

const OrganizationsByIdApi = {
    SaveOrganizationDataById: (organizationId: any) =>
        apiClient
            .post(URLS.getOrganizationsById, {
                data: {
                    id: organizationId,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default OrganizationsByIdApi;
