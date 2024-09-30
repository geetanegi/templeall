import apiService from "../../../services/apiService"
import { API_URL } from "../../../services/enums"
import { ToastError, ToastSuccess } from "../../Toast"


export const computeMediaHeaders = (tab:number) =>{
    if(tab === 1){
        return  [
            { id: 1, key:"contestName", field: "Contest Name" },
            { id: 2, key: "club", field: "Club" },
            { id: 3, key: "course", field: "Course" },
            { id: 4, key: "hole", field: "Hole" },
            { id: 5, key: "tee", field: "Tee" },
            { id: 6, key: "playerUsername", field: "Player Username" },
            { id: 7, key: "date", field: "Date" },
            { id: 8, key: "time", field: "Time" },
            { id: 9, key: "uploade", field: "Upload" },
        ]
    }else if(tab === 2){
        return  [
            { id: 1, key:"playerUsername", field: "Player Username" },
            { id: 2, key:"requestDate", field: "Request Date" },
            { id: 3, key: "contestName", field: "Contest Name" },
            { id: 4, key: "club", field: "Club" },
            { id: 5, key: "course", field: "Course" },
            { id: 6, key: "hole", field: "Hole" },
            { id: 7, key: "tee", field: "Tee" },
            { id: 9, key: "time", field: "Time" },
            { id: 12, key: "category", field: "Category" },
            { id: 10, key: "status", field: "Status" },
            { id: 11, key: "uploade", field: "Upload" },
        ]
    }else if (tab === 3){
        return  [
            { id: 1, key:"contestName", field: "Contest Name" },
            { id: 2, key: "club", field: "Club" },
            { id: 3, key: "course", field: "Course" },
            { id: 4, key: "hole", field: "Hole" },
            { id: 5, key: "tee", field: "Tee" },
            { id: 6, key: "playerUsername", field: "Player Username" },
            { id: 7, key: "date", field: "Date" },
            { id: 8, key: "time", field: "Time" },
            { id: 9, key: "actions", field: "Actions" },
        ]
    }else{
        return []
    }
   
}


export const deleteVideos = async (type:string, reqId:string | number) =>{
    const res = await apiService.post<any>(API_URL.deleteVideo, {
        data:  {
            "requestType": type,
             "requestId": reqId
         }
      });
      if (res.status === 200 && !res.data.error) {
            ToastSuccess(res.data.data.message)
      } else if (res.data.error) {
        ToastError(res.data.description || "");
      }
}


export const computeFilterDropDown = (selectedTab:number|string, renderFor:string) => {
        if(selectedTab === 1 && renderFor === "SuperAdmin"){
            return   [
                {id:1, key:"", name: "All Videos"},
                {id:2, key:"ACE_CAM_JAKPOT", name: "Winning Shot Jakpot"},
                {id:2, key:"CLOSEST_TO_THE_PIN", name: "Winning Shot CTP"}
            ]
        }else if(selectedTab === 2 && renderFor === "SuperAdmin"){
            return   [
                {id:1, key:"", name: "All Request"},
                {id:2, key:"PENDING", name: "Pending Request"},
                {id:3, key:"APPROVED", name: "Approved Request"},
                {id:4, key:"REJECT", name: "Rejected Request"}
            ]
        }else if(renderFor === "Player"){
            return   [
                {id:1, key:"", name: "All"},
                {id:2, key:"TOP_SHOT", name: "Top Shot"},
                {id:3, key:"NOT_TOP_SHOT", name: "Not Top Shot"},
                {id:4, key:"SOTW", name: "Shot Of The Week"}
            ]
        }
}