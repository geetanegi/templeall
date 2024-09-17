import { URLS } from '../../constants';
import apiClient from '../client';

const changePhase = {
    phaseChange: ({ id, phase, type }: { id: any; phase: any; type: any }) =>
        apiClient.post(URLS.phaseChange, {
            data: {
                id,
                type,
                phase,
            },
        }),
};

export default changePhase;
