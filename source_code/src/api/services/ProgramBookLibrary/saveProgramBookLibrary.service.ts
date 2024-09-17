import { URLS } from '../../../constants';
import apiClient from '../../client';

const saveProgramBookLibrary = {
    saveProgramBookLibraryApi: ({
        id,
        name,
        description,
        modifiedBy,
        createdBy,
    }: {
        id: string;
        name: string | undefined;
        description: string | undefined;
        createdBy: string;
        modifiedBy: string;
    }) =>
        apiClient.post(URLS.saveProgramBookLibrary, {
            data: {
                id,
                name,
                description,
                modifiedBy: modifiedBy,
                createdBy,
            },
        }),
};

export default saveProgramBookLibrary;
