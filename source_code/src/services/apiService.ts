import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
 
interface ApiResponse<T> extends AxiosResponse<T> {
  // You can extend this interface if needed
}
 
const apiService = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.get<T>(url);
    return response; // Return the entire response object
  },
 
  post: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<T>(url, data);
    return response; // Return the entire response object
  },
 
  put: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.put<T>(url, data);
    return response; // Return the entire response object
  },
 
  patch: async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.patch<T>(url, data);
    return response; // Return the entire response object
  },
 
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.delete<T>(url);
    return response; // Return the entire response object
  },
};
 
export default apiService;
 
