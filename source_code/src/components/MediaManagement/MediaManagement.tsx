import React, { useEffect, useState } from 'react'



// lucide icons imports 
import { FileVideo2 } from 'lucide-react'
import MediaManagementTable from './MediaManagementTable'
import UploadVideoModal from './UploadVideoModal'
import VideoPlayer from './VideoPlayer'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import PlayerMediaPage from './PlayerMediaPage'
import apiService from '../../services/apiService'
import { API_URL } from '../../services/enums'
import { ToastError, ToastSuccess } from '../Toast'
import { setCourseData } from '../../reducers/Courses_data/courses'
import { setLoading } from '../../reducers/loader/loader'
import RejectConfirmationModal from './RejectConfirmationModal'
import { computeFilterDropDown } from './mediaUtils/mediaUtils'

interface MediaManagementProps {

}

const MediaManagement: React.FC<MediaManagementProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(1)
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState<boolean>(false);
  const [isSoTW, setIsSoTW] = useState<boolean>(false)
  const [videoCategory, setVideoCategory] = useState<string>('')
  const [selectedReqVideoId, setSelectedReqVideoId] = useState<number | string>('')
  const [selectedVideo, setSelectedVideo] = useState<string>('')
  const [isRefreshList, setIsRefreshList] = useState<boolean>(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false)
  const [updateStatusData, setUpdateStatusData] = useState<{ id: string | number, status: string }>({ id: "", status: "" })
  const [filterValue, setFilterValue] = useState<string>('')
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );


  const dispatch = useDispatch()

  if (userPermisions?.data?.permission["is_player"]) {
    return <PlayerMediaPage

    />
  }


  useEffect(() => {
    setIsSoTW(false)
  }, [selectedTab])

  useEffect(() => {
    fetchCourseData()
  }, [])



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
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      ToastError("Error fetching course data");
    } finally {
      dispatch(setLoading(false));
    }
  };


  const handleUpdateStatus = async (id: number | string, status: string, rejectReasons?: string) => {
    const updatedStatus = status === "Rejected" ? "Reject" : status
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.updateVideoStatus,
        {
          "data": {
            "requestVideoId": id,
            "status": updatedStatus.toUpperCase()
          }
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        ToastSuccess(data?.data?.message)
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {

    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value); // Update the state with the selected value
  };


  return (
    <div className='h-[full] bg-[#ffffff] w-full'>
      <div className='flex justify-between px-10 pt-10'>
        {
          userPermisions?.data?.permission["is_super_admin"] ?
            <div className='flex bg-[#F5F6F7] p-[2px] gap-[4px] rounded-l-full rounded-r-full border'
              style={{ width: "max-content" }}
            >
              <button className={`flex whitespace-nowrap items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[2px] 
                  ${selectedTab === 1 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
                onClick={() => setSelectedTab(1)}
              >
                <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 1 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
                Video Management
                <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>0</span>
              </button>
              <button className={`flex whitespace-nowrap items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[2px]
          ${selectedTab === 2 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
                onClick={() => setSelectedTab(2)}
              >
                <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 2 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
                Requested Videos
                <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>0</span>
              </button>
              <button className={`flex items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[6px] whitespace-nowrap
          ${selectedTab === 3 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
                onClick={() => setSelectedTab(3)}
              >
                <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 3 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
                Shot of the Week
                <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>0</span>
              </button>
            </div> : null
        }
        <div className="flex  gap-[16px]">
          {
            selectedTab !== 3 ?
              <div className="align-center flex">
                <select
                  id="courses"
                  className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:ml-2 md:mt-0 md:w-[320px]"
                  onChange={handleFilterChange}
                >
                  {
                    computeFilterDropDown(selectedTab, "SuperAdmin")?.map((filter) => {
                      return <option value={filter.key} >{filter.name}</option>
                    })
                  }
                </select>
              </div> : null
          }
          {
            selectedTab === 3 && userPermisions?.data?.permission["is_super_admin"] ?
              <button
                className="flex items-center whitespace-nowrap justify-center font-[14px] rounded-md bg-[#95C11E] px-6  text-[#ffffff]"
                onClick={() => {
                  setIsSoTW(true)
                  setIsModalOpen(true)
                }}
              >
                <FileVideo2 size={18} className=' mr-2  text-[#ffffff]' />
                Add Short of the Week
              </button> : null
          }
        </div>
      </div>
      <MediaManagementTable
        setIsVideoPlayerVisible={setIsVideoPlayerVisible}
        selectedTab={selectedTab}
        setIsModalOpen={setIsModalOpen}
        setVideoCategory={setVideoCategory}
        setSelectedReqVideoId={setSelectedReqVideoId}
        setSelectedVideo={setSelectedVideo}
        isRefreshList={isRefreshList}
        setUpdateStatusData={setUpdateStatusData}
        setIsRejectModalOpen={setIsRejectModalOpen}
        handleUpdateStatus={handleUpdateStatus}
        filterValue={filterValue}
      />

      <UploadVideoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isSoTW={isSoTW}
        videoCategory={videoCategory}
        selectedReqVideoId={selectedReqVideoId}
        setIsRefreshList={setIsRefreshList}
        isRefreshList={isRefreshList}
      />
      <VideoPlayer
        isVideoPlayerVisible={isVideoPlayerVisible}
        setIsVideoPlayerVisible={setIsVideoPlayerVisible}
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
      <RejectConfirmationModal
        isRejectModalOpen={isRejectModalOpen}
        setIsRejectModalOpen={setIsRejectModalOpen}
        handleUpdateStatus={handleUpdateStatus}
        updateStatusData={updateStatusData}
      />
    </div>
  )
}

export default MediaManagement
