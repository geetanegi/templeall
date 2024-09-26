import React from "react";
import golfStickWithTee from "../../../assets/images/image 8.png";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import GolfTee from "../../../assets/images/sports_golf (1).png";
import { ROUTES } from "../../../utils/routesPath";
import { useNavigate } from "react-router-dom";
import moment from "moment";

interface TeeContest {
  contestId: number | null;
  name: string | null;
  contestType: string | null;
  startTime: string | null;
  endTime: string | null;
  registrationStartTime: string | null;
  registrationEndTime: string | null;
  entryFee: number | null;
  limitSection: boolean | null;
  entriesPer24Hours: number | null;
  waitTimeBetweenEntries: number | null;
  queueLimit: number | null;
  activeStatus: string | null;
  activeContestDate: string | null;
  recurringType: string | null;
  scheduleContestId: number | null;
}

const TeeContests: React.FC<{ teeContest: TeeContest }> = ({ teeContest }) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="m-4">
        <div className="my-2 flex w-full items-center justify-between rounded-xl border p-6 shadow-md">
          <div className="flex">
            <img src={golfStickWithTee} alt="" className="h-14 w-14" />
            <div className="pl-1">
              <p className="text-sm font-semibold">{teeContest.contestType}</p>
              <p className="text-sm font-semibold text-red-600">
                ${teeContest.entryFee}
              </p>
            </div>
          </div>

          <div className="flex flex-col place-items-end">
            <p className="text-sm">{`${moment(teeContest.startTime).format("MMM-D")} - ${moment(teeContest.endTime).format("MMM-D")} `}</p>
            <span className="flex items-center rounded-md bg-green-100 px-2">
              <img src={GolfTee} alt="" className="" />
              <span className="p-1 text-xs font-semibold text-green-700">
                {teeContest.activeStatus}
              </span>
            </span>
          </div>
          <div>
            <Plus
              size={32}
              className="rounded-full bg-[#95c11e] p-1 font-semibold text-white"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 flex w-[69%] justify-end rounded-lg bg-white p-4">
        <button
          className="relative flex gap-1 rounded-md bg-[#95c11e] px-3 py-2 text-white"
          onClick={() => {
            navigate(ROUTES.CHECKOUT);
          }}
        >
          <ShoppingCart className="relative" />
          <span className="absolute right-[6rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            5
          </span>
          <span className="mx-2">Checkout</span>
        </button>
      </div>
    </div>
  );
};

export default TeeContests;
