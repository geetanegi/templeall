import { Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import ActiveContestAccordion from "./ActiveContestAccordion";
import LiveLeaderBoard from "./LiveLeaderBoard";
import MostRecent from "./MostRecent";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { timeZone } from "../../utils/TimeUtils";
import { jackpot } from "./contestdata";
import JackpotAmount from "./JackpotAmount";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../../reducers/HomePage/Tabs";
import "../../App.css";
interface contestProps {
  showMostRecent: boolean;
}

const ContestTabs: React.FC<contestProps> = ({ showMostRecent }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(
    (state: any) => state.homePageTabs.selectedTab,
  );
  const [jackpotArr, setJackpotArr] = useState<jackpot[] | null>(null);

  const getJackpotAmount = async () => {
    const res = await apiService.post<any>(API_URL.jackpot, {
      data: {
        zoneId: timeZone,
      },
    });
    setJackpotArr(res.data.data);
  };

  useEffect(() => {
    getJackpotAmount();
  }, []);

  return (
    <div className="">
      <div
        className="flex gap-[16px] rounded-l-full rounded-r-full border bg-gradient-green p-[4px]"
        style={{ width: "max-content" }}
      >
        <button
          className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 1 ? "bg-yellowText text-textColor" : "text-[#ffffff]"} `}
          onClick={() => {
            dispatch(setSelectedTab(1));
          }}
        >
          <Trophy strokeWidth={1.25} className={`mr-2 h-[16px] w-[16px]`} />
          Active Contest
        </button>
        <button
          className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 2 ? "bg-yellowText text-textColor" : "text-[#ffffff]"} `}
          onClick={() => {
            dispatch(setSelectedTab(2));
          }}
        >
          <Trophy strokeWidth={1.25} className={`mr-2 h-[16px] w-[16px]`} />
          Live Leaderboard{" "}
        </button>
        {showMostRecent && (
          <button
            className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 3 ? "bg-yellowText text-textColor" : "text-[#ffffff]"} `}
            onClick={() => {
              dispatch(setSelectedTab(3));
            }}
          >
            <Trophy strokeWidth={1.25} className={`mr-2 h-[16px] w-[16px]`} />
            Most Recent
          </button>
        )}
      </div>
      <div className="relative flex">
        <div className="h-full w-[70%]">
          <div>{selectedTab === 1 && <ActiveContestAccordion />}</div>
          <div>{selectedTab === 2 && <LiveLeaderBoard />}</div>
          <div>{selectedTab === 3 && <MostRecent />}</div>
        </div>
        {/* jackpot */}
        <div className="box relative ml-4 h-full w-[30%] overflow-auto rounded-md bg-gradient-green">
          {jackpotArr &&
            jackpotArr.map((jackpot, index) => (
              <JackpotAmount key={index} jackpot={jackpot} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContestTabs;
