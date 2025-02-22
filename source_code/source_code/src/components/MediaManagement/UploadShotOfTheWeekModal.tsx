import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../ModalComponent";
import { Formik, FormikHelpers } from "formik";
import { MonitorUp } from "lucide-react";
import FormikControl from "../../Formik/components/FormikControl";
import MUISelect from "../../Formik/components/MUISelect";
import CustomDatePicker from "../../Formik/components/CustomDatePicker";
import { ToastInfo, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import apiService from "../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import PageLoader from "../PageLoader";
import * as Yup from "yup";
import { setLoading } from "../../reducers/loader/loader";
import moment from "moment";
import uuid from "react-uuid";
import { AnyMessageParams } from "yup/lib/types";
import { formatDuration } from "./mediaUtils/mediaUtils";
import { getFilters } from "../../utils/genericApiCalls";
import { validationConstant } from "../../utils/validationEnums";

interface UploadVideoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (flag: boolean) => void;
  videoCategory: string;
  selectedReqVideoId: number | string;
  setIsRefreshList: (flag: boolean) => void;
  isRefreshList: boolean;
  handleInprogressVideoList: (data: any, action: string) => void;
}

const initialValue = {
  title: "",
  description: "",
  club: "",
  course: "",
  hole: "",
  tee: "",
  contestTypeId: "",
  dateTime: "",
  videoUrl: "",
  username: "",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required(validationConstant.videoTitleReq)
    .max(25, validationConstant.videoTitleMaxLength)
    .nullable(),
  description: Yup.string()
    .required(validationConstant.videoDiscriptionReq)
    .max(100, validationConstant.videoDiscriptionMaxLength)
    .nullable(),
  club: Yup.string().required(validationConstant.clubMustbeSelected)
  .nullable(),
  course: Yup.string().required(validationConstant.courseMustbeSelect)
  .nullable(),
  hole: Yup.string().required(validationConstant.holeMustbeSelected)
  .nullable(),
  tee: Yup.string().required(validationConstant.teeMustbeSelected)
  .nullable(),
  contestTypeId: Yup.string().required(validationConstant.contestNameMustbeSelected)
  .nullable(),
  dateTime: Yup.string().required(validationConstant.dateTimeMustBeSelected)
  .nullable(),
  username: Yup.string().required(validationConstant.usernameRequired)
  .nullable(),
});

const ensureUTC = (date: string | Date): string => {
  const dateObj = moment(date);

  // Check if the date is valid
  if (!dateObj.isValid()) {
    throw new Error("Invalid date provided");
  }

  // Check if the date is in UTC
  if (dateObj.utcOffset() === 0) {
    return dateObj.format(); // Return the original date as it's already in UTC
  } else {
    return dateObj.utc().format(); // Convert to UTC and return
  }
};

interface Option {
  key: string;
  value: number | string;
}

