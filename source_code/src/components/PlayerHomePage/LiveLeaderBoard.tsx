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
        console.log(data?.data);
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    }
  };

  useEffect(() => {
    getLiveLeaderBoard();
  }, []);

  return (
    <div>
      {/* <ClubCard contestInfo={leaderBoardData.data.contestInfo} /> */}
      <ClubCard
        contestInfo={{
          contestType: "Ace-Cam Jackpot",
          courseName: "Test 2",
          club: "Test",
          holeNumber: "Test 3",
          tee: "TEE",
          par: 2,
          yardage: 200,
          status: "Completed",
          entryFee: 20.0,
          playerCount: 4,
          totalPrize: 1000.0,
          playerPercentage: 2.0,
          acecamPercentage: 3.0,
          coursePercentage: 0.5,
          charityPercentage: 2.0,
        }}
      />
      {/* <ClubCard status="open" /> */}

      <LeaderBoardTable
        leaderBoardData={[
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
          {
            position: 1,
            username: "Akshay",
            proximity: 20.0,
            prize: 10.0,
          },
        ]}
      />
    </div>
  );
};

export default LiveLeaderBoard;
