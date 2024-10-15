import { Trophy } from "lucide-react";
import React, { useState } from "react";
import ActiveContestAccordion from "./ActiveContestAccordion";
import LiveLeaderBoard from "./LiveLeaderBoard";
import MostRecent from "./MostRecent";
import Ribbon from "../../assets/images/Ribbon.png";

const ContestTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

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
      <div className="flex">
        <div className="h-full w-[70%]">
          <div>{selectedTab === 1 && <ActiveContestAccordion />}</div>
          <div>{selectedTab === 2 && <LiveLeaderBoard />}</div>
          <div>{selectedTab === 3 && <MostRecent />}</div>
        </div>
        <div className="w-[30%]">
          <div className="my-12 flex items-center justify-center">
            <div className="text-center">
              <img src={Ribbon} />
              <h1 className="-mt-3 text-3xl text-[#FD8A02]">$ 103,000</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestTabs;
