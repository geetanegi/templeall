import React, { useEffect, useState } from "react";
import GolfClubInfo from "../components/Contests/Contest Components/GolfClubInfo";
import HoleNavigation from "../components/Contests/Contest Components/HoleNavigation";
import TeeInfo from "../components/Contests/Contest Components/TeeInfo";
import TeeContests from "../components/Contests/Contest Components/TeeContests";
import apiService from "../services/apiService";
import { API_URL } from "../services/enums";
import { ToastError } from "../components/Toast";
import {
  setCourseList,
  setHoleList,
  setTeeList,
} from "../reducers/Courses_data/courses";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  CourseListApiRes,
  HoleListApiRes,
} from "../reducers/Courses_data/course";

const ContestList: React.FC = () => {
  const dispatch = useDispatch();
  const courseList = useSelector(
    (state: RootState) => state.courses.courseList,
  );
  const HoleList = useSelector((state: RootState) => state.courses.HoleList);
  const TeeList = useSelector((state: RootState) => state.courses.TeeList);

  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedHoleId, setSelectedHoleId] = useState<number | null>(null);
  const [selectedTeeId, setSelectedTeeId] = useState<number | null>(null);

  const getCoursesList = async () => {
    try {
      const res = await apiService.post<CourseListApiRes>(
        API_URL.getCourseList,
        {
          data: {},
        },
      );

      if (res.status === 200 && !res.data.error) {
        dispatch(setCourseList(res.data));
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {}
  };
  useEffect(() => {
    getCoursesList();
  }, []);

  const getHoleListFromselectedCourseId = async () => {
    try {
      const res = await apiService.post<HoleListApiRes>(
        API_URL.getHolesByCourseId,
        {
          data: {
            courseId: selectedCourseId,
          },
        },
      );
      if (res.status === 200 && !res.data.error) {
        dispatch(setHoleList(res.data));
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {}
  };

  useEffect(() => {
    // Your code here
    if (selectedCourseId != null) {
      getHoleListFromselectedCourseId();
    }
  }, [selectedCourseId]);

  const getTeeListFromSelectedHoleId = async () => {
    try {
      const res = await apiService.post<any>(API_URL.getTeeByHoleId, {
        data: {
          holeId: selectedCourseId,
        },
      });
      if (res.status === 200 && !res.data.error) {
        dispatch(setTeeList(res.data));
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedHoleId != null) {
      getTeeListFromSelectedHoleId();
    }
  }, [selectedHoleId]);

  return (
    <div className="grid min-h-screen w-full grid-cols-[25%_75%] overflow-x-hidden bg-[#ffffff] px-2">
      <div className="h-screen overflow-auto p-1">
        {/* First column content (20% width) */}
        {courseList?.data.map((course) => (
          <div key={course.id} className="col-span-4">
            <GolfClubInfo
              course={course}
              onSelectCourseId={setSelectedCourseId}
            />
          </div>
        ))}
      </div>

      <div className="">
        {/* Hole Navigation  Section */}
        <div className="flex space-x-6 px-3 py-3">
          {HoleList?.data.map((hole) => (
            <HoleNavigation
              key={hole.id}
              hole={{
                holeNumber: hole.holeNumber,
                id: hole.id,
                imageBase64: hole.imageBase64,
                imageUrl: hole.imageUrl,
                par: hole.par,
                yardage: hole.yardage,
                onSelectHoleId: setSelectedHoleId,
                selectedHoleId: selectedHoleId,
              }}
            />
          ))}
        </div>

        {/* GolfTeeSelection Section */}
        <div className="relative px-3">
          <div className="my-4 overflow-auto rounded-lg border border-gray-200 shadow-sm">
            <div className="flex">
              <div className="h-auto w-[30%] border-r border-gray-400">
                {TeeList?.data.map((tee) => (
                  <TeeInfo
                    key={tee.id}
                    tee={{
                      id: tee.id,
                      teeName: tee.teeName,
                      teePosition: tee.teePosition,
                      yardage: tee.yardage,
                      imageUrl: tee.imageUrl || null,
                      imageBase64: tee.imageBase64 || null,
                      onSelectTeeId: setSelectedTeeId,
                      selectedTeeId: selectedTeeId,
                    }}
                  />
                ))}
                {/* <TeeInfo /> */}
              </div>
              <div className="h-96 w-[70%] overflow-auto">
                <TeeContests />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestList;
