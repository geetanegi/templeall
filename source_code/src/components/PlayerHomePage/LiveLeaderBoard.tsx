import React, { useEffect, useState } from "react";
import momentTz from "moment-timezone";
import LeaderBoardTable from "./LeaderBoardTable";
import ClubCard from "./ClubCard";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError } from "../Toast";
import { APIResLeaderBoardData, leaderBoard } from "./LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLoading } from "../../reducers/loader/loader";

const LiveLeaderBoard: React.FC = () => {
  const tz = momentTz.tz.guess();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [dropDownList, setDropDownList] = useState<leaderBoard[] | null>(null);
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [leaderBoardData, setLeaderBoardData] = useState<any>([]);
  const getLiveLeaderBoard = async () => {
    try {
      dispatch(setLoading(true));

      const { data, status } = await apiService.post<APIResLeaderBoardData>(
        API_URL.getLiveLeaderBoard,
        {
          data: {
            scheduleContestId: selectedValue,
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  const liveLeaderBoardDropDown = async () => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.liveleaderBoardDropdown,
        {
          data: {
            zoneId: tz,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setDropDownList(data?.data);
        setSelectedValue(data?.data[0]?.scheduleContestId);
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
    if (selectedValue) {
      getLiveLeaderBoard();
    }
  }, [selectedValue]);

  useEffect(() => {
    liveLeaderBoardDropDown();
  }, []);

  return (
    <div>
      <ClubCard
        contestInfo={leaderBoardData?.data?.contestInfo}
        showDropDown={true}
        dropDownList={
          dropDownList && dropDownList.length > 0 ? dropDownList : []
        }
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />

      {/* <ClubCard status="open" /> */}

      {leaderBoardData?.data?.leaderboard && (
        <LeaderBoardTable leaderBoardData={leaderBoardData.data.leaderboard} />
      )}
    </div>
  );
};
export default LiveLeaderBoard;
