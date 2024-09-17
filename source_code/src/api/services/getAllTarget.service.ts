import { URLS } from '../../constants';
import apiClient from '../client';

const getAllTarget = {
    getTarget: ({
        programId,
        hasCriteria = false,
        isTargetPinned,
        quickLookId,
    }: {
        programId: any;
        hasCriteria?: boolean;
        isTargetPinned: any;
        quickLookId: any;
    }) =>
        apiClient.post(URLS.getAllTarget, {
            data: {
                programId,
                hasCriteria,
                isTargetPinned,
                quickLookId,
            },
        }),
};

export default getAllTarget;
