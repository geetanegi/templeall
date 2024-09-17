import { URLS } from '../../../constants';
import apiClient from '../../client';

const notesApi = {
    note: ({
        profileUserId,
        profileOrgId,
    }: {
        profileUserId: any;
        profileOrgId: any;
    }) =>
        apiClient.post(URLS.notes, {
            data: {
                profileUserId,
                profileOrgId,
            },
        }),
};

export default notesApi;
