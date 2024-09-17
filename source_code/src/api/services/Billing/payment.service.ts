import { URLS } from '../../../constants';
import apiClient from '../../client';

export type AddPaymentRequestType = {
    file: any;
    clientId: string;
    billingId: string;
    payor: string;
    displayName: string;
    paymentDate: any;
    paymentType: string;
    appliedBy: string;
    eraNumber: string;
    notes: string;
    amount: string;
};

const paymentApis = {
    getBillingRecord: (billingId: string) => {
        return apiClient.post(URLS.billingSideModalUrl, {
            data: {
                billingId,
            },
        });
    },
    getPayors: (clientId: string) => {
        return apiClient.post(URLS.getClientPayors, {
            data: {
                clientId,
            },
        });
    },
    getPaymentTypes: () => {
        return apiClient.post(URLS.getPaymentTypes, {
            data: {},
        });
    },
    addPayment: (formData: any) => {
        return apiClient.post(URLS.addPayment, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default paymentApis;
