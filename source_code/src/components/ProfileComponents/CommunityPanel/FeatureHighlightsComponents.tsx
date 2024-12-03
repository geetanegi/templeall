import { VideoOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import apiService from "../../../services/apiService";
import { API_URL } from "../../../services/enums";
import { ToastInfo } from "../../Toast";
import VideoCard from "../../MediaManagement/VideoCard";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import VideoPlayer from "../../MediaManagement/VideoPlayer";

interface FeatureHighlightsComponentsprops {
  selectedUser: string | number;
}

const FeatureHighlightsComponents: React.FC<
  FeatureHighlightsComponentsprops
> = ({ selectedUser }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [allVideos, setAllVideos] = useState<Array<any>>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] =
    useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  useEffect(() => {
    if (selectedUser) {
      getAllPublishVideo();
    }
  }, [refreshList, selectedUser]);

  const getAllPublishVideo = async () => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.getAllpublishSotwVideos,
        {
          data: {
            searchParams: {
              isPublished: true,
              "playerUser.id": JSON.stringify(selectedUser),
            },
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setAllVideos(data?.data);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedUser) {
    return <></>;
  }

  return (
    <div className="my-5 w-[98%] rounded-[8px] bg-[#1D1A0C99] p-3 mb-16 pb-5 mr-[24px]">
      <div className="flex items-center justify-between">
        <span className="text-[16px] text-[#ffffff]">
          Featured Highlights
        </span>
      </div>

      {allVideos.length ? (
        <div className="mt-5 flex flex-wrap gap-y-4" style={{}}>
          {allVideos.map((videoData) => {
            return (
              <div className="w-[25%] px-2 ">
                <VideoCard
                  key={videoData.id}
                  uploadDate={moment
                    .utc(videoData?.startTime)
                    .local()
                    .format("MM/DD/YYYY")}
                  title={videoData?.contestType}
                  status={videoData?.status}
                  clubName={videoData?.club?.name || ""}
                  tee={
                    videoData?.tee?.teeName + `(${videoData?.tee?.yardage})`
                  }
                  holeName={`Hole #${videoData?.hole?.holeNumber} - Par ${videoData?.hole?.par}`}
                  requestVideoPayload={{ ...videoData }}
                  isApproved={true}
                  isPublished={videoData.isPublished}
                  getAllVideos={getAllPublishVideo}
                  setSelectedVideo={setSelectedVideo}
                  setIsVideoPlayerVisible={setIsVideoPlayerVisible}
                  isVideoPlayerVisible={isVideoPlayerVisible}
                  setRefreshList={setRefreshList}
                  refreshList={refreshList}
                  isSOTW={videoData.type === "SOTW"}
                  rejectionReason={videoData?.rejectionReason || ""}
                  userInfo={userInfo}
                  width="100%"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-2 flex h-[152px] w-[full] flex-col items-center justify-center rounded-[6px] bg-[#FFFFFF1A] mb-4 ">
          <VideoOff color="#ffffff" size={84} className="font-extralight " />
          <span className="text-[#F5F6F7]">
            No videos are available to watch
          </span>
        </div>
      )}
      <div className="fixed bottom-1 right-0 z-50">
        <VideoPlayer
          isVideoPlayerVisible={isVideoPlayerVisible}
          setIsVideoPlayerVisible={setIsVideoPlayerVisible}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
        />
      </div>
    </div>
  );
};

export default FeatureHighlightsComponents;
