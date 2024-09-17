import { URLS } from '../../../constants';
import apiClient from '../../client';

const getAllQuickLooksTargetsAPI = {
    getAllQuickLooksTarget: ({ programBookUUID }: { programBookUUID: any }) =>
        apiClient.post(URLS.getAllQuickLooksTargets, {
            data: {
                programBookUUID,
            },
        }),
};

export default getAllQuickLooksTargetsAPI;
