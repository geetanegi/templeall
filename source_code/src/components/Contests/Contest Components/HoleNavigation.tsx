import React from "react";
import { Info } from "lucide-react";
import Golf from "../../../assets/images/golf_course.png";
import WhiteGolf from "../../../assets/images/golf_course (1).png";
import {
  clearAllSelectedContests,
  setHoleNumber,
  setPar,
  setSelectedHoleId,
} from "../../..//reducers/Courses_data/courses";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

interface hole {
  holeNumber: number;
  id: number;
  imageBase64?: string | null; // Made optional
  imageUrl?: string | null; // Made optional
  par: number;
  yardage?: number; // Made optional
  onSelectHoleId: (holeNumber: number) => void;
  selectedHoleId: number | null;
}

const HoleNavigation: React.FC<{ hole: hole }> = ({ hole }) => {
  const dispatch = useDispatch();

  const selectedHoleId = useSelector(
    (state: RootState) => state.courses.selectedHoleId,
  );

  return (
    <div
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 shadow-sm ${
        hole.id === selectedHoleId
          ? "bg-[#95c11e] text-white"
          : "border-gray-400 bg-white hover:bg-gray-100"
      }`}
      onClick={() => {
        hole.onSelectHoleId(hole.id);
        dispatch(setSelectedHoleId(hole.id));
        dispatch(setHoleNumber(hole.holeNumber));
        dispatch(setPar(hole.par));
        dispatch(clearAllSelectedContests());
      }}
    >
      {selectedHoleId === hole.id ? (
        <img src={WhiteGolf} alt="" className="h-4 w-4 text-gray-500" />
      ) : (
        <img src={Golf} alt="" className="h-4 w-4 text-gray-500" />
      )}
      <span
        className={`text-sm ${hole.id === selectedHoleId ? "text-white" : "text-gray-700"}`}
      >
        Hole #{hole.holeNumber}- Par {hole.par}
      </span>
      <Info
        className={`h-4 w-4 ${hole.id === selectedHoleId ? "text-white" : "text-blue-700"}`}
      />
    </div>
  );
};

export default HoleNavigation;
