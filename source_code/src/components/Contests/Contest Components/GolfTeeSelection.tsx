import React from "react";
import GolfTee from "../../../assets/images/sports_golf.png";
import { Info } from "lucide-react";


interface Hole {
  name: string;
  price: string;
  isActive: boolean;
  dateRange: string;
  image: string;
}

interface HoleInfoProps {
  hole: Hole;
  isAdded: boolean;
  toggleHole: () => void;
}

const TeeInfo: React.FC<HoleInfoProps> = () => {
  return (
    <div className="bg-green-400">
      <div className="w-[30%]">
        <div className="mx-1 max-w-sm overflow-auto border-r border-gray-700">
          <div className="flex justify-center space-y-2">
            <div className="flex items-center space-x-3 py-2">
              <img src={GolfTee} alt="" />
              <span>Blue Tees (157 Yards)</span>
              <Info size={20} className="text-blue-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeeInfo;
