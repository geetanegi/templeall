import { URLS } from '../../constants';
import apiClient from '../client';

const getProgramByIdAPI = {
    getProgramById: ({ id, isTarget }: { id: any; isTarget: any }) =>
        apiClient.post(URLS.getProgramById, {
            data: {
                id,
                isTarget,
            },
        }),
    deleteProgramBook: ({ type, id }: { type: string; id: any }) =>
        apiClient.post(URLS.deleteProgramBookEntities, {
            data: {
                type,
                id,
            },
        }),
};

export default getProgramByIdAPI;
