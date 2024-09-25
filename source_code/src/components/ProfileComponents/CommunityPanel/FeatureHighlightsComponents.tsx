import { VideoOff } from 'lucide-react'
import React from 'react'

interface FeatureHighlightsComponentsprops {

}

const FeatureHighlightsComponents: React.FC<FeatureHighlightsComponentsprops> = () => {
  return (
    <div className='bg-[#1D1A0C99] p-3 w-[992px] my-5 h-[206px] rounded-[8px]'>
      <span className='text-[#ffffff] text-[16px]'>Featured Highlights</span>
      <div className='bg-[#FFFFFF1A] mt-2 w-[full] h-[152px] flex flex-col  justify-center items-center  rounded-[6px]'>
        <VideoOff color='#ffffff' size={84} className=' font-extralight' />
        <span className='text-[#F5F6F7]'>No videos are available to watch</span>
      </div>
    </div>
  )
}

export default FeatureHighlightsComponents
