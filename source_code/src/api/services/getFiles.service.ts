import { URLS } from '../../constants';
import apiClient from '../client';

const getFilesById = {
    getFiles: ({ programBookUUID }: { programBookUUID: any }) =>
        apiClient.post(URLS.getFiles, {
            data: {
                programBookUUID,
            },
        }),
};

export default getFilesById;
