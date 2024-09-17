import { URLS } from '../../../constants';
import apiClient from '../../client';

const renameLibraryNameApi = {
    renameLibraryNameData: ({
        programBookLibraryUUID,
        modifiedLibraryName,
    }: {
        programBookLibraryUUID: string;
        modifiedLibraryName: string;
    }) =>
        apiClient.post(URLS.renameLibraryName, {
            data: {
                programBookLibraryUUID,
                modifiedLibraryName,
            },
        }),
};

export default renameLibraryNameApi;