const UploadShotOfTheWeekModal: React.FC<UploadVideoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  setIsRefreshList,
  isRefreshList,
  handleInprogressVideoList,
}) => {
  const courseData = useSelector(
    (state: RootState) => state.courses.courseData,
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const clubOptions =
    courseData?.data?.map((item: { id: number; name: string }) => ({
      value: item.id,
      key: item.name,
    })) || [];
  const [selectedClub, setSelectedClub] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | "">("");
  const [courseOptions, setCourseOptions] = useState<Array<Option>>([]);
  const [holeOptions, setHoleOptions] = useState<Array<Option>>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedHole, setSelectedHole] = useState("");
  const [teeOptions, setTeeOptions] = useState<Array<Option> | null>(null);
  const [, setCheckVideo] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>({ username: "" });
  const [usersList, setUsersList] = useState<any>([]);
  const [searchUserFlag, setSearchUserFlag] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<string>("00:00");
  const [contestTypeOptions, setContestTypeOptions] = useState<{
    id: string | number;
    type: string;
  }[] | null>(null)
  const dispatch = useDispatch();

  const CHUNK_SIZE = 0.5 * 1024 * 1024;
  useEffect(() => {
    const courseList =
      courseData?.data?.find((club: any) => club.id === parseInt(selectedClub))
        ?.courseList || [];
    if (courseList.length > 0) {
      const courseListOptions =
        courseList?.map((course: any) => ({
          value: course.id,
          key: course.courseName,
        })) || [];
      setCourseOptions(courseListOptions as []);
      const holeList = courseList.find(
        (item) => item.id === parseInt(selectedCourse),
      )?.holeList;

      if (selectedCourse) {
        const holeListOptions =
          holeList?.map((item) => ({
            key:`Hole #${item?.holeNumber} - Par ${item?.par || ""}`,
            value: item.id,
          })) || [];
        setHoleOptions(holeListOptions as []);
        if (selectedHole) {
          const teeList =
            holeList?.find((hole) => hole.id === parseInt(selectedHole))
              ?.teeList || [];
          const teeOptions =
            teeList?.map((item) => ({
              key: item?.teeName + " " + `(Yards ${item?.yardage})`,
              value: item.id,
            })) || [];
          setTeeOptions(teeOptions as []);
        } else {
          setTeeOptions([]);
        }
      } else {
      }
    }
  }, [selectedClub, selectedCourse, selectedHole]);

  useEffect(() => {
    setVideoFile(null);
    setThumbnail("");
    setUsersList([]);
    if(isModalOpen){
      getFilters("contest_type", setContestTypeOptions)
    }
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
    } catch (error) {

    }finally{
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
    }
    
  };

  const generateThumbnail = (file: File) => {
    const videoURL = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = videoURL;
  
    video.addEventListener("loadeddata", () => {
      if (video.readyState >= 2) {
        video.currentTime = 2; 
        setVideoDuration(formatDuration(video.duration)); 
      }
    });
  
    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      const aspectRatio = video.videoWidth / video.videoHeight;
      canvas.width = 185; 
      canvas.height = 160/ aspectRatio; 
      // canvas.width = 160; 
      // canvas.height = 90;
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
    let vidId = uuid();
    try {
      if (videoFile) {
        dispatch(setLoading(true));
        const name = uuid() + videoFile.name;
        let fileName = new Blob([name], {
          type: "application/json",
        });
        let vidthumbnail = new Blob([thumbnail], {
          type: "application/json",
        });
        const totalChunks = Math.ceil(videoFile.size / CHUNK_SIZE);
        
        const user = selectedUser;
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
            formData.append("thumbnail", vidthumbnail);
          }
          

          if (videoFile.type === "video/mp4") {
            const data1 = {
              data: {
                dateTime: ensureUTC(values.dateTime || ""),
                contestTypeId: values.contestTypeId,
                club: values.club,
                course: values.course,
                hole: values.hole,
                tee: values.tee,
                videoDescription: values.description,
                videoTitle: values.title,
                player: user?.[0]?.id || "",
                videoLength:videoDuration,
                uploadedBy:
                  typeof userInfo === "object" ? userInfo?.userId : undefined,
              },
            };
            let newBlobData = new Blob([JSON.stringify(data1)], {
              type: "application/json",
            });
            formData.append("data", newBlobData);

            const { data, status } = await apiService.post<any>(
              API_URL.uploadShotOfTheWeek,
              formData,
            );
            if (status === 200 && data?.data != null && !data?.error) {
              if (i === 0) {
                setIsModalOpen(false);
                dispatch(setLoading(false));
                setSelectedUser({ username: "" });
              }
              handleInprogressVideoList(
                {
                  ...data1.data,
                  vidId: vidId,
                  firstName: user?.[0]?.firstName || "",
                  lastName: user?.[0]?.lastName || "",
                  username: user?.[0]?.username || "",
                  isPublished: false,
                  clubName: clubOptions.filter(
                    (item: any) => item.value === values.club,
                  )?.[0]?.key,
                  courseName: courseOptions.filter(
                    (item: { key: string; value: number | string }) =>
                      item.value === values.course,
                  )?.[0]?.key,
                  holeNumber: holeOptions.filter(
                    (item: { key: string; value: number | string }) =>
                      item.value === values.hole,
                  )?.[0]?.key,
                  teeName: teeOptions?.filter(
                    (item: { key: string; value: number | string }) =>
                      item.value === values.tee,
                  )?.[0]?.key,
                  type: "SOTW",
                  chunkNo: i + 1,
                  totalchunk: totalChunks,
                },
                "add",
              );

              if (totalChunks === i + 1) {
                handleInprogressVideoList({ vidId }, "remove");
                ToastSuccess(data?.data?.message);
                setIsRefreshList(!isRefreshList);
              }
            } else if (data?.error && data.description) {
              ToastInfo(data.description);
              handleInprogressVideoList({ vidId }, "remove");
              setUsersList([]);
              dispatch(setLoading(false));
              break
            }
          } else {
            ToastInfo(
              "The uploaded video is not in MP4 format. Please upload a valid MP4 file",
            );
            handleInprogressVideoList({ vidId }, "remove");
            break
          }
        }
      } else {
        ToastInfo(
          "No video has been uploaded. Please upload an MP4 video under 250MB.",
        );
      }
    } catch (error) {
      console.error(error);
      handleInprogressVideoList({ vidId }, "remove");
    } finally {
      setUsersList([]);
    }
  };

  const getPlayer = async (searchString: string) => {
    if (searchString?.trim().length) {
      try {
        const payload = {
          username: searchString,
          firstName: searchString,
          lastName: searchString,
        };
        const { data, status } = await apiService.post<any>(
          API_URL.searchPlayer,
          { data: { searchParams: payload } },
        );
        if (status === 200 && data?.data != null && !data?.error) {
          setUsersList(data.data.content);
          setSearchUserFlag(false);
        } else if (data?.error && data.description) {
          setSearchUserFlag(true);
        }
      } catch (error) {}
    } else {
      setUsersList([]);
    }
  };

  const handleUserSearch = function (
    callback: (userSearchInput: string) => void,
    delay: number,
  ) {
    let timeoutId: any;
    return (args: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback(args);
      }, delay);
    };
  };

  const debouncFunction = useCallback(handleUserSearch(getPlayer, 1000), []);

  const handleValues = useCallback((values: any) => {
    setSelectedClub(values.club);
    setSelectedCourse(values.course);
    setSelectedHole(values.hole);
  }, []);

  const getUsernameList = (usersList: any) => {
    const arr: Array<AnyMessageParams> = [];
    usersList.forEach((element: any) => {
      arr.push(element.username);
    });
    return arr;
  };
  return (
    <div>
      <PageLoader isActive={loader}>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedUser({ username: "" });
            setCheckVideo(false);
            setIsModalOpen(false);
          }}
          title="Upload Shot of the Week"
        >
          <Formik
            initialValues={
              selectedUser
                ? { ...initialValue, username: selectedUser.username }
                : initialValue
            }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit, isSubmitting }) => {
              handleValues(values);
              return (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="scrollbar-hidden h-[360px] overflow-auto pt-[6px]">
                    <div className="pb-5" onClick={() => {}}>
                      <div className="mb-3 px-5">
                        <MUISelect
                          label="Club"
                          name="club"
                          required={true}
                          options={clubOptions}
                        />
                      </div>
                      <div className="mb-3 px-5">
                        <MUISelect
                          label="Course"
                          name="course"
                          required={true}
                          options={courseOptions || []}
                        />
                      </div>
                      <div className="mb-3 px-5">
                        <MUISelect
                          label="Hole"
                          name="hole"
                          required={true}
                          options={holeOptions || []}
                        />
                      </div>
                      <div className="mb-3 px-5">
                        <MUISelect
                          label="Tee"
                          name="tee"
                          required={true}
                          options={teeOptions || []}
                        />
                      </div>

                      <div className="mb-3 px-5">
                        <MUISelect
                          label="Contest Type"
                          name="contestTypeId"
                          required={true}
                          options={contestTypeOptions?.map((item) => ({
                            value: item.id,
                            key: item.type,
                          })) || []}
                        />
                      </div>
                      <div className="px-5">
                        <CustomDatePicker
                          name="dateTime"
                          label="Date/Time"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="relative mb-5 px-5">
                      <FormikControl
                        label="Player Username"
                        name="username"
                        control="searchInput"
                        className="w-full"
                        noOptionsText={
                          searchUserFlag
                            ? "No player available"
                            : "Search player"
                        }
                        options={
                          usersList.length ? getUsernameList(usersList) : []
                        }
                        value={values.username || ''}
                        placeholder="Player Username"
                        onSelect={(user: any) => {
                          const a = usersList.filter(
                            (item: any) => item.username === user,
                          );
                          setSelectedUser(a);
                        }}
                        onInputChange={(event: any) => {
                          debouncFunction(event?.target?.value);
                          if (!event?.target?.value.length) {
                            setUsersList([]);
                          }
                        }}
                        onFocus={() => {
                          setUsersList([]);
                          setSearchUserFlag(false);
                        }}
                        type="text"
                        required={true}
                      />
                    </div>
                    <div>
                      <div className="flex px-5">
                        <FormikControl
                          label="Video Title"
                          name="title"
                          control="customInput"
                          className="w-full"
                          type="text"
                          required={true}
                        />
                      </div>
                      <div className="flex px-5">
                        <FormikControl
                          label="Video Description"
                          name="description"
                          control="textarea"
                          type="text"
                          required={true}
                        />
                      </div>
                      <div className="flex gap-5 px-5">
                        <div className="text-center h-[92px] w-[120px] overflow-hidden rounded-md border border-gray-400">
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt=""
                              className="h-full mx-auto"
                            />
                          ) : null}
                        </div>
                        <div className="">
                          <div
                            className="ml-auto flex h-[92px] w-[350px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#7B7887] bg-[#F5F6F7]"
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
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6">
                    <button
                      type="button"
                      onClick={() => {
                        setCheckVideo(false);
                        setIsModalOpen(false);
                        setSelectedUser({ username: "" });
                      }}
                      className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-32 rounded-md bg-primaryColor py-2 text-white"
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

export default UploadShotOfTheWeekModal;
