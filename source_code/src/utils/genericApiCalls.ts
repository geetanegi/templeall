import apiService from "../services/apiService";
import { API_URL } from "../services/enums";

export const getFilters = async(category:string, setFilters:(value: any)=>void) =>{
    let payLoad = {}
    let endPoints = API_URL.getPlayerVideoFilter
    if(category){
        payLoad = {
            category : category
        }
        endPoints = API_URL.getFilter
    }
    
    const res = await apiService.post<any>(endPoints, {
        data: payLoad,
      });

      if (res.status === 200 && res.data && !res.data.error) {

        setFilters(res.data.data)
      }
}