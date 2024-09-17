import { URLS } from '../../constants';
import apiClient from '../client';

const renameProgramBookApi = {
    renameProgramBook: ({
        programBookUUID,
        programBookName,
    }: {
        programBookUUID: string;
        programBookName: string;
    }) =>
        apiClient.post(URLS.renameProgramBook, {
            data: {
                programBookUUID,
                programBookName,
            },
        }),
};

export default renameProgramBookApi;
