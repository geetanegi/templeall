import { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import { Ban, CircleCheck, Eye, Plus, SquarePen } from "lucide-react";
import PageLoader from "../PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import SwitchComponent from "../SwitchComponent";
import BG from "../../assets/images/dashboardBG.svg";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastInfo, ToastSuccess } from "../Toast";
import { MdSportsGolf } from "react-icons/md";

import Modal from "../ModalComponent";
import { ROUTES } from "../../utils/routesPath";
import { useNavigate } from "react-router-dom";
import ContestList from "../../pages/ContestList";
import CheckboxDropdown from "../CheckboxDropdown";
import {
  CourseApiResponse,
  HoleListResponse,
} from "../AdminPanel/courses/courses.interface";
import { setLoading } from "../../reducers/loader/loader";
import { getFilters } from "../../utils/genericApiCalls";
import { decryptData, secretKey } from "../../utils/encrypt";
import ContestModal from "./contestUtils/contestModal";
import moment from "moment";
import FilterPannelDrawer from "../FilterPannel/FilterPannelDrawer";

const tableHeaders = [
  { id: 1, key: "cId", field: "Contest ID" },
  { id: 14, key: "Actions", field: "Actions" },
  { id: 13, key: "activeStatus", field: "Status" },
  { id: 2, key: "contestType", field: "Contest Type" },
  { id: 3, key: "clubName", field: "Club name" },
  { id: 4, key: "courseName", field: "Course Name" },
  { id: 5, key: "holeNumber", field: "Hole number" },
  { id: 6, key: "teeName", field: "Tee" },
  { id: 7, key: "entryFee", field: "Entry fee" },
  { id: 8, key: "playerCount", field: "Total Reg." },
  { id: 9, key: "createdDate", field: "Created date" },
  { id: 10, key: "createdBy", field: "Created By" },
  { id: 11, key: "updatedDate", field: "Updated date" },
  { id: 12, key: "updatedBy", field: "Updated By" },

];

