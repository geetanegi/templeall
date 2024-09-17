import { URLS } from '../../../constants';
import apiClient from '../../client';
const downloadFile = {
    DownloadFile: ({
        id,
        fileId,
        name,
    }: {
        id: any;
        fileId: number;
        name: string;
    }) =>
        apiClient
            .post(
                URLS.downloadFileUrl,
                {
                    data: {
                        programBookFileId: fileId,
                        programBookUUID: id,
                    },
                },
                {
                    responseType: 'blob',
                }
            )
            .then((response) => {
                const href = window.URL.createObjectURL(response.data);
                // create "a" HTML element with href to file & click
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', name); //or any other extension
                document.body.appendChild(link);
                link.click();
                // clean up "a" element & remove ObjectURL
                document.body.removeChild(link);
                window.URL.revokeObjectURL(href);
            })
            .catch(() => {}),
};
export default downloadFile;
