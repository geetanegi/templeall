import { URLS } from '../../../constants';
import apiClient from '../../client';
const saveOrganizationDictionaryAPI = {
    saveOrganizationDictionary: ({
        dictionaryId,
        word,
        meaning,
    }: {
        dictionaryId: string;
        word: string;
        meaning: string;
    }) =>
        apiClient.post(URLS.saveOrganizationDictionary, {
            data: {
                dictionaryId,
                word,
                meaning,
            },
        }),
};
export default saveOrganizationDictionaryAPI;
