import { URLS } from '../../../constants';
import apiClient from '../../client';

const EmployeeAppointmentsApi = {
    employeeAppointment: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.employeeAppointment, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default EmployeeAppointmentsApi;
