import { URLS } from '../../../constants';
import apiClient from '../../client';
const deleteDictionaryAPI = {
    deleteDictionary: ({ dictionaryId }: { dictionaryId: string }) =>
        apiClient.post(URLS.deleteDictionary, {
            data: {
                dictionaryId,
            },
        }),
};
export default deleteDictionaryAPI;
