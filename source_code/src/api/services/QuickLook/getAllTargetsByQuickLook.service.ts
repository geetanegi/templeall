import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllTargetsByQuickLookAPI = {
    getAllTargetsByQuickLook: ({ quickLookId }: { quickLookId: any }) =>
        apiClient.post(URLS.getAllTargetsByQuickLook, {
            data: {
                quickLookId,
            },
        }),
};

export default getAllTargetsByQuickLookAPI;
