import { URLS } from '../../../constants';
import apiClient from '../../client';
const SideModalDataApi = {
    SideModalData: ({ billingId }: { billingId: any }) =>
        apiClient
            .post(URLS.billingSideModalUrl, {
                data: {
                    billingId,
                },
            })
            .then((response) => {
                return response;
            })
            .catch(() => {}),
};
export default SideModalDataApi;
