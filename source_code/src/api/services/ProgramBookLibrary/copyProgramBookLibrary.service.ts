import { URLS } from '../../../constants';
import apiClient from '../../client';

const CopyProgramBookLibrary = {
    copyProgramBookLibrary: ({ id, Name }: { id: any; Name: any }) =>
        apiClient.post(URLS.copyProgramBookLibrary, {
            data: {
                id,
                name: Name,
            },
        }),
};

export default CopyProgramBookLibrary;
