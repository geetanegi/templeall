import React, { useEffect, useState } from "react";
import CourseTable from "./CourseTable";
import { ToastError } from "../../Toast";
import apiService from "../../../services/apiService";
import { CourseApiResponse, HoleListResponse } from "./courses.interface";
import CheckboxDropdown from "../../CheckboxDropdown";
import { API_URL } from "../../../services/enums";

const CoursePanel: React.FC = () => {
  const [courses, setCourses] = useState<CourseApiResponse | null>(null);
  const [holesList, setHolesList] = useState<HoleListResponse | null>(null);
  const [selectedHoles, setSelectedHoles] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  console.log("setSelectedCourse", selectedCourse);
  console.log("selectedHoles", selectedHoles);

  const fetchCourseList = async () => {
    try {
      const res = await apiService.post<CourseApiResponse>(
        API_URL.getCourseList,
        {
          data: {},
        },
      );
      if (res.status === 200 && res.statusText === "OK" && !res.data.error) {
        setCourses(res.data);
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      ToastError("Error fetching course data");
    }
  };

  const fetchHoleList = async (selectedCourseId: number) => {
    try {
      const res = await apiService.post<HoleListResponse>(
        API_URL.getHoleByCourseId,
        {
          data: {
            courseId: selectedCourseId,
          },
        },
      );
      if (res.status === 200 && res.statusText === "OK" && !res.data.error) {
        setHolesList(res.data);
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching hole data");
      }
    } catch (error) {
      ToastError("Error fetching hole data");
    }
  };

  useEffect(() => {
    fetchCourseList();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchHoleList(selectedCourse);
    } else {
      setHolesList(null);
    }
  }, [selectedCourse]);

  const handleCoursesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourseId = parseInt(event.target.value);
    setSelectedCourse(selectedCourseId);
    setHolesList(null); // Reset holesList to null when course changes
    setSelectedHoles([]); // Reset selectedHoles to an empty array
  };

  const handleSelectedValuesChange = (selectedValues: string[]) => {
    setSelectedHoles(selectedValues);
  };

  return (
    <>
      <div className="flex-1 px-4 md:flex-[0.75] md:px-8">
        <div className="mb-4 flex flex-col justify-between md:flex-row">
          <div className="align-center md:w-2xl mt-5 flex w-full flex-col rounded-md px-0 md:ml-2 md:mt-0">
            <div className="flex max-w-screen-sm items-center space-x-3">
              <select
                id="courses"
                onChange={handleCoursesChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm text-[#7b7887] outline-none md:w-[320px] dark:text-white dark:placeholder-gray-400"
              >
                <option value="">Filter by Courses</option>
                {courses?.data.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              <CheckboxDropdown
                options={
                  holesList?.data.map((hole) => ({
                    value: hole.id.toString(),
                    label: hole.holeNumber.toString(),
                  })) || []
                }
                label="Please select holes"
                disabled={selectedCourse ? false : true}
                onChange={handleSelectedValuesChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm text-[#7b7887] outline-none md:w-[320px] dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <CourseTable
              selectedHoles={selectedHoles}
              selectedCourse={selectedCourse}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePanel;
