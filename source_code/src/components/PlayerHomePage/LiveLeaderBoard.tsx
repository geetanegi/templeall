import React, { useEffect, useState } from "react";
import momentTz from "moment-timezone";
import LeaderBoardTable from "./LeaderBoardTable";
import ClubCard from "./ClubCard";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastInfo } from "../Toast";
import { APIResLeaderBoardData, leaderBoard } from "./LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLoading } from "../../reducers/loader/loader";
import PageLoader from "../PageLoader";

const LiveLeaderBoard: React.FC = () => {
  const tz = momentTz.tz.guess();
  const dispatch = useDispatch();

  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const isSuperAdmin = userPermisions?.data?.permission["is_super_admin"];

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [dropDownList, setDropDownList] = useState<leaderBoard[] | null>(null);
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [leaderBoardData, setLeaderBoardData] = useState<any>([]);

  // user live leader board
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
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
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
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // superadmin liveleaderboard
  const liveLeaderBoard = async () => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.LiveLeaderBoard_SA,
        {
          data: {
            zoneId: tz,
            scheduleContestId: selectedValue,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setLeaderBoardData(data);
        // setDropDownList(data?.data);
        // setSelectedValue(data?.data[0]?.scheduleContestId);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // call user getlive leaderboard
    if (selectedValue && !isSuperAdmin) {
      getLiveLeaderBoard();
    }
  }, [selectedValue, isSuperAdmin]);

  useEffect(() => {
    // superadmin live leaderboard
    if (selectedValue && isSuperAdmin) {
      liveLeaderBoard();
    }
  }, [selectedValue, isSuperAdmin]);

  useEffect(() => {
    liveLeaderBoardDropDown();
  }, []);

  const renderClubCardSuperAdmin = () => {
    if (leaderBoardData?.data?.contestInfo === null) {
      return (
        <div>
          <p>No Live leaderBoard available yet!</p>
        </div>
      );
    } else {
      return (
        <ClubCard
          contestInfo={leaderBoardData?.data?.contestInfo}
          showDropDown={true}
          dropDownList={
            dropDownList && dropDownList.length > 0 ? dropDownList : []
          }
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      );
    }
  };

  const renderClubCardPlayerUser = () => {
    if (dropDownList?.length === 0) {
      return (
        <div className="">
          <p className="text-[14px] p-5">No Live leaderBoard available yet!!! </p>
        </div>
      );
    } else {
      return (
        <ClubCard
          contestInfo={leaderBoardData?.data?.contestInfo}
          showDropDown={true}
          dropDownList={
            dropDownList && dropDownList.length > 0 ? dropDownList : []
          }
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      );
    }
  };

  return (
    <PageLoader isActive={loader}>
      <div>
        {isSuperAdmin ? renderClubCardSuperAdmin() : renderClubCardPlayerUser()}
        {/* <ClubCard status="open" /> */}

        {leaderBoardData?.data?.leaderboard && (
          <LeaderBoardTable
            leaderBoardData={leaderBoardData.data.leaderboard}
            registered={isSuperAdmin || leaderBoardData?.data.contestInfo?.registered}
          />
        )}
      </div>
    </PageLoader>
  );
};
export default LiveLeaderBoard;
