import { URLS } from '../../constants';
import apiClient from '../client';

const getProgramsByDomainIdAPI = {
    getProgramsByDomainId: ({
        domainId,
        phase,
        isNonTaskAnalysisProgram,
        isTargetPinned,
        quickLookId,
    }: {
        domainId: any;
        phase: any;
        isNonTaskAnalysisProgram?: any;
        isTargetPinned: any;
        quickLookId: any;
    }) =>
        apiClient.post(URLS.getProgramsByDomainId, {
            data: {
                domainId,
                phase,
                isNonTaskAnalysisProgram,
                isTargetPinned,
                quickLookId,
            },
        }),
    getDomainById: ({ domainId }: { domainId: any }) =>
        apiClient.post(URLS.getDomainById, {
            data: {
                domainId,
            },
        }),
};

export default getProgramsByDomainIdAPI;
