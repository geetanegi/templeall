import apiClient from '../../client';
import { URLS } from '../../../constants';

const bulkPaymentApis = {
    getGrandTotal: (billingIds: string[]) => {
        return apiClient.post(URLS.getGrandTotal, {
            data: {
                billingIds,
            },
        });
    },
    getAllOwedAmountType: () => {
        return apiClient.post(URLS.getAllOwedAmountType, {});
    },
    getBillingDataByClientIds: ({
        clientId,
        billingIds,
    }: {
        clientId: string;
        billingIds: string[];
    }) => {
        return apiClient.post(URLS.getBillingDataByClientIds, {
            data: {
                clientId,
                billingIds,
            },
        });
    },
    applyBulkPayment: (formData: any) => {
        return apiClient.post(URLS.applyBulkPayment, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default bulkPaymentApis;
