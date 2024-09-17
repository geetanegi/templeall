import { URLS } from '../../../constants';
import apiClient from '../../client';

const deleteProgramBookLibrary = {
    deleteProgramBookLibrary: (programBookLibraryUUID: any) =>
        apiClient.post(URLS.deleteProgramBookLibrary, {
            data: {
                programBookLibraryUUID,
            },
        }),
};

export default deleteProgramBookLibrary;
