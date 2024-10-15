import React, { useState } from "react";
import VideoCard from "../MediaManagement/VideoCard";
import moment from "moment";
import VideoPlayer from "../MediaManagement/VideoPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const PlayerSOTW: React.FC<any> = ({ data }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const getAllVideos = () => {};
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] =
    useState<boolean>(false);

  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const setRefreshList = () => {};
  const refreshList = true;
  const filterValue = "SOTW";

  return (
    <div className="flex flex-wrap justify-start gap-1">
      {data?.map((videoData: any, i: number) => {
        return (
          <div className="space-y-4 pl-5" key={i}>
            <VideoCard
              isVideoPlayerVisible={isVideoPlayerVisible}
              userInfo={userInfo}
              uploadDate={moment(videoData?.startTime)
                .utc()
                .format("DD/MM/YYYY")}
              title={videoData?.contestType}
              status={videoData?.status}
              clubName={videoData?.club?.name || ""}
              tee={videoData?.tee?.teeName + `(${videoData?.tee?.yardage})`}
              holeName={`Hole #${videoData?.hole?.holeNumber} - Par ${videoData?.hole?.par}`}
              requestVideoPayload={{ ...videoData }}
              isApproved={true}
              isPublished={videoData.isPublished}
              getAllVideos={getAllVideos}
              setSelectedVideo={setSelectedVideo}
              setIsVideoPlayerVisible={setIsVideoPlayerVisible}
              setRefreshList={setRefreshList}
              refreshList={refreshList}
              isSOTW={filterValue === "SOTW"}
              rejectionReason={videoData?.rejectionReason || ""}
            />
          </div>
        );
      })}

      {selectedVideo && (
        <div className="fixed bottom-1 right-0 z-50">
          <VideoPlayer
            isVideoPlayerVisible={isVideoPlayerVisible}
            setIsVideoPlayerVisible={setIsVideoPlayerVisible}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
            // height="100vh"
            // width="100vw"
          />
        </div>
      )}
    </div>
  );
};

export default PlayerSOTW;
