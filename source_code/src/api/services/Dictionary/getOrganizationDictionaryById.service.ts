import { URLS } from '../../../constants';
import apiClient from '../../client';
const getOrganizationDictionaryByIdAPI = {
    getOrganizationDictionaryById: ({
        dictionaryId,
    }: {
        dictionaryId: string;
    }) =>
        apiClient.post(URLS.getOrganizationDictionaryById, {
            data: {
                dictionaryId,
            },
        }),
};
export default getOrganizationDictionaryByIdAPI;
