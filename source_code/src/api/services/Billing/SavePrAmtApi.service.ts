import { URLS } from '../../../constants';
import apiClient from '../../client';
const SavePrAmtApi = {
    PrAmtData: ({
        billingId,
        patientResponsibilityAmount,
    }: {
        billingId: any;
        patientResponsibilityAmount: any;
    }) =>
        apiClient
            .post(URLS.billingPrAmtSaveUrl, {
                data: {
                    billingId,
                    patientResponsibilityAmount,
                },
            })
            .then((response) => {
                return response;
            })
            .catch(() => {}),
};
export default SavePrAmtApi;
