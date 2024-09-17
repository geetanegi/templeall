import { URLS } from '../../constants';
import apiClient from '../client';
const downloadNote = {
    DownloadNotes: ({
        sessionNotesDataId,
        clientId,
        providerId,
        richText,
        sessionSummary,
        name,
        sessionNoteData,
    }: {
        sessionNotesDataId: any;
        clientId: any;
        providerId: any;
        richText: any;
        sessionSummary: any;
        name: any;
        sessionNoteData: any;
    }) =>
        apiClient
            .post(
                URLS.downloadSessionNote,
                {
                    data: {
                        sessionNotesDataId,
                        clientId,
                        providerId,
                        richText,
                        sessionSummary,
                        sessionNoteData,
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
export default downloadNote;
