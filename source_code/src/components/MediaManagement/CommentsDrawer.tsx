import React, { useEffect, useState, useRef } from "react";
import Drawer from "../GenericUIcomponents/DrawerComponent";
import { Dot, SendHorizonal, Trophy, X } from "lucide-react";
import { createComment } from "./mediaUtils/mediaUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError } from "../Toast";
import moment from "moment";
import defaultuserimag from "../../assets/images/default-user 1.png";
import ReactPlayer from "react-player";
import { PiPlayCircleBold } from "react-icons/pi";

interface CommentsDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (flag: boolean) => void;
  videoId: number | string;
  setVideoDetails: (count: number) => void;
  videoDetails: any;
  requestVideoPayload: any;
  updateViewCount:()=>void
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  videoId,
  setVideoDetails,
  videoDetails,
  requestVideoPayload,
  updateViewCount
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComments] = useState<Array<any>>([]);
  const [isVideoPlaying, setISVideoPlaying] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDrawerOpen) {
      getComments();
    } else {
      setAllComments([]);
      setISVideoPlaying(false)
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
    }
  }, [allComment]);

  const getComments = async () => {
    try {
      const { data, status } = await apiService.post<any>(API_URL.getComments, {
        data: {
          videoId: videoId,
        },
      });

      if (status === 200 && data?.data != null && !data?.error) {
        setAllComments(data.data);
        setVideoDetails({
          ...videoDetails,
          commentCount: data?.data?.length || 0,
        });
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      // Handle error
    }
  };

  const UpdateComment = () => {
    const userId = typeof userInfo === "object" ? userInfo.userId : "";
    createComment(videoId, userId, comment, getComments);
  };


  const handleProgress = (state: { playedSeconds: number }) => {
   if(state.playedSeconds < 1 && isVideoPlaying){
      updateViewCount()
    }
  };

  return (
    <div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="w-[510px] overflow-hidden border"
      >
        <div className="h-[100vh]">
          <div className="h-[350px]">
            <div className="relative mt-[-10px]">
              <ReactPlayer
                url={isDrawerOpen ? requestVideoPayload?.videos?.url : ""}
                playing={isVideoPlaying} // Auto-play is true
                width={"510px"}
                height={"100%"}
                onProgress={handleProgress}
                onPlay={()=>setISVideoPlaying(true)}
                onPause={() => setISVideoPlaying(false)}
                controls={isVideoPlaying}
              />
              <X
                className="absolute right-2 top-5 z-50 cursor-pointer rounded-full bg-[#1D1A0C99] p-1 text-[24px] text-[#ffffff]"
                onClick={() => {
                  setIsDrawerOpen(false)
                }}
              />
              {isVideoPlaying ? null : (
                <div className="absolute top-[40%] left-[47%] flex items-center justify-center cursor-pointer">
                  <PiPlayCircleBold
                    style={{ height: "38px", width: "38px" }}
                    color="#ffffff"
                    onClick={() => {
                      setISVideoPlaying(true)
                    }}
                  />
                </div>
              )}
              <div className="h-[64px] w-full bg-[#1D1A0C] p-1 px-2">
                <div className="flex text-[#fff]">
                  <span>{requestVideoPayload?.videos?.title || ""}</span>
                  <Dot />
                  <span>{requestVideoPayload?.username || ""}</span>
                </div>
                <div className="mt-1 items-center justify-start text-white">
                  <div className="mt-1 flex whitespace-nowrap text-[14px]">
                    <div className="items.center flex gap-1 text-sm font-light">
                      <Trophy size={12} className="mt-1" />{" "}
                      <span className="text-[12px]">
                        {requestVideoPayload?.contestType || ""}
                      </span>{" "}
                    </div>
                    <Dot />
                    <span className="text-[12px]">
                      {requestVideoPayload?.clubName || ""}
                    </span>
                    <Dot />
                    <span className="text-[12px]">
                      Hole#{requestVideoPayload?.holeNumber || ""}
                    </span>
                    <Dot />
                    <span className="text-[12px]">
                      {requestVideoPayload?.teeName || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          <div ref={commentRef} className="absolute mt-[20px] top-[345px] bottom-12 flex flex-col overflow-y-auto ">
            <div className="mt-auto">
            {allComment.map((comment) => (
              <React.Fragment key={comment.id}>
                {" "}
                {/* Ensure unique key */}
                <div className="flex w-[496px]">
                  <img
                    src={defaultuserimag}
                    alt=""
                    className="ml-3 h-[32px] w-[32px] rounded-full border"
                  />
                  <div className="ml-2 w-full">
                    <div className="flex w-[420px] justify-between">
                      <div className="flex gap-1">
                        <span className="text-black-800 text-[14px] font-bold">
                          {comment.firstName}
                        </span>
                        <span className="text-black-800 text-[14px] font-bold">
                          {comment.lastName}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#7B7887]">
                        {moment
                          .utc(comment.commentDate)
                          .local()
                          .format("MM/DD/YYYY")}
                      </span>
                    </div>
                    <div className="w-[80%] break-words text-[12px] text-[#1D1A0C]">
                      {comment.commentText}
                    </div>
                  </div>
                </div>
                <hr className="my-3" />
              </React.Fragment>
            ))}
            </div>
          </div>
         

          <div className="absolute bottom-0 mt-auto flex h-[56px] w-full items-center justify-center gap-2 bg-[#F5F6F7]">
            <input
              type="text"
              placeholder="Comments"
              value={comment}
              className="h-[32px] w-[430px] rounded-[4px] border border-[#E6E6E6] bg-[#FAFAFA] pl-3"
              onChange={(e) => setComment(e.target.value)}
              maxLength={150}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  UpdateComment();
                  setComment("");
                }
              }}
            />
            <SendHorizonal
              color="#7B7887"
              onClick={() => {
                UpdateComment();
                setComment("");
              }}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CommentsDrawer;
