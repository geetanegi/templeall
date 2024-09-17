import { URLS } from '../../../constants';
import apiClient from '../../client';

const getTimeFrame = {
    getTimeFrame: ({
        type,
        dataType,
        id,
        temporaryId,
        isTarget,
    }: {
        type: any;
        dataType: any;
        id: any;
        temporaryId: any;
        isTarget: any;
    }) =>
        apiClient.post(URLS.getTimeFrame, {
            data: {
                type,
                dataType,
                id,
                temporaryId,
                isTarget,
            },
        }),
    getAutoProgress: ({
        templateId,
        dataType,
        phase,
        timeFrame,
        id,
        temporaryId,
        isProgram,
        addNew,
        isTarget,
        programId,
    }: {
        templateId: any;
        dataType: any;
        phase: any;
        timeFrame: any;
        id: any;
        temporaryId: any;
        isProgram: any;
        addNew: any;
        isTarget: any;
        programId: any;
    }) =>
        apiClient.post(URLS.getAutoProgress, {
            data: {
                templateId,
                dataType,
                phase,
                timeFrame,
                id,
                temporaryId,
                isProgram,
                addNew,
                isTarget,
                programId,
            },
        }),
    getAutoRegress: ({
        templateId,
        dataType,
        phase,
        id,
        temporaryId,
        isProgram,
        addNew,
        isTarget,
        programId,
    }: {
        templateId: any;
        dataType: any;
        phase: any;
        id: any;
        temporaryId: any;
        isProgram: any;
        addNew: any;
        isTarget: any;
        programId: any;
    }) =>
        apiClient.post(URLS.getAutoRegress, {
            data: {
                templateId,
                dataType,
                phase,
                id,
                temporaryId,
                isProgram,
                addNew,
                isTarget,
                programId,
            },
        }),
    getAutoProgressOrRegressByPhase: ({
        templateId,
        dataType,
        phase,
        id,
        timeFrame,
        indexCount,
        autoProgress,
        temporaryId,
        isProgram,
        addNew,
        isTarget,
        programId,
    }: {
        templateId: any;
        dataType: any;
        phase: any;
        id: any;
        timeFrame: any;
        indexCount: any;
        autoProgress: any;
        temporaryId: any;
        isProgram: any;
        addNew: any;
        isTarget: any;
        programId: any;
    }) =>
        apiClient.post(URLS.getProgressOrRegress, {
            data: {
                templateId,
                dataType,
                phase,
                id,
                timeFrame,
                indexCount,
                autoProgress,
                temporaryId,
                isProgram,
                addNew,
                isTarget,
                programId,
            },
        }),
};
export default getTimeFrame;
