import {
  Bookmark,
  BookmarkPlus,
  CircleEllipsis,
  Dot,
  Eye,
  LockKeyholeOpen,
  MessageCircle,
  Share2,
  ThumbsUp,
  Trash2,
  Trophy,
  VideoOff,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiPlayCircleBold } from "react-icons/pi";
import VideoRequestModal from "./VideoRequestModal";

import rejectedVideo from "../../assets/images/rejectedVideo.png";
import requestvideo from "../../assets/images/requestvideothumbnail.png";
import videoNotAvailable from "../../assets/images/videoNot_available.png"
import lockvideo from "../../assets/images/lock.png";
import ConfirmationModal from "../GenericUIcomponents/ConfirmationModal";
import {
  deleteVideos,
  formatCount,
  makeVieoLiked,
  updateViewCount,
} from "./mediaUtils/mediaUtils";
import { ToastError } from "../Toast";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { useDispatch } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import ShareVideoModal from "./ShareRequestModal";
import CommentsDrawer from "./CommentsDrawer";

interface VideoCardProps {
  thumbnail?: string;
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
  onTeeTime?: string;
  requestVideoPayload: any;
  getAllVideos: () => void;
  setIsVideoPlayerVisible: (flag: boolean) => void;
  isVideoPlayerVisible: boolean;
  setSelectedVideo: (video: string) => void;
  setRefreshList: (flag: boolean) => void;
  refreshList: boolean;
  isSOTW: boolean;
  rejectionReason?: string;
  userInfo: any;
  width?:string;
  isEdit?:boolean
}

