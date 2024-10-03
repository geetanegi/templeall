import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import { FileVideo2 } from 'lucide-react';
import apiService from '../../services/apiService';
import { ToastError } from '../Toast';
import { setLoading } from '../../reducers/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../services/enums';
import { RootState } from '../../store';
import PageLoader from '../PageLoader';
import moment from 'moment';
import VideoPlayer from './VideoPlayer';
import { computeFilterDropDown } from './mediaUtils/mediaUtils';

interface PlayerMediaPageProps {

}

interface getVideosListPayloadType {
  playerId?: number | string | undefined;
  date?: string;
  searchParams?: searchParams
}

interface searchParams {
  isPublished?: boolean;
  status?: string;
  "playerUser.id"?: number | string | undefined;
  "club.id"?:number | string;
  videoCategory?:string

}


const PlayerMediaPage: React.FC<PlayerMediaPageProps> = () => {
  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [selectedTab, setSelectedTab] = useState<number>(1)
  const [allVideos, setAllVideos] = useState<Array<any>>([])
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string>('')
  const [filterValue, setFilterValue] = useState<string>('')
  const [refreshList, setRefreshList] = useState<boolean>(false)
  const [highlightsCounts,setHighlightsCounts] = useState<any>({})

  const dispatch = useDispatch();


  useEffect(() => {
    setAllVideos([])
    setFilterValue('')
    getAllVideos()
    setSelectedValue('')
    getAllHighlightsCounts()
  }, [selectedTab, refreshList])

  const getAllHighlightsCounts = async() => {
    try {

      const { data, status } = await apiService.post<any>(
        API_URL.getAllHighlightsCounts,
        {
          "data": {}
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setHighlightsCounts(data.data)
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {

    }
  }
  

  useEffect(() => {
    if (filterValue === 'SOTW') {
      makeApiCall(API_URL.getAllShotOfTheWeek)
    }else{
      getAllVideos()
    }
  }, [filterValue])

  const getAllVideos = async () => {
    try {
      dispatch(setLoading(true));
      if (selectedTab === 2) {
        await makeApiCall(API_URL.getAllPlayerReqHighlights)
      } else if (selectedTab === 3) {
       await makeApiCall(API_URL.getAllApprovedVideos)
      } else if (selectedTab === 1) {
       await makeApiCall(API_URL.getAllPublishedVideos)
      } else {
        // do nothing
      }
    } catch (error) {
      ToastError('Something went wrong')
    } finally {
      dispatch(setLoading(false));
    }

  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value); // Update the state with the selected value
  };

  const makeApiCall = async (endPoint: string,) => {
    let payload: getVideosListPayloadType = {}
    

    if (selectedValue === 'SOTW') {
      payload = {
        ...payload,
        searchParams: {
          "club.id": "1"
        }
      }
    } else {
      if (selectedTab === 3) {
        const searchParams = {
          "status": "APPROVED",
          "playerUser.id": typeof userInfo === "object" ? userInfo.userId : undefined
        }
        payload = {
          ...payload,
          searchParams
        }
        if (filterValue) {
          payload = {
            searchParams: {
              ...payload.searchParams,
              "videoCategory": filterValue
            }
          }
        }

      } else if (selectedTab === 2) {
        payload = {
          ...payload, "date": moment().utc().format('YYYY-MM-DD'),
          "playerId": typeof userInfo === "object" ? userInfo.userId : undefined
        }
        if (filterValue) {
          payload = {
            searchParams: {
              ...payload.searchParams,
              "videoCategory": filterValue
            }
          }
        }

      } else if (selectedTab === 1) {
        const searchParams = {
          "status": "APPROVED",
          "isPublished": true,
          "playerUser.id": typeof userInfo === "object" ? userInfo.userId : undefined
        }
        payload = {
          ...payload, searchParams

        }
        if (filterValue) {
          payload = {
            searchParams: {
              ...payload.searchParams,
              "videoCategory": filterValue
            }
          }
        }
      }
    }
   
    if(filterValue === "SOTW"){
      payload = {
        searchParams: {
        }
      }
    }
    

    const { data, status } = await apiService.post<any>(
      endPoint,
      {
        "data": {
          ...payload,
        }
      },
    );
    if (status === 200 && data?.data != null && !data?.error) {
      setAllVideos(data?.data)
    } else if (data?.error && data.description) {
      ToastError(data.description);
    }
  }

  return (
    <div className='min-h-[100vh] h-full bg-fixed bg-[#ffffff] px-10 pb-10'>
      <div className='flex justify-between  py-5'>
        <div className='flex bg-[#F5F6F7] p-[4px] gap-[16px] rounded-l-full rounded-r-full border'
          style={{ width: "max-content" }}
        >
          <button className={`flex items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[6px] 
                  ${selectedTab === 1 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
            onClick={() => setSelectedTab(1)}
          >
            <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 1 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
            Published Highlights
            <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>{highlightsCounts.published || 0}</span>
          </button>
          <button className={`flex items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[6px]
          ${selectedTab === 2 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
            onClick={() => setSelectedTab(2)}
          >
            <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 2 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
            Request Highlights
            <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>{highlightsCounts.allRequested || 0}</span>
          </button>
          <button className={`flex items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[6px]
          ${selectedTab === 3 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
            onClick={() => setSelectedTab(3)}
          >
            <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 3 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
            All Highlights
            <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>{highlightsCounts.allHighlight || 0}</span>
          </button>
        </div>
        {
          selectedTab !== 2 ?
            <div className="flex  gap-[16px]">
              <div className="align-center flex">
                <select
                  id="courses"
                  className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:ml-2 md:mt-0 md:w-[320px]"
                  onChange={handleFilterChange}
                >
                  {
                    computeFilterDropDown("", "Player")?.map((filter) => {
                      return <option value={filter.key} selected={filterValue === filter?.key} >{filter.name}</option>
                    })
                  }
                </select>
              </div>
            </div> : null
        }
      </div>
      <PageLoader isActive={loader}>
        <div className='flex gap-4 flex-wrap w-[100vw]'>
          {
            allVideos?.map((videoData) => {

              return <VideoCard
                author={(videoData?.firstName || '') + " " + (videoData?.lastName || '')}
                uploadDate={moment(videoData?.startTime).utc().format('DD/MM/YYYY')}
                title={videoData?.contestType}
                status={videoData?.status}
                clubName={videoData?.club?.name || ''}
                tee={videoData?.tee?.teeName + `(${videoData?.tee?.yardage})`}
                holeName={`Hole #${videoData?.hole?.holeNumber} - Par ${videoData?.hole?.par}`}
                requestVideoPayload={{ ...videoData }}
                isApproved={selectedTab != 2}
                isPublished={videoData.isPublished}
                getAllVideos={getAllVideos}
                setSelectedVideo={setSelectedVideo}
                setIsVideoPlayerVisible={setIsVideoPlayerVisible}
                setRefreshList={setRefreshList}
                refreshList={refreshList}
                isSOTW={filterValue === "SOTW"}
                
              />
            })
          }

        </div>
      </PageLoader>
      <VideoPlayer
        isVideoPlayerVisible={isVideoPlayerVisible}
        setIsVideoPlayerVisible={setIsVideoPlayerVisible}
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
    </div>
  )
}

export default PlayerMediaPage
