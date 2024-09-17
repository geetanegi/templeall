import { URLS } from '../../../constants';
import apiClient from '../../client';

const getQuickLookAPI = {
    getQuickLook: ({ programBookUUID }: { programBookUUID: any }) =>
        apiClient.post(URLS.getQuickLook, {
            data: {
                programBookUUID,
            },
        }),
};

export default getQuickLookAPI;
