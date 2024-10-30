import { CheckCheck, CopyX, Trash2 } from "lucide-react";
import React from "react";
import { ToastError, ToastSuccess } from "../Toast";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { useDispatch } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import { timeAgo } from "../../utils/TimeUtils";

type Notification = {
  id: number;
  userId: number;
  message: string;
  isRead: boolean;
  readAt: string;
  createdDate: string;
};

interface NotificationComponentProps {
  notficationList: Array<Notification>;
  getAllNotification: ()=>void
}

const NotificationPopoverComponent: React.FC<NotificationComponentProps> = ({
  notficationList,
  getAllNotification
}) => {
  const dispatch = useDispatch();


  const markNotiicationAsRead = async(notificationId:number | string) =>{
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.notificationMarkAsRead,
        {
          data: {
            userNotificationIds : notificationId
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        getAllNotification()
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
    }

  }

  const clearNotification = async(notificationId:number | string, toastFlag:boolean)=>{
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.clearNotification,
        {
          data: {
            userNotificationIds : notificationId
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        getAllNotification()
        if(toastFlag){
          ToastSuccess(data.data.message)
        }
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="flex h-[325px] w-[350px] flex-col">
      <div className="pt-auto border-b flex min-h-[46px]">
        <h3 className="mx-4 my-auto">Notifications</h3>
      </div>
      <div className="flex-grow overflow-auto">
        {notficationList &&
          notficationList?.map((notification) => (
            <>
              <div
                className={`flex cursor-pointer items-center gap-5 px-5 py-3 ${notification.isRead ? "bg-[#ffffff]" : "border-l-4 border-[#FFC93F] bg-[#0462211A]"}`}
                onClick={()=>markNotiicationAsRead(notification.id)}
              >
                <div className="flex w-[90%] flex-col">
                  <span className="text-justify text-sm">
                    {notification.message}
                  </span>
                  <span className="text-gray-500 text-[12px]">{timeAgo(notification.createdDate)}</span>
                </div>
                <Trash2 size={14} className="text-primaryColor" onClick={()=>clearNotification(notification.id, true)} />
              </div>
              <div className="h-[1px] bg-[#04622133]"></div>
            </>
          ))}
      </div>  
      <div className="pt-auto mt-auto flex min-h-[46px] justify-end gap-4 border-t px-5">
        <button className="flex items-center justify-center gap-2 text-[14px] text-primaryColor"
          onClick={()=>{
            clearNotification(notficationList.map(notification => notification.id).join(','),false)
          }}
        >
          <CopyX size={14} /> Clear All{" "}
        </button>
        <button className="flex items-center justify-center gap-2 text-[14px] text-primaryColor"
          onClick={()=>{
            markNotiicationAsRead(notficationList.map(notification => notification.id).join(','))
          }}
        >
          <CheckCheck size={14} /> Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationPopoverComponent;
