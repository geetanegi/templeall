import { URLS } from '../../../constants';
import apiClient from '../../client';
const editClaimProviderSupplierAPI = {
    editClaimProviderSupplier: ({
        id,
        provider,
        providerId,
        claimIdType,
        userId,
        isProviderSignature,
    }: {
        id: any;
        provider: any;
        providerId: any;
        claimIdType: any;
        userId: any;
        isProviderSignature: any;
    }) =>
        apiClient.post(URLS.editClaimProviderSupplier, {
            data: {
                id,
                provider,
                providerId,
                claimIdType,
                userId,
                isProviderSignature,
            },
        }),
};
export default editClaimProviderSupplierAPI;
