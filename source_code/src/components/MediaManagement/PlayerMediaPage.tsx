import React, { useState } from 'react'
import thumbnail from '../../assets/images/image mask.png'
import VideoCard from './VideoCard';
import { FileVideo2 } from 'lucide-react';

interface PlayerMediaPageProps {

}

const PlayerMediaPage:React.FC<PlayerMediaPageProps> = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1)
  

    const videoData = {
      thumbnail: thumbnail,
      duration: '8:15',
      author: 'Michael DeTizio',
      title: 'Hole-in-One',
      likes: 12,
      views: '53K',
      uploadDate: '01/10/2024',
      comments: 2,
    };

  return (
    <div className='h-[100vh] bg-[#ffffff] px-10'>
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
            published Highlights
            <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>0</span>
          </button>
          <button className={`flex items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[6px]
          ${selectedTab === 2 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
            onClick={() => setSelectedTab(2)}
          >
            <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 2 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
            Requeste Highlights
            <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>0</span>
          </button>
          <button className={`flex items-center justify-center font-[14px] rounded-l-full rounded-r-full  px-[16px] py-[6px]
          ${selectedTab === 3 ? 'bg-[#95C11E] text-[#ffffff]' : 'text-[#7B7887]'}
          `}
            onClick={() => setSelectedTab(3)}
          >
            <FileVideo2 className={`w-[16px] mr-2 h-[16px] ${selectedTab === 3 ? 'text-[#ffffff]' : 'text-[#7B7887]'}`} />
            All Highlights
            <span className='w-[26px] h-[14px] rounded-[100px] bg-[#E9ECF1] text-[11px] text-[#000000] ml-[16px]'>0</span>
          </button>
        </div>
        <div className="flex  gap-[16px]">
          <div className="align-center flex">
            <select
              id="courses"
              className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:ml-2 md:mt-0 md:w-[320px]"
            >
              <option value="All Contests" selected>
                All Videos
              </option>
              <option value="DE">Top Shots</option>
              <option value="AC">Not Top Shots</option>
              <option value="CP">Shot Of The Week</option>
            </select>
          </div>
        </div>
      </div>
       <VideoCard {...videoData} isPublished={selectedTab!=2} />
    </div>
  )
}

export default PlayerMediaPage
