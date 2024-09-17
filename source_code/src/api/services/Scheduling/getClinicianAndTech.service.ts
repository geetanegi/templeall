import { URLS } from '../../../constants';
import apiClient from '../../client';

const getClinicianAndTechAPI = {
    getClinicianAndTech: ({ id }: { id: any }) =>
        apiClient.post(URLS.getClinicianAndTech, {
            data: {
                id,
            },
        }),
};

export default getClinicianAndTechAPI;
