import React from "react";
import GolfGreenTee from "../../../assets/images/sports_golf_active.svg";
import GolfTee from "../../../assets/images/sports_golf_default.svg";
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
        tee.onSelectTeeId(tee.id);
        dispatch(setSelectedTeeId(tee.id));
        dispatch(setSelectedTeeType(tee.teeName));
        dispatch(setYardage(tee.yardage));
      }}
    >
      <div className="my-3">
        <div className="j flex items-center justify-between px-3">
          <div className="flex items-center space-x-3 py-2">
            {tee.id === selectedTeeId ? (
              <img
                src={GolfGreenTee}
                alt=""
                className="h-6 w-6"
                style={{ fill: "red" }}
              />
            ) : (
              <img src={GolfTee} alt="" className="h-6 w-6" />
            )}
            <span
              className={`text-sm ${tee.id === selectedTeeId ? "text-[#95c11e]" : "text-gray-500"}`}
            >{`${tee.teeName} (${tee.yardage} yards) `}</span>
          </div>
          <div>
            {/* <Info size={20} className="ml-auto text-blue-700" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeeInfo;
