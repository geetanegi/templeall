import React, { useEffect, useState } from 'react'
import TableComponent from '../TableComponent';

import { computeMediaHeaders, deleteVideos } from './mediaUtils/mediaUtils';
import { Minus, CirclePlay, CircleCheck, CircleX, Upload, CircleMinus, Info } from 'lucide-react';
import ConfirmationModal from '../GenericUIcomponents/ConfirmationModal';
import StatusDropdown from './StatusDropdown';
import moment from 'moment';
import apiService from '../../services/apiService';
import { API_URL } from '../../services/enums';
import { ToastError } from '../Toast';
import PageLoader from '../PageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setLoading } from '../../reducers/loader/loader';

interface MediaManagementTableProps {
  setIsVideoPlayerVisible: (flag: boolean) => void;
  selectedTab: number;
  setIsModalOpen: (flag: true) => void
  setVideoCategory: (val: string) => void;
  setUpdateStatusData: (status: any) => void;
  setSelectedReqVideoId: (id: number | string) => void;
  setSelectedVideo: (vide: string) => void;
  isRefreshList: boolean;
  setIsRejectModalOpen: (flag: true) => void;
  handleUpdateStatus: (id: number | string, status: string, des: string) => void,
  filterValue: string;
  isCourseAdmin: boolean;
}


