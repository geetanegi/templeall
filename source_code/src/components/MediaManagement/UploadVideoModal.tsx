import React, { useEffect, useRef, useState } from "react";
import Modal from "../ModalComponent";
import { Formik, FormikHelpers } from "formik";
import { MonitorUp } from "lucide-react";
import FormikControl from "../../Formik/components/FormikControl";

import { ToastInfo, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import apiService from "../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import PageLoader from "../PageLoader";
import * as Yup from "yup";
import { setLoading } from "../../reducers/loader/loader";
import uuid from "react-uuid";
interface UploadVideoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void;
  isSoTW: boolean;
  videoCategory: string;
  selectedReqVideoId: number | string;
  setIsRefreshList: (flag: boolean) => void;
  isRefreshList: boolean;
  selectedTab: number;
  handleReqVideoInprogressList: (data: any, action: string) => void;
}

const initialValue = {
  title: "",
  description: "",
  club: "",
  course: "",
  hole: "",
  tee: "",
  dateTime: "",
  videoUrl: "",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Video title is required.")
    .max(25, "Video title must be less than 25 characters"),
  description: Yup.string()
    .required("Video description is required.")
    .max(100, "Video description must be less than 100 characters"),
});

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({
  selectedTab,
  isModalOpen,
  setIsModalOpen,
  videoCategory,
  selectedReqVideoId,
  setIsRefreshList,
  isRefreshList,
  handleReqVideoInprogressList,
}) => {
  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | "">("");
  const [checkvideo, setCheckVideo] = useState<boolean>(false);

  const dispatch = useDispatch();

  const CHUNK_SIZE = 0.5 * 1024 * 1024;

  useEffect(() => {
    setVideoFile(null);
    setThumbnail("");
  }, [isModalOpen]);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        setVideoFile(file);
        generateThumbnail(file);
        setCheckVideo(false);
      } else {
        setCheckVideo(true);
      }
    } catch (error) {}
  };

  const generateThumbnail = (file: File) => {
    const videoURL = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = videoURL;

    video.addEventListener("loadeddata", () => {
      if (video.readyState >= 2) {
        video.currentTime = 2; // Set the time to capture the thumbnail (in seconds)
      }
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = 160; // Set the desired width for the thumbnail
      canvas.height = 90; // Set the desired height for the thumbnail
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        setThumbnail(dataURL); // Set the generated thumbnail URL
      }
    });

    video.load();
  };

  const handleSubmit = async (values: any, {}: FormikHelpers<any>) => {
    try {
      dispatch(setLoading(true));
      if (videoFile) {
        const name = uuid() + videoFile.name;
        let fileName = new Blob([name], {
          type: "application/json",
        });
        let vidthumbnail =
          thumbnail &&
          new Blob([thumbnail], {
            type: "application/json",
          });
        const totalChunks = Math.ceil(videoFile.size / CHUNK_SIZE);
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, videoFile.size);
          const chunk = videoFile.slice(start, end);
          let formData = new FormData();
          formData.append("file", chunk);
          let chunkNo = i + 1;
          formData.append("fileName", fileName);
          let chunkNumber = new Blob([JSON.stringify(chunkNo)], {
            type: "application/json",
          });
          formData.append("chunkNumber", chunkNumber);
          let fdTOtalChunk = new Blob(
            [JSON.stringify(totalChunks.toString())],
            {
              type: "application/json",
            },
          );

          formData.append("totalChunks", fdTOtalChunk);
          if (totalChunks === i + 1) {
            vidthumbnail && formData.append("thumbnail", vidthumbnail);
          }
          if (videoFile.type === "video/mp4") {
            const data1 = {
              data: {
                requestType:
                  selectedTab === 1 ? "WINNER_VIDEO" : "REQUEST_VIDEO",
                videoCategory: "TOP_SHOT",
                videoDescription: values.description,
                videoTitle: values.title,
                requestId: selectedReqVideoId,
                uploadedBy:
                  typeof userInfo === "object" ? userInfo?.userId : undefined,
              },
            };

            let newBlobData = new Blob([JSON.stringify(data1)], {
              type: "application/json",
            });
            formData.append("data", newBlobData);

            const { data, status } = await apiService.post<any>(
              API_URL.uploadVideoInChunks,
              formData,
            );
            if (status === 200 && data?.data != null && !data?.error) {
              if (i === 0) {
                setIsModalOpen(false);
                dispatch(setLoading(false));
              }
              handleReqVideoInprogressList(
                {
                  id: selectedReqVideoId,
                  chunkNo: i + 1,
                  totalchunk: totalChunks,
                },
                "add",
              );

              if (totalChunks === i + 1) {
                handleReqVideoInprogressList(
                  { id: selectedReqVideoId },
                  "remove",
                );
                ToastSuccess(data?.data?.message);
                setIsRefreshList(!isRefreshList);
              }
            } else if (data?.error && data.description) {
              ToastInfo(data.description);
              handleReqVideoInprogressList(
                { id: selectedReqVideoId },
                "remove",
              );
            }
          } else {
            ToastInfo(
              "The uploaded video is not in MP4 format. Please upload a valid MP4 file",
            );
            handleReqVideoInprogressList({ id: selectedReqVideoId }, "remove");
          }
        }
      } else {
        ToastInfo(
          "No video has been uploaded. Please upload an MP4 video under 250MB.",
        );
      }
    } catch (error) {
      ToastInfo("Video Upload Failed");
    } finally {
      setIsModalOpen(false);
      dispatch(setLoading(false));
    }
  };

  const scrollbarStyles: React.CSSProperties = {
    overflow: "auto", // Enable scrolling
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
  };

  return (
    <div>
      <PageLoader isActive={loader}>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setCheckVideo(false);
            setIsModalOpen(false);
          }}
          title="Upload Video"
        >
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div
                    className="scrollbar-hidden h-[360px] overflow-auto pt-[6px]"
                    style={scrollbarStyles}
                  >
                    <div className="mb-3 px-5">
                      <span
                        className={`text-[gray] ${videoCategory === "WINNER_VIDEO" ? "hidden" : "visible"}`}
                      >
                        Video Category :
                      </span>
                      <span className="font-semibold text-[#000000]">
                        {" "}
                        {videoCategory === "TOP_SHOT"
                          ? "Top Shot"
                          : videoCategory === "NOT_TOP_SHOT"
                            ? "Not Top Shot"
                            : ""}
                      </span>
                    </div>
                    <div className="flex px-5">
                      <FormikControl
                        label="Video Title"
                        name="title"
                        control="customInput"
                        className="w-full"
                        placeholder="Your First Name"
                        type="text"
                        required={true}
                      />
                    </div>
                    <div className="flex px-5">
                      <FormikControl
                        label="Video Description"
                        name="description"
                        control="textarea"
                        placeholder="Video Description"
                        type="text"
                        required={true}
                      />
                    </div>
                    <div className="flex gap-5 px-5">
                      <div className="h-[92px] w-[120px] rounded-md border border-gray-400">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt=""
                            className="h-[92px] w-[120px] rounded-md"
                          />
                        ) : null}
                      </div>
                      <div className="">
                        <div
                          className="ml-auto flex h-[92px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#7B7887] bg-[#F5F6F7]"
                          onClick={handleButtonClick}
                        >
                          <MonitorUp className="text-[#7B7887]" />
                          <div className="text-[#7B7887]">Upload Video</div>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          id="videoUpload"
                          accept="video/*"
                          className="hidden"
                          onChange={handleVideoUpload}
                          name="videoUrl"
                        />
                      </div>
                    </div>
                    <div className="mb-5 ml-6 w-[450px]">
                      {checkvideo &&
                        errors.videoUrl &&
                        typeof errors.videoUrl === "string" && (
                          <span className="text-red-600">
                            {errors.videoUrl}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 md:w-[480px]">
                    <button
                      type="button"
                      onClick={() => {
                        setCheckVideo(false);
                        setIsModalOpen(false);
                      }}
                      className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-32 rounded-md bg-lime-500 py-2 text-white"
                    >
                      Save
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </Modal>
      </PageLoader>
    </div>
  );
};

export default UploadVideoModal;
