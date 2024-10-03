import React from 'react'
import ReactPlayer from 'react-player'
import { X } from 'lucide-react';
import Draggable from 'react-draggable';
interface VideoPlayerProps {
    setIsVideoPlayerVisible: (flag: boolean) => void;
    isVideoPlayerVisible: boolean;
    selectedVideo: string;
    setSelectedVideo: (video: string) => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ setIsVideoPlayerVisible, isVideoPlayerVisible, selectedVideo, setSelectedVideo }) => {
    return (
        <Draggable>
            <div className={`h-[300px] w-[530px] border rounded-lg overflow-hidden bg-[#000000] pr-[1px] pl-[1px] pb-[1px] absolute bottom-1 right-0 cursor-pointer  move 
            ${isVideoPlayerVisible ? 'visible' : 'hidden'}
        `}>
                <ReactPlayer
                    className="react-player"
                    url={selectedVideo}
                    playing={true}
                    // loop={true}
                    width="530px"
                    height="300px"
                    controls
                />
                <X
                    className='absolute top-2 right-2 cursor-pointer z-50 text-[#ffffff] bg-[#1D1A0C99] rounded-full p-1 text-[24px] '
                    onClick={() => {
                        setSelectedVideo('')
                        setIsVideoPlayerVisible(false)
                    }}
                />
            </div>
        </Draggable>
    )
}

export default VideoPlayer