const VideoCard: React.FC<VideoCardProps> = ({
  setRefreshList,
  refreshList,
  title,
  uploadDate,
  isApproved = true,
  isPublished,
  clubName = "Shanghai COntry CLub, MI",
  holeName = "Hole #10 - Par 3",
  tee = "",
  onTeeTime = "2:32:21 PM",
  status,
  requestVideoPayload,
  setSelectedVideo,
  setIsVideoPlayerVisible,
  isVideoPlayerVisible,
  getAllVideos,
  rejectionReason,
  userInfo,
  width="280px",
  isEdit=false
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [like, setlike] = useState<{
    islike: Boolean;
    likecount: number | string;
    click: boolean;
  }>({
    islike: requestVideoPayload?.videos?.isUserLiked || false,
    likecount: requestVideoPayload?.videos?.likes || 0,
    click: false,
  });
  const [videodetails, setVideoDetails] = useState<any>({
    ...(requestVideoPayload?.videos || {}),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(event?.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => {
        videoRef.current?.duration &&
          setDuration(videoRef?.current?.duration / 1000 || 0);
      };

      const handleCanPlayThrough = () => {
        videoRef.current?.duration &&
          setDuration(videoRef?.current?.duration / 100 || 0);
      };

      const videoElement = videoRef.current;
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("canplaythrough", handleCanPlayThrough);

      // Clean up the event listeners
      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        videoElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough,
        );
      };
    }
  }, [requestVideoPayload?.videos?.url]);

  const computeCardDetails = () => {
    if (isApproved) {
      return (
        <div className="p-2">
          <div className="mt-2 flex items-center justify-between text-sm text-white">
            <span>
              {/* Author */}
              <p className="text-[16px] font-light">
                {requestVideoPayload?.videos?.title}
              </p>
              <p className="text-[12px] text-sm font-light">
                {requestVideoPayload?.username || ""}
              </p>
              {/* Title */}
            </span>
            <span>{uploadDate}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm font-light">
            <Trophy size={13} /> <span className="text-[12px]">{title}</span>{" "}
          </div>
          <div className="mt-1 items-center justify-start text-white">
            <div className="mt-1 flex flex-wrap  text-[14px]">
              <span className="text-[12px] flex whitespace-nowrap"
                style={{width:"max-content"}}
              >
                {requestVideoPayload?.clubName || ""}
              <Dot className="mx-[-5px]" />
              </span>
              <span className="text-[12px] flex whitespace-nowrap"
                style={{width:"max-content"}}>
                Hole#{requestVideoPayload?.holeNumber || ""}
              <Dot className="mx-[-5px]"  />
              </span>
              <span className="text-[12px] flex whitespace-nowrap"
                style={{width:"max-content"}}>
                {requestVideoPayload?.teeName || ""}
              </span>
            </div>
          </div>
          {/* Stats */}
          <div className={`flex items-center justify-start text-sm ${requestVideoPayload?.videos?.url ? "visible" : "invisible"}`}>
            <span className="flex items-center justify-center gap-1 text-[12px]">
              <Eye size={13} /> {videodetails.views ? formatCount(videodetails.views) : 0}
            </span>
            <span></span>
            <div className="n relative ml-auto mr-10 mt-0 flex h-[16px] w-[44px] gap-[12px] text-sm">
              <div
                className="flex items-center space-x-5"
                onClick={() => {
                  if(requestVideoPayload?.videos?.url){
                    setIsDrawerOpen(true);
                  } 
                }}
              >
                <MessageCircle size={16} />
                <span className="text[#ffffff] absolute right-6 top-0 flex h-[10px] w-[10px] items-center justify-center rounded-full bg-[#FF3B30] text-[8px]">
                  {videodetails?.commentCount ? formatCount(videodetails.commentCount) : 0}
                </span>
              </div>
              {/* Comments */}
              <div className="flex gap-1">
                <ThumbsUp
                  className={`${like.islike ? "text-blue-500" : ""} `}
                  size={16}
                  onClick={() => {
                    makeVieoLiked(
                      requestVideoPayload?.videos?.id,
                      typeof userInfo === "object" ? userInfo.userId : "",
                      requestVideoPayload?.videos?.isUserLiked,
                    );
                    setlike({
                      ...like,
                      islike: !like.islike,
                      likecount: like.islike
                        ? Number(like.likecount) - 1
                        : Number(like.likecount) + 1,
                      click: true,
                    });
                  }}
                />
                <span className="text-[16px]">
                  {like.click
                    ? formatCount(like.likecount)
                    : requestVideoPayload?.videos?.likes ? formatCount(requestVideoPayload?.videos?.likes) : 0}
                </span>
              </div>
              {/* Likes */}
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsShareModalOpen(true)}>
                  <Share2 className="text-gray-300" size={16} />
                </button>
              </div>
            </div>
            {/* <span>
              <Dot />
            </span> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-2">
          <div className="mt-2 flex items-center justify-between overflow-visible text-sm text-white">
            <span>
              {/* Author */}
              <p className="mr-1 text-[13px] font-normal text-[#E6E6E6]">
                {title}
              </p>
            </span>
            {status === "PENDING" ? (
              <div className="flex w-[70px] items-center bg-[#FFFFFF1A] px-2">
                <CircleEllipsis size={12} color="#FD8A02" />
                <span className="ml-1 text-[11px] text-[#FD8A02]">Pending</span>
              </div>
            ) : (
              <span className="inline-block rounded-sm bg-[#95C11E]">
                {/* Like and Comments Section */}
                <div
                  className="mt-0 flex h-[20px] items-center justify-between pr-1 text-xs"
                  style={{ width: "max-content" }}
                >
                  {/* Comments */}

                  <button
                    className="ml-1 flex items-center space-x-1 whitespace-nowrap"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <LockKeyholeOpen size={12} />
                    <span>
                      {requestVideoPayload?.status === "REJECT"
                        ? "Re-Request Video"
                        : "Request Video"}{" "}
                    </span>
                  </button>
                </div>
              </span>
            )}

            {/* Title */}
          </div>

          <div className="mt-1 items-center justify-start text-sm text-white">
            <h5 className="text-md mt-1 font-semibold">{clubName}</h5>
            <p className="mt-1 text-xs font-normal text-[#E6E6E6]">
              {holeName}, {tee}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-2 flex items-center justify-start text-xs text-gray-400">
            <span>On-Tee Time:</span>
            <span className="ml-1 text-white">{onTeeTime}</span>
          </div>

          <VideoRequestModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            requestVideoPayload={requestVideoPayload}
            getAllVideos={getAllVideos}
          />
        </div>
      );
    }
  };

  const computeVideoThumbnail = () => {
    if (isApproved) {
      return (
        <div className="h-full w-full rounded-t-lg object-cover bg-gray-100">
          <img
            className="h-full w-full rounded-t-lg object-cover"
            src={requestVideoPayload?.videos?.thumbnailUrl || videoNotAvailable}
            alt=""
          />
        </div>
      );
    } else if (status === "PENDING" || !status) {
      return (
        <img
          src={requestvideo}
          alt="Thumbnail"
          className="w-full rounded-t-lg object-cover"
        />
      );
    } else if (status === "REJECT") {
      return (
        <img
          src={rejectedVideo}
          alt="Thumbnail"
          className="w-full rounded-t-lg object-cover"
        />
      );
    } else {
      return (
        <img
          src={requestvideo}
          alt="Thumbnail"
          className="w-full rounded-t-lg object-cover"
        />
      );
    }
  };

  const handleVideoPublish = async () => {
    try {
      dispatch(setLoading(true));
      let payload = {};
      let endPoint = API_URL.publishVideos;
      if (requestVideoPayload.type === "SOTW") {
        endPoint = API_URL.publishSOTW;
        payload = { sowId: requestVideoPayload.id, isPublished: !isPublished };
      } else {
        payload = {
          requestVideoId: requestVideoPayload.id,
          isPublished: !isPublished,
        };
      }

      const res = await apiService.post<any>(endPoint, {
        data: payload,
      });

      if (res.status === 200 && !res.data.error) {
        setRefreshList(!refreshList);
      } else if (res.data.error) {
        ToastError(res.data.description || "");
      }
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  const refreshVideo = () => {
    setRefreshList(!refreshList);
  };
  const computeCategory = () => {
    if (requestVideoPayload.type === "SOTW") {
      return "Shot-of-the-Week";
    } else {
      if (requestVideoPayload?.videoCategory === "TOP_SHOT") {
        return "Top Shot";
      } else if (requestVideoPayload?.videoCategory === "NOT_TOP_SHOT") {
        return "Not top shot";
      } else {
        return requestVideoPayload?.videoCategory;
      }
    }
  };

  return (
    <>
      <div className={`cursor-pointer rounded-lg border border-gray-100 bg-[#1D1A0C] text-white shadow-lg`}
        style={{width: width}}
      >
        {/* Thumbnail with duration and overlay icons */}
        <div className="relative h-[175px] overflow-hidden rounded-t-lg bg-[#ffffff]">
          {computeVideoThumbnail()}
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            {" "}
            {status === "REJECT" ? (
              <div className="flex h-[70%] w-[90%] flex-col rounded-md bg-[#1D1A0C99] text-[14px]">
                <div className="mt-[5px] flex items-center justify-center">
                  <div className="rounded-full bg-[#FFFFFF26] p-2">
                    <VideoOff
                      color="#ffffff"
                      // strokeWidth={1}
                      size={36}
                      className="rounded-full bg-[#FFFFFF59] p-2 font-extralight"
                    />
                  </div>
                </div>
                <div className="overflow-hidden overflow-ellipsis pl-[1px] pr-[1px] text-center text-[14px]">
                  {rejectionReason}
                </div>
              </div>
            ) : (
              <PiPlayCircleBold
                style={{ height: "38px", width: "38px" }}
                className={`${requestVideoPayload?.videos?.url ? "visible" : "invisible"}`}
                onClick={() => {
                  if (isApproved) {
                    if (!isVideoPlayerVisible && requestVideoPayload?.videos?.url) {
                      setSelectedVideo(requestVideoPayload?.videos?.url || "");
                      setIsVideoPlayerVisible(true);
                      if (requestVideoPayload?.videos?.url) {
                        updateViewCount(requestVideoPayload?.videos?.id);
                        setVideoDetails({
                          ...videodetails,
                          views: Number(videodetails.views) + 1,
                        });
                      }
                    }
                  }
                }}
              />
            )}
          </div>
          {/* Duration tag */}
          <video
            ref={videoRef}
            src={requestVideoPayload?.videos?.url || ""}
            style={{ display: "none" }}
          />
          {isApproved ? (
            <div className="absolute bottom-0 w-full">
              <div className="flex h-4 w-full items-center justify-between bg-[black] px-3 text-[10px] opacity-70">
                <span>{computeCategory()}</span>
                <span className="ml-auto text-[10px] text-[#FFFFFF]">
                  <span className="mr-[10px]">|</span>
                  {duration ? Math.floor(duration * 100) / 100 : ""}
                </span>
              </div>
            </div>
          ) : null}
          {/* Bookmark and more options */}
          <div className="absolute left-2 top-[-2px]">
            {isPublished ? (
              <span className="text-[#FD8A02]">
                <Bookmark fill="#FD8A02" size={18} />
              </span>
            ) : null}
          </div>
          <div className="absolute right-2 top-2">
            {isApproved ? (
              <div className="relative inline-block" ref={dropdownRef}>
                {isEdit ? (
                  <BsThreeDotsVertical
                    className="cursor-pointer rounded-full bg-[#1D1A0C99] p-1 text-[24px] text-white"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                ) : null}
                {isOpen && (
                  <div
                    className="absolute z-10 rounded border bg-white shadow-lg"
                    style={{
                      width: "118px",
                      right: "0",
                      marginTop: "3px",
                    }}
                  >
                    <button
                      className={`flex items-center justify-center gap-2 px-2 py-1 text-[13px] text-[#000000] ${isPublished ? "text-[#FD8A02]" : "text-[#7B7887]"} `}
                      onClick={handleVideoPublish}
                    >
                      <BookmarkPlus size={16} />{" "}
                      {isPublished ? "Unpublish" : "Publish"}
                    </button>
                    <hr />
                    <button
                      className="flex items-center justify-center gap-2 px-2 py-1 text-[13px] text-[#000000] text-[#7B7887]"
                      onClick={() => setIsConfirmationModalOpen(true)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <img src={lockvideo} alt="" />
            )}
          </div>{" "}
          : null
        </div>

        {/* Video Details */}
        {computeCardDetails()}
      </div>
      <ConfirmationModal
        type={"error"}
        confirmationText={"Are you sure you want to delete this video?"}
        isOpen={isConfirmationModalOpen}
        onClose={() => {
          setIsConfirmationModalOpen(false);
        }}
        onOk={() => {
          setIsConfirmationModalOpen(false);
          deleteVideos(
            requestVideoPayload?.type === "SOTW"
              ? "SOTW_VIDEO"
              : "REQUEST_VIDEO",
            requestVideoPayload?.id,
            refreshVideo,
          );
        }}
      />

      {isApproved ? (
        <div>
          {" "}
          <ShareVideoModal
            isShareModalOpen={isShareModalOpen}
            url={requestVideoPayload?.videos?.url || ""}
            setIsShareModalOpen={() => setIsShareModalOpen(false)}
          />
        </div>
      ) : null}
      <CommentsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        videoId={requestVideoPayload?.videos?.id || ""}
        setVideoDetails={setVideoDetails}
        videoDetails={videodetails}
        requestVideoPayload={requestVideoPayload}
        updateViewCount={()=>{
            if (requestVideoPayload?.videos?.url) {
                updateViewCount(requestVideoPayload?.videos?.id);
                setVideoDetails({
                  ...videodetails,
                  views: Number(videodetails.views) + 1,
                });
            }
        }}
      />
    </>
  );
};
export default VideoCard;
