import { URLS } from '../../constants';
import apiClient from '../client';

const chartApis = {
    getAllMasteredPrograms: ({
        id,
        fromDate,
        toDate,
        idType,
    }: {
        id: string;
        fromDate: any;
        toDate: any;
        idType: string;
    }) => {
        return apiClient.post(URLS.getAllMasteredPrograms, {
            data: {
                id,
                fromDate,
                toDate,
                idType,
            },
        });
    },
    getAllMasteredTargets: ({
        id,
        fromDate,
        toDate,
        idType,
    }: {
        id: string;
        fromDate: any;
        toDate: any;
        idType: string;
    }) => {
        return apiClient.post(URLS.getAllMasteredTargets, {
            data: {
                id,
                fromDate,
                toDate,
                idType,
            },
        });
    },
    getTargetTrialData: ({
        id,
        dataType,
        fromDate,
        toDate,
    }: {
        id: string;
        dataType: string;
        fromDate: any;
        toDate: any;
    }) => {
        return apiClient.post(URLS.getTargetTrialData, {
            data: {
                id,
                dataType,
                fromDate,
                toDate,
            },
        });
    },
    getShortTermGraphData: ({
        startDate,
        endDate,
        interventionPlanShortTermGoalId,
    }: {
        startDate: any;
        endDate: any;
        interventionPlanShortTermGoalId: string;
    }) => {
        return apiClient.post(URLS.getShortTermGraphData, {
            data: {
                startDate,
                endDate,
                interventionPlanShortTermGoalId,
            },
        });
    },
};

export default chartApis;
