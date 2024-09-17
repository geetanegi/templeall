import { URLS } from '../../../constants';
import apiClient from '../../client';

const renameQuickLookAPI = {
    renameQuickLook: ({
        programBookUUID,
        quickLookId,
        modifiedQuickLookName,
    }: {
        programBookUUID: any;
        quickLookId: any;
        modifiedQuickLookName: any;
    }) =>
        apiClient.post(URLS.renameQuickLook, {
            data: {
                programBookUUID,
                quickLookId,
                modifiedQuickLookName,
            },
        }),
};

export default renameQuickLookAPI;
