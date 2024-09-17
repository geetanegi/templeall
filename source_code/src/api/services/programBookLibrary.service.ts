import { URLS } from '../../constants';
import apiClient from '../client';

const programBookLibraryApis = {
    getAllProgramLibraries: () => {
        return apiClient.post(URLS.getAllProgramLibraries, {});
    },
};

export default programBookLibraryApis;
