import { URLS } from '../../../constants';
import apiClient from '../../client';
const myDocumentsApi = {
    myDocument: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.myDocument, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};
export default myDocumentsApi;
