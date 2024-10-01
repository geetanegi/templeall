import React from "react";
import GolfTee from "../../../assets/images/sports_golf.png";
import GolfGreenTee from "../../../assets/images/green_tee.png";
import { Info } from "lucide-react";
import {
  setSelectedTeeId,
  setSelectedTeeType,
  setYardage,
} from "../../..//reducers/Courses_data/courses";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

interface tee {
  id: number;
  teeName: string;
  teePosition: string;
  yardage: number;
  imageUrl: string | null;
  imageBase64: string | null;
  onSelectTeeId: (teeId: number) => void;
  setShowWarning: (showWarning: number) => void;
  showWarning: number;
  // selectedTeeId: number | null;
  // onSelectedTeeType: (teeType: string) => void;
}

const TeeInfo: React.FC<{ tee: tee }> = ({ tee }) => {
  const dispatch = useDispatch();
  const selectedTeeId = useSelector(
    (state: RootState) => state.courses.selectedTeeId,
  );
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        // tee.onSelectedTeeType(tee.teeName);
        if (tee.showWarning === 0) {
          tee.setShowWarning(1);
        }

        tee.onSelectTeeId(tee.id);
        dispatch(setSelectedTeeId(tee.id));
        dispatch(setSelectedTeeType(tee.teeName));
        dispatch(setYardage(tee.yardage));
      }}
    >
      <div className="my-3">
        <div className="flex justify-center space-y-4">
          <div className="flex items-center space-x-3 py-2">
            {tee.id === selectedTeeId ? (
              <img src={GolfGreenTee} alt="" />
            ) : (
              <img src={GolfTee} alt="" />
            )}
            <span
              className={`text-sm ${tee.id === selectedTeeId ? "text-[#95c11e]" : "text-gray-500"}`}
            >{`${tee.teeName} (${tee.yardage} yards) `}</span>
            <Info size={20} className="text-blue-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeeInfo;
