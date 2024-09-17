import { URLS } from '../../constants';
import apiClient from '../client';

const saveEmployeeApi = {
    saveEmployee: ({
        employeeId,
        firstName,
        lastName,
        primaryRoleId,
        secondaryRoleId,
        imageData,
        cellPhone,
        workCity,
        workState,
        workPostalCode,
        personalCity,
        personalState,
        personalPostalCode,
        dateOfBirth,
        workPhone,
        homePhone,
        username,
        primaryAddress1,
        primaryAddress2,
        mailingAddress1,
        mailingAddress2,
        gender,
        organizationServiceId,
        userChildren,
        npiNumber,
        credentials,
        availabilityFrom,
        availabilityTo,
    }: {
        employeeId: any;
        firstName: string;
        lastName: string;
        primaryRoleId: string;
        secondaryRoleId: any;
        imageData: string;
        cellPhone: string;
        workCity: string;
        workState: string;
        workPostalCode: string;
        personalCity: string;
        personalState: string;
        personalPostalCode: string;
        dateOfBirth: any;
        workPhone: string;
        homePhone: string;
        username: string;
        primaryAddress1: string;
        primaryAddress2: string;
        mailingAddress1: string;
        mailingAddress2: string;
        gender: string;
        organizationServiceId: string;
        userChildren: any;
        npiNumber: number;
        credentials: string;
        availabilityFrom: string;
        availabilityTo: string;
    }) =>
        apiClient.post(URLS.saveEmployee, {
            data: {
                employeeId,
                firstName,
                lastName,
                primaryRoleId,
                secondaryRoleId,
                imageData,
                cellPhone,
                workCity,
                workState,
                workPostalCode,
                personalCity,
                personalState,
                personalPostalCode,
                dateOfBirth,
                workPhone,
                homePhone,
                username,
                primaryAddress1,
                primaryAddress2,
                mailingAddress1,
                mailingAddress2,
                gender,
                organizationServiceId,
                userChildren,
                npiNumber,
                credentials,
                availabilityFrom,
                availabilityTo,
            },
        }),

    editEmployee: ({
        employeeId,
        firstName,
        lastName,
        primaryRoleId,
        secondaryRoleId,
        imageData,
        cellPhone,
        workCity,
        workState,
        workPostalCode,
        personalCity,
        personalState,
        personalPostalCode,
        dateOfBirth,
        workPhone,
        homePhone,
        username,
        status,
        primaryAddress1,
        primaryAddress2,
        mailingAddress1,
        mailingAddress2,
        gender,
        organizationServiceId,
        userChildren,
        npiNumber,
        credentials,
        availabilityFrom,
        availabilityTo,
    }: {
        employeeId: any;
        firstName: string;
        lastName: string;
        primaryRoleId: string;
        secondaryRoleId: any;
        imageData: string;
        cellPhone: string;
        workCity: string;
        workState: string;
        workPostalCode: string;
        personalCity: string;
        personalState: string;
        personalPostalCode: string;
        dateOfBirth: any;
        workPhone: string;
        homePhone: string;
        username: string;
        status: any;
        primaryAddress1: string;
        primaryAddress2: string;
        mailingAddress1: string;
        mailingAddress2: string;
        gender: string;
        organizationServiceId: string;
        userChildren: any;
        npiNumber: number;
        credentials: string;
        availabilityFrom: string;
        availabilityTo: string;
    }) =>
        apiClient.post(URLS.editEmployee, {
            data: {
                employeeId,
                firstName,
                lastName,
                primaryRoleId,
                secondaryRoleId,
                imageData,
                cellPhone,
                workCity,
                workState,
                workPostalCode,
                personalCity,
                personalState,
                personalPostalCode,
                dateOfBirth,
                workPhone,
                homePhone,
                username,
                status,
                primaryAddress1,
                primaryAddress2,
                mailingAddress1,
                mailingAddress2,
                gender,
                organizationServiceId,
                userChildren,
                npiNumber,
                credentials,
                availabilityFrom,
                availabilityTo,
            },
        }),
    deleteAuthorizationFile: ({ id }: { id: any }) =>
        apiClient.post(URLS.deleteAuthorizationFile, {
            data: {
                id,
            },
        }),
};

export default saveEmployeeApi;
