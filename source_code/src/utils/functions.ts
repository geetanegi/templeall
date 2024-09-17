import apiClient from '../api/client';

export async function logout(): Promise<boolean> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('access_token');
    return true;
}
