import { URLS } from '../../../constants';
import apiClient from '../../client';

const InquiriesApi = {
    inquiries: ({
        profileUserId,
        profileOrgId,
        name,
    }: {
        profileUserId: string;
        profileOrgId: string;
        name: string;
    }) =>
        apiClient.post(URLS.inquiries, {
            data: {
                profileUserId,
                profileOrgId,
                name,
            },
        }),
};

export default InquiriesApi;
