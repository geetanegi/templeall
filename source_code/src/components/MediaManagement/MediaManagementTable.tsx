import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent";

import { computeMediaHeaders, deleteVideos } from "./mediaUtils/mediaUtils";
import {
  Minus,
  CirclePlay,
  CircleCheck,
  CircleX,
  Upload,
  CircleMinus,
  Info,
} from "lucide-react";
import ConfirmationModal from "../GenericUIcomponents/ConfirmationModal";
import StatusDropdown from "./StatusDropdown";
import moment from "moment";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastInfo } from "../Toast";
import PageLoader from "../PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLoading } from "../../reducers/loader/loader";
import ProgressBar from "../GenericUIcomponents/ProgressBar";
import { constantWords } from "../../utils/constantEnums";
import TooltipSpan from "../Tooltip/TooltipSpan";

interface MediaManagementTableProps {
  setIsVideoPlayerVisible: (flag: boolean) => void;
  selectedTab: number;
  setIsModalOpen: (flag: true) => void;
  setVideoCategory: (val: string) => void;
  setUpdateStatusData: (status: any) => void;
  setSelectedReqVideoId: (id: number | string) => void;
  setSelectedVideo: (vide: string) => void;
  isRefreshList: boolean;
  setIsRejectModalOpen: (flag: true) => void;
  handleUpdateStatus: (
    id: number | string,
    status: string,
    statusId: number | string,
    des?: string,
  ) => void;
  filterValue: string;
  isCourseAdmin: boolean;
  isStatusChange: boolean;
  setIsStatusChange: (flag: boolean) => void;
  setDataLength: (dataLength: number) => void;
  uploadProgressArr: any;
  isModalOpen: boolean;
  isSOTWModalOpen: boolean;
  uploadSotwProgressArr: Array<any>;
  getAllMediaCounts: () => {}
  filterObject:any
  searchQuery:string
}

