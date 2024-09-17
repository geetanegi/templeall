import { URLS } from '../../../constants';
import apiClient from '../../client';

const defaultRateByIdAPi = {
    getDefaultRateById: ({ id }: { id: string }) =>
        apiClient.post(URLS.getDefaultRate, {
            data: {
                id,
            },
        }),
};

export default defaultRateByIdAPi;
