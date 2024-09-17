import { URLS } from '../../../constants';
import apiClient from '../../client';
const saveTechnicianAvailabilityAPI = {
    saveTechnicianAvailability: ({
        fromDate,
        toDate,
        technicianData,
    }: {
        fromDate: any;
        toDate: any;
        technicianData: any;
    }) =>
        apiClient.post(URLS.saveTechnicianAvailability, {
            data: {
                fromDate,
                toDate,
                technicianData,
            },
        }),
};
export default saveTechnicianAvailabilityAPI;