const MediaManagementTable: React.FC<MediaManagementTableProps> = ({ filterValue, setIsVideoPlayerVisible, selectedTab, setIsModalOpen, setVideoCategory, setSelectedReqVideoId, setUpdateStatusData, setSelectedVideo, isRefreshList, setIsRejectModalOpen, handleUpdateStatus, isCourseAdmin }) => {

  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false)
  const [rowData, setRowData] = useState<Array<any>>([])
  const [activeStatus, setActiveStatus] = useState<string>('')
  const [fetchedData, setFetchedData] = useState<Array<any>>([])
  const [deleteParams, setDeleteParams] = useState<any>({ requestType: "", requestId: "" })
  const [isVisible, setIsVisible] = useState<any>('')

  const dispatch = useDispatch();
  useEffect(() => {
    getVideosList()
    setRowData([]);
  }, [selectedTab, isRefreshList, filterValue])

  useEffect(() => {
    if (rowData.length) {
      computeRowData(fetchedData)
    }
  }, [activeStatus, isVisible])

  const getVideosList = async () => {
    try {
      dispatch(setLoading(true));
      if(isCourseAdmin){
        await makeApiCall(API_URL.getCourseSpecificVideo)
      }
      else if (selectedTab === 1) {
        await makeApiCall(API_URL.getAllWinnersVideo)
      } else if (selectedTab === 2) {
        await makeApiCall(API_URL.getAllReqVideos)
      } else if (selectedTab === 3) {
        await makeApiCall(API_URL.getAllShotOfTheWeek)
      }
    } catch (error) {

    } finally {
      dispatch(setLoading(false));
    }
  }

  const makeApiCall = async (endPoint: string,) => {
    let payload = {};

    if (selectedTab === 3) {
      payload = {
        ...payload,
        searchParams: {
        }
      }
    }
    if (filterValue) {
      payload = {
        ...payload,
        searchParams: {
          "status": filterValue
        }
      }
    }

    if(isCourseAdmin){
      payload = {
        "loginUserId": typeof userInfo === "object" ? userInfo.userId : null,
        "contestType":  null
      }
    }

    if(filterValue){
      payload = {
        ...payload,
        "loginUserId": typeof userInfo === "object" ? userInfo.userId : null,
        "contestType":  filterValue
      }
    }

    const { data, status } = await apiService.post<any>(
      endPoint,
      {
        "data": payload
      },
    );
    if (status === 200 && data?.data != null && !data?.error) {
      computeRowData(data?.data)
      setFetchedData(data?.data)
    } else if (data?.error && data.description) {
      ToastError(data.description);
    }
  }



  const computeStatus = (status: string, reqId: string | number, index:number, tablelength:number) => {
    return (status === "PENDING") ?
      <StatusDropdown setActiveStatus={setActiveStatus}
      index={index}
      tablelength={tablelength}
      handleUpdateStatus={(status) => {
        if (status === "Reject") {
          setIsRejectModalOpen(true)
          setUpdateStatusData({ id: reqId, status })
        } else {
          handleUpdateStatus(reqId, status, '')
        }
      }} />
      : <div className={`flex items-center w-[90px] gap-1.5 rounded shadow-md px-2 py-1
      ${status === "APPROVED"
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
        }}
    `}>
        {status === "APPROVED" && <CircleCheck size={12} className='text-green-600' />}
        {status === "REJECT" && <CircleX size={12} className='text-red-600' />}
        <span
          className={`${status === "APPROVED" ? 'text-green-600' : 'text-red-600'}`}
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
          {status === 'APPROVED' ? "Approved" : "Rejected"}
        </span>
      </div>
  }

  const computeUploadColumn = (videos: any, status: string, videoCategory: string, reqId: string | number, playvideo: () => void) => {
    if (status === 'REJECT') {
      return <div className='text-[gray] p-1' >No video</div>
    } else if (videos) {
      return <div className='flex py-4 gap-2'>
        <button className='text-[#0077B6]' onClick={() => {
          playvideo()
        }}>Uploaded</button>
        <Minus size={20} className='bg-[red] rounded-full text-[#fff] cursor-pointer'
          onClick={() => {
            setDeleteParams({
              ...deleteParams,
              requestType: 'REQUEST_VIDEO',
              requestId: reqId || ''
            })
            setIsConfirmationModalOpen(true)
          }}
        />
      </div>
    } else {
      return <button className={`flex py-4 gap-2 ${(activeStatus === 'Approved' || status === 'APPROVED' ) ? '' : 'cursor-default'} `}
        onClick={() => {
          
          if (activeStatus === 'Approved' || status === 'APPROVED' ) {
            setVideoCategory(videoCategory)
            setSelectedReqVideoId(reqId)
            setIsModalOpen(true)
          }
        }
        }
      >
        <Upload size={18} className={`${(activeStatus === 'Approved' || status === 'APPROVED') ? "text-[#0077B6]" : 'text-[gray] '}`} />
        <div className={`${(activeStatus === 'Approved' || status === 'APPROVED') ? 'text-[#0077B6]' : 'text-[gray]'}`} >Video</div>

      </button>

    }
  }

  const computeRowData = (tabledata: any) => {
    if (tabledata) {
      const rowData = tabledata?.map((data: any, index:number) => {
        if(isCourseAdmin){
          return {
            playerUserName: data?.username || '',
            contestName: data?.contestType || '',
            club: data?.clubName || '',
            course: data?.courseName || '',
            hole: `Hole #${data.holeNumber} - Par ${data.par || ''}`,
            tee: data?.teeName || '',
            reuestDate: moment().utc(data?.requestTime).local().format('YYYY-MM-DD'),
            time: moment.utc(data?.requestTime).local().format('HH:SS A'),
            upload: <div className='flex items-center py-4 gap-2'>  
              <CirclePlay className='text-[#0077B6] cursor-pointer'
                size={18}
                onClick={() => {
                  setSelectedVideo(data.videos.url)
                  setIsVideoPlayerVisible(true)
                }}
              />
            </div>

          }
        }
        else if (selectedTab === 1) {
          return {
            contestName: data?.contestType || '',
            club: data?.clubName || '',
            course: data?.courseName || '',
            hole: `Hole #${data.holeNumber} - Par ${data.par || ''}`,
            tee: data?.teeName || '',
            playerUserName: data?.username || '',
            date: moment.utc(data?.requestTime).local().format('YYYY-MM-DD'),
            time: moment().utc(data?.requestTime).local().format('hh:mm A'),
            upload: !data.videos ? <button className={`flex py-4 gap-2 cursor-pointer`}
              onClick={() => {
                setVideoCategory("WINNER_VIDEO")
                setSelectedReqVideoId(data.id)
                setIsModalOpen(true)
              }}
            >
              <Upload size={18} className="text-[#0077B6]" />
              <div className='text-[#0077B6]'>Video</div>

            </button> : <div className='flex py-4 gap-2'>
              <button className='text-[#0077B6]' onClick={() => {
                setSelectedVideo(data.videos.url)
                setIsVideoPlayerVisible(true)
              }}>Uploaded</button>
              <Minus size={20} className='bg-[red] rounded-full text-[#fff] cursor-pointer'
                onClick={() =>{ 
                  setDeleteParams({
                    ...deleteParams,
                    requestType: 'WINNER_VIDEO',
                    requestId: data.id || ''
                  })
                  setIsConfirmationModalOpen(true)}}
              />
            </div>,
          }

        } else if (selectedTab === 2) {
          const playvideo = () => {
            setSelectedVideo(data.videos.url)
            setIsVideoPlayerVisible(true)
          }

          return {
            playerUserName: data?.username || '',
            reuestDate: moment.utc(data?.requestTime).local().format('YYYY-MM-DD'),
            contestName: data?.contestType || '',
            club: data?.clubName || '',
            course: data?.courseName || '',
            hole: `Hole #${data.holeNumber} - Par ${data.par || ''}`,
            tee: data?.teeName || '',
            time: moment.utc(data?.requestTime).local().format('HH:MM A'),
            Category: <div className="relative flex items-center text-[14px]  inline-block">
              {data.videoCategory === "TOP_SHOT" ? "Top Shot " : data.videoCategory === "NOT_TOP_SHOT" ? "Not Top Shot" : "Bloopers"}
              <Info size={16} className='ml-2 cursor-pointer'
                onMouseEnter={() => {
                  setIsVisible(data.id)
                }}
                onMouseLeave={() => setIsVisible(false)}
              />
              {isVisible === data.id && (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-gray-700 text-white text-sm rounded p-2 shadow-lg">
                  {data?.description}
                </div>
              )}
            </div>,

            status: computeStatus(data.status, data.id, index, tabledata.length),
            upload: computeUploadColumn(data.videos, data.status, data.videoCategory || '', data.id, playvideo),
          }

        } else if (selectedTab === 3) {
          return {
            contestName: data?.contestType || '',
            club: data?.clubName || '',
            course: data?.courseName || '',
            hole: `Hole #${data.holeNumber} - Par ${data.par || ''}`,
            tee: data?.teeName || '',
            playerUserName: data?.username || '',
            date: moment.utc(data?.dateTime).local().format('YYYY-MM-DD'),
            time: moment.utc(data?.dateTime).local().format('h:mm A'),
            upload: <div className='flex items-center py-4 gap-2'>
              <CirclePlay className='text-[#0077B6] cursor-pointer'
                size={18}
                onClick={() => {
                  setSelectedVideo(data.videos.url)
                  setIsVideoPlayerVisible(true)
                }}
              />
              <CircleMinus size={18} className='text-[red] cursor-pointer'
                onClick={() => {
                  debugger
                  setDeleteParams({
                    ...deleteParams,
                    requestType: 'SOTW_VIDEO',
                    requestId: data.id
                  })
                  setIsConfirmationModalOpen(true)
                }}
              />
            </div>

          }

        } else {
          return []
        }
      })
      setRowData(rowData || [])
    } else {
      setRowData([])
    }

  }

  return (
    <div className='px-10'>
      <PageLoader isActive={loader}>
        <TableComponent
          rowData={rowData}
          Headers={computeMediaHeaders(selectedTab, isCourseAdmin ? "courseAdmin" :"")}
          currentPage={0}
          pageSize={10}
          setCurrentPage={() => { }}
          setPageSize={() => { }}
          totalPages={1}
          pagination={false}
          style='min-w-[150px]'
        />
      </PageLoader>
      <ConfirmationModal
        type={"error"}
        confirmationText={'Are you sure you want to delete this Video?'}
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          setDeleteParams({ requestType: "", requestId: "" })
          setIsConfirmationModalOpen(false)
        }}
        onOk={() => {
          debugger
          setIsConfirmationModalOpen(false)
          deleteVideos(deleteParams.requestType, deleteParams.requestId, getVideosList)
        }}
      />
    </div>
  )
}

export default MediaManagementTable
