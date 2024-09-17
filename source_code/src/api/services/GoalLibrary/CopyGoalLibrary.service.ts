import { URLS } from '../../../constants';
import apiClient from '../../client';

const CopyGoalLibraryApi = {
    CopyGoalLibrary: ({ id, Name }: { id: any; Name: any }) =>
        apiClient
            .post(URLS.copyGoalLibrary, {
                data: {
                    id,
                    name: Name,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default CopyGoalLibraryApi;
