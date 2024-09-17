import { URLS } from '../../constants';
import apiClient from '../client';

const getDomainById = {
    getDomainById: ({
        programBookUUID,
        phase,
        isTargetPinned,
        quickLookId,
    }: {
        programBookUUID: any;
        phase: any;
        isTargetPinned?: any;
        quickLookId?: any;
    }) =>
        apiClient.post(URLS.getDomainByProgramBookId, {
            data: {
                programBookUUID,
                phase,
                isTargetPinned,
                quickLookId,
            },
        }),
    getDomainByLibraryId: ({
        programBookLibraryUUID,
    }: {
        programBookLibraryUUID: string;
    }) => {
        return apiClient.post(URLS.getDomainByProgramBookUUidLibrary, {
            data: {
                programBookLibraryUUID,
            },
        });
    },
};

export default getDomainById;
