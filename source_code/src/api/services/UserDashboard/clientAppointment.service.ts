import { URLS } from '../../../constants';
import apiClient from '../../client';

const clientAppointmentsApi = {
    clientAppointment: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.clientAppointments, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default clientAppointmentsApi;
