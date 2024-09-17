import { URLS } from '../../constants';
import apiClient from '../client';

const setTargetIndexAPI = {
    setTargetIndex: ({ targets }: { targets: any }) =>
        apiClient.post(URLS.setTargetIndex, {
            data: {
                targets,
            },
        }),
};

export default setTargetIndexAPI;