const ContestManagement = () => {
  const navigate = useNavigate();

  const userPermissionAvailable = useSelector(
    (state: RootState) => state?.auth?.userPermissions,
  );

  const userPermisions =
    userPermissionAvailable &&
    JSON.parse(decryptData(userPermissionAvailable, secretKey));

  const isCourseAdmin = userPermisions?.permission?.["is_course_admin"];
  const loader = useSelector((state: RootState) => state.loader.isLoading);
  const [rowData, setRowData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElement, setTotalElement] = useState<number>(10);
  const [totalAdminCount, setTotalAdminCount] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [currentStatus, setCurrentStatus] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedId, setSetselectedId] = useState<number | null>(null);
  const [selectedContestType, setSelectedContestType] = useState<string | null>(
    null,
  );
  const [courses, setCourses] = useState<CourseApiResponse | null>(null);
  const [holesList, setHolesList] = useState<HoleListResponse | null>(null);
  const [selectedHoles, setSelectedHoles] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<{
    name: string;
    id: number | string;
  } | null>(null);
  const [filterByContest, setFilterByContest] = useState<any>([]);
  const [contestId, setContestId] = useState<number | string>("");
  const [isContestModalOpen, setIsContestModalOpn] = useState<boolean>(false);
  const [cId, setCId] = useState<string | null>('')

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)


  const dispatch = useDispatch();

  const fetchCourseList = async () => {
    try {
      let endPoint = API_URL.getCourseList
      if (isCourseAdmin) {
        endPoint = API_URL.getCourseFilterForCA
      }
      const res = await apiService.post<CourseApiResponse>(
        endPoint,
        {
          data: {},
        },
      );
      if (res.status === 200 && !res.data.error) {
        setCourses(res.data);
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching course data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHoleList = async (selectedCourseId: string | number) => {
    try {
      const res = await apiService.post<HoleListResponse>(
        API_URL.getHoleByCourseId,
        {
          data: {
            courseId: selectedCourseId,
          },
        },
      );
      if (res.status === 200 && !res.data.error) {
        setHolesList(res.data);
      } else if (res.data.error) {
        ToastInfo(res.data.description || "Error fetching hole data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userPermisions?.permission?.["is_player"]) {
      fetchContestList(null, null);
    }
  }, [
    selectedHoles,
    selectedCourse,
    currentStatus,
    selectedContestType,
    currentPage,
  ]);

  useEffect(() => {
    getFilters("contest_type", setFilterByContest);
    fetchCourseList();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchHoleList(selectedCourse.id);
    } else {
      setHolesList(null);
    }
  }, [selectedCourse]);

  const handleCoursesChange = (id:number | string) => {
    const courseId: number | string = id;
    if (courseId) {
      const courseName = courses?.data?.filter(
        (course) => course.id === Number(courseId),
      )[0]?.courseName;
      setSelectedCourse({ name: String(courseName), id: id});
    } else {
      setSelectedCourse(null);
    }
    setCurrentPage(0);
    setHolesList(null); // Reset holesList to null when course changes
    setSelectedHoles(""); // Reset selectedHoles to an empty array
  };

  const handleSelectedValuesChange = (selectedValues: string[]) => {
    let selectedHolesData = "";
    setCurrentPage(0);
    selectedValues.forEach((item, index) => {
      selectedHolesData = selectedHolesData + item;
      if (index < selectedValues.length - 1) {
        selectedHolesData = selectedHolesData + ",";
      }
    });
    setSelectedHoles(selectedHolesData);
  };

  interface ContestApiResponse {
    description: string | null;
    display: boolean;
    error: boolean;
    data: any;
  }

  useEffect(() => {
    setRowData(computeTableData(totalAdminCount));
  }, [totalAdminCount]);

  const getStatus = (status: boolean) => {
    if (status) {
      return (
        <div className="flex w-3/4 items-center px-5 w-[100px] justify-center space-x-1 rounded-md bg-[#97D0A533] py-0.5 text-[#248A3D]">
          <MdSportsGolf className="size-5" />
          <span className="text-xs">{status && "Active"}</span>
        </div>
      );
    } else {
      return (
        <div className="flex w-3/4 items-center px-5 w-[100px] justify-center space-x-1 rounded-md bg-[#D0D0D033] py-1 text-[#8E8E8E]">
          <Ban height={15} width={15} />
          <span className="text-xs">{!status && "Inactive"}</span>
        </div>
      );
    }
  };

  const computeTableData = (fetchedData: any) => {
    const data = fetchedData?.map((contest: any) => ({
      "Contest Id": contest.cid || '',
      Actions: isCourseAdmin ? (
        <button
          key={contest?.id}
          className="text-[#0077B6]"
          onClick={() => {
            setContestId(contest.id);
            setIsContestModalOpn(true);
            setCId(contest.cid)
            // navigate(
            //   `${ROUTES.UPDFATE_CONTEST.replace(":id", contest.id?.toString())}`,
            // );
          }}
        >
          <Eye className="w-5" />
        </button>
      ) : (
        isCompleted(contest.activeStatus, contest.id, contest.cid)
      ),
      Status: getStatus(contest.activeStatus),
      "Contest Type": contest.contestType,
      "Club name": contest.clubName || "N/A",
      "Course Name": contest.courseName || "N/A",
      "Hole number": `Hole #${contest.holeNumber} - Par ${contest.par || ""}` || "N/A",
      Tee: contest.teeName + " " + `(Yards ${contest.teeYardage})` || "N/A",
      "Entry fee": "$" + contest.entryFee || "N/A",
      "Total Reg.": contest.playerCount || 0,
      "createdDate": moment
        .utc(contest.createdDate)
        .local()
        .format("MM/DD/YYYY hh:mm A"),
      "createdby": contest.createdBy || '',
      "updatedDate": moment
        .utc(contest.updatedDate)
        .local()
        .format("MM/DD/YYYY hh:mm A"),
      "updatedBy": contest.updatedBy || '',

    }));
    return data;
  };

  const isCompleted = (status: boolean, id: number, cid: string) => {
    return (
      <div className="flex w-[70%] pr-5 justify-left gap-5 py-2">
        <button style={{ color: "#046221" }}>
          <SquarePen
            strokeWidth={1}
            onClick={() => {
              setSetselectedId(id);
              setIsModalOpen(true);
            }}
            height={24}
            width={24}
          />
        </button>
        <button
          key={id}
          className="text-[#0077B6]"
          onClick={() => {
            setContestId(id);
            setIsContestModalOpn(true);
            setCId(cid)
            // navigate(
            //   `${ROUTES.UPDFATE_CONTEST.replace(":id", contest.id?.toString())}`,
            // );
          }}
        >
          <Eye className="w-5" />
        </button>
        <SwitchComponent
          isChecked={status}
          id={id}
          onChange={(newStatus: any, revert: any) =>
            updateContestStatus(id, newStatus, revert)
          } // Update status on switch change
        />
      </div>
    );
  };

  const updateActiveStatus = (id: number | string, newStatus: boolean) => {
    const newData = totalAdminCount.map((contest: any) => {
      if (contest.id === id) {
        return {
          ...contest,
          activeStatus: newStatus,
        };
      }
      return contest;
    });
    setTotalAdminCount(newData);
  };

  const fetchContestList = async (sortDir:string | null, sortBy:string | null) => {
    try {
      let endPoint = API_URL.getAllContests
      if (isCourseAdmin) {
        endPoint = API_URL.getAllContestForCA
      }

      dispatch(setLoading(true));
      var res = null;
      res = await apiService.post<ContestApiResponse>(endPoint, {
        data: {
          searchParams: {
            contestTypeId: selectedContestType || null,
            activeStatus: currentStatus,
            courseName: selectedCourse?.name || null,
            holeNumbers: selectedHoles.length ? selectedHoles : null,
          },
          pageSortingParam: {
            sortDir: sortDir || "DESC",
            sortBy: sortBy || "createdDate",
            pageNumber: currentPage,
            pageSize: pageSize,
          },
        },
      });

      if (res.status === 200 && !res.data.error) {
        setTotalAdminCount(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        setTotalElement(res.data.data.totalElements);
        dispatch(setLoading(false));
      } else {
        ToastInfo(res.data.description || "Error fetching contest data");
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false));
    }
  };

  const updateContestStatus = async (
    id: number,
    status: boolean,
    revert: () => void,
  ) => {
    try {
      dispatch(setLoading(true));
      const newStatus = status;

      const res = await apiService.post<any>(API_URL.updateStatusContest, {
        data: {
          contestId: id,
          activeStatus: newStatus,
        },
      });

      if (res.status === 200 && res.data && !res.data.error) {
        ToastSuccess(res.data.data.message);
        updateActiveStatus(id, newStatus);
      } else {
        ToastInfo(res.data.description || "Error updating contest status");
        revert(); // Revert the switch state on failure
      }
    } catch (error) {
      console.error(error);
      revert(); // Revert the switch state on failure
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (userPermisions?.permission["is_player"]) {
    return (
      <div>
        <ContestList />
      </div>
    );
  } else if (!userPermisions?.permission) {
    return <div className="h-[100vh] bg-[#ffffff]"></div>;
  }

  const statusFilters = {
    "Filter by Status": null,
    Active: true,
    Inactive: false,
  };

  const filterList = [
    { type: "dropdown", filterName: "contest_type", name: "Filter by Contests" },
    {type: "dropdown", filterName: "contestStatus", name: "Filter by Status"},
    {type: "dropdown", filterName: "courseFilter", name: "Filter by Course"},
    {type: "multi-select", filterName: "holesFilter", name: "Filter by Holes"},
  
  ]


  const filterHandler = (filters: any) => {
    console.log(filters, "filters")
    setSelectedContestType(filters.contest_type)
    setCurrentStatus(filters.contestStatus || null)
    handleCoursesChange(filters.courseFilter || null) 
    if(!filters.contestStatus){
      setSelectedHoles('')
    }
    let selectedHoles = ''
    filters?.holesFilter?.map((item:any, index:number)=>{
      selectedHoles += item.id
      if(filters?.holesFilter?.length > index){
        selectedHoles += ','
      }
    })
    setSelectedHoles(selectedHoles)
  }

  return (
    <div
      className="bg-admin-bg-position mb-[24px] min-h-[100vh] bg-white bg-contain bg-fixed bg-no-repeat px-[24px] pb-[24px] md:flex-row"
      style={{ paddingTop: "24px", backgroundImage: `url(${BG})` }}
    >
      <div className="flex-1 md:flex-[0.75] lg:flex-[0.75] xl:flex-[0.75]">
        <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
          <div className="align-center flex justify-between gap-2">
            <select
              id="courses"
              style={{ marginLeft: "5px" }}
              value={String(currentStatus)}
              className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm md:ml-2 md:mt-0 md:w-[200px]"
              onChange={(e) => {
                setCurrentPage(0);
                const value =
                  e.target.value === "true"
                    ? true
                    : e.target.value === "false"
                      ? false
                      : null;
                setCurrentStatus(value);
              }} // Update selected status
            >
              {" "}
              {Object.entries(statusFilters).map(([key, value]) => (
                <option
                  value={String(value)}
                  key={key}
                  onClick={() => setCurrentStatus(value)}
                >
                  {key}
                </option>
              ))}
            </select>
            <select
              id="courses"
              defaultValue={""}
              className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm md:mt-0 md:w-[200px]"
              onChange={(e) => {
                setCurrentPage(0);
                setSelectedContestType(e.target.value);
              }} // Update selected status
            >
              <option value="">Filter by Contests</option>
              {filterByContest.map(
                (filter: { id: number | string; type: string }) => (
                  <option value={filter.id}>{filter.type}</option>
                ),
              )}
            </select>
            <select
              id="courses"
              // onChange={handleCoursesChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm text-gray-900 outline-none md:w-[200px]"
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
                  value: hole.holeNumber.toString(),
                  label: hole ? `Hole #${hole.holeNumber} - Par ${hole.par || ""}` : '',
                })) || []
              }
              maxDisplayCount={2}
              label="Filter by Holes"
              disabled={selectedCourse ? false : true}
              onChange={handleSelectedValuesChange}
              className="py-auto block flex w-full rounded-lg border border-gray-300 bg-gray-100 pl-2 text-sm text-gray-900 outline-none md:w-[200px]"
            />
          </div>
          <button className="ml-auto mr-10 text-[#4169E1]"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            Filter
          </button>
          {!isCourseAdmin && !userPermisions?.permission?.["is_player"] && (
            <button
              className="mb-0 mt-4 flex h-9 gap-2 rounded-md bg-primaryColor px-4 py-2 pb-0 pt-2 text-sm text-white md:mr-2 md:mt-0 md:px-6"
              onClick={() => {
                navigate(ROUTES.CONTESTS, { state: "CREATE_CONTEST" });
              }}
            >
              <Plus height={16} width={16} className="mt-[2px]" /> Create
              Contest
            </button>
          )}
        </div>
        <PageLoader isActive={loader}>
          <TableComponent
            Headers={tableHeaders}
            rowData={rowData}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            pagination={totalPages > 1}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalAdminCount={totalAdminCount}
            totalElement={totalElement}
            elementPerPage={rowData.length}
            handleSorting={fetchContestList}
          />
        </PageLoader>
      </div>

      <FilterPannelDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        filterList={filterList}
        filterHandler={filterHandler}

      >

      </FilterPannelDrawer>

      <ContestModal
        isContestModalOpen={isContestModalOpen}
        setIsContestModalOpn={setIsContestModalOpn}
        contestId={contestId}
        setContestId={setContestId}
        cid={cId}

      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmation"
      >
        <>
          <div className="mb-6 w-full items-center justify-center rounded-bl-lg rounded-br-lg px-6 text-center md:w-[480px]">
            <CircleCheck className="m mx-auto mb-6 h-[38px] w-[38px] rounded-full bg-[#248A3D59] p-2" />
            <p className="text-center">
              Are you sure you want to edit the contest? Editing the contest
              will pause the ongoing contest.
            </p>
          </div>
          <div className="flex w-full items-center justify-end rounded-bl-lg rounded-br-lg border border-gray-200 bg-[#F5F6F7] p-6 md:w-[480px]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mr-5 w-32 rounded-md bg-[#7B7887] py-2 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => {
                setIsModalOpen(false);

                // do here
                if (selectedId) {
                  navigate(
                    ROUTES.UPDFATE_CONTEST.replace(
                      ":id",
                      selectedId.toString(),
                    ),
                    {
                      state: { action: "UPDATE_CONTEST", id: selectedId },
                    },
                  );
                }
              }}
              className="w-32 rounded-md bg-primaryColor py-2 text-white"
            >
              {"OK"}
            </button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default ContestManagement;
