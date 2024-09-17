import { URLS } from '../../../constants';
import apiClient from '../../client';

const ABCData = {
    abc: ({ programBookId }: { programBookId: any }) =>
        apiClient.post(URLS.getABCData, {
            data: {
                programBookId,
            },
        }),
};

export default ABCData;
