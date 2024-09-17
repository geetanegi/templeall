import { URLS } from '../../constants';
import apiClient from '../client';

const checkDuplicateProgramAPI = {
    checkDuplicateProgram: ({
        domainId,
        programId,
        programName,
    }: {
        domainId: any;
        programId: any;
        programName: any;
    }) =>
        apiClient.post(URLS.checkDuplicateProgram, {
            data: {
                domainId,
                programId,
                programName,
            },
        }),
};

export default checkDuplicateProgramAPI;
