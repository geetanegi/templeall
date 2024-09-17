import { URLS } from '../../../constants';
import { FormData1 } from '../../../types/intakeInterface';
import apiClient from '../../client';

const SentForMoreInforSaveApi = {
    SavesentForMoreInfor: (data: FormData1) =>
        apiClient.post(URLS.clientIntakeDetailsSave, data).then((res) => {
            console.log(data);
            return res; // Return the response if needed
        }),
};

export default SentForMoreInforSaveApi;
