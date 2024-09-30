import React, { useEffect, useState } from 'react'
import TableComponent from '../TableComponent';

import { computeMediaHeaders, deleteVideos } from './mediaUtils/mediaUtils';
import { Minus, CirclePlay, CircleCheck, CircleX, Upload, CircleMinus } from 'lucide-react';
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
}


const MediaManagementTable: React.FC<MediaManagementTableProps> = ({ filterValue, setIsVideoPlayerVisible, selectedTab, setIsModalOpen, setVideoCategory, setSelectedReqVideoId, setUpdateStatusData, setSelectedVideo, isRefreshList, setIsRejectModalOpen, handleUpdateStatus }) => {

  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false)
  const [rowData, setRowData] = useState<Array<any>>([])
  const [activeStatus, setActiveStatus] = useState<string>('')
  const [fetchedData, setFetchedData] = useState<Array<any>>([])
  const [deleteParams, setDeleteParams] = useState<any>({ requestType: "", requestId: "" })
  const dispatch = useDispatch();
  useEffect(() => {
    getVideosList()
    setRowData([]);
  }, [selectedTab, isRefreshList, filterValue])

  useEffect(() => {
    if (rowData.length) {
      computeRowData(fetchedData)
    }
  }, [activeStatus])

  const getVideosList = async () => {
    try {
      dispatch(setLoading(true));
      if (selectedTab === 1) {
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

  const computeStatus = (status: string, reqId: string | number, video: any) => {
    return (status === "PENDING") ?
      <StatusDropdown setActiveStatus={setActiveStatus} handleUpdateStatus={(status) => {
        if (status !== "PENDING") {
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
              requestType: selectedTab === 3 ? 'SOTW_VIDEO' : selectedTab === 2 ? 'REQUEST_VIDEO' : 'WINNER_VIDEO',
              requestId: reqId || ''
            })
            setIsConfirmationModalOpen(true)
          }}
        />
      </div>
    } else {
      if (selectedTab === 2) {
        return <button className={`flex py-4 gap-2 ${(activeStatus === 'Approved' || status ==='APPROVED') ? '' : 'cursor-default'} `}
          onClick={() => {
            if (activeStatus === 'Approved' || status ==='APPROVED') {
              setVideoCategory(videoCategory)
              setSelectedReqVideoId(reqId)
              setIsModalOpen(true)
            }
          }
          }
        >
          <Upload size={18} className={`${(activeStatus === 'Approved' || status ==='APPROVED') ? "text-[#0077B6]" : 'text-[gray] '}`} />
          <div className={`${(activeStatus === 'Approved'|| status ==='APPROVED') ? 'text-[#0077B6]' : 'text-[gray]'}`} >Video</div>

        </button>
      }
      else {
        return <button className={`flex py-4 gap-2 ${activeStatus === 'Approved' ? '' : 'cursor-default'} `}
          onClick={() => {
            if (activeStatus === 'Approved' || status ==='APPROVED') {
              setIsModalOpen(true)
            }
          }
          }
        >
          <Upload size={18} className="text-[#0077B6]" />
          <div className='text-[#0077B6]'>Video</div>

        </button>
      }
    }
  }

  const computeRowData = (tabledata: any) => {
    if (tabledata) {
      const rowData = tabledata?.map((data: any) => {

        if (selectedTab === 1) {
          return {
            contestName: data?.contestType || '',
            club: data?.clubName || '',
            course: data?.courseName || '',
            hole: `Hole #${data.holeNumber} - Par ${data.par || ''}`,
            tee: data?.teeName || '',
            playerUserName: data?.username || '',
            date: moment(data?.requestTime).utc().format('YYYY-MM-DD'),
            time: moment(data?.requestTime).utc().format('hh:mm A'),
            upload: <div className='flex py-4 gap-2'>
              <button className='text-[#0077B6]' onClick={() => {
                setSelectedVideo(data.videos.url)
                setIsVideoPlayerVisible(true)
              }}>Uploaded</button>
              <Minus size={20} className='bg-[red] rounded-full text-[#fff] cursor-pointer'
                onClick={() => setIsConfirmationModalOpen(true)}
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
            reuestDate: moment(data?.requestTime).utc().format('YYYY-MM-DD'),
            contestName: data?.contestType || '',
            club: data?.clubName || '',
            course: data?.courseName || '',
            hole: `Hole #${data.holeNumber} - Par ${data.par || ''}`,
            tee: data?.teeName || '',
            time: moment(data?.requestTime).utc().format('HH:SS'),
            status: computeStatus(data.status, data.id, data.videos),
            upload: computeUploadColumn(data.videos, data.status, data.videoCategory || '', data.id, playvideo),
          }

        } else if (selectedTab === 3) {
          return {
            contestName: "Shot-of-the-Week",
            club: data?.clubName || '',
            course: data?.courseName || '',
            hole: `Hole #${data.holeNumber} - Par ${data.par || ''}`,
            tee: data?.teeName || '',
            playerUserName: "MDeTizio",
            date: moment(data?.requestTime).utc().format('YYYY-MM-DD'),
            time: moment(data?.requestTime).utc().format('HH:SS'),
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
                  setDeleteParams({
                    ...deleteParams,
                    requestType: selectedTab === 3 ? 'SOTW_VIDEO' : selectedTab === 2 ? 'REQUEST_VIDEO' : 'WINNER_VIDEO',
                    requestId: data.id || ''
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
          Headers={computeMediaHeaders(selectedTab)}
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
          setIsConfirmationModalOpen(false)
          deleteVideos(deleteParams.requestType, deleteParams.requestId)
        }}
      />
    </div>
  )
}

export default MediaManagementTable
