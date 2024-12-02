import React, { useEffect, useState } from "react";

// lucide icons imports
import { FileVideo2 } from "lucide-react";
import MediaManagementTable from "./MediaManagementTable";
import UploadVideoModal from "./UploadVideoModal";
import VideoPlayer from "./VideoPlayer";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import PlayerMediaPage from "./PlayerMediaPage";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastInfo, ToastSuccess } from "../Toast";
import { setCourseData } from "../../reducers/Courses_data/courses";
import { setLoading } from "../../reducers/loader/loader";
import RejectConfirmationModal from "./RejectConfirmationModal";
// import { computeFilterDropDown } from "./mediaUtils/mediaUtils";
import UploadShotOfTheWeekModal from "./UploadShotOfTheWeekModal";
import { getFilters } from "../../utils/genericApiCalls";
import { decryptData, secretKey } from "../../utils/encrypt";

interface MediaManagementProps {}

type ContestType = {
  id: string | number;
  type: string;
  displayName: string;
};

// type ContestType = {
//   id: string | number;
//   type: string;
//   displayName: string
// };

const MediaManagement: React.FC<MediaManagementProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSOTWModalOpen, setIsSOTWModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] =
    useState<boolean>(false);
  const [isSoTW, setIsSoTW] = useState<boolean>(false);
  const [videoCategory, setVideoCategory] = useState<string>("");
  const [selectedReqVideoId, setSelectedReqVideoId] = useState<number | string>(
    "",
  );
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [isRefreshList, setIsRefreshList] = useState<boolean>(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [updateStatusData, setUpdateStatusData] = useState<{
    id: string | number;
    status: string;
    statusId: string | number;
  }>({ id: "", status: "", statusId: "" });
  const [filterValue, setFilterValue] = useState<string>("");
  const [mediaCounts, setMediaCounts] = useState<any>({});
  const [isStatusChange, setIsStatusChange] = useState<boolean>(false);
  const [dataLength, setDataLength] = useState<number>(0);
  const [uploadProgressArr, setUploadProgressArr] = useState<Array<any>>([]);
  const [uploadSotwProgressArr, setUploadSotwProgressArr] = useState<
    Array<any>
  >([]);
  const [filterArray, setFilterArray] = useState<ContestType[]>([]);
  const userPermisions = JSON.parse(
    decryptData(
      useSelector((state: RootState) => state.auth.userPermissions),
      secretKey,
    ),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsSoTW(false);
    getAllMediaCounts();
    setFilterValue("");
  }, [selectedTab, isRefreshList, uploadProgressArr, uploadSotwProgressArr]);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const computeFilterDropDown = (selectedTab: number) => {
    if (selectedTab === 1) {
      getFilters("contest_type", setFilterArray);
    } else if (selectedTab === 2) {
      getFilters("request_status", setFilterArray);
    }
  };

  useEffect(() => {
    computeFilterDropDown(selectedTab);
  }, [selectedTab]);

  const getAllMediaCounts = async () => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.getAllMediaCounts,
        {
          data: {},
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setMediaCounts(data.data);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourseData = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiService.post<any>(API_URL.getCourseData, {
        data: {
          sortDir: "ASC",
          sortBy: "courseName",
          pageNumber: "0",
          pageSize: "10",
        },
      });
      if (res.status === 200 && !res.data.error) {
        dispatch(setCourseData(res.data));
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateStatus = async (
    id: number | string,
    status: string,
    statusId: number | string,
    rejectReasons?: string,
  ) => {
    const updatedStatus = status === "Rejected" ? "Reject" : status;
    try {
      let payload = {};
      payload = {
        requestVideoId: id,
        statusId: statusId,
      };

      if (updatedStatus === "Reject") {
        payload = {
          ...payload,
          rejectionReason: rejectReasons,
        };
      }

      const { data, status } = await apiService.post<any>(
        API_URL.updateVideoStatus,
        {
          data: payload,
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        ToastSuccess(data?.data?.message);
        setIsRefreshList(!isRefreshList);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value);
  };

  const handleInprogressVideoList = (data: any, action: string) => {
    if (action === "add") {
      setUploadSotwProgressArr((prevArr) => {
        const videoIndex = prevArr.findIndex(
          (item) => item.vidId === data.vidId,
        );

        if (videoIndex !== -1) {
          const updatedArr = [...prevArr];
          updatedArr[videoIndex] = { ...updatedArr[videoIndex], ...data };
          return updatedArr;
        } else {
          return [{ ...data }, ...prevArr];
        }
      });
    } else if (action === "remove") {
      setUploadSotwProgressArr((prevArr) =>
        prevArr.filter((item) => item.vidId !== data.vidId),
      );
    }
  };

  const handleReqVideoInprogressList = (data: any, action: string) => {
    if (action === "add") {
      setUploadProgressArr((prevArr) => {
        const videoIndex = prevArr.findIndex((item) => item.id === data.id);

        if (videoIndex !== -1) {
          const updatedArr = [...prevArr];
          updatedArr[videoIndex] = { ...updatedArr[videoIndex], ...data };
          return updatedArr;
        } else {
          return [{ ...data }, ...prevArr];
        }
      });
    } else if (action === "remove") {
      setUploadProgressArr((prevArr) =>
        prevArr.filter((item) => item.id !== data.id),
      );
    }
  };

  if (userPermisions?.permission["is_player"]) {
    return <PlayerMediaPage />;
  } else if (!userPermisions?.permission) {
    return <div className="h-[100vh] bg-[#ffffff]"></div>;
  }



  return (
    <div
      className="mb-[30px] min-h-[88vh] w-full bg-[#ffffff] bg-fixed p-[24px] pb-5"
      style={{ height: "max-content" }}
    >
      <div className="flex justify-between">
        {!userPermisions?.permission["is_player"] ? (
          <div
            className="flex gap-[4px] rounded-l-full rounded-r-full border bg-[#F5F6F7] p-[2px]"
            style={{ width: "max-content" }}
          >
            <button
              className={`flex items-center justify-center whitespace-nowrap rounded-l-full rounded-r-full px-[16px] py-[2px] font-[14px] ${selectedTab === 1 ? "bg-primaryColor text-[#ffffff]" : "text-[#7B7887]"} `}
              onClick={() => setSelectedTab(1)}
            >
              <FileVideo2
                className={`mr-2 h-[16px] w-[16px] ${selectedTab === 1 ? "text-[#ffffff]" : "text-[#7B7887]"}`}
              />
              Winning Shots
              <span className="ml-[16px] h-[14px] w-[26px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000]">
                {selectedTab === 1 && filterValue
                  ? dataLength
                  : mediaCounts.Video_Management || 0}
              </span>
            </button>
            {userPermisions?.permission["is_super_admin"] ? (
              <>
                <button
                  className={`flex items-center justify-center whitespace-nowrap rounded-l-full rounded-r-full px-[16px] py-[2px] font-[14px] ${selectedTab === 2 ? "bg-primaryColor text-[#ffffff]" : "text-[#7B7887]"} `}
                  onClick={() => setSelectedTab(2)}
                >
                  <FileVideo2
                    className={`mr-2 h-[16px] w-[16px] ${selectedTab === 2 ? "text-[#ffffff]" : "text-[#7B7887]"}`}
                  />
                  Requested Videos
                  <span className="ml-[16px] h-[14px] w-[26px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000]">
                    {selectedTab === 2 && filterValue
                      ? dataLength
                      : mediaCounts.Requested_Video || 0}
                  </span>
                </button>
                <button
                  className={`flex items-center justify-center whitespace-nowrap rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 3 ? "bg-primaryColor text-[#ffffff]" : "text-[#7B7887]"} `}
                  onClick={() => setSelectedTab(3)}
                >
                  <FileVideo2
                    className={`mr-2 h-[16px] w-[16px] ${selectedTab === 3 ? "text-[#ffffff]" : "text-[#7B7887]"}`}
                  />
                  Shot of the Week
                  <span className="ml-[16px] h-[14px] w-[26px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000]">
                    {Number(mediaCounts.Shot_Of_The_Week) +
                      uploadSotwProgressArr.length || 0}
                  </span>
                </button>
              </>
            ) : null}
          </div>
        ) : null}
        <div className="flex gap-[16px]">
          {selectedTab !== 3 ? (
            <div className="align-center flex">
              <select
                id="courses"
                defaultValue={filterValue}
                className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:mt-0 md:w-[320px]"
                onChange={handleFilterChange}
              >
                <option value={""}>All videos</option>
                {filterArray?.map((filter) => {
                  return (
                    <option key={filter.id} value={filter.id}>
                      {filter.displayName}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {selectedTab === 3 && userPermisions?.permission["is_super_admin"] ? (
            <button
              className="flex items-center justify-center whitespace-nowrap rounded-md bg-primaryColor px-6 font-[14px] text-[#ffffff]"
              onClick={() => {
                setIsSoTW(true);
                setIsSOTWModalOpen(true);
              }}
            >
              <FileVideo2 size={18} className="mr-2 text-[#ffffff]" />
              Add Shot of the Week
            </button>
          ) : null}
        </div>
      </div>
      <MediaManagementTable
        setIsVideoPlayerVisible={setIsVideoPlayerVisible}
        selectedTab={selectedTab}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setVideoCategory={setVideoCategory}
        setSelectedReqVideoId={setSelectedReqVideoId}
        setSelectedVideo={setSelectedVideo}
        isRefreshList={isRefreshList}
        setUpdateStatusData={setUpdateStatusData}
        setIsRejectModalOpen={setIsRejectModalOpen}
        handleUpdateStatus={handleUpdateStatus}
        filterValue={filterValue}
        isCourseAdmin={userPermisions?.permission["is_course_admin"]}
        setIsStatusChange={setIsStatusChange}
        isStatusChange={isStatusChange}
        setDataLength={setDataLength}
        uploadProgressArr={uploadProgressArr}
        isSOTWModalOpen={isSOTWModalOpen}
        uploadSotwProgressArr={uploadSotwProgressArr}
        getAllMediaCounts={getAllMediaCounts}
      />

      <UploadVideoModal
        isModalOpen={isModalOpen}
        selectedTab={selectedTab}
        setIsModalOpen={setIsModalOpen}
        isSoTW={isSoTW}
        videoCategory={videoCategory}
        selectedReqVideoId={selectedReqVideoId}
        setIsRefreshList={setIsRefreshList}
        isRefreshList={isRefreshList}
        handleReqVideoInprogressList={handleReqVideoInprogressList}
      />
      <UploadShotOfTheWeekModal
        isModalOpen={isSOTWModalOpen}
        setIsModalOpen={setIsSOTWModalOpen}
        isSoTW={isSoTW}
        videoCategory={videoCategory}
        selectedReqVideoId={selectedReqVideoId}
        setIsRefreshList={setIsRefreshList}
        isRefreshList={isRefreshList}
        // setUploadProgressArr={setUploadSotwProgressArr}
        // uploadSotwProgressArr={uploadSotwProgressArr}
        handleInprogressVideoList={handleInprogressVideoList}
      />
      <div className="fixed bottom-1 right-0 z-50">
        <VideoPlayer
          isVideoPlayerVisible={isVideoPlayerVisible}
          setIsVideoPlayerVisible={setIsVideoPlayerVisible}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
        />
      </div>
      <RejectConfirmationModal
        isRejectModalOpen={isRejectModalOpen}
        setIsRejectModalOpen={setIsRejectModalOpen}
        handleUpdateStatus={handleUpdateStatus}
        updateStatusData={updateStatusData}
        setIsStatusChange={setIsStatusChange}
        isStatusChange={isStatusChange}
      />
    </div>
  );
};

export default React.memo(MediaManagement);
