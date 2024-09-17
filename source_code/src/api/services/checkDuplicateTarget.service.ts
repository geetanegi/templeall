import { URLS } from '../../constants';
import apiClient from '../client';

const checkDuplicateTarget = {
    checkDuplicateTarget: ({
        targetName,
        programId,
        domainId,
        targetId,
    }: {
        targetName: any;
        programId: any;
        domainId: any;
        targetId: any;
    }) =>
        apiClient.post(URLS.checkDuplicateTarget, {
            data: {
                targetName,
                programId,
                domainId,
                targetId,
            },
        }),
};

export default checkDuplicateTarget;
