import { URLS } from '../../../constants';
import apiClient from '../../client';

const getProgramBookLibraryFolderApi = {
    getProgramBookLibraryFolderApiData: ({
        ProgramBookUUID,
    }: {
        ProgramBookUUID: string;
    }) =>
        apiClient.post(URLS.getDomainByProgramBookUUidLibrary, {
            data: {
                programBookLibraryUUID: ProgramBookUUID,
            },
        }),
};

export default getProgramBookLibraryFolderApi;
