import { Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import ActiveContestAccordion from "./ActiveContestAccordion";
import LiveLeaderBoard from "./LiveLeaderBoard";
import MostRecent from "./MostRecent";
import Award from "../../assets/images/image 55.png";
import sparklingImg from "../../assets/images/sparkling (1).png";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { timeZone } from "../../utils/TimeUtils";
import { jackpot } from "./contestdata";
import JackpotAmount from "./JackpotAmount";

const ContestTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
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
        className="flex gap-[16px] rounded-l-full rounded-r-full border bg-[#F5F6F7] p-[4px]"
        style={{ width: "max-content" }}
      >
        <button
          className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 1 ? "bg-[#95C11E] text-[#ffffff]" : "text-[#7B7887]"} `}
          onClick={() => {
            setSelectedTab(1);
          }}
        >
          <Trophy strokeWidth={1.25} className={`mr-2 h-[16px] w-[16px]`} />
          Active Contest
        </button>
        <button
          className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 2 ? "bg-[#95C11E] text-[#ffffff]" : "text-[#7B7887]"} `}
          onClick={() => {
            setSelectedTab(2);
          }}
        >
          <Trophy strokeWidth={1.25} className={`mr-2 h-[16px] w-[16px]`} />
          Live Leaderboard{" "}
        </button>
        <button
          className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 3 ? "bg-[#95C11E] text-[#ffffff]" : "text-[#7B7887]"} `}
          onClick={() => {
            setSelectedTab(3);
          }}
        >
          <Trophy strokeWidth={1.25} className={`mr-2 h-[16px] w-[16px]`} />
          Most Recent
        </button>
      </div>
      <div className="relative flex">
        <div className="h-full w-[70%]">
          <div>{selectedTab === 1 && <ActiveContestAccordion />}</div>
          <div>{selectedTab === 2 && <LiveLeaderBoard />}</div>
          <div>{selectedTab === 3 && <MostRecent />}</div>
        </div>
        {/* jackpot */}
        <div className="relative w-[30%] overflow-auto">
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
