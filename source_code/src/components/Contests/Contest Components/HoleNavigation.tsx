import React from "react";
import { Info } from "lucide-react";
import Golf from "../../../assets/images/golf_course.png";
import WhiteGolf from "../../../assets/images/golf_course (1).png";
import {
  clearAllSelectedContests,
  setSelectedHoleId,
} from "../../..//reducers/Courses_data/courses";
import { useDispatch } from "react-redux";

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
  // console.log("selected hole", hole.selectedHoleId);
  return (
    <div
      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 shadow-sm ${
        hole.id === hole.selectedHoleId
          ? "bg-[#95c11e] text-white"
          : "border-gray-400 bg-white hover:bg-gray-100"
      }`}
      onClick={() => {
        hole.onSelectHoleId(hole.id);
        dispatch(setSelectedHoleId(hole.id));
        dispatch(clearAllSelectedContests());
      }}
    >
      {hole.selectedHoleId === hole.id ? (
        <img src={WhiteGolf} alt="" className="h-4 w-4 text-gray-500" />
      ) : (
        <img src={Golf} alt="" className="h-4 w-4 text-gray-500" />
      )}
      <span
        className={`text-sm ${hole.id === hole.selectedHoleId ? "text-white" : "text-gray-700"}`}
      >
        Hole #{hole.holeNumber}- Par {hole.par}
      </span>
      <Info
        className={`h-4 w-4 ${hole.id === hole.selectedHoleId ? "text-white" : "text-blue-700"}`}
      />
    </div>
  );
};

export default HoleNavigation;
