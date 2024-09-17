import { URLS } from '../../../constants';
import apiClient from '../../client';
const scheduleEventAPI = {
    scheduleEvent: ({
        title,
        startTime,
        duration,
        endTime,
        timezone,
        isRepeat,
        primaryProviderId,
        appointmentWith,
        placeOfService,
        locationAddress,
        createdBy,
        repeatConfiguration,
        additionalParticipants,
        authorizationCodes,
        appointmentWithType,
    }: {
        title: any;
        startTime: any;
        duration: any;
        endTime: any;
        timezone: any;
        isRepeat: any;
        primaryProviderId: any;
        appointmentWith: any;
        placeOfService: any;
        locationAddress: any;
        createdBy: any;
        repeatConfiguration: any;
        additionalParticipants: any;
        authorizationCodes: any;
        appointmentWithType: any;
    }) =>
        apiClient.post(URLS.scheduleEvent, {
            data: {
                title,
                startTime,
                duration,
                endTime,
                timezone,
                isRepeat,
                primaryProviderId,
                appointmentWith,
                placeOfService,
                locationAddress,
                createdBy,
                repeatConfiguration,
                additionalParticipants,
                authorizationCodes,
                appointmentWithType,
            },
        }),
};
export default scheduleEventAPI;
