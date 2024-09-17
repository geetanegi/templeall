import { URLS } from '../../constants';
import apiClient from '../client';

const renameProgramAPI = {
    renameProgram: ({
        domainId,
        programId,
        modifiedProgramName,
    }: {
        domainId: any;
        programId: any;
        modifiedProgramName: any;
    }) =>
        apiClient.post(URLS.renameProgram, {
            data: {
                domainId,
                programId,
                modifiedProgramName,
            },
        }),
};

export default renameProgramAPI;
