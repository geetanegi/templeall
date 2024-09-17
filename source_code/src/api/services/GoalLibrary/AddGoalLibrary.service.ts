import { URLS } from '../../../constants';
import apiClient from '../../client';

const AddGoalLibraryApi = {
    SaveGoalLibrary: ({
        Name,
        Description,
        therapyType,
        organizationId,
        userId,
    }: {
        Name: any;
        Description: any;
        therapyType: any;
        organizationId: any;
        userId: any;
    }) =>
        apiClient
            .post(URLS.addGoalLibrary, {
                data: {
                    id: '',
                    description: Description,
                    name: Name,
                    type: therapyType,
                    organizationId,
                    userId,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default AddGoalLibraryApi;
