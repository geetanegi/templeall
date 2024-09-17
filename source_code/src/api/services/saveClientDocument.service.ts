import { URLS } from '../../constants';
import apiClient from '../client';

const saveClientDocument = {
    saveDocument: ({
        id,
        name,
        description,
        type,
        programBookUUID,
        modifiedBy,
        createdBy,
        intakeLocation,
        isUserCreated,
    }: {
        id: any;
        programBookUUID: any;
        name: any;
        description: any;
        createdBy: any;
        modifiedBy: any;
        intakeLocation: any;
        isUserCreated: any;
        type: any;
    }) =>
        apiClient.post(URLS.saveDocument, {
            data: {
                id,
                name,
                type,
                description,
                programBookUUID,
                createdBy,
                modifiedBy,
                intakeLocation,
                isUserCreated,
            },
        }),
};

export default saveClientDocument;
