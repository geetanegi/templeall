import { URLS } from '../../../constants';
import apiClient from '../../client';

const AuthorizedCodeMetaData = {
    getMetaData: () =>
        apiClient.post(URLS.authorizationCodeMetaData, {
            data: {},
        }),
};

export default AuthorizedCodeMetaData;
