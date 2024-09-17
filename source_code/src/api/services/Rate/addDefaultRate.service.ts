import { URLS } from '../../../constants';
import apiClient from '../../client';

const defaultRateApi = {
    saveDefaultRate: ({
        id,
        authorizationCodeId,
        startDate,
        endDate,
        feeSchedule,
        agreedRate,
        billedRate,
        certification,
        modifier1,
        modifier2,
        modifier3,
        modifier4,
        modifierName,
        location,
    }: {
        id: string;
        authorizationCodeId: string;
        startDate: string;
        endDate: string;
        feeSchedule: string;
        agreedRate: any;
        billedRate: any;
        certification: string;
        modifier1: string;
        modifier2: string;
        modifier3: string;
        modifier4: string;
        modifierName: string;
        location: string;
    }) =>
        apiClient.post(URLS.saveDefaultRate, {
            data: {
                id,
                authorizationCodeId,
                startDate,
                endDate,
                feeSchedule,
                agreedRate,
                billedRate,
                certification,
                modifier1,
                modifier2,
                modifier3,
                modifier4,
                modifierName,
                location,
            },
        }),
};

export default defaultRateApi;
