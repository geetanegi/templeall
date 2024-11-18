import React, { useEffect, useState } from "react";
import UserinformationComponent from "./UserInformationComponent";
import SwitchComponent from "../SwitchComponent";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastInfo, ToastSuccess } from "../Toast";

interface BettingOverviewProps {
  userinformation: any;
  isModalOpen: boolean;
  fetchUserInformation: () => void;
  userId: string | number;
  userInfo: any;
  isCommunitySearch: boolean | undefined;
}

const BettingOverview: React.FC<BettingOverviewProps> = ({
  userinformation,
  isModalOpen,
  fetchUserInformation,
  userId,
  userInfo,
  isCommunitySearch,
}) => {
  const [userstats, setUserStats] = useState<any>({});

  useEffect(() => {
    setUserStats({});
    if (isCommunitySearch && userId != userInfo?.userId) {
      searchUserPS();
    } else {
      getAllPerformanceStates();
    }
  }, [userId, location.pathname]);

  const searchUserPS = async () => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.searchUserPS,
        {
          data: {
            selectedUserId: userId,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setUserStats(data?.data);
      } else if (data?.error && data.description) {
        // ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPerformanceStates = async () => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.getAllPerFormanceStaics,
        {
          data: {
            loginUserId: userId || userInfo?.userId,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setUserStats(data?.data);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateVisibilityOfPS = async (e: any) => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.updatePSVisibility,
        {
          data: {
            selectedUserId: userInfo?.userId,
            showVisibility: e,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        ToastSuccess(data?.data?.message);
        fetchUserInformation();
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const computeSubBettingViewSection = () => {
    return (
      <div className="flex flex-col gap-5 text-primaryText">
        <div>
          <h2 className="text-[16px] text-primaryText underline">Summary</h2>
          <div className="text-[#F5F6F7]">
            <span className="mr-1 text-[14px]">
              Avg. Score(Gross):
            </span>{" "}
            {userstats?.avgScore || 0}
          </div>
          <div className="text-[#F5F6F7]">
            <span className="mr-1 text-[14px]">
              Closest Shot:
            </span>{" "}
            {userstats?.closestShotFt || 0}
          </div>
          <div className="text-[#F5F6F7]">
            <span className="mr-1 text-[14px]">
              Avg. Proximity:
            </span>{" "}
            {userstats?.avgProximity || 0}
          </div>
          <div className="text-[#F5F6F7]">
            <span className="mr-1 text-[14px] ">
              GIR Percentage:
            </span>{" "}
            {userstats?.girPercentage || 0}
          </div>
          <div className="text-[#F5F6F7]">
            <span className="mr-1 text-[14px]">Avg. Putts:</span>{" "}
            {userstats?.avgPutts || 0}
          </div>
        </div>
        <div className="text-[#F5F6F7]">
          <h2 className="text-[16px] underline">Top Performance Metrics </h2>
          <div>
            <span className="mr-1 text-[14px]">Hole-in-One:</span>{" "}
            {userstats?.holeInOnes || 0}
          </div>
          <div>
            <span className="mr-1 text-[14px]">
              Birdie Streak:
            </span>{" "}
            {userstats?.birdieStreak || 0}
          </div>
          <div>
            <span className="mr-1 text-[14px]">
              Birdie Total:
            </span>{" "}
            {userstats?.birdieTotal || 0}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-10 ml-0 mt-40 w-full border border-gray-400 p-2 lg:mb-0 lg:ml-5 lg:mt-0 lg:border-0 lg:p-0">
      <div
        className={`mt-5 flex h-[38px] gap-[16px] rounded-l-full rounded-r-full p-[1px] ${Object.keys(userstats).length ? "visible" : "invisible"} `}
        style={{ width: "max-content" }}
      >
        <h1 className="text-[16px] text-primaryText font-semibold leading-relaxed">
          Performance
        </h1>
      </div>
      <div className="flex h-full justify-between">
        <div
          className={`h-[320px] w-[50%] overflow-auto ${Object.keys(userstats).length ? "visible" : "invisible"} `}
        >
          {computeSubBettingViewSection()}
          {!userId || userId == userInfo?.userId ? (
            <div className="flex items-center gap-3">
              <h3 className="mt-3 font-bold text-primaryText">Visibility</h3>
              <div className="mt-2">
                <SwitchComponent
                  isChecked={userinformation?.userProfile?.showVisibility}
                  onChange={(e) => updateVisibilityOfPS(e)}
                />
              </div>
            </div>
          ) : null}
        </div>
        <UserinformationComponent
          userinformation={userinformation}
          isModalOpen={isModalOpen}
          fetchUserInformation={fetchUserInformation}
          userInfo={userInfo}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default BettingOverview;
