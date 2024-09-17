import { URLS } from '../../../constants';
import apiClient from '../../client';

const AssigneeProgramBookApi = {
    AssigneeProgramBook: ({
        assignedTo,
        programBookUUID,
    }: {
        programBookUUID: any;
        assignedTo: any;
    }) =>
        apiClient
            .post(URLS.saveAssignee, {
                data: {
                    programBookUUID,
                    assignedTo,
                },
            })
            .then((res) => {
                return res; // Return the response if needed
            }),
};

export default AssigneeProgramBookApi;
