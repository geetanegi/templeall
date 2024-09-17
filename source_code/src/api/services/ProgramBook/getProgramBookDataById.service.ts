import { URLS } from '../../../constants';
import apiClient from '../../client';

const getProgramBookDataByIdAPI = {
    getProgramBookDataById: ({
        programBookUUID,
    }: {
        programBookUUID: string;
    }) =>
        apiClient.post(URLS.getProgramBookDataById, {
            data: {
                programBookUUID,
            },
        }),
    getProgramBookDataByLibraryId: ({
        programBookLibraryUUID,
    }: {
        programBookLibraryUUID: string;
    }) =>
        apiClient.post(URLS.getProgramBookLibraryDataById, {
            data: {
                programBookLibraryUUID,
            },
        }),
};

export default getProgramBookDataByIdAPI;
