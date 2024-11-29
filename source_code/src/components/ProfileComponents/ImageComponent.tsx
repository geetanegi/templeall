import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError, ToastInfo, ToastSuccess } from "../Toast";
import defaultUserImage from "../../assets/images/default-user 1.png";
import ImageCropperModal from "./CommunityPanel/ImageCropperModal";
import { setLoading } from "../../reducers/loader/loader";
import PageLoader from "../PageLoader";

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
  const dispatch = useDispatch();

  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [OpenModal, setModalOpen] = useState(false);
  const [fileKey, setFileKey] = useState(0); // This will ensure the input resets
  const [imageSrc, setImageSrc] = useState<string>(""); // Store the data URL

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleCropComplete = async (croppedImage: string) => {
    // Handle the cropped image here

    try {
      setModalOpen(false);
      dispatch(setLoading(true));
      // Convert the blob URL to a Blob object
      const response = await fetch(croppedImage);
      const blob = await response.blob(); // Get the Blob from the URL

      // Create a File from the Blob
      const newCroppedFile = new File([blob], "cropped-image.png", {
        type: "image/png",
      });

      // console.log("Cropped File:", newCroppedFile);

      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", newCroppedFile);

      // Additional data to be sent to the server
      let data1 = {
        data: {
          selectedUserId:
            typeof userInfo === "object" && "userId" in userInfo
              ? userInfo.userId
              : undefined,
        },
      };

      // Append additional data if available
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
        setModalOpen(false);
        ToastSuccess(data.data.message);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error("Error uploading the cropped image:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];

      if (file) {
        setFileKey((prevKey) => prevKey + 1);

        const allowedTypes = ["image/jpeg", "image/png"];
        if (allowedTypes.includes(file.type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              setImageSrc(reader.result); // Set the image source to data URL
            }
          };
          reader.readAsDataURL(file);
          setModalOpen(true);
        } else {
          ToastInfo("Upload failed");
        }
      }

      // Ensure the file exists
      // if (file) {
      //   const allowedTypes = ["image/jpeg", "image/png"];
      //   if (allowedTypes.includes(file.type)) {
      //     const formData = new FormData();

      //     // Append the file to the FormData object
      //     formData.append("file", file);
      //     let data1 = {
      //       data: {
      //         selectedUserId:
      //           typeof userInfo === "object" && "userId" in userInfo
      //             ? userInfo.userId
      //             : undefined,
      //       },
      //     };
      //     // Append additional data
      //     const selectedUserId =
      //       typeof userInfo === "object" && "userId" in userInfo
      //         ? userInfo.userId
      //         : undefined;
      //     if (selectedUserId) {
      //       let newBlobData = new Blob([JSON.stringify(data1)], {
      //         type: "application/json",
      //       });
      //       formData.append("data", newBlobData);
      //     }

      //     // Make the API request with FormData
      //     const { data, status } = await apiService.post<UploadImageType>(
      //       API_URL.uploadProfileImage,
      //       formData, // Send the FormData object directly
      //     );

      //     if (status === 200 && data?.data != null && !data?.error) {
      //       fetchUserInformation();
      //       ToastSuccess(data.data.message);
      //     } else if (data?.error && data.description) {
      //       ToastInfo(data.description);
      //     }
      //   } else {
      //     ToastInfo("Upload failed");
      //   }
      // }
    } catch (error) {
      ToastError("Upload failed");
    }
  };


  return (
    <PageLoader isActive={loader}>
      <div className="left- relative top-[-24px] flex h-[432px] w-[300px] flex-col ml-5">
        <button
          className={`z-10 ml-auto mt-5 w-10 cursor-pointer rounded-full bg-[#1D1A0C66] p-2 text-center ${!userId || (typeof userInfo === "object" && "userId" in userInfo && userId == userInfo.userId) ? "" : "invisible"} `}
        >
          <Camera
            onClick={handleButtonClick}
            className="cursor-pointer text-[#ffffff]"
          />
          <input
            key={fileKey}
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </button>
        <div className="border-gray relative left-[-10px] top-[-68px] mx-auto h-[432px] w-[360px] border bg-gray-500 p-2 lg:border-0 lg:lg:bg-transparent">
          <div
            className="ml-auto"
            style={{ width: "max-content", height: "max-content" }}
          >
            {image ? (
              <img
                src={image}
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
            <div className="relative top-[-82px] h-[82px] bg-custom-gradient-2 pr-10">
              <div className="ml-auto leading-6" style={{ width: "max-content" }}>
                {userDetails?.firstName && (
                  <div className="m-0 text-[#F5F6F7] text-[13px] font-normal pt-[6px]">This is</div>
                )}
                <div className="m-0 text-[24px] text-[#F5F6F7] font-medium">
                  {userDetails?.firstName?.charAt(0).toUpperCase() +
                    userDetails?.firstName?.slice(1) || ""}{" "}
                  {userDetails?.lastName?.charAt(0).toUpperCase() +
                    userDetails?.lastName?.slice(1)}{" "}
                </div>
                <div
                  className={`m-0 text-right text-[14px] font-normal text-[#F5F6F7] ${userDetails.location ? "visible" : "invisible"}`}
                >
                  {" "}
                  {userDetails?.location ? userDetails.location : "."}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ImageCropperModal
          OpenModal={OpenModal}
          onClose={() => setModalOpen(false)}
          title="croper image "
          imageSrc={imageSrc}
          handleCropComplete={handleCropComplete}
        />
      </div>
    </PageLoader>
  );
};
export default ImageComponent;
