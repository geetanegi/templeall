import { URLS } from '../../../constants';
import apiClient from '../../client';
const getSelectedBillingDataAPI = {
    getSelectedBillingData: ({ billingIds }: { billingIds: any }) =>
        apiClient.post(URLS.getSelectedBillingData, {
            data: {
                billingIds,
            },
        }),
    getOrganizationEmployee: () =>
        apiClient.post(URLS.getOrganizationEmployee, {
            data: {},
        }),
};
export default getSelectedBillingDataAPI;
