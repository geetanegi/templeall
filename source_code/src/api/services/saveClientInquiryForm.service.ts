import { URLS } from '../../constants';
import apiClient from '../client';

const saveClientInquiryForm = {
    saveClientInquiryForm: ({
        parentFirstName,
        parentLastName,
        email,
        cellPhone,
        workPhone,
        homePhone,
        dateOfBirth,
        status,
        createdBy,
        primaryLanguage,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        code,
        userChildren,
    }: {
        parentFirstName: any;
        parentLastName: any;
        email: any;
        cellPhone: number;
        workPhone: number;
        homePhone: number;
        dateOfBirth: any;
        status: any;
        createdBy: any;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zipCode: string;
        userChildren: any;
        code: string | undefined;
        primaryLanguage: any;
    }) =>
        apiClient.post(URLS.SaveClientInquiryFrom, {
            data: {
                parentFirstName,
                parentLastName,
                email,
                cellPhone,
                workPhone,
                homePhone,
                dateOfBirth,
                status,
                createdBy,
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                userChildren,
                primaryLanguage,
                code,
            },
        }),
};

export default saveClientInquiryForm;
