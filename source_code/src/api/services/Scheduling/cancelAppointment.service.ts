import { URLS } from '../../../constants';
import apiClient from '../../client';

const cancelAppointmentAPI = {
    cancelAppointment: ({
        eventId,
        appointmentWith,
        primaryProvider,
        cancellingUser,
        cancellingReason,
    }: {
        eventId: any;
        appointmentWith: any;
        primaryProvider: any;
        cancellingUser: any;
        cancellingReason: any;
    }) =>
        apiClient.post(URLS.cancelAppointment, {
            data: {
                eventId,
                appointmentWith,
                primaryProvider,
                cancellingUser,
                cancellingReason,
            },
        }),
};

export default cancelAppointmentAPI;