const MediaManagementTable: React.FC<MediaManagementTableProps> = ({
  setDataLength,
  isStatusChange,
  setIsStatusChange,
  filterValue,
  setIsVideoPlayerVisible,
  selectedTab,
  setIsModalOpen,
  setVideoCategory,
  setSelectedReqVideoId,
  setUpdateStatusData,
  setSelectedVideo,
  isRefreshList,
  setIsRejectModalOpen,
  handleUpdateStatus,
  isCourseAdmin,
  uploadProgressArr,
  isModalOpen,
  isSOTWModalOpen,
  uploadSotwProgressArr,
  getAllMediaCounts,
  filterObject,
  searchQuery
}) => {
  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [rowData, setRowData] = useState<Array<any>>([]);
  const [activeStatus, setActiveStatus] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<Array<any>>([]);
  const [deleteParams, setDeleteParams] = useState<any>({
    requestType: "",
    requestId: "",
  });
  const [isVisible, setIsVisible] = useState<any>("");

  //  pagination implemented
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElement, setTotalElement] = useState<number>(10)
  const [sortConfig, setSortConfig] = useState<any>({sortDir: null, sortBy: null})
  const dispatch = useDispatch();





  useEffect(() => {
    getVideosList(sortConfig.sortDir, sortConfig.sortBy);
    if (!(selectedTab === 1) && !filterValue) {
      setRowData([]);
    }
    setTotalPages(0);
  }, [selectedTab, isRefreshList, currentPage, filterValue, filterObject]);

  useEffect(() => {
    setActiveStatus(constantWords.PENDING);
    computeRowData(rowData);
  }, [isStatusChange]);

  useEffect(() => {
    if (uploadSotwProgressArr.length) {
      if (selectedTab === 3) {
        computeRowData([...uploadSotwProgressArr, ...fetchedData]);
      } else {
        computeRowData(fetchedData);
      }
    }else if(rowData.length) {
      getVideosList(null, null);
    }
  }, [uploadSotwProgressArr]);

  useEffect(() => {
    if (uploadProgressArr && selectedTab !== 3) {
      computeRowData(fetchedData);
    } else if(rowData.length) {
      getVideosList(null, null);
    }
  }, [uploadProgressArr]);

  useEffect(() => {
    if (rowData.length) {
      computeRowData(fetchedData);
    }
  }, [activeStatus, isVisible]);

  useEffect(()=>{
    getVideosList(null, null)
    setCurrentPage(0)
  },[searchQuery])


  const getVideosList = async (sortDir:string | null, sortBy:string | null) => {
    if(sortDir && sortBy){
      setSortConfig({sortDir, sortBy})
    }
    try {
      if (!isModalOpen && !isSOTWModalOpen) {
        dispatch(setLoading(true));
      }
      if (isCourseAdmin) {
        await makeApiCall(API_URL.getCourseSpecificVideo, sortDir, sortBy);
      } else if (selectedTab === 1) {
        await makeApiCall(API_URL.getAllWinnersVideo, sortDir, sortBy);
      } else if (selectedTab === 2) {
        await makeApiCall(API_URL.getAllReqVideos, sortDir, sortBy);
      } else if (selectedTab === 3) {
        await makeApiCall(API_URL.getAllShotOfTheWeekSA, sortDir, sortBy);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
      setActiveStatus("");
      setIsStatusChange(false);
    }
  };

  const makeApiCall = async (endPoint: string, sortDir:string | null, sortBy:string | null) => {
    let payload: any = {};

    if (selectedTab === 3) {
      payload.pageSortingParam = {
        sortDir: sortDir || "DESC",
        sortBy: sortBy || "createdDate",
        pageNumber: currentPage,
        pageSize: pageSize,
      };
      payload.searchParams = {
        "holeIds": filterObject.holeNumber ,
        "courseId": filterObject.courseId,
        "contestTypeId": filterObject.contestType
    }
    if(searchQuery){
      payload.searchParams = { 
        player: searchQuery
      }
    }
    } else if (selectedTab === 1) {
      payload.pageSortingParam = {
        sortDir: sortDir || "DESC",
        sortBy: sortBy || "createdDate",
        pageNumber: currentPage,
        pageSize: pageSize,
      };
      if (filterObject) {
        payload.searchParams = {
          "holeIds": filterObject.holeNumber ,
          "courseId": filterObject.courseId,
          "contestTypeId": filterObject.contestType
        };
      }
      if(searchQuery){
        payload.searchParams = { 
          player: searchQuery
        }
      }
    } else if (selectedTab === 2) {
      payload.pageSortingParam = {
        sortDir: sortDir || "DESC",
        sortBy: sortBy || "createdDate",
        pageNumber: currentPage,
        pageSize: pageSize,
      };
      if (filterObject) {
        payload.searchParams = {
         "statusId": filterObject.videoStatus,
         "holeIds": filterObject.holeNumber ,
          "courseId": filterObject.courseId,
          "contestTypeId": filterObject.contestType
        }   
      }
      if(searchQuery){
        payload.searchParams = { 
          player: searchQuery
        }
      }
    }

    if (isCourseAdmin) {
      payload = {}
      payload.loginUserId = typeof userInfo === "object" ? userInfo.userId : null,
      payload.contestTypeId = null,
      payload.pageSortingParam = {
        sortDir: sortDir || "DESC",
        sortBy: sortBy || "createdDate",
        pageNumber: currentPage,
        pageSize: pageSize,
      };
      if (filterObject) {
        payload.searchParams = {
          "holeIds": filterObject.holeNumber ,
          "courseId": filterObject.courseId,
          "contestTypeId": filterObject.contestType
        };
      }
      if(searchQuery){
        payload.searchParams = { 
          player: searchQuery
        }
      }
    }

    



    const { data, status } = await apiService.post<any>(endPoint, {
      data: payload,
    });
    if (status === 200 && data?.data != null && !data?.error) {
      if (selectedTab === 3 && uploadSotwProgressArr.length) {
        computeRowData([...uploadSotwProgressArr, ...data?.data.content]);
      } else {
        computeRowData(data?.data.content);
      }
      setFetchedData(data?.data.content);
      setTotalElement(data.data.totalElements)
      setDataLength(data?.data?.totalElements);
      setTotalPages(data.data.totalPages)
      getAllMediaCounts()
    } else if (data?.error && data.description) {
      ToastInfo(data.description);
    }
  };

  const computeStatus = (
    status: string,
    reqId: string | number,
    index: number,
    tablelength: number,
  ) => {
    return status === constantWords.PENDING ? (
      <StatusDropdown
        setActiveStatus={setActiveStatus}
        index={index}
        tablelength={tablelength}
        handleUpdateStatus={(type, id) => {
          if (type === constantWords.REJECT) {
            setIsRejectModalOpen(true);
            setUpdateStatusData({ id: reqId, status: type, statusId: id });
          } else {
            handleUpdateStatus(reqId, status, id, "");
          }
        }}
      />
    ) : (
      <div
        className={`flex w-[90px] items-center gap-1.5 rounded px-2 py-1 shadow-md ${status === constantWords.APPROVED
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
          }} `}
      >
        {status === constantWords.APPROVED && (
          <CircleCheck size={12} className="text-green-600" />
        )}
        {status === constantWords.REJECT && <CircleX size={12} className="text-red-600" />}
        <span
          className={`${status === constantWords.APPROVED ? "text-green-600" : "text-red-600"}`}
          style={{
            fontFamily: "Nunito",
            fontSize: "11px",
            fontWeight: "600",
            lineHeight: "13px",
            letterSpacing: "0.06px",
            textAlign: "left",
            overflow: "visible",
            textOverflow: "ellipsis",
          }}
        >
          {status === constantWords.APPROVED ? constantWords.Approved : constantWords.Rejected}
        </span>
      </div>
    );
  };

  const computeUploadColumn = (
    videos: any,
    status: string,
    videoCategory: string,
    reqId: string | number,
    playvideo: () => void,
  ) => {
    if (status === constantWords.REJECT) {
      return <div className="p-1 py-2 text-[gray]">No video</div>;
    } else if (videos) {
      return (
        <div className="flex gap-2 py-2">
          <button
            className="text-[#0077B6]"
            onClick={() => {
              playvideo();
            }}
          >
            Uploaded
          </button>
          <Minus
            size={20}
            className="cursor-pointer rounded-full bg-[red] text-[#fff]"
            onClick={() => {
              setDeleteParams({
                ...deleteParams,
                requestType: "REQUEST_VIDEO",
                requestId: reqId || "",
              });
              setIsConfirmationModalOpen(true);
            }}
          />
        </div>
      );
    } else {
      return (
        <button
          className={`flex gap-2 py-2 ${activeStatus === constantWords.APPROVED || status === constantWords.APPROVED ? "cursor-pointer" : "cursor-default"} `}
          onClick={() => {
            if (activeStatus === constantWords.APPROVED || status === constantWords.APPROVED) {
              setVideoCategory(videoCategory);
              setSelectedReqVideoId(reqId);
              setIsModalOpen(true);
            }
          }}
        >
          <Upload
            size={18}
            className={`${activeStatus === constantWords.APPROVED || status === constantWords.APPROVED ? "text-[#0077B6]" : "text-[gray]"}`}
          />
          <div
            className={`${activeStatus === constantWords.APPROVED || status === constantWords.APPROVED ? "text-[#0077B6]" : "text-[gray]"}`}
          >
            Video
          </div>
        </button>
      );
    }
  };

  const computeRowData = (tabledata: any) => {
    if (tabledata) {
      const rowData = tabledata?.map((data: any, index: number) => {
        if (isCourseAdmin) {
          return {
            contestId : data?.cid,
            contestName: data?.contestType || "",
            club: data?.clubName || "",
            course: data?.courseName || "",
            hole: `Hole #${data.holeNumber} - Par ${data.par || ""}`,
            tee: data?.teeName || "",
            playerUserName: data?.username || "",
            reuestDate: moment
              .utc(data?.startTime)
              .local()
              .format("MM-DD-YYYY hh:mm A"),
            // time: moment.utc(data?.startTime).local().format("hh:mm A"),
            upload: (
              <div className="flex items-center gap-2 py-4">
                {
                  !data?.url ?
                   <TooltipSpan
                   text={<CirclePlay
                    className={` text-[#808080] cursor-not-allowed` }
                    size={18}
                  />}
                   tooltip={"Video not uploaded"}
                   needPY={false}
                   position="top"
                 />
                 :
                 <CirclePlay
                   className={`text-[#0077B6] cursor-pointer ml-1` }
                   size={18}
                   onClick={() => {
                     setIsVideoPlayerVisible(true);
                     setSelectedVideo(data.url);
                   }}
                 />
                }
              </div>
            ),
          };
        } else if (selectedTab === 1) {
          return {
            contestId : data?.cid,
            contestName: data?.contestType || "",
            club: data?.clubName || "",
            course: data?.courseName || "",
            hole: `Hole #${data.holeNumber} - Par ${data.par || ""}`,
            tee: data?.teeName || "",
            playerUserName: data?.username || "",
            date: moment.utc(data?.hitTime).local().format("MM-DD-YYYY hh:mm A"),
            // time: moment.utc(data?.hitTime).local().format("hh:mm A"),
            upload: uploadProgressArr?.find(
              (vid: any) => vid.id === data.id,
            ) ? (
              <ProgressBar
                progress={Math.floor(
                  (Number(
                    uploadProgressArr?.filter(
                      (vid: any) => vid.id === data.id,
                    )?.[0].chunkNo,
                  ) /
                    Number(
                      uploadProgressArr?.filter(
                        (vid: any) => vid.id === data.id,
                      )?.[0].totalchunk,
                    )) *
                  100,
                )}
              />
            ) : !data.videos ? (
              <button
                className={`flex cursor-pointer gap-2 py-2`}
                onClick={() => {
                  setVideoCategory("WINNER_VIDEO");
                  setSelectedReqVideoId(data.id);
                  setIsModalOpen(true);
                }}
              >
                <Upload size={18} className="text-[#0077B6]" />
                <div className="text-[#0077B6]">Video</div>
              </button>
            ) : (
              <div className="flex gap-2 py-2">
                <button
                  className="text-[#0077B6]"
                  onClick={() => {
                    setSelectedVideo(data.videos.url);
                    setIsVideoPlayerVisible(true);
                  }}
                >
                  Uploaded
                </button>
                <Minus
                  size={20}
                  className="cursor-pointer rounded-full bg-[red] text-[#fff]"
                  onClick={() => {
                    setDeleteParams({
                      ...deleteParams,
                      requestType: "WINNER_VIDEO",
                      requestId: data.id || "",
                    });
                    setIsConfirmationModalOpen(true);
                  }}
                />
              </div>
            ),
          };
        } else if (selectedTab === 2) {
          const playvideo = () => {
            setSelectedVideo(data.videos.url);
            setIsVideoPlayerVisible(true);
          };
          return {
            contestId : data?.cid,
            contestName: data?.contestType || "",
            club: data?.clubName || "",
            course: data?.courseName || "",
            hole: `Hole #${data.holeNumber} - Par ${data.par || ""}`,
            tee: data?.teeName || "",
            playerUserName: data?.username || "",
            reuestDate: moment
              .utc(data?.requestTime)
              .local()
              .format("MM-DD-YYYY hh:mm A"),
            // time: moment.utc(data?.hitTime).local().format("hh:mm A"),
            Category: (
              <div className="relative inline-block flex items-center text-[14px]">
                {data.videoCategory}
                <Info
                  size={16}
                  className="ml-2 cursor-pointer"
                  onMouseEnter={() => {
                    setIsVisible(data.id);
                  }}
                  onMouseLeave={() => setIsVisible(false)}
                />
                {isVisible === data.id && (
                  <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded bg-gray-700 p-2 text-sm text-white shadow-lg">
                    {data?.description}
                  </div>
                )}
              </div>
            ),

            status: computeStatus(
              data.status,
              data.id,
              index,
              tabledata.length,
            ),
            upload: uploadProgressArr?.find(
              (vid: any) => vid.id === data.id,
            ) ? (
              <ProgressBar
                progress={Math.floor(
                  (Number(
                    uploadProgressArr?.filter(
                      (vid: any) => vid.id === data.id,
                    )?.[0].chunkNo,
                  ) /
                    Number(
                      uploadProgressArr?.filter(
                        (vid: any) => vid.id === data.id,
                      )?.[0].totalchunk,
                    )) *
                  100,
                )}
              />
            ) : (
              computeUploadColumn(
                data.videos,
                data.status,
                data.videoCategory || "",
                data.id,
                playvideo,
              )
            ),
          };
        } else if (selectedTab === 3) {
          return {
            contestName: data?.contestType || "",
            club: data?.clubName || "",
            course: data?.courseName || "",
            hole: `Hole #${data.holeNumber} - Par ${data.par || ""}`,
            tee: data?.teeName || "",
            playerUserName: data?.username || "",
            date: moment.utc(data?.startTime).local().format("MM-DD-YYYY h:mm A"),
            // time: moment.utc(data?.startTime).local().format("h:mm A"),
            upload: data.chunkNo ? (
              <div className="w-full py-4">
                <ProgressBar
                  progress={Math.floor((data.chunkNo / data.totalchunk) * 100)}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 py-2">
                <CirclePlay
                  className="cursor-pointer text-[#0077B6]"
                  size={18}
                  onClick={() => {
                    setSelectedVideo(data.videos.url);
                    setIsVideoPlayerVisible(true);
                  }}
                />
                <CircleMinus
                  size={18}
                  className="cursor-pointer text-[red]"
                  onClick={() => {
                    setDeleteParams({
                      ...deleteParams,
                      requestType: "SOTW_VIDEO",
                      requestId: data.id,
                    });
                    setIsConfirmationModalOpen(true);
                  }}
                />
              </div>
            ),
          };
        } else {
          return [];
        }
      });
      setRowData(rowData || []);
    } else {
      setRowData([]);
    }
  };

  return (
    <div className="">
      <PageLoader isActive={loader}>
        <TableComponent
          rowData={rowData}
          Headers={computeMediaHeaders(
            selectedTab,
            isCourseAdmin ? "courseAdmin" : "",
          )}
          selectedTab={selectedTab}
          currentPage={currentPage}
          pageSize={pageSize}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          pagination={totalPages > 1}
          style="min-w-[150px]"
          totalElement={totalElement}
          elementPerPage={rowData.length}
          handleSorting={getVideosList}
        />
      </PageLoader>
      <ConfirmationModal
        type={"error"}
        confirmationText={"Are you sure you want to delete this video?"}
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          setDeleteParams({ requestType: "", requestId: "" });
          setIsConfirmationModalOpen(false);
        }}
        onOk={() => {
          setIsConfirmationModalOpen(false);
          deleteVideos(
            deleteParams.requestType,
            deleteParams.requestId,
            getVideosList,
            "superAdmin",
          );
        }}
      />
    </div>
  );
};

export default React.memo(MediaManagementTable);
