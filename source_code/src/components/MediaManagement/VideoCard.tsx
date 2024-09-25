import { Bookmark, Dot, LockKeyholeOpen, Share2, ThumbsUp } from 'lucide-react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiPlayCircleBold } from 'react-icons/pi';

interface VideoCardProps {
    thumbnail: string;
    duration: string;
    author: string;
    title: string;
    likes: number;
    views: string;
    uploadDate: string;
    isPublished?: boolean;
    contestName?: string;
    clubName?: string;
    holeName?: string;
    status?: string;
    tee?: string;
    onTeeTime?: string
}



const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, duration, author, title, likes, views, uploadDate, isPublished = true, contestName = 'AceCam Jackpot', clubName = 'Shanghai COntry CLub, MI', holeName = 'Hole #10 - Par 3', tee = 'Black Tees (157 Yards)', onTeeTime = '2:32:21 PM' }) => {

    const computeCardDetails = () => {
        if (isPublished) {
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
                                    <Share2 className="text-gray-300 " size={16} />
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
                        <span className='inline-block bg-[#95C11E] rounded-sm'>
                            {/* Like and Comments Section */}
                            <div className="flex justify-between items-center mt-0 text-xs w-[103px] h-[20px]">
                                {/* Comments */}
                                <button className='flex items-center space-x-1 ml-1'>
                                    <LockKeyholeOpen size={12} />
                                    <span>Request Video</span>
                                </button>
                            </div>
                        </span>


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


                </div>
            )
        }
    }
    return (
        <div className="max-w-sm bg-[#1D1A0C] w-[280px] text-white border border-gray-800 rounded-lg shadow-lg">
            {/* Thumbnail with duration and overlay icons */}
            <div className="relative bg-[#ffffff] h-[150px] rounded-t-lg overflow-hidden">
                <img src={thumbnail} alt="Thumbnail" className="w-full rounded-t-lg object-cover" />

                {/* Play Button */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <PiPlayCircleBold style={{ height: '38px', width: '38px' }} />
                </div>

                {/* Duration tag */}
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs font-semibold py-1 px-2 rounded">
                    {duration}
                </span>

                {/* Bookmark and more options */}
                <div className="absolute top-0 left-2">
                    <span className='text-[#FD8A02]'><Bookmark fill='#FD8A02' size={14} /></span>
                </div>
                <div className="absolute top-2 right-2">
                    <BsThreeDotsVertical className="text-white" />
                </div>
            </div>

            {/* Video Details */}
            {computeCardDetails()}
        </div>
    );
};

export default VideoCard;
