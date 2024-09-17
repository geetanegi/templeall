import { URLS } from '../../../constants';
import apiClient from '../../client';

const EditOrganizationsApi = {
    EditOrganizations: ({
        id,
        organizationName,
        organizationEmailAddress,
        insuranceSupported,
        placeOfService,
        servicesSupported,
        firstName,
        lastName,
        adminEmail,
        cellPhone,
        workPhone,
        logo,
        logoName,
        locations,
    }: {
        id: number;
        organizationName: string;
        organizationEmailAddress: string;
        insuranceSupported: string[];
        placeOfService: string[];
        servicesSupported: string[];
        firstName: string;
        lastName: string;
        adminEmail: string;
        cellPhone: string;
        workPhone: string;
        logo: string;
        logoName: string;
        locations: any;
    }) =>
        apiClient
            .post(URLS.editOrganizationById, {
                data: {
                    id,
                    name: organizationName,
                    organizationEmail: organizationEmailAddress,
                    insurances: insuranceSupported,
                    services: servicesSupported,
                    adminFirstName: firstName,
                    adminLastName: lastName,
                    adminEmail: adminEmail,
                    cellPhone: cellPhone,
                    workPhone: workPhone,
                    logo: logo,
                    logoName,
                    locations,
                    placeOfService,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default EditOrganizationsApi;
