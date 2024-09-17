import { URLS } from '../../constants';
import apiClient from '../client';

const createDomainAPI = {
    createDomain: ({
        programBookLibraryUUID,
        programBookUUID,
        templateDomainId,
        name,
        description,
        createdBy,
        modifiedBy,
    }: {
        programBookLibraryUUID: string;
        programBookUUID: any;
        templateDomainId: any;
        name: any;
        description: any;
        createdBy: any;
        modifiedBy: any;
    }) =>
        apiClient.post(URLS.createDomain, {
            data: {
                programBookLibraryUUID,
                programBookUUID,
                templateDomainId,
                name,
                description,
                createdBy,
                modifiedBy,
            },
        }),
};

export default createDomainAPI;
