import { URLS } from '../../../constants';
import apiClient from '../../client';

const VerifyProgramBookApi = {
    VerifyProgramBook: ({
        clientId,
        therapyType,
    }: {
        clientId: any;
        therapyType?: any;
    }) => {
        let url;

        if (therapyType) {
            url = URLS.verifyIntervention;
        } else {
            url = URLS.verifyProgramBook;
        }

        return apiClient
            .post(url, {
                data: {
                    clientId,
                    therapyType,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            })
            .catch((error) => {
                throw error; // Rethrow the error if needed
            });
    },
};

export default VerifyProgramBookApi;
