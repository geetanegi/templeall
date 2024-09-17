import { URLS } from '../../../constants';
import apiClient from '../../client';
const getTechnicianAvailabilityAPI = {
    getTechnicianAvailability: ({
        technicianIds,
        from,
        to,
    }: {
        technicianIds: any;
        from: any;
        to: any;
    }) =>
        apiClient.post(URLS.getTechnicianAvailability, {
            data: {
                technicianIds,
                from,
                to,
            },
        }),
};
export default getTechnicianAvailabilityAPI;
