import React from 'react'
import ReactPlayer from 'react-player'
import { X } from 'lucide-react';
interface VideoPlayerProps {
    setIsVideoPlayerVisible: (flag: boolean) => void;
    isVideoPlayerVisible: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({setIsVideoPlayerVisible, isVideoPlayerVisible }) => {
    return (
        <div className={`h-[300px] w-[500px] rounded-lg overflow-hidden absolute bottom-0 right-0
            ${isVideoPlayerVisible ? 'visible' : 'hidden'}
        `}>
            <ReactPlayer
                className="react-player relative"
                url={'https://www.pexels.com/video/multiple-panning-shots-of-a-golf-course-854398/'}
                width="500px"
                height="300px"
                controls
            />
            <X 
                className='absolute top-2 right-2 cursor-pointer z-50 text-[#ffffff]' 
                onClick={() => setIsVideoPlayerVisible(false)} 
            />
        </div>
    )
}

export default VideoPlayer
