import { URLS } from '../../constants';
import apiClient from '../client';

const TestAPI = {
    test: ({ id, name }: { id: string; name: string }) =>
        apiClient.post(URLS.test, {
            id,
            name,
        }),
};

export default TestAPI;
