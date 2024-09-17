import { URLS } from '../../constants';
import apiClient from '../client';

const getClientDocumentById = {
    getDocumentById: ({ id }: { id: any }) =>
        apiClient.post(URLS.getDocument, {
            data: {
                id,
            },
        }),
};

export default getClientDocumentById;
