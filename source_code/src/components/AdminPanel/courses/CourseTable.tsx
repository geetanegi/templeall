import React, { useEffect, useState, useRef } from "react";
import { LandPlot, QrCode } from "lucide-react";
import apiService from "../../../services/apiService";
import { ToastInfo, ToastSuccess } from "../../Toast";
import { Club, ApiResponse, Course } from "./courses.interface.ts";
import QRCode from "react-qr-code";
import { API_URL } from "../../../services/enums.ts";
import PaginationComponent from "../../PaginationComponent.tsx";
import Golf from "../../../assets/images/golf_course (1).svg";
import PageLoader from "../../PageLoader.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/index.ts";
import { setLoading } from "../../../reducers/loader/loader.ts";
import QRModal from "./QRModal.tsx";
import clubIcon from "../../../assets/images/Mask group (1).svg";

interface CourseTableProps {
  selectedHoles?: string[] | null;
  selectedCourse?: number | null;
}

const CourseTable: React.FC<CourseTableProps> = ({
  selectedCourse,
  selectedHoles,
}) => {
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const [courseData, setCourseData] = useState<Club[]>([]);
  const qrCodeRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});
  const [filterCourses, setFilterCourses] = useState<Course[] | null>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [dataPerPage, setDataPerPage] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedQR, setSelectedQR] = useState<any | null>(null);
  const [totalData, setTotalData] = useState<any[]>([]);

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
      currentItems = courseData?.slice(startIndex, startIndex + pageSize) || [];
      let totalPage =
        courseData?.length > pageSize
          ? Math.ceil(courseData?.length / pageSize)
          : 1;
      setTotalPages(totalPage);
    }
    setDataPerPage(currentItems);
  }, [pageSize, currentPage, courseData, filterCourses]);

  useEffect(() => {
    if (selectedCourse) {
      const filteredCourse = filterByCourse(totalData, selectedCourse);
      const selectedCourseData = filterByCourse(courseData, selectedCourse);
      if (selectedCourseData) {
        const filteredHoles = filteredCourse?.[0]?.courseList?.[0]?.holeList
          ? filteredCourse?.[0]?.courseList?.[0]?.holeList?.filter((hole: any) =>
            selectedHoles && selectedHoles.length > 0
              ? selectedHoles?.includes(hole.id.toString())
              : true,
          )
          : selectedCourseData.holeList;
        const data = {
          courseList: [
            {
              holeList: filteredHoles,
            },
          ],
        };
        setFilterCourses([
          {
            ...selectedCourseData?.[0],
            ...data,
          },
        ]);
      } else {
        setFilterCourses([]);
      }
    } else {
      setFilterCourses([]);
    }
  }, [selectedCourse, selectedHoles, courseData]);

  const filterByCourse = (clubList: any, courseId: any) => {
    return clubList.filter((club: any) =>
      club.courseList.some((course: any) => course.id === courseId),
    );
  };

  const handlePageSizeChange = (value: any) => {
    setCurrentPage(0);
    setPageSize(value.target.value);
  };

  const fetchCourseData = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiService.post<ApiResponse>(API_URL.getCourseData, {
        data: {
          sortDir: "ASC",
          sortBy: "courseName",
          pageNumber: "0",
          pageSize: "10",
        },
      });
      if (res.status === 200 && !res.data.error) {
        setCourseData(res.data.data);
        setTotalData(res.data.data);
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);


  const generateQRCodeDataURL = async (
    svg: SVGSVGElement,
    format: "png" | "jpeg",
    scale: number = 5 // Use a larger scale factor for very high quality
  ): Promise<string> => {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svgData);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Define padding around the QR code
        const padding = 40; // Increased padding for more space around the image
        const imgWidth = img.width * scale; // Scale the width
        const imgHeight = img.height * scale; // Scale the height

        // Set the canvas size to include padding and scale
        canvas.width = imgWidth + padding * 2 * scale;
        canvas.height = imgHeight + padding * 2 * scale;

        if (ctx) {
          // Fill the canvas with a white background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw the SVG image on top of the white background with padding and scale
          ctx.drawImage(img, padding * scale, padding * scale, imgWidth, imgHeight);
          resolve(canvas.toDataURL(`image/${format}`));
        } else {
          reject("Canvas context is not available");
        }
      };

      img.onerror = reject;
    });
  };

  const downloadQRCode = async (key: string, format: "png" | "jpeg", name: string, scale: number = 5) => {
    const svg = qrCodeRefs.current[key];
    if (svg) {
      try {
        const url = await generateQRCodeDataURL(svg, format, scale);
        const link = document.createElement("a");
        link.href = url;
        const nameTrim = name.replace(/\s+/g, '');
        link.download = `${nameTrim}.${format}`;
        link.click();
        ToastSuccess("QR Code generated successfully");
      } catch (error) {
        ToastInfo("Failed to generate QR Code. Please try again later.");
      }
    } else {
      ToastInfo("Failed to generate QR Code. Please try again later.");
    }
  };

  const handlePreview = (url: string) => {
    setOpenModal(true);
    setSelectedQR(url);
  };

  const renderCourses = (courses: any) => {
    return courses.map((course: any) => (
      <tr key={course.id} className="whitespace-nowrap font-normal text-black">
        <td colSpan={2}>
          <div className="flex items-center justify-between border-y border-gray-400 bg-[#F5F6F7] py-3">
            <span className="flex items-center justify-between space-x-2">
              <img
                src={clubIcon}
                alt="golf"
                className="ml-10 mr-1 w-4 text-gray-600"
              />
              <span className="text-[14px] font-semibold">{course?.name}</span>
            </span>
          </div>
          {course?.courseList?.map((club: any) => (
            <div className="" key={club?.id}>
              <div className="flex items-center justify-between bg-[#E9EDF5] px-5 pl-10">
                <span className="flex items-center justify-between space-x-2">
                  <div className="ml-2 mr-4 h-12 border border-gray-300"></div>
                  <LandPlot className="h-5 w-5 text-gray-500" />
                  <span className="text-[14px] font-semibold">
                    {club?.courseName}
                  </span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handlePreview(
                        `${API_URL.qrCodeByCourseId}${club.id}&courseName=${club.courseName}`,
                      )
                    }
                    className="font-weight-400 flex items-center justify-center rounded-md border border-primaryColor bg-white px-2 py-[1px] text-[12px] text-primaryColor"
                  >
                    <QrCode className="mr-1 w-4 text-primaryColor" />
                    Preview
                  </button>
                  <button
                    onClick={() => downloadQRCode(`course-${club.id}`, "png", club.courseName)}
                    className="font-weight-400 flex items-center justify-center rounded-md bg-primaryColor px-2 py-[1px] text-[12px] text-primaryText"
                  >
                    <QrCode className="mr-1 w-4 text-primaryText" />
                    Download
                  </button>
                </div>
              </div>
              {club?.holeList?.map((hole: any) => {
                const holeKey = `course-${course.id}-hole-${hole.holeNumber}-par-${hole.par}`;
                const name = `${course?.name}_Hole${hole.holeNumber}_Par${hole.par}`;
                return (
                  <div key={hole?.id} className="bg-white">
                    <div className="w-full border border-gray-200"></div>
                    <div className="flex items-center justify-between px-5 pl-7">
                      <span className="flex items-center justify-between space-x-3">
                        <div className="ml-5 mr-5 h-12 border border-gray-300"></div>
                        <div className="h-12 border border-gray-300"></div>
                        <img
                          src={Golf}
                          alt="golf"
                          className="mr-1 w-4 text-gray-600"
                        />
                        <span className="text-[14px]">
                          Hole #{hole?.holeNumber} - Par {hole?.par}
                        </span>
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handlePreview(
                              `${API_URL.qrCodeByHoldId}?course=${club.id}&holeId=${hole.id}&holeNo=${hole.holeNumber}&par=${hole.par}&courseName=${club.courseName}`,
                            )
                          }
                          className="font-weight-400 flex items-center justify-center rounded-md border border-primaryColor bg-white px-2 py-[1px] text-[12px] text-primaryColor"
                        >
                          <QrCode className="mr-1 w-4 text-primaryColor" />
                          Preview
                        </button>
                        <button
                          onClick={() => downloadQRCode(holeKey, "png", name)}
                          className="font-weight-400 flex items-center justify-center rounded-md bg-primaryColor px-2 py-[1px] text-[12px] text-primaryText"
                        >
                          <QrCode className="mr-1 w-4 text-primaryText" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
            </div>
          ))}
        </td>
      </tr>
    ));
  };

  return (
    <PageLoader isActive={loader}>
      <div className="mt-[24px] flex h-full min-h-screen pb-14">
        <div className="2xl:max-w-none w-full max-w-7xl overflow-x-scroll md:overflow-auto">
          <div className="overflow-x-auto rounded-md border">
            <table className="font-inter w-full table-auto overflow-scroll text-left md:overflow-auto">
              <thead className="w-full rounded-lg text-base font-semibold text-white">
                <tr className="flex justify-between bg-[#ffffff]">
                  <th className="whitespace-nowrap px-11 py-3 text-[11px] font-normal leading-4 text-[#8d94a1]">
                    COURSES
                  </th>
                  <th className="whitespace-nowrap px-11 py-3 text-[11px] font-normal leading-4 text-[#8d94a1]">
                    DOWNLOAD
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">{renderCourses(dataPerPage)}</tbody>
            </table>
          </div>
          {

          }
          {courseData[0]?.courseList.length > 10 && (
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
          )}
        </div>

        {/* QR code components rendered off-screen */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          {courseData.map((club) => {
            return club.courseList?.map((course) => (
              <React.Fragment key={course.id}>
                <QRCode
                  value={`${API_URL.qrCodeByCourseId}${course.id}&courseName=${course.courseName}`}
                  size={500}
                  // level="H"
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
                      value={`${API_URL.qrCodeByHoldId}?course=${course.id}&holeId=${hole.id}&holeNo=${hole.holeNumber}&par=${hole.par}&courseName=${course.courseName}`}
                      size={500}
                      // level="H"
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      ref={(el: any) => (qrCodeRefs.current[holeKey] = el)}
                    />
                  );
                })}
              </React.Fragment>
            ))
          })}
        </div>
      </div>
      {openModal && (
        <QRModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          course={selectedQR}
        />
      )}
    </PageLoader>
  );
};

export default CourseTable;
