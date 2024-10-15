import React, { useEffect, useState, useRef } from "react";
import Drawer from "../GenericUIcomponents/DrawerComponent";
import { SendHorizonal } from "lucide-react";
import { createComment } from "./mediaUtils/mediaUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError } from "../Toast";
import moment from "moment";
import defaultuserimag from "../../assets/images/default-user 1.png";
import WebSocketService from "../../socket/WebSocketService";

interface CommentsDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (flag: boolean) => void;
  videoId: number | string;
  setVideoDetails:(count:number)=>void
  videoDetails:any
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  videoId,
  setVideoDetails,
  videoDetails
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComments] = useState<Array<any>>([]);
  const socket = useRef<WebSocketService | null>(null);
  const commentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDrawerOpen) {
      getComments();
      socket.current = new WebSocketService('http://localhost:8083/ws');
      socket.current.connect();

      // Subscribe to new comments
      socket.current.subscribe('/chatRoom/public', (data) => {
        setAllComments((prevComments) => [...prevComments, data]);
      });
    } else {
      if (socket.current) {
        socket.current.disconnect();
        setAllComments([]);
      }
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
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
        setVideoDetails({...videoDetails, commentCount : data?.data?.length || 0 })
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
    const newComment = { videoId, userId, comment };
    if (socket.current) {
      socket.current.send({ type: "/app/comment", payload: newComment });
    } else {
      console.error("WebSocket connection is not established.");
    }
  };

  return (
    <div>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="w-[393px] overflow-hidden rounded-l-[12px] border"
        title="Comments"
      >
        <div className="h-full">
          <div ref={commentRef} className="h-[500px] overflow-auto pt-5">
            {allComment.map((comment) => (
              <React.Fragment key={comment.id}>
                {" "}
                {/* Ensure unique key */}
                <div className="flex">
                  <img
                    src={defaultuserimag}
                    alt=""
                    className="ml-3 h-[48px] w-[48px] rounded-full border"
                  />
                  <div className="ml-2 w-full">
                    <div className="flex w-[301px] justify-between">
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
                <div className="mx-auto my-5 h-[1px] w-[361px] bg-[#F5F6F7]"></div>
              </React.Fragment>
            ))}
          </div>
          <div className="absolute bottom-0 mt-auto flex h-[56px] w-full items-center justify-center gap-2 bg-[#F5F6F7]">
            <input
              type="text"
              placeholder="Comments"
              value={comment}
              className="h-[32px] w-[327px] rounded-[4px] border border-[#E6E6E6] bg-[#FAFAFA] pl-3"
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
