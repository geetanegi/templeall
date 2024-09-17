import { URLS } from '../../../constants';
import apiClient from '../../client';

const GetAllPhase = {
    getGetAllPhase: ({ type }: { type: any }) =>
        apiClient.post(URLS.getAllPhaseForIntervention, {
            data: {
                type,
            },
        }),
};

export default GetAllPhase;
