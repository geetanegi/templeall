import React from "react";
import GolfTee from "../../../assets/images/sports_golf.png";
import GolfGreenTee from "../../../assets/images/green_tee.png";
import { Info } from "lucide-react";

interface tee {
  id: number;
  teeName: string;
  teePosition: string;
  yardage: number;
  imageUrl: string | null;
  imageBase64: string | null;
  onSelectTeeId: (teeId: number) => void;
  selectedTeeId: number | null;
  onSelectedTeeType: (teeType: string) => void;
}

const TeeInfo: React.FC<{ tee: tee }> = ({ tee }) => {
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        tee.onSelectedTeeType(tee.teeName);
        tee.onSelectTeeId(tee.id);
      }}
    >
      <div className="my-3">
        <div className="flex justify-center space-y-4">
          <div className="flex items-center space-x-3 py-2">
            {tee.id === tee.selectedTeeId ? (
              <img src={GolfGreenTee} alt="" />
            ) : (
              <img src={GolfTee} alt="" />
            )}
            <span
              className={`text-sm ${tee.id === tee.selectedTeeId ? "text-[#95c11e]" : "text-gray-500"}`}
            >{`${tee.teeName} (${tee.yardage})`}</span>
            <Info size={20} className="text-blue-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeeInfo;
