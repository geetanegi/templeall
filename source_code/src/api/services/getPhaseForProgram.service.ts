import { URLS } from '../../constants';
import apiClient from '../client';

const getPhaseForProgram = {
    phaseForProgram: (data: any) =>
        apiClient.post(URLS.getPhaseForProgram, {
            data,
        }),
};

export default getPhaseForProgram;
