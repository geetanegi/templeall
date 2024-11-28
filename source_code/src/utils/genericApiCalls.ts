import apiService from "../services/apiService";
import { API_URL } from "../services/enums";

export const getFilters = async(category:string, setFilters:(value: any)=>void) =>{
    const res = await apiService.post<any>(API_URL.getContestTypeFilter, {
        data: {
            category : category
        },
      });

      if (res.status === 200 && res.data && !res.data.error) {

        setFilters(res.data.data)
      }
}