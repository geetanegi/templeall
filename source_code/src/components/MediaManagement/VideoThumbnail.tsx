import React, { useRef } from 'react';
interface VideoThumbnailprops {
    videoUrl: string;
    onClick:()=>void
}

const VideoThumbnail: React.FC<VideoThumbnailprops> = ({ videoUrl, onClick }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    

    return (
        <div className='w-full rounded-t-lg object-cover' onClick={()=>onClick()} >
            <video ref={videoRef} src={videoUrl} 
            className='w-full rounded-t-lg object-cover'
            // style={{ display: 'none' }} 
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default VideoThumbnail;
