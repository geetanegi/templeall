import { URLS } from '../../constants';
import apiClient from '../client';

const checkDuplicateDomainAPI = {
    checkDuplicateDomain: ({
        programBookLibraryUUID,
        programBookUUID,
        domainName,
    }: {
        programBookLibraryUUID: string;
        programBookUUID: any;
        domainName: any;
    }) =>
        apiClient.post(URLS.checkDuplicateDomain, {
            data: {
                programBookLibraryUUID,
                programBookUUID,
                domainName,
            },
        }),
};

export default checkDuplicateDomainAPI;
