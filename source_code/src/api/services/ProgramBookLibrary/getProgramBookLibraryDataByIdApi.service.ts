import { URLS } from '../../../constants';
import apiClient from '../../client';

const getProgramBookLibraryDataByIdApi = {
    getProgramBookLibraryDataByIdApiData: ({
        ProgramBookUUID,
    }: {
        ProgramBookUUID: string;
    }) =>
        apiClient.post(URLS.getProgramBookLibraryDataById, {
            data: {
                programBookLibraryUUID: ProgramBookUUID,
            },
        }),
    deleteProgramBookLibraries: ({ type, id }: { type: string; id: any }) =>
        apiClient.post(URLS.deleteProgramBookLibraries, {
            data: {
                type,
                id,
            },
        }),
};

export default getProgramBookLibraryDataByIdApi;
