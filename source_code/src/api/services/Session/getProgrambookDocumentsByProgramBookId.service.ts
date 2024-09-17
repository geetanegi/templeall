import { URLS } from '../../../constants';
import apiClient from '../../client';

const getProgrambookDocumentsByProgramBookIdAPI = {
    getProgrambookDocumentsByProgramBookId: ({
        programBookId,
    }: {
        programBookId: any;
    }) =>
        apiClient.post(URLS.getProgrambookDocumentsByProgramBookId, {
            data: {
                programBookId,
            },
        }),
};

export default getProgrambookDocumentsByProgramBookIdAPI;
