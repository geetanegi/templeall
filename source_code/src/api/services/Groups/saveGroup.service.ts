import { URLS } from '../../../constants';
import apiClient from '../../client';

const groupApi = {
    saveGroup: ({
        groupId,
        name,
        description,
        groupUser,
    }: {
        groupId: any;
        name: any;
        description: any;
        groupUser: any;
    }) =>
        apiClient.post(URLS.saveGroupPage, {
            data: {
                groupId,
                name,
                description,
                groupUser,
            },
        }),
    getGroupByID: ({ groupId }: { groupId: any }) =>
        apiClient.post(URLS.getGroupById, {
            data: {
                groupId,
            },
        }),
    deleteGroup: ({ groupId }: { groupId: any }) =>
        apiClient.post(URLS.deleteGroup, {
            data: {
                groupId,
            },
        }),
};

export default groupApi;
