import React from "react";
import GolfTee from "../../../assets/images/sports_golf.png";
import { Info } from "lucide-react";

const TeeInfo: React.FC<{}> = () => {
  return (
    <div className="h-80 w-full">
      <div className="my-5">
        <div className="flex justify-center space-y-4">
          <div className="flex items-center space-x-3 py-2">
            <img src={GolfTee} alt="" />
            <span className="text-sm text-gray-500">Blue Tees (157 Yards)</span>
            <Info size={20} className="text-blue-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeeInfo;
