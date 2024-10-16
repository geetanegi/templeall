import React, { useEffect, useState } from "react";
import momentTz from "moment-timezone";
import LeaderBoardTable from "./LeaderBoardTable";
import ClubCard from "./ClubCard";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError } from "../Toast";
import { APIResLeaderBoardData } from "./LeaderBoard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const LiveLeaderBoard: React.FC = () => {
  const tz = momentTz.tz.guess();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [leaderBoardData, setLeaderBoardData] = useState<any>([]);
  const getLiveLeaderBoard = async () => {
    try {
      const { data, status } = await apiService.post<APIResLeaderBoardData>(
        API_URL.getLiveLeaderBoard,
        {
          data: {
            playerId:
              typeof userInfo === "object" ? userInfo.userId : undefined,
            zoneId: tz,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setLeaderBoardData(data);
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    }
  };

  console.log("leaderBoardData", leaderBoardData);
  useEffect(() => {
    getLiveLeaderBoard();
  }, []);

  return (
    <div>
      {leaderBoardData?.data?.contestInfo && (
        <ClubCard contestInfo={leaderBoardData.data.contestInfo} />
      )}

      {/* <ClubCard status="open" /> */}

      {leaderBoardData?.data?.leaderboard && (
        <LeaderBoardTable leaderBoardData={leaderBoardData.data.leaderboard} />
      )}
    </div>
  );
};

export default LiveLeaderBoard;
