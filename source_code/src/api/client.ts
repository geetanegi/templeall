import axios from 'axios';
import { BASE_URL } from '../constants';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

apiClient.defaults.withCredentials = true;

apiClient.interceptors.response.use(
    (response: any) => {
        if (response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.setItem(
                'prevState',
                window.btoa(window.location.href)
            );
        }
        return response;
    },
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.setItem(
                'prevState',
                window.btoa(window.location.href)
            );
        }
        throw error;
    }
);

apiClient.interceptors.request.use(
    (config) => {
        const access_token =
            localStorage?.access_token != undefined
                ? JSON.parse(localStorage?.access_token)
                : '';
        // Modify headers, add authentication token, etc.
        if (access_token) {
            config.headers['Authorization'] = 'Bearer ' + access_token?.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAuth = (url: string): Promise<any> => {
    return apiClient.get(url);
};

export const postAuth = (url: string, data: any): Promise<any> => {
    return apiClient.post(url, data);
};
export const putAuth = (url: string, data: any): Promise<any> => {
    return apiClient.put(url, data);
};
export const deleteAuth = (url: string, data?: any): Promise<any> => {
    const requestOptions: any = {};
    if (data) {
        requestOptions.data = { ...data };
    }

    return apiClient.delete(url, requestOptions);
};

export default apiClient;
