import React, { useEffect, useState } from "react";
import momentTz from "moment-timezone";
import ClubCard from "./ClubCard";
import LeaderBoardTable from "./LeaderBoardTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError } from "../Toast";
import { APIResLeaderBoardData } from "./LeaderBoard";
import { setLoading } from "../../reducers/loader/loader";

const MostRecent: React.FC = () => {
  const tz = momentTz.tz.guess();

  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [recentData, setRecentData] = useState<any>([]);

  const getLiveLeaderBoard = async () => {
    try {
      dispatch(setLoading(true));

      const { data, status } = await apiService.post<APIResLeaderBoardData>(
        API_URL.getRecent,
        {
          data: {
            playerId:
              typeof userInfo === "object" ? userInfo.userId : undefined,
            zoneId: tz,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setRecentData(data);
      } else if (data?.error && data.description) {
        ToastError(data.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getLiveLeaderBoard();
  }, []);

  return (
    <div>
      {recentData?.data?.message && (
        <div>
          <span>{recentData?.data?.message}</span>
        </div>
      )}

      {recentData?.data?.contestInfo && (
        <ClubCard contestInfo={recentData.data.contestInfo} />
      )}

      {recentData?.data?.leaderboard &&
        recentData?.data?.contestInfo?.contestType !== "Closest-to-the-Pin" && (
          <LeaderBoardTable leaderBoardData={recentData.data.leaderboard} />
        )}
    </div>
  );
};

export default MostRecent;
