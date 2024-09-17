import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveTargetsQuickLookAPI = {
    saveTargetsQuickLook: ({
        programBookUUID,
        quickLookData,
    }: {
        programBookUUID: any;
        quickLookData: any;
    }) =>
        apiClient.post(URLS.saveTargetsQuickLook, {
            data: {
                programBookUUID,
                quickLookData,
            },
        }),
};

export default saveTargetsQuickLookAPI;
