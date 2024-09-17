import { URLS } from '../../constants';
import apiClient from '../client';

const checkDuplicateClientAPI = {
    checkDuplicateClientName: ({
        programBookUUID,
        documentName,
        id,
    }: {
        id: any;
        programBookUUID: any;
        documentName: any;
    }) =>
        apiClient.post(URLS.checkDuplicateClientName, {
            data: {
                id,
                programBookUUID,
                documentName,
            },
        }),
};

export default checkDuplicateClientAPI;
