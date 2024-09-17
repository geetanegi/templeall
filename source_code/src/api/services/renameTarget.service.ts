import { URLS } from '../../constants';
import apiClient from '../client';

const renameTarget = {
    renameTarget: ({
        targetId,
        modifiedTargetName,
        programId,
    }: {
        targetId: any;
        programId: any;
        modifiedTargetName: any;
    }) =>
        apiClient.post(URLS.renameTarget, {
            data: {
                targetId,
                programId,
                modifiedTargetName,
            },
        }),
};

export default renameTarget;
