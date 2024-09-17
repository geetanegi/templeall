import { URLS } from '../../../constants';
import apiClient from '../../client';
import getFilesById from '../getFiles.service';
const deleteFile = {
    deleteFile: ({ id, UUID }: { id: any; UUID: any }) =>
        apiClient
            .post(URLS.deleteFileURL, {
                data: {
                    id,
                },
            })
            .then((response) => {
                setTimeout(() => {
                    getFilesById.getFiles({ programBookUUID: UUID });
                }, 1000);
                return response;
            })
            .catch(() => {}),
};
export default deleteFile;
