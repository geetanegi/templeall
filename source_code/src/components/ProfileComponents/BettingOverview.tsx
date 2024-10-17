import React from "react";
import UserinformationComponent from "./UserInformationComponent";

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

const BettingOverview: React.FC<BettingOverviewProps> = ({
  userinformation,
  isModalOpen,
  fetchUserInformation,
  userId,
  userInfo,
}) => {
  const computeSubBettingViewSection = (sections: Array<any>) => {
    return sections.map((item: any) => (
      <div className={`mt-3`}>
        {item?.label && (
          <h3 className="text-[14px] underline">{item?.label || ""}</h3>
        )}
        {item?.content?.map((itm: any) => (
          <div className="flex">
            <span className="mr-1 text-[14px] text-gray-500">{itm.name}:</span>

            <span>{itm.value}</span>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div
      className="mb-10 ml-0 w-full mt-40 border border-gray-400 p-2 lg:mb-0 lg:ml-10 lg:mt-0 lg:border-0 lg:p-0"
    //   style={{ width: "fit-content" }}
    >
      <div
        className="jystify-between flex gap-3 whitespace-nowrap rounded-2xl bg-[#F5F6F7B3] px-3"
        style={{ width: "fit-content" }}
      >
        <button>Performance</button>
        <button className="my-[2px] rounded-xl bg-[#95C11E] px-5 py-[2px] text-white">
          Betting Overview
        </button>
      </div>
      <div className="flex justify-between">
        <div>
        {computeSubBettingViewSection(sectionArr)}
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
