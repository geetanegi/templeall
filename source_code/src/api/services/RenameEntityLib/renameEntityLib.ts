import { URLS } from '../../../constants';
import apiClient from '../../client';

export const renameDomainAPI = {
    renameDomain: ({
        programBookLibraryUUID,
        domainId,
        modifiedDomainName,
    }: {
        programBookLibraryUUID: any;
        domainId: any;
        modifiedDomainName: any;
    }) =>
        apiClient.post(URLS.renameDomainLib, {
            data: {
                programBookLibraryUUID,
                domainId,
                modifiedDomainName,
            },
        }),
};
export const renameProgramLibAPI = {
    renameProgram: ({
        domainId,
        programId,
        modifiedProgramName,
    }: {
        domainId: any;
        programId: any;
        modifiedProgramName: any;
    }) =>
        apiClient.post(URLS.renameProgramLib, {
            data: {
                domainId,
                programId,
                modifiedProgramName,
            },
        }),
};
export const renameTargetAPI = {
    renameTarget: ({
        programId,
        domainId,
        targetId,
        modifiedTargetName,
    }: {
        programId: any;
        domainId: any;
        targetId: any;
        modifiedTargetName: any;
    }) =>
        apiClient.post(URLS.renameTargetLib, {
            data: {
                programId,
                domainId,
                targetId,
                modifiedTargetName,
            },
        }),
};
