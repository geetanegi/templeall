import { URLS } from '../../../constants';
import apiClient from '../../client';
const sentForInformationAPI = {
    sentForInformation: ({ id }: { id: string | undefined }) =>
        apiClient.post(URLS.sentForInformation, {
            data: {
                id,
            },
        }),
};
export default sentForInformationAPI;
