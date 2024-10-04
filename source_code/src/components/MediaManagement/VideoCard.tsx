import { Bookmark, BookmarkX, CircleEllipsis, Dot, LockKeyholeOpen, Share2, ThumbsUp, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiPlayCircleBold } from 'react-icons/pi';
import VideoRequestModal from './VideoRequestModal';

import rejectedVideo from '../../assets/images/rejectedVideo.png';
import requestvideo from '../../assets/images/requestvideothumbnail.png'
import lockvideo from "../../assets/images/lock.png";
import ConfirmationModal from '../GenericUIcomponents/ConfirmationModal';
import { deleteVideos } from './mediaUtils/mediaUtils';
import { ToastError, ToastSuccess } from '../Toast';
import apiService from '../../services/apiService';
import { API_URL } from '../../services/enums';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../reducers/loader/loader';
import VideoThumbnail from './VideoThumbnail';
import ShareVideoModal from './ShareRequestModal';

interface VideoCardProps {
    thumbnail?: string;
    author: string;
    title: string;
    likes?: number;
    views?: string;
    uploadDate: string;
    isApproved?: boolean;
    isPublished?: boolean;
    contestName?: string;
    clubName?: string;
    holeName?: string;
    status?: string;
    tee?: string;
    onTeeTime?: string
    requestVideoPayload: any
    getAllVideos: () => void;
    setIsVideoPlayerVisible: (flag: boolean) => void
    setSelectedVideo: (video: string) => void;
    setRefreshList: (flag: boolean) => void;
    refreshList: boolean,
    isSOTW:boolean
    
}





const VideoCard: React.FC<VideoCardProps> = (
    { setRefreshList,
        refreshList,
        author,
        title,
        likes,
        views,
        uploadDate,
        isApproved = true,
        isPublished,
        contestName = 'AceCam Jackpot',
        clubName = 'Shanghai COntry CLub, MI',
        holeName = 'Hole #10 - Par 3',
        tee = '',
        onTeeTime = '2:32:21 PM',
        status,
        requestVideoPayload,
        setSelectedVideo,
        setIsVideoPlayerVisible,
        getAllVideos,
        isSOTW,
         }) => {
    const[isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(videoRef.current?.duration || 0);
      };

      const videoElement = videoRef.current;
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

      // Clean up the event listener
      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [requestVideoPayload?.videos?.url]);


    const computeCardDetails = () => {
        if (isApproved) {
            return (
                <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-white mt-2">
                        <span>
                            {/* Author */}
                            <p className="text-sm font-semibold">{author}</p>
                            {/* Title */}
                            <h5 className="text-lg font-bold mt-1">{title}</h5>
                        </span>
                        <span className=''>
                            {/* Like and Comments Section */}
                            <div className="flex justify-between items-center mt-0 text-sm w-[44px] h-[16px]">
                                {/* Comments */}
                                <div className="flex items-center space-x-5">
                                    <ThumbsUp className="text-blue-500" size={16} />

                                </div>

                                {/* Likes */}
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setIsShareModalOpen(true)}><Share2 className="text-gray-300 " size={16} /></button>
                                </div>
                            </div>
                        </span>
                    </div>


                    {/* Stats */}
                    <div className="flex items-center justify-start text-sm text-gray-400 mt-2">
                        <span>{views} Views </span>
                        <span><Dot /></span>
                        <span>{likes} Likes</span>
                        <span><Dot /></span>
                        <span>{uploadDate}</span>
                    </div>


                </div>
            )
        }
        else {
            return (
                <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-white mt-2 overflow-visible">
                        <span>
                            {/* Author */}
                            <p className="text-sm text-[#E6E6E6] font-normal">{contestName}</p>
                        </span>
                        {
                            status === 'PENDING' ?
                                <div className='flex items-center px-2 w-[70px] bg-[#FFFFFF1A]'>
                                    <CircleEllipsis size={12} color='#FD8A02' />
                                    <span className='text-[#FD8A02] ml-1 text-[11px]'>Pending</span>
                                </div> :
                                <span className='inline-block bg-[#95C11E] rounded-sm'>
                                    {/* Like and Comments Section */}
                                    <div className="flex justify-between items-center pr-1 mt-0 text-xs  h-[20px]"
                                        style={{ width: "max-content" }}
                                    >
                                        {/* Comments */}

                                        <button className='flex items-center space-x-1 ml-1 whitespace-nowrap' onClick={() => setIsModalOpen(true)}>
                                            <LockKeyholeOpen size={12} />
                                            <span>{requestVideoPayload.status === 'REJECT' ? "Re-Request Video" : "Request Video"} </span>
                                        </button>

                                    </div>
                                </span>
                        }


                        {/* Title */}



                    </div>

                    <div className="items-center justify-start text-sm text-white mt-1">
                        <h5 className="text-md font-semibold mt-1">{clubName}</h5>
                        <p className="text-xs text-[#E6E6E6] font-normal mt-1">{holeName}, {tee}</p>
                    </div>



                    {/* Stats */}
                    <div className="flex items-center justify-start text-xs text-gray-400 mt-2">
                        <span>On-Tee Time:</span>
                        <span className='text-white ml-1'>{onTeeTime}</span>

                    </div>

                    <VideoRequestModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        requestVideoPayload={requestVideoPayload}
                        getAllVideos={getAllVideos}
                    />



                </div>

            )
        }
    }

    const computeVideoThumbnail = () => {
        if (isApproved) {
            return <VideoThumbnail videoUrl={requestVideoPayload?.videos?.url || ''}
                onClick={() => {
                    setSelectedVideo(requestVideoPayload?.videos?.url || '')
                    setIsVideoPlayerVisible(true)
                }}
            />
        } else if (status === "PENDING" || !status) {
            return <img src={requestvideo} alt="Thumbnail" className="w-full rounded-t-lg object-cover" />
        } else if (status === "REJECT") {
            return <img src={rejectedVideo} alt="Thumbnail" className="w-full rounded-t-lg object-cover" />
        } else {
            return <img src={requestvideo} alt="Thumbnail" className="w-full rounded-t-lg object-cover" />
        }
    }

    const handleVideoPublish = async () => {
        try {
            dispatch(setLoading(true));
            const res = await apiService.post<any>(API_URL.publishVideos, {
                data: {
                    "requestVideoId": requestVideoPayload.id,
                    "isPublished": !isPublished
                }
            });
            if (res.status === 200 && !res.data.error) {
                ToastSuccess(res.data.data.message)
                setRefreshList(!refreshList)
            } else if (res.data.error) {
                ToastError(res.data.description || "");
            }
        } catch (error) {

        } finally {
            dispatch(setLoading(false));
        }
    }

    const refreshVideo = ()=> {
        setRefreshList(!refreshList) 
    }


    return (
        <>
            <div className="max-w-sm bg-[#1D1A0C] w-[280px] text-white cursor-pointer border border-gray-800 rounded-lg shadow-lg"

            >
                {/* Thumbnail with duration and overlay icons */}
                <div className="relative bg-[#ffffff] h-[175px] rounded-t-lg overflow-hidden"
                >
                    {computeVideoThumbnail()}

                    {/* Play Button */}
                    <div className="absolute inset-0 flex justify-center items-center"
                    >
                        <PiPlayCircleBold style={{ height: '38px', width: '38px' }}
                            onClick={() => {
                                setSelectedVideo(requestVideoPayload?.videos?.url || '')
                                setIsVideoPlayerVisible(true)
                            }}
                        />
                    </div>
                    <video ref={videoRef} src={requestVideoPayload?.videos?.url || ''} style={{ display: 'none' }} />
                    {/* Duration tag */}
                    {
                        isApproved ?
                            <span className="absolute bottom-2 right-2 bg-black text-white text-xs font-semibold py-1 px-2 rounded">
                                {duration}
                            </span> : null
                    }

                    {/* Bookmark and more options */}
                    <div className="absolute top-[-2px] left-2">
                        {
                            isPublished ?
                                <span className='text-[#FD8A02]'><Bookmark fill='#FD8A02' size={18} /></span> : null
                        }
                    </div>
                    
                    <div className="absolute top-2 right-2">
                        {
                            isApproved ?
                                <div className="relative inline-block" ref={dropdownRef}>
                                    <BsThreeDotsVertical className="bg-[#1D1A0C99] rounded-full cursor-pointer p-1 text-[24px] text-white"
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                    {
                                        isOpen && <div
                                            className="absolute bg-white border rounded   shadow-lg z-10"
                                            style={{
                                                width: "118px",
                                                right: "0",
                                                marginTop: '3px'
                                            }}
                                        >
                                            <button className={`text-[#000000] flex items-center justify-center gap-2 px-2 py-1 text-[13px] 
                                                ${isPublished ? 'text-[#FD8A02]' : "text-[#7B7887]"}
                                                
                                            `} onClick={handleVideoPublish}
                                            ><BookmarkX size={16} /> Published</button>
                                            <hr />
                                            <button className='text-[#000000] flex items-center justify-center gap-2 px-2 py-1 text-[13px] text-[#7B7887]'
                                                onClick={() => setIsConfirmationModalOpen(true)}
                                            ><Trash2 size={16} /> Delete</button>
                                        </div>
                                    }
                                </div> :
                                <img src={lockvideo} alt="" />
                        }
                    </div> : null
                </div>

                {/* Video Details */}
                {computeCardDetails()}
            </div>
            <ConfirmationModal
                type={"error"}
                confirmationText={'Are you sure you want to remove this video?'}
                isOpen={isConfirmationModalOpen}
                onClose={() => {
                    setIsConfirmationModalOpen(false)
                }}
                onOk={() => {
                    setIsConfirmationModalOpen(false)
                    deleteVideos("REQUEST_VIDEO", requestVideoPayload?.id, refreshVideo)
                }}
            />

            {isApproved?
           <div> <ShareVideoModal isShareModalOpen={isShareModalOpen} url={requestVideoPayload?.videos?.url || ''} setIsShareModalOpen={() => setIsShareModalOpen(false)}/></div>
            :  <div></div> 
            }
        </>
    );
}; export default VideoCard;
