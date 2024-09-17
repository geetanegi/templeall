import { URLS } from '../../../constants';
import apiClient from '../../client';

const changeStatusPhase = {
    changeStatus: ({ id, phase, type }: { id: any; phase: any; type: any }) =>
        apiClient.post(URLS.savePhaseOfIntervention, {
            data: {
                id,
                type,
                phase,
            },
        }),
};

export default changeStatusPhase;
