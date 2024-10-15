import React, { useCallback, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { X } from "lucide-react";
import Draggable from "react-draggable";

interface VideoPlayerProps {
  setIsVideoPlayerVisible: (flag: boolean) => void;
  isVideoPlayerVisible: boolean;
  selectedVideo: string;
  setSelectedVideo: (video: string) => void;
  height?: string;
  width?: string;
  triggerFullscreen?: () => void; // Add this prop
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  setIsVideoPlayerVisible,
  isVideoPlayerVisible,
  selectedVideo,
  setSelectedVideo,
  height = "300px",
  width = "530px",
}) => {
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <Draggable>
      <div
        className={`move h-[300px] w-[530px] cursor-pointer overflow-hidden rounded-lg border bg-[#000000] pb-[1px] pl-[1px] pr-[1px] ${
          isVideoPlayerVisible ? "visible" : "hidden"
        }`}
        style={{ zIndex: 9999 }} // Ensure the video shows above other elements
      >
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          url={selectedVideo}
          playing={true} // Auto-play is true
          width={width}
          height={height}
          controls
          // onReady={handlePlayerReady}
        />
        <X
          className="absolute right-2 top-2 z-50 cursor-pointer rounded-full bg-[#1D1A0C99] p-1 text-[24px] text-[#ffffff]"
          onClick={() => {
            setSelectedVideo("");
            setIsVideoPlayerVisible(false);
          }}
        />
      </div>
    </Draggable>
  );
};

export default VideoPlayer;
