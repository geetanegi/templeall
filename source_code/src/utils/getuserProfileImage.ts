import apiService from "../services/apiService"
import { API_URL } from "../services/enums"

 
export const getUserProfileImage = async(imageUrl: string ) =>{
    const payload = {
        "imageUrl": imageUrl

    }
    const response: any = await apiService.post<any>(
        API_URL.downloadProfileImage,
        {
            data: payload
        }
    )
    return response.data.image
}