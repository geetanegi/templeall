import React, { useEffect, useState } from 'react'



// lucide icons imports 
import { FileVideo2 } from 'lucide-react'
import MediaManagementTable from './MediaManagementTable'
import UploadVideoModal from './UploadVideoModal'
import VideoPlayer from './VideoPlayer'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import PlayerMediaPage from './PlayerMediaPage'

interface MediaManagementProps {

}

const MediaManagement: React.FC<MediaManagementProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(1)
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState<boolean>(false);
  const [isSoTW, setIsSoTW] = useState<boolean>(false)
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );

  if (userPermisions?.data?.permission["is_player"]) {
    return <PlayerMediaPage />
  }

  useEffect(()=>{
    getVideosList()
  }, [])

  const getVideosList = () =>{
    try {
      
    } catch (error) {
      
    }
  }


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
                >
                  <option value="All Contests" selected>
                    All Videos
                  </option>
                  <option value="DE">Winning Shot Jackpot</option>
                  <option value="AC">Winning Shot CTP</option>
                  <option value="CP">Shot Of The Week</option>
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
      />

      <UploadVideoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isSoTW={isSoTW}
      />
      <VideoPlayer
        isVideoPlayerVisible={isVideoPlayerVisible}
        setIsVideoPlayerVisible={setIsVideoPlayerVisible}
      />
    </div>
  )
}

export default MediaManagement
