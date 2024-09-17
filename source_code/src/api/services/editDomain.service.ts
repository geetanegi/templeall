import { URLS } from '../../constants';
import apiClient from '../client';

const editDomainAPI = {
    editDomain: ({
        domainId,
        programBookUUID,
        modifiedDomainName,
    }: {
        domainId: any;
        programBookUUID: any;
        modifiedDomainName: any;
    }) =>
        apiClient.post(URLS.editDomain, {
            data: {
                domainId,
                programBookUUID,
                modifiedDomainName,
            },
        }),
};

export default editDomainAPI;
