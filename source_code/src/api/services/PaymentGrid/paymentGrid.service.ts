import { URLS } from '../../../constants';
import apiClient from '../../client';
const paymentGridAPI = {
    paymentGrid: ({
        billingId,
        heading,
        roleId,
        type,
        assignedTo,
        pagination,
        order,
        name,
        filterValue,
    }: {
        billingId?: any;
        heading: string;
        roleId: string;
        type: string;
        assignedTo: string;
        pagination: {
            startIndex: number;
            noOfRecords: number;
        };
        name: string;
        order: string;
        filterValue: string;
    }) =>
        apiClient.post(URLS.paymentGrid, {
            data: {
                billingId,
                heading,
                roleId,
                type,
                pagination,
                assignedTo,
                filter: [
                    {
                        filterKey: '',
                        filterValue: filterValue || '',
                    },
                ],
                sorting: {
                    order: order || 'DESC',
                    fieldName: name || 'createdDate',
                },
            },
        }),
    voidPayment: ({
        billingId,
        billingAmountId,
        paymentVoidReason,
    }: {
        billingId?: any;
        billingAmountId: string;
        paymentVoidReason: string;
    }) =>
        apiClient.post(URLS.voidPayment, {
            data: {
                billingId,
                billingAmountId,
                paymentVoidReason,
            },
        }),
};
export default paymentGridAPI;
