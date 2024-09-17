import { URLS } from '../../constants';
import apiClient from '../client';

const programBookApis = {
    getProgramBooksForUser: ({
        userChildId,
        programBookByUserId,
    }: {
        userChildId: string;
        programBookByUserId: any;
    }) => {
        return apiClient.post(URLS.getProgramBooksForUser, {
            data: {
                userChildId: userChildId,
                programBookByUserId,
            },
        });
    },
};

export default programBookApis;
