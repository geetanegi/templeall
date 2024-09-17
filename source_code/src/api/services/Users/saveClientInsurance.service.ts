import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveInsuranceApi = {
    saveClientInsurance: ({
        name,
        description,
        insuranceProviderId,
        insurerResponsibility,
        patientResponsibilityAmount,
        coverageFrom,
        coverageTo,
        insuranceContactPerson,
        insuranceContactPhone,
        status,
        subscriberFirstName,
        subscriberLastName,
        subscriberGender,
        subscriberDob,
        insuredId,
        policyGroupFeca,
        groupName,
        subscriberAddressLine1,
        subscriberAddressLine2,
        subscriberCity,
        subscriberState,
        subscriberPostalCode,
        relationWithSubscriber,
        subscriberInsuredId,
        userChildId,
        useParentDetails,
        parentId,
        frequency,
        id,
        payerId,
        insurerAddressLine1,
        insurerAddressLine2,
        insurerCity,
        insurerState,
        insurerZipCode,
    }: {
        name: string;
        description: string;
        insuranceProviderId: string;
        insurerResponsibility: string;
        patientResponsibilityAmount: string;
        coverageFrom: string;
        coverageTo: string;
        insuranceContactPerson: string;
        insuranceContactPhone: number;
        status: string;
        subscriberFirstName: string;
        subscriberLastName: string;
        subscriberGender: string;
        subscriberDob: string;
        insuredId: number;
        policyGroupFeca: string;
        groupName: string;
        subscriberAddressLine1: string;
        subscriberAddressLine2: string;
        subscriberCity: string;
        subscriberState: string;
        subscriberPostalCode: string;
        relationWithSubscriber: string;
        subscriberInsuredId: string;
        userChildId: any;
        useParentDetails: boolean;
        parentId: any;
        frequency: any;
        id: any;
        payerId: any;
        insurerAddressLine1: string;
        insurerAddressLine2: string;
        insurerCity: string;
        insurerState: string;
        insurerZipCode: string;
    }) =>
        apiClient.post(URLS.saveClientInsurance, {
            data: {
                id,
                name,
                description,
                insuranceProviderId,
                insurerResponsibility,
                patientResponsibilityAmount,
                coverageFrom,
                coverageTo,
                insuranceContactPerson,
                insuranceContactPhone,
                status,
                subscriberFirstName,
                subscriberLastName,
                subscriberGender,
                subscriberDob,
                insuredId,
                policyGroupFeca,
                groupName,
                subscriberAddressLine1,
                subscriberAddressLine2,
                subscriberCity,
                subscriberState,
                subscriberPostalCode,
                relationWithSubscriber,
                subscriberInsuredId,
                userChildId,
                useParentDetails,
                parentId,
                frequency,
                payerId,
                insurerAddressLine1,
                insurerAddressLine2,
                insurerCity,
                insurerState,
                insurerZipCode,
            },
        }),
};

export default saveInsuranceApi;
