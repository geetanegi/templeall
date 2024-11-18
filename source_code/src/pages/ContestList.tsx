import React, { useEffect } from "react";
import GolfClubInfo from "../components/Contests/Contest Components/GolfClubInfo";
import HoleNavigation from "../components/Contests/Contest Components/HoleNavigation";
import TeeInfo from "../components/Contests/Contest Components/TeeInfo";
import TeeContests from "../components/Contests/Contest Components/TeeContests";
import apiService from "../services/apiService";
import { API_URL } from "../services/enums";
import { ToastError } from "../components/Toast";
import {
  setContestList,
  setCourseList,
  setHoleList,
  setTeeList,
  setSelectedCourseId,
  setSelectedHoleId,
  setSelectedTeeId,
  setSelectedTeeType,
  setCourseName,
  setHoleNumber,
  setPar,
  setYardage,
  // setSelectedTeeType,
} from "../reducers/Courses_data/courses";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  CourseListApiRes,
  HoleListApiRes,
} from "../reducers/Courses_data/course";
import moment from "moment";
import PageLoader from "../components/PageLoader";
import { setLoading } from "../reducers/loader/loader";
import { useLocation } from "react-router-dom";

import BG from "../assets/images/dashboardBG.svg";
import { timeZone } from "../utils/TimeUtils";

const ContestList: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = Object.fromEntries(searchParams);

  useEffect(() => {
    if (queryParams.course) {
      dispatch(setSelectedCourseId(Number(queryParams.course)));
    }
    if (queryParams.holeId) {
      dispatch(setSelectedHoleId(Number(queryParams.holeId)));
    }
  }, [queryParams.course, queryParams.holeId]);

  const dispatch = useDispatch();
  const courseList = useSelector(
    (state: RootState) => state.courses.courseList,
  );
  const HoleList = useSelector((state: RootState) => state.courses.HoleList);
  const TeeList = useSelector((state: RootState) => state.courses.TeeList);
  const contestList = useSelector(
    (state: RootState) => state.courses.contestList,
  );
  const selectedCourseId = useSelector(
    (state: RootState) => state.courses.selectedCourseId,
  );
  const selectedHoleId = useSelector(
    (state: RootState) => state.courses.selectedHoleId,
  );
  const selectedTeeId = useSelector(
    (state: RootState) => state.courses.selectedTeeId,
  );
  const selectedTeeType = useSelector(
    (state: RootState) => state.courses.selectedTeeType,
  );
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  // const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  // const [selectedHoleId, setSelectedHoleId] = useState<number | null>(null);
  // const [selectedTeeId, setSelectedTeeId] = useState<number | null>(null);
  // const [selectedTeeType, setSelectedTeeType] = useState<string | null>(null);

  const getCoursesList = async () => {
    try {
      dispatch(setLoading(true));
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
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getCoursesList();
  }, []);

  const getHoleListFromselectedCourseId = async () => {
    try {
      dispatch(setLoading(true));
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
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // Your code here
    if (selectedCourseId != null) {
      getHoleListFromselectedCourseId();
    }
  }, [selectedCourseId]);

  const getTeeListFromSelectedHoleId = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiService.post<any>(API_URL.getTeeByHoleId, {
        data: {
          holeId: selectedHoleId,
        },
      });
      if (res.status === 200 && !res.data.error) {
        dispatch(setTeeList(res.data));
        dispatch(setContestList(null));
        dispatch(setSelectedTeeId(null));
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (selectedHoleId != null) {
      getTeeListFromSelectedHoleId();
    }
  }, [selectedHoleId]);

  const getContestByTeeIdFunc = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiService.post<any>(API_URL.getContestByTeeId, {
        data: {
          teeId: selectedTeeId,
          date: moment().utc().format(),
          zoneId: timeZone,
        },
      });
      if (res.status === 200 && !res.data.error) {
        dispatch(setContestList(res.data));
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (selectedTeeId != null) {
      getContestByTeeIdFunc();
    }
  }, [selectedTeeId]);

  useEffect(() => {
    if (selectedCourseId === null && courseList?.data[0]?.id !== undefined) {
      dispatch(setSelectedCourseId(courseList.data[0].id));
      dispatch(setCourseName(courseList.data[0].courseName));
    }
  }, [selectedCourseId, courseList]);

  useEffect(() => {
    if (
      selectedCourseId !== null &&
      HoleList?.data[0]?.id !== undefined &&
      selectedHoleId === null
    ) {
      dispatch(setSelectedHoleId(HoleList.data[0].id));
      dispatch(setHoleNumber(HoleList.data[0].holeNumber));
      dispatch(setPar(HoleList.data[0].par));
    }
  }, [selectedCourseId, HoleList]);

  useEffect(() => {
    if (
      selectedTeeId === null &&
      TeeList?.data[0]?.id !== undefined &&
      selectedTeeId === null
    ) {
      dispatch(setSelectedTeeId(TeeList.data[0].id));
      dispatch(setSelectedTeeType(TeeList.data[0]?.teeName));
      dispatch(setYardage(TeeList.data[0]?.yardage));
    }
  }, [selectedCourseId, TeeList]);

  return (
    <PageLoader isActive={loader}>
      <div
        className="bg-[#ffffff] bg-contain bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="grid min-h-screen w-full grid-cols-[25%_75%] overflow-x-hidden px-2">
          <div className="h-screen overflow-auto p-1 pt-3">
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
              <div className="my-4 overflow-auto rounded-lg border border-gray-200 bg-[#ffffff] shadow-sm">
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
                          // setShowWarning: setShowWarning,
                          // showWarning: showWarning,
                          // selectedTeeId: selectedTeeId,
                          // onSelectedTeeType: setSelectedTeeType,
                        }}
                      />
                    ))}
                    {/* <TeeInfo  />   */}
                  </div>
                  <div className="h-96 w-[70%] overflow-auto last:mb-[75px]">
                    {contestList?.data.map((contestListItem) => (
                      <TeeContests
                        key={contestListItem.contestId}
                        teeContest={{
                          contestId: contestListItem.contestId,
                          name: contestListItem.name,
                          contestType: contestListItem.contestType,
                          startTime: contestListItem.startTime,
                          endTime: contestListItem.endTime,
                          registrationStartTime:
                            contestListItem.registrationStartTime,
                          registrationEndTime:
                            contestListItem.registrationEndTime,
                          entryFee: contestListItem.entryFee,
                          limitSection: contestListItem.limitSection,
                          entriesPer24Hours: contestListItem.entriesPer24Hours,
                          waitTimeBetweenEntries:
                            contestListItem.waitTimeBetweenEntries,
                          queueLimit: contestListItem.queueLimit,
                          activeStatus: contestListItem.activeStatus,
                          activeContestDate: contestListItem.activeContestDate,
                          recurringType: contestListItem.recurringType,
                          scheduleContestId: contestListItem.scheduleContestId,
                          selectedTeeType: selectedTeeType,
                          progressiveContestId:
                            contestListItem.progressiveContestId,
                          note: contestListItem.note,
                        }}
                      />
                    ))}
                    {contestList?.data.length === 0 && (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <p className="text-gray-500">
                            No active contests available.
                          </p>
                        </div>
                      </div>
                    )}
                    {/* <TeeContests /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default ContestList;
