import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { FileVideo2, VideoOff } from "lucide-react";
import apiService from "../../services/apiService";
import { ToastInfo } from "../Toast";
import { setLoading } from "../../reducers/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../services/enums";
import { RootState } from "../../store";
import PageLoader from "../PageLoader";
import moment from "moment";
import VideoPlayer from "./VideoPlayer";
import { timeZone } from "../../utils/TimeUtils";
import { getFilters } from "../../utils/genericApiCalls";

interface PlayerMediaPageProps { }

interface getVideosListPayloadType {
  playerId?: number | string | undefined;
  date?: string;
  searchParams?: searchParams;
  zoneId?: string;
}

interface searchParams {
  isPublished?: boolean;
  status?: string;
  "playerUser.id"?: number | string | undefined;
  "club.id"?: number | string;
  videoCategoryId?: string | number;
  "player.id"?: string | number | undefined;
}

const PlayerMediaPage: React.FC<PlayerMediaPageProps> = () => {
  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [allVideos, setAllVideos] = useState<Array<any>>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] =
    useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string | number>("");
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [highlightsCounts, setHighlightsCounts] = useState<any>({});
  const [filterOptions, setFilterOptions] = useState<
    { id: number | string; type: string; category: string }[] | null
  >(null);

  const dispatch = useDispatch();


  useEffect(()=>{
    setAllVideos([]);
    setFilterValue("")
    setSelectedValue("");
    getAllHighlightsCounts();
  },[selectedTab, refreshList])

  useEffect(()=>{
    getFilters("", setFilterOptions);
  },[selectedTab])



  useEffect(() => {
    if (filterValue === "sotw") {
      makeApiCall(API_URL.getPlayerShotOfTheWeek);
    } else if (filterValue === "winner") {
      makeApiCall(API_URL.getAllPlayerWinnerVideos);
    } else {
      getAllVideos();
    }
  }, [filterValue, selectedTab, refreshList]);

  const getAllHighlightsCounts = async () => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.getAllHighlightsCounts,
        {
          data: {
            playerId:
              typeof userInfo === "object" ? userInfo.userId : undefined,
            date: moment.utc().local().format("YYYY-MM-DDTHH:mm:ss[Z]"),
            zoneId: timeZone,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setHighlightsCounts(data.data);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) { }
  };

  const getAllVideos = async () => {
    try {
      if (!filterValue) {
        if (selectedTab === 2) {
          await makeApiCall(API_URL.getAllPlayerReqHighlights);
        } else if (selectedTab === 3) {
          await makeApiCall(API_URL.getAllHighlightsVideo);
        } else if (selectedTab === 1) {
          await makeApiCall(API_URL.getAllpublishSotwVideos);
        } else {
        }
      } else {
        if (selectedTab === 3) {
          await makeApiCall(API_URL.getAllApprovedVideos);
        } else if (selectedTab === 1) {
          await makeApiCall(API_URL.getAllPublishedVideos);
        }
      }
    } catch (error) {
      console.error(error);
    } 
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value); // Update the state with the selected value
  };

  const makeApiCall = async (endPoint: string) => {
    let payload: getVideosListPayloadType = {};
    dispatch(setLoading(true));
    try {
      if (
        selectedValue === "sotw" &&
        endPoint === "/core/shot-of-the-week/all-shot-of-the-week"
      ) {
        payload = {
          ...payload,
          searchParams: {
            "club.id": "1",
          },
        };
      } else {
        if (selectedTab === 3) {
          const searchParams = {
            "playerUser.id":
              typeof userInfo === "object" ? userInfo.userId : undefined,
          };
          payload = {
            ...payload,
            searchParams,
          };
          if (filterValue) {
            payload = {
              searchParams: {
                ...payload.searchParams,
                videoCategoryId: filterValue,
              },
            };
          }
        } else if (selectedTab === 2) {
          payload = {
            ...payload,
            date: moment().utc().format("YYYY-MM-DD"),
            playerId: typeof userInfo === "object" ? userInfo.userId : undefined,
            zoneId: timeZone,
          };
          if (filterValue) {
            payload = {
              searchParams: {
                ...payload.searchParams,
                videoCategoryId: filterValue,
              },
            };
          }
        } else if (selectedTab === 1) {
          const searchParams = {
            "playerUser.id":
              typeof userInfo === "object" ? userInfo.userId : undefined,
          };
          payload = {
            ...payload,
            searchParams,
          };
          if (filterValue) {
            payload = {
              searchParams: {
                ...payload.searchParams,
                videoCategoryId: filterValue,
              },
            };
          }
        }
      }
  
      if (filterValue === "sotw" || filterValue === "winner") {
        payload = {
          searchParams: {
            "player.id":
              typeof userInfo === "object" ? userInfo.userId : undefined,
          },
        };
        if (selectedTab === 1) {
          payload = {
            searchParams: {
              "player.id":
                typeof userInfo === "object" ? userInfo.userId : undefined,
              isPublished: true,
            },
          };
        }
      }
  
      const { data, status } = await apiService.post<any>(endPoint, {
        data: {
          ...payload,
        },
      });
      if (status === 200 && data?.data != null && !data?.error) {
        setAllVideos(data?.data);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
        console.log(error)
    }finally{
      dispatch(setLoading(false));
    }
   
  };

  return (
    <div className="h-full bg-[#ffffff] bg-fixed pl-[24px] pr-[16px] pb-10">
      <div className="flex justify-between pt-[24px]">
        <div
          className="flex h-[40px] gap-[16px] rounded-l-full rounded-r-full border bg-[#F5F6F7] p-[4px]"
          style={{ width: "max-content" }}
        >
          <button
            className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] text-[14px] ${selectedTab === 1 ? "bg-primaryColor text-[#ffffff]" : "text-[#7B7887]"} `}
            onClick={() => {
              setFilterValue("");
              setSelectedTab(1);
            }}
          >
            <FileVideo2
              className={`mr-2 h-[16px] w-[16px] ${selectedTab === 1 ? "text-[#ffffff]" : "text-[#7B7887]"}`}
            />
            Published Highlights
            <span className="ml-[16px] h-[14px] w-[26px] rounded-[100px] bg-[#E9ECF1] text-[11px] font-semibold text-[#000000]">
              {selectedTab === 1 && filterValue
                ? allVideos.length
                : highlightsCounts.published || 0}
            </span>
          </button>
          <button
            className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 2 ? "bg-primaryColor text-[#ffffff]" : "text-[#7B7887]"} `}
            onClick={() => {
              setFilterValue("");
              setSelectedTab(2);
            }}
          >
            <FileVideo2
              className={`mr-2 h-[16px] w-[16px] ${selectedTab === 2 ? "text-[#ffffff]" : "text-[#7B7887]"}`}
            />
            Request Highlights
            <span className="ml-[16px] h-[14px] w-[26px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000]">
              {highlightsCounts.allRequested || 0}
            </span>
          </button>
          <button
            className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 3 ? "bg-primaryColor text-[#ffffff]" : "text-[#7B7887]"} `}
            onClick={() => {
              setFilterValue("");
              setSelectedTab(3);
            }}
          >
            <FileVideo2
              className={`mr-2 h-[16px] w-[16px] ${selectedTab === 3 ? "text-[#ffffff]" : "text-[#7B7887]"}`}
            />
            All Highlights
            <span className="ml-[16px] h-[14px] w-[26px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000]">
              {selectedTab === 3 && filterValue
                ? allVideos.length
                : highlightsCounts.allHighlight || 0}
            </span>
          </button>
        </div>
        {selectedTab !== 2 ? (
          <div className="mb-4 flex gap-[16px] mr-[16px]">
            <div className="align-center flex">
              <select
                id="courses"
                className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:ml-2 md:mt-0 md:w-[320px]"
                onChange={handleFilterChange}
              >
                <option value={""} selected={filterValue === ""}>
                  All
                </option>
                {filterOptions?.map((filter) => {
                  return (
                    <option
                      value={
                        filter.category === "sotw" ||
                        filter.category === "winner"
                          ? filter.category
                          : filter.id
                      }
                      selected={filterValue === filter?.id}
                    >
                      {filter.type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        ) : (
          <div className="flex gap-[16px]">
            <span className="mr-1 mt-8 text-[14px]">
              {moment().format("MMMM D, YYYY")}
            </span>
          </div>
        )}
      </div>
      <PageLoader isActive={loader}>
        {allVideos.length ? (
          <div className="mb-3 mt-3 flex w-full flex-wrap">
            {allVideos?.map((videoData) => {
              return (
                <div className="mb-4 w-[25%] px-2">
                  <VideoCard
                    key={videoData.id}
                    uploadDate={moment
                      .utc(videoData?.startTime)
                      .local()
                      .format("MM/DD/YYYY")}
                    title={videoData?.contestType}
                    status={videoData?.status}
                    clubName={videoData?.club?.name || ""}
                    tee={
                      videoData?.tee?.teeName + `(${videoData?.tee?.yardage})`
                    }
                    holeName={`Hole #${videoData?.hole?.holeNumber} - Par ${videoData?.hole?.par}`}
                    requestVideoPayload={{ ...videoData }}
                    isApproved={selectedTab != 2}
                    isPublished={videoData.isPublished}
                    getAllVideos={getAllVideos}
                    setSelectedVideo={setSelectedVideo}
                    setIsVideoPlayerVisible={setIsVideoPlayerVisible}
                    isVideoPlayerVisible={isVideoPlayerVisible}
                    setRefreshList={setRefreshList}
                    refreshList={refreshList}
                    isSOTW={filterValue === "SOTW"}
                    rejectionReason={videoData?.rejectionReason || ""}
                    userInfo={userInfo}
                    isEdit={videoData?.videos?.url ? true : false}
                    width="100%"
                    onTeeTime={moment
                      .utc(videoData?.startTime)
                      .local()
                      .format("hh:mm:ss A")}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="my-5 h-[206px] w-full rounded-[8px] border bg-[#F5F6F7] p-3 mr-[16px] mt-2">
            <div className="mt-2 flex h-[152px] w-[full] flex-col items-center justify-center rounded-[6px] bg-[#FFFFFF1A]">
              <VideoOff
                color="#7B7887"
                strokeWidth={1}
                size={84}
                className="font-extralight"
              />
              <span className="text-[#7B7887]">
                No videos available at this time.
              </span>
            </div>
          </div>
        )}
      </PageLoader>
      <div className="fixed bottom-10 right-0 z-50">
        <VideoPlayer
          isVideoPlayerVisible={isVideoPlayerVisible}
          setIsVideoPlayerVisible={setIsVideoPlayerVisible}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
        />
      </div>
    </div>
  );
};

export default React.memo(PlayerMediaPage);
