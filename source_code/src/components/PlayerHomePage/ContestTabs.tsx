import { Trophy } from "lucide-react";
import React, { useState } from "react";
import ActiveContestAccordion from "./ActiveContestAccordion";
import LiveLeaderBoard from "./LiveLeaderBoard";
import MostRecent from "./MostRecent";
import Award from "../../assets/images/image 55.png";
import sparklingImg from "../../assets/images/sparkling (1).png";

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
        <div className="ml-4 h-[250px] w-[30%] rounded-md border-2 bg-[#F9FAFA]">
          <div className="relative my-12 mt-[80px] flex items-center justify-center">
            <img src={sparklingImg} alt="" className="absolute" />
            <div className="h-[100%] w-[300px] rounded-full border-2 border-[#DED8B9] text-center">
              <div className="relative rounded-full bg-[#1F1F1F] p-2">
                <div className="absolute bottom-0 left-5">
                  <img src={Award} alt="" />
                </div>
                <div className="pl-10">
                  <h1 className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] bg-clip-text text-lg text-transparent">
                    AceCam Jackpot
                  </h1>
                  <h1 className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] bg-clip-text text-xl text-transparent">
                    <span className="bg-gradient-to-r from-[#FFEECC] to-[#AD9515] bg-clip-text text-transparent">
                      $ 103,000
                    </span>
                  </h1>
                </div>
              </div>
              {/* <img src={Ribbon} /> */}
              {/* <h1 className="-mt-3 text-3xl text-[#FD8A02]">$ 103,000</h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestTabs;
