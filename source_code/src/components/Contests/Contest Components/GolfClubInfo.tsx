import React from "react";
import { MapPin } from "lucide-react"; // Importing Lucide icons
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseName,
  setSelectedCourseId,
} from "../../..//reducers/Courses_data/courses";
import { RootState } from "../../../store";

interface courseListCourse {
  holeList: null;
  id: number;
  courseName: string;
  location: string;
  description: string;
  imageUrl: string | null;
  imageBase64: string | null;
}
interface GolfClubInfoProps {
  course: courseListCourse;
  onSelectCourseId: (courseId: number) => void;
}
const GolfClubInfo: React.FC<GolfClubInfoProps> = ({
  course,
  onSelectCourseId,
}) => {
  const dispatch = useDispatch();
  const selectedCourseId = useSelector(
    (state: RootState) => state.courses.selectedCourseId,
  );

  const link =
    "https://images.unsplash.com/photo-1726476641991-d243eb5e5d8d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div
      onClick={() => {
        onSelectCourseId(course.id);
        dispatch(setSelectedCourseId(course.id));
        dispatch(setCourseName(course.courseName));
      }}
      className={`mb-4 max-w-sm cursor-pointer rounded-lg border bg-[#ffffff] shadow-custom-shadow-2 ${course.id === selectedCourseId ? "border-1 border-primaryColor" : ""} `}
    >
      <img
        src={
          course.imageUrl !== null
            ? `${course.imageUrl}`
            : link
        }
        alt={course.courseName}
        className="rounded-t-lg"
      />
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{course.courseName}</h3>
            <p className="text-xs text-gray-500 flex ml-[-2px]">
              <MapPin size={16} className="inline-block" />
              <span className="pl-1">{course.location}</span>
            </p>
          </div>
          {/* <button className="flex flex-col items-center space-x-1 text-green-600">
            <Info size={16} />
            <span className="text-xs">View Info</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default GolfClubInfo;
