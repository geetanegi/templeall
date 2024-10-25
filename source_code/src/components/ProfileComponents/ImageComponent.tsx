import React, { useRef } from "react";
import { Camera } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError, ToastSuccess } from "../Toast";
import defaultUserImage from "../../assets/images/default-user 1.png";

interface userDetails {
  firstName: string;
  lastName: string;
  location: string;
}
interface ImageComponentProps {
  userDetails: userDetails;
  userCourseAndClubInfo?: any;
  fetchUserInformation: () => void;
  userId: string | number;
  image: string;
}

interface DataObjectType {
  message: string;
}
interface UploadImageType {
  data: DataObjectType;
  description: string | null;
  display: boolean;
  error: boolean;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  userDetails,
  fetchUserInformation,
  userId,
  image,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];

      // Ensure the file exists
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.type)) {
          const formData = new FormData();

          // Append the file to the FormData object
          formData.append("file", file);
          let data1 = {
            data: {
              selectedUserId:
                typeof userInfo === "object" && "userId" in userInfo
                  ? userInfo.userId
                  : undefined,
            },
          };
          // Append additional data
          const selectedUserId =
            typeof userInfo === "object" && "userId" in userInfo
              ? userInfo.userId
              : undefined;
          if (selectedUserId) {
            let newBlobData = new Blob([JSON.stringify(data1)], {
              type: "application/json",
            });
            formData.append("data", newBlobData);
          }

          // Make the API request with FormData
          const { data, status } = await apiService.post<UploadImageType>(
            API_URL.uploadProfileImage,
            formData, // Send the FormData object directly
          );

          if (status === 200 && data?.data != null && !data?.error) {
            fetchUserInformation();
            ToastSuccess(data.data.message);
          } else if (data?.error && data.description) {
            ToastError(data.description);
          }
        } else {
          ToastError("Upload failed");
        }
      }
    } catch (error) {
      ToastError("Upload failed");
    }
  };

  return (
    <div className="flex flex-col relative left- top-[-24px] h-[432px] w-[350px]">
      <button
        className={`ml-auto mt-5 z-10 cursor-pointer w-10 text-center rounded-full bg-[#1D1A0C66] p-2  ${!userId || (typeof userInfo === "object" && "userId" in userInfo && userId == userInfo.userId) ? "" : "invisible"} `}
      >
        <Camera
          onClick={handleButtonClick}
          className="cursor-pointer text-[#ffffff]"
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </button>
      <div className="relative left-[40px] top-[-68px] border-gray mx-auto h-[432px] w-[350px] border bg-gray-500 p-2  lg:border-0 lg:lg:bg-transparent">
        <div className="ml-auto" style={{width: "max-content", height: "max-content"}}>
        {image ? (
          <img
            src={`data:image/png;base64,${image}`}
            alt=""
            className="h-[432px] max-w-[340px]"
          />
        ) : (
          <img
            src={defaultUserImage}
            alt=""
            className="h-[432px] max-w-[350px]"
          />
        )}
        <div className="pr-5 relative top-[-82px] h-[82px] bg-custom-gradient-2 ">
        <div className="ml-auto" style={{ width: "max-content" }}>
          <div className="m-0 text-[#F5F6F7]">This is</div>
          <div className="m-0 text-[24px] text-[#F5F6F7]">
            {userDetails?.firstName?.charAt(0).toUpperCase() +
              userDetails?.firstName?.slice(1) || ""}{" "}
            {userDetails?.lastName?.charAt(0).toUpperCase() +
              userDetails?.lastName?.slice(1)}{" "}
          </div>
          <div className={`m-0 text-right text-[14px] text-[#F5F6F7] ${userDetails.location ? "visible" : "invisible"}`}>
            {" "}
            {userDetails?.location ? userDetails.location : "." }
          </div>
        </div>
       </div>
        </div>
      
      </div>
    </div>
  );
};

export default ImageComponent;
