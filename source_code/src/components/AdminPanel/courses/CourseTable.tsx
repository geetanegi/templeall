import React, { useEffect, useState, useRef } from "react";
import { LandPlot, QrCode } from "lucide-react";
import apiService from "../../../services/apiService";
import { ToastError, ToastSuccess } from "../../Toast";
import { Club, ApiResponse, Course } from "./courses.interface.ts";
import QRCode from "react-qr-code";
import { API_URL } from "../../../services/enums.ts";
import PaginationComponent from "../../PaginationComponent.tsx";
import Golf from "../../../assets/images/golf_course.png";

interface CourseTableProps {
  selectedHoles?: string[] | null;
  selectedCourse?: number | null;
}

const CourseTable: React.FC<CourseTableProps> = ({
  selectedCourse,
  selectedHoles,
}) => {
  const [courseData, setCourseData] = useState<Club[]>([]);
  const qrCodeRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});
  const [filterCourses, setFilterCourses] = useState<Course[] | null>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [dataPerPage, setDataPerPage] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const rowCount = Array.from({ length: 10 }, (_, index) => index + 1);


  useEffect(() => {
    const startIndex = currentPage * pageSize;
    let currentItems = [];
    if (filterCourses?.length) {
      let totalPage =
        filterCourses.length > pageSize
          ? Math.ceil(filterCourses.length / pageSize)
          : 1;
      setTotalPages(totalPage);
      currentItems =
        filterCourses.slice(startIndex, startIndex + pageSize) || [];
    } else {
      currentItems =
        courseData?.[0]?.courseList?.slice(startIndex, startIndex + pageSize) ||
        [];
      let totalPage =
        courseData?.[0]?.courseList.length > pageSize
          ? Math.ceil(courseData?.[0]?.courseList.length / pageSize)
          : 1;
      setTotalPages(totalPage);
    }
    setDataPerPage(currentItems);
  }, [pageSize, currentPage, courseData, filterCourses]);

  useEffect(() => {
    if (selectedCourse !== null) {
      const selectedCourseData = courseData
        .flatMap((club) => club.courseList)
        .find((course) => course.id === selectedCourse);

      if (selectedCourseData) {
        const filteredHoles = selectedCourseData.holeList
          ? selectedCourseData.holeList.filter((hole) =>
              selectedHoles && selectedHoles.length > 0
                ? selectedHoles.includes(hole.id.toString())
                : true,
            )
          : selectedCourseData.holeList;

        setFilterCourses([
          {
            ...selectedCourseData,
            holeList: filteredHoles,
          },
        ]);
      } else {
        setFilterCourses([]);
      }
    } else {
      setFilterCourses([]);
    }
  }, [selectedCourse, selectedHoles, courseData]);

  const handlePageSizeChange = (value: any) => {
    setCurrentPage(0)
    setPageSize(value.target.value);
  };

  const fetchCourseData = async () => {
    try {
      const res = await apiService.post<ApiResponse>(API_URL.getCourseData, {
        data: {
          sortDir: "ASC",
          sortBy: "courseName",
          pageNumber: "0",
          pageSize: "10",
        },
      });
      if (res.status === 200 && res.statusText === "OK" && !res.data.error) {
        setCourseData(res.data.data);
      } else if (res.data.error) {
        ToastError(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      ToastError("Error fetching course data");
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const generateQRCodeDataURL = async (
    svg: SVGSVGElement,
    format: "png" | "jpeg",
  ): Promise<string> => {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svgData);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL(`image/${format}`));
        } else {
          reject("Canvas context is not available");
        }
      };
      img.onerror = reject;
    });
  };

  const downloadQRCode = async (key: string, format: "png" | "jpeg") => {
    const svg = qrCodeRefs.current[key];
    if (svg) {
      try {
        const url = await generateQRCodeDataURL(svg, format);
        const link = document.createElement("a");
        link.href = url;
        link.download = `qrcode-${key}.${format}`;
        link.click();
        ToastSuccess("QR Code generated successfully");
      } catch (error) {
        ToastError("Failed to generate QR Code. Please try again later.");
      }
    } else {
      ToastError("Failed to generate QR Code. Please try again later.");
    }
  };

  const renderCourses = (courses: Course[]) => {
    return courses.map((course) => (
      <tr
        key={course.id}
        className="whitespace-nowrap bg-gray-100 font-normal text-black"
      >
        <td colSpan={2}>
          {/* Main course card */}
          <div className="flex items-center justify-between px-5 py-5 pl-10">
            <span className="flex items-center justify-between space-x-2">
              <LandPlot className="h-5 w-5 text-gray-400" />
              <span className="font-semibold">{course?.courseName}</span>
            </span>
            <div>
              <button
                onClick={() => downloadQRCode(`course-${course.id}`, "png")}
                className="font-weight-400 flex justify-center rounded-md border-2 border-lime-500 bg-white px-2 py-[1px] text-sm text-gray-400"
              >
                <QrCode className="mr-1 w-4 text-gray-600" />
                Download
              </button>
            </div>
          </div>
          {course?.holeList?.map((hole) => {
            const holeKey = `course-${course.id}-hole-${hole.holeNumber}-par-${hole.par}`;
            return (
              <div key={hole?.id} className="bg-white">
                {/* Golf card */}
                <div className="w-full border border-gray-200"></div>
                <div className="flex items-center justify-between px-5 pl-7">
                  <span className="flex items-center justify-between space-x-3">
                    <div className="ml-5 h-12 border border-gray-300"></div>
                    <img
                      src={Golf}
                      alt="golf"
                      className="mr-1 w-4 text-gray-600"
                    />
                    <span>
                      Hole #{hole?.holeNumber} - Par {hole?.par}
                    </span>
                  </span>
                  <div>
                    <button
                      onClick={() => downloadQRCode(holeKey, "png")}
                      className="font-weight-400 flex justify-center rounded-md border-2 border-lime-500 bg-white px-2 py-[1px] text-sm text-gray-400"
                    >
                      <QrCode className="mr-1 w-4 text-gray-600" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </td>
      </tr>
    ));
  };

  return (
    <div className="mt-6 flex h-full min-h-screen pb-14">
      <div className="2xl:max-w-none mt-2 w-full max-w-7xl overflow-x-scroll md:overflow-auto">
        <div className="overflow-x-auto">
          <table className="font-inter w-full table-auto overflow-scroll border text-left md:overflow-auto">
            <thead className="w-full rounded-lg text-base font-semibold text-white">
              <tr className="flex justify-between bg-[##ffffff]">
                <th className="whitespace-nowrap px-11 py-3 font-normal text-[#8d94a1] sm:text-base">
                  COURSES
                </th>
                <th className="whitespace-nowrap px-11 py-3 font-normal text-[#8d94a1] sm:text-base">
                  DOWNLOAD
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">{renderCourses(dataPerPage)}</tbody>
          </table>
        </div>
        <div className="mt-1.5 mt-5 flex w-full flex-col items-center justify-center gap-5 px-1 sm:flex-row sm:justify-between">
          <div className="align-center flex h-[30px] justify-center">
            <p>Page</p>
            <select
              name="example"
              id="example"
              onChange={handlePageSizeChange}
              className="mx-2 rounded-md border border-gray-200 px-5"
            >
              {rowCount.map((row, i) => (
                <option key={i} selected={5 === row} value={row}>
                  {row}
                </option>
              ))}
            </select>
            <p>of 10</p>
          </div>
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      {/* QR code components rendered off-screen */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        {courseData[0]?.courseList?.map((course) => (
          <React.Fragment key={course.id}>
            <QRCode
              value={`${API_URL.qrCodeByCourseId}${course.id}`}
              size={500}
              level="H"
              bgColor="#FFFFFF"
              fgColor="#000000"
              ref={(el: any) =>
                (qrCodeRefs.current[`course-${course.id}`] = el)
              }
            />
            {course.holeList?.map((hole) => {
              const holeKey = `course-${course.id}-hole-${hole.holeNumber}-par-${hole.par}`;
              return (
                <QRCode
                  key={holeKey}
                  value={`${API_URL.qrCodeByHoldId}${hole.holeNumber}&par:${hole.par}`}
                  size={500}
                  level="H"
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  ref={(el: any) => (qrCodeRefs.current[holeKey] = el)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CourseTable;
