import React, { useEffect, useState } from "react";
import UserinformationComponent from "./UserInformationComponent";
import SwitchComponent from "../SwitchComponent";

interface BettingOverviewProps {
  userinformation: any;
  isModalOpen: boolean;
  fetchUserInformation: () => void;
  userId: string | number;
  userInfo: any;
}

const sectionArr = [
  {
    style: "",
    content: [
      {
        name: "Total Wager Amount",
        value: "$1,685.50",
      },
      {
        name: "Total Winnings",
        value: "$34,560.00",
      },
      {
        name: "Net Earnings",
        value: "$32,874.50",
      },
    ],
  },
  {
    label: "Contest and Competition",
    style: "",
    content: [
      {
        name: "AceCam Jackpot",
        value: "$33,420.00",
      },
      {
        name: "Closest-to-Pin",
        value: "$615.00",
      },
      {
        name: "Hit-the-Green",
        value: "$380.00",
      },
      {
        name: "Other Chanalenges",
        value: "$20.00",
      },
    ],
  },
  {
    label: "AceCam Tournaments & Events",
    style: "justify-center",
    content: [
      {
        name: "AceCam Shootouts",
        value: "$0.00",
      },
      {
        name: "Best Finish",
        value: "T-11",
      },
      {
        name: "AceCam Outings",
        value: "$125.00",
      },
      {
        name: "Best Finish",
        value: "T-4",
      },
    ],
  },
];

const sectionArr2 = [
  {
    label: "Summary",
    style: "",
    content: [
      {
        name: "Avg. score (Gross)",
        value: "3.03 (Top 10%)",
      },
      {
        name: "Closest Shot",
        value: "4.12 feet (Top 3%)",
      },
      {
        name: "Avg. Proximity",
        value: "32.5 feet (Top 10%)",
      },
      {
        name: "GIR Percentage",
        value: "66.5% (Top 15%)",
      },
      {
        name: "Avg. Putts",
        value: "1.88 (Top 15%)",
      },
    ],
  },
  {
    label: "Top Performance Metrics",
    style: "justify-center",
    content: [
      {
        name: "Hole-in-One",
        value: "1.0 (Top 1%)",
      },
      {
        name: "Birdie Streak",
        value: "3.00 (Top 1%)",
      },
      {
        name: "Birdie Total",
        value: "17.0 (Top 15%)",
      },
     
    ],
  },
];
const BettingOverview: React.FC<BettingOverviewProps> = ({
  userinformation,
  isModalOpen,
  fetchUserInformation,
  userId,
  userInfo,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [userstats, setUserStats] = useState<any>([])

 

  useEffect(()=>{
    if(selectedTab === 1){
      setUserStats(sectionArr2)
    }else if(selectedTab === 2){
      setUserStats(sectionArr)
    }else{
      setUserStats([])
    }
  }, [selectedTab])

  const computeSubBettingViewSection = (sections: Array<any>) => {
      return sections.map((item: any) => (
        <div className={`mt-3`}>
          {item?.label && (
            <h3 className="text-[14px] underline">{item?.label || ""}</h3>
          )}
          {item?.content?.map((itm: any) => (
            <div className={`flex ${selectedTab === 1 ? "my-1": ""}`}>
              <span className="mr-1 text-[14px] text-gray-500">
                {itm.name}:
              </span>

              <span>{itm.value}</span>
            </div>
          ))}
         
        </div>
      ));
  };

  return (
    <div
      className="mb-10 ml-0 mt-40 w-full border border-gray-400 p-2 lg:mb-0 lg:ml-10 lg:mt-0 lg:border-0 lg:p-0"
      //   style={{ width: "fit-content" }}
    >
      <div
        className="flex h-[38px] gap-[16px] rounded-l-full rounded-r-full border bg-[#F5F6F7] p-[4px]"
        style={{ width: "max-content" }}
      >
        <button
          className={`flex items-center justify-center rounded-l-full rounded-r-full px-[25px] py-[6px] font-[14px] ${selectedTab === 1 ? "bg-[#95C11E] text-[#ffffff]" : "text-[#7B7887]"} `}
          onClick={() => setSelectedTab(1)}
        >
          Performance
        </button>
        <button
          className={`flex items-center justify-center rounded-l-full rounded-r-full px-[16px] py-[6px] font-[14px] ${selectedTab === 2 ? "bg-[#95C11E] text-[#ffffff]" : "text-[#7B7887]"} `}
          onClick={() => setSelectedTab(2)}
        >
          Betting Overview
        </button>
      </div>
      <div className="flex h-full justify-between">
        <div className="w-[50%]">
          {computeSubBettingViewSection(userstats)}
          {
            (!userId || (userId == userInfo?.userId)) &&  selectedTab === 1  ? <div className="flex gap-3 items-center">
                <h3 className="font-bold mt-3">Visibility</h3> 
                <div className="mt-2">
                <SwitchComponent isChecked={true} />
                </div>
            </div> : null
          }
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
