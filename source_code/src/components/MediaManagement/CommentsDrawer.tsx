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
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  videoId,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComments] = useState<Array<any>>([]);
  const socket = useRef<WebSocketService | null>(null);

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

  const getComments = async () => {
    try {
      const { data, status } = await apiService.post<any>(API_URL.getComments, {
        data: {
          videoId: videoId,
        },
      });

      if (status === 200 && data?.data != null && !data?.error) {
        setAllComments(data.data);
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      // Handle error
    }
  };

  const UpdateComment = () => {
    const userId = typeof userInfo === "object" ? userInfo.userId : "";
    createComment(videoId, userId, comment);
    const newComment = { videoId, userId, comment };
    if (socket.current) {
      socket.current.send({ type: '/app/comment', payload: newComment });
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
          <div className="pt-5 h-[500px] overflow-auto">
            {allComment.map((comment) => (
              <React.Fragment key={comment.id}> {/* Ensure unique key */}
                <div className="flex ">
                  <img  
                    src={defaultuserimag}
                    alt=""
                    className="h-[48px] ml-3 w-[48px] rounded-full border"
                  />
                  <div className="ml-2 w-full">
                    <div className="flex justify-between w-[301px]">
                      <div className="flex gap-1">
                        <span className="text-[14px] text-black-800 font-bold">{comment.firstName}</span>
                        <span className="text-[14px] text-black-800 font-bold">{comment.lastName}</span>
                      </div>
                      <span className="text-[#7B7887] text-[11px]">{moment.utc(comment.commentDate).local().format('MM/DD/YYYY')}</span>
                    </div>
                    <div className="w-[80%] break-words text-[12px] text-[#1D1A0C]">{comment.commentText}</div>
                  </div>
                </div>
                <div className="w-[361px] my-5 h-[1px] bg-[#F5F6F7] mx-auto"></div>
              </React.Fragment>
            ))}
          </div>
          <div className="absolute bottom-0 mt-auto flex h-[56px] w-full items-center justify-center gap-2 bg-[#F5F6F7]">
            <input
              type="text"
              placeholder="Comments"
              value={comment}
              className="rounded-[4px] h-[32px] w-[327px] border border-[#E6E6E6] bg-[#FAFAFA] pl-3"
              onChange={(e) => setComment(e.target.value)}
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