import React, { useEffect, useState, useRef } from "react";
import Drawer from "../GenericUIcomponents/DrawerComponent";
import {
  Check,
  Dot,
  SendHorizonal,
  SquarePen,
  Trash2,
  Trophy,
  X,
} from "lucide-react";
import { createComment, deleteComment } from "./mediaUtils/mediaUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastInfo } from "../Toast";
import moment from "moment";
import defaultuserimag from "../../assets/images/default-user 1.png";
import ReactPlayer from "react-player";
import { PiPlayCircleBold } from "react-icons/pi";
import ConfirmationModal from "../GenericUIcomponents/ConfirmationModal";

interface CommentsDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (flag: boolean) => void;
  videoId: number | string;
  setVideoDetails: (count: number) => void;
  videoDetails: any;
  requestVideoPayload: any;
  updateViewCount: () => void;
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  videoId,
  setVideoDetails,
  videoDetails,
  requestVideoPayload,
  updateViewCount,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComments] = useState<Array<any>>([]);
  const [isVideoPlaying, setISVideoPlaying] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<number | null>();
  const [confirmationVisible, setConfirmationVisible] =
    useState<boolean>(false);
  const [confirmationFor, setConfirmationFor] = useState<string>("");
  const [commentDetails, setCommentDetails] = useState<any>({});
  const commentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDrawerOpen) {
      getComments();
    } else {
      setAllComments([]);
      setComment("");
      setISVideoPlaying(false);
      setEditComment(null);
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
        ToastInfo(data.description);
      }
    } catch (error) {
      // Handle error
    }
  };

  const UpdateComment = async (id: string | number | null) => {
    const userId = typeof userInfo === "object" ? userInfo.userId : "";
    await createComment(id, videoId, userId, comment, getComments);
    setEditComment(null);
    setComment("");
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    if (state.playedSeconds < 1 && isVideoPlaying) {
      updateViewCount();
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
                height={"288px"}
                onProgress={handleProgress}
                onPlay={() => setISVideoPlaying(true)}
                onPause={() => setISVideoPlaying(false)}
                controls={isVideoPlaying}
              />
              <X
                className="absolute right-2 top-5 z-50 cursor-pointer rounded-full bg-[#1D1A0C99] p-1 text-[24px] text-[#ffffff]"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              />
              {isVideoPlaying ? null : (
                <div className="absolute left-[47%] top-[40%] flex cursor-pointer items-center justify-center">
                  <PiPlayCircleBold
                    style={{ height: "38px", width: "38px" }}
                    color="#ffffff"
                    onClick={() => {
                      setISVideoPlaying(true);
                    }}
                  />
                </div>
              )}
              <div className="h-[64px] w-full bg-[#1D1A0C] p-1 px-2">
                <div className="flex text-[#fff] justify-between  item-center">
                  <span className="flex items-center  ">
                    {requestVideoPayload?.videos?.title || ""} <Dot size={28} />{requestVideoPayload?.username || ""}
                  </span>


                  {requestVideoPayload?.startTime && (
                    <div className="text-[#fff] text-[11px]  font-normal flex item-center mt-[4px]">{
                      moment
                        .utc(requestVideoPayload?.startTime)
                        .local()
                        .format("MM/DD/YYYY")
                    }</div>
                  )}
                </div>

                <div className="mt-1 items-center justify-start text-white">
                  <div className="mt-1 flex items-center whitespace-nowrap text-[14px]">
                    <div className="items.center flex gap-1 text-sm font-light">
                      <Trophy size={12} className="mt-1" />{" "}
                      <span className="text-[12px]">
                        {requestVideoPayload?.contestType || ""}
                      </span>{" "}
                    </div>
                    <Dot size={24} />
                    <span className="text-[12px]">
                      {requestVideoPayload?.clubName || ""}
                    </span>
                    <Dot size={24} />
                    <span className="text-[12px]">
                      Hole#{requestVideoPayload?.holeNumber || ""}
                    </span>
                    <Dot size={24} />
                    <span className="text-[12px]">
                      {requestVideoPayload?.teeName || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={commentRef}
            className="absolute bottom-12 top-[325px] mt-[20px] flex flex-col overflow-y-auto"
          >
            <div className="mt-auto">
              {allComment.map((commentObj) => (
                <React.Fragment key={commentObj.id}>
                  {" "}
                  {/* Ensure unique key */}
                  <div className="flex w-[496px]">
                    <img
                      src={
                        commentObj.imageUrl
                          ? commentObj.imageUrl
                          : defaultuserimag
                      }
                      alt=""
                      className="ml-3 h-[32px] w-[32px] rounded-full border"
                    />
                    {editComment === commentObj.commentId ? (
                      <div className="w-full px-3">
                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="h-[36px] w-full rounded-[4px] border border-[#E6E6E6] bg-[#FAFAFA] pl-3 text-[13px]"
                        />
                        <div className="mt-3 flex justify-end gap-2">
                          <X
                            color="#FF3B30"
                            size={18}
                            className="cursor-pointer"
                            onClick={() => {
                              setConfirmationFor("remove");
                              setConfirmationVisible(true);
                            }}
                          />
                          <Check
                            size={18}
                            className="cursor-pointer text-buttonPrimary"
                            onClick={() => {
                              UpdateComment(commentObj.commentId);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="ml-2 w-full">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex gap-1">
                            <span className="text-black-800 text-[14px] font-bold">
                              {commentObj.firstName}
                            </span>
                            <span className="text-black-800 text-[14px] font-bold">
                              {commentObj.lastName}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#7B7887]">
                            {moment
                              .utc(commentObj.commentDate)
                              .local()
                              .format("MM/DD/YYYY")}
                          </span>
                        </div>
                        <div className="w-[80%] break-words text-[12px] text-[#1D1A0C]">
                          {commentObj.commentText}
                        </div>
                        <div className="flex justify-end gap-3">
                          {typeof userInfo === "object" &&
                            Number(userInfo.userId) ===
                            Number(commentObj.userId) ? (
                            <SquarePen
                              size={14}
                              className="cursor-pointer text-buttonPrimary"
                              onClick={() => {
                                setComment(commentObj.commentText);
                                setEditComment(
                                  Number(commentObj?.commentId || null),
                                );
                              }}
                            />
                          ) : null}
                          {typeof userInfo === "object" &&
                            (Number(userInfo.userId) ===
                              Number(requestVideoPayload.playerId) ||
                              Number(userInfo.userId) ===
                              Number(commentObj.userId)) ? (
                            <Trash2
                              size={14}
                              className="cursor-pointer text-buttonPrimary"
                              onClick={() => {
                                setConfirmationVisible(true);
                                setConfirmationFor("delete");
                                setCommentDetails(commentObj);
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                  <hr className="my-3" />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="absolute bottom-10 mt-auto flex h-[56px] w-full items-center justify-center gap-2 bg-[#F5F6F7] text-[13px]">
            <input
              type="text"
              placeholder="Comments"
              value={editComment ? "" : comment}
              className="h-[32px] w-[430px] rounded-[4px] border border-[#E6E6E6] bg-[#FAFAFA] pl-3"
              onChange={(e) => setComment(e.target.value)}
              maxLength={150}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  UpdateComment(null);
                  setComment("");
                }
              }}
              disabled={editComment ? true : false}
            />
            <SendHorizonal
              color="#7B7887"
              onClick={() => {
                UpdateComment(null);
                setComment("");
              }}
            />
          </div>
        </div>
      </Drawer>
      <ConfirmationModal
        isOpen={confirmationVisible}
        type={confirmationFor === "remove" ? "remove" : "delete"}
        onClose={() => setConfirmationVisible(false)}
        onOk={() => {
          if (confirmationFor === "remove") {
            setEditComment(null);
            setComment("");
          } else {
            deleteComment(
              videoId,
              commentDetails.commentId,
              commentDetails.userId,
              getComments,
            );
          }
          setConfirmationVisible(false);
        }}
        buttonTxt={confirmationFor !== "remove"}
        confirmationText={
          confirmationFor === "remove"
            ? "Do you want to discard this draft?"
            : "Are you sure that you want to permanently remove this comment from this video?"
        }
      />
    </div>
  );
};

export default CommentsDrawer;
