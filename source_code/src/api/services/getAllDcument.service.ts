import { URLS } from '../../constants';
import apiClient from '../client';

const getAllDocument = {
    getAllDocumentById: ({ programBookUUID }: { programBookUUID: any }) =>
        apiClient.post(URLS.getAllDocument, {
            data: {
                programBookUUID,
            },
        }),
};

export default getAllDocument;
