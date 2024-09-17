import { URLS } from '../../../constants';
import apiClient from '../../client';
const downloadInterventionFile = {
    DownloadInterventionFile: ({ id, name }: { id: any; name: any }) =>
        apiClient
            .post(
                URLS.downloadDocIntervention,
                {
                    data: {
                        id: id,
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
export default downloadInterventionFile;
