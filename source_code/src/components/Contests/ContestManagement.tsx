import { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import { Ban, CircleCheck, Eye, Plus, SquarePen } from "lucide-react";
import PageLoader from "../PageLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import SwitchComponent from "../SwitchComponent";
import BG from "../../assets/images/dashboardBG.svg";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { ToastError, ToastSuccess } from "../Toast";
import { MdSportsGolf } from "react-icons/md";

import Modal from "../ModalComponent";
import { ROUTES } from "../../utils/routesPath";
import { useNavigate } from "react-router-dom";
import ContestList from "../../pages/ContestList";

const tableHeaders = [
  { id: 1, key: "Contest Type", field: "Contest Type" },
  { id: 2, key: "Club name", field: "Club name" },
  { id: 3, key: "Course Name", field: "Course Name" },
  { id: 4, key: "Hole number", field: "Hole number" },
  { id: 5, key: "Tee", field: "Tee" },
  { id: 6, key: "Entry fee", field: "Entry fee" },
  { id: 7, key: "Status", field: "Status" },
  { id: 8, key: "Actions", field: "Actions" },
];

const ContestManagement = () => {
  const navigate = useNavigate();

  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );

  const isCourseAdmin = userPermisions.data?.permission["is_course_admin"];
  const [rowData, setRowData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const [totalAdminCount, setTotalAdminCount] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [currentStatus, setCurrentStatus] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedId, setSetselectedId] = useState<number | null>(null);

  const loader = useSelector((state: RootState) => state.loader.isLoading);

  interface ContestApiResponse {
    description: string | null;
    display: boolean;
    error: boolean;
    data: any;
  }

  useEffect(() => {
    fetchContestList(currentStatus);
  }, [currentStatus]);

  useEffect(() => {
    computePagination();
  }, [pageSize, currentPage, totalAdminCount]);

  const computePagination = async () => {
    const startIndex = (await currentPage) * pageSize;
    const currentItems =
      (await totalAdminCount?.slice(
        startIndex,
        Number(startIndex) + Number(pageSize),
      )) || [];
    const tableData = await computeTableData(currentItems);
    setRowData(tableData);
  };

  const getStatus = (status: string) => {
    if (status == "Active") {
      return (
        <div className="flex w-3/4 items-center justify-center space-x-1 rounded-md bg-[#FD8A0233] py-0.5 text-[#FD8A02]">
          <MdSportsGolf className="size-5" />
          <span className="text-xs">{status}</span>
        </div>
      );
    }
    if (status == "Inactive") {
      return (
        <div className="flex w-3/4 items-center justify-center space-x-1 rounded-md bg-[#D0D0D033] py-1 text-[#8E8E8E]">
          <Ban height={15} width={15} />
          <span className="text-xs">{status}</span>
        </div>
      );
    }
    if (status == "Completed") {
      return (
        <div className="flex w-3/4 items-center justify-center space-x-1 rounded-md bg-[#97D0A533] py-1 text-[#248A3D]">
          <CircleCheck height={15} width={15} />
          <span className="text-xs">{status}</span>
        </div>
      );
    }
  };

  const computeTableData = (fetchedData: any) => {
    const data = fetchedData?.map((contest: any) => ({
      "Contest Type": getContestType(contest.contestType),
      "Club name": contest.club.name || "N/A",
      "Course Name": contest.course.courseName || "N/A",
      "Hole number": contest.hole.holeNumber || "N/A",
      Tee: contest.tee.teeName || "N/A",
      "Entry fee": "$" + contest.entryFee || "N/A",
      Status: getStatus(contest.activeStatus),
      Actions: isCourseAdmin ? (
        <button
          className="text-[#0077B6]"
          onClick={() => {
            navigate(
              `${ROUTES.UPDFATE_CONTEST.replace(":id", contest.id?.toString())}`,
            );
          }}
        >
          <Eye className="w-5" />
        </button>
      ) : (
        isCompleted(contest.activeStatus, contest.id)
      ),
    }));
    return data;
  };

  const isCompleted = (status: string, id: number) => {
    return (
      <div className="flex w-[70%] justify-between gap-2 py-2">
        <button style={{ color: "#95c11e" }}>
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
        <SwitchComponent
          isChecked={status === "Active"}
          id={id}
          onChange={(status: boolean) => updateContestStatus(id, status)} // Update status on switch change
        />
      </div>
    );
  };

  const getContestType = (contest: string) => {
    if (contest == "ACE_CAM_JACKPOT") {
      return "AceCam-Jackpot";
    }
    if (contest == "CLOSEST_TO_THE_PIN") {
      return "Closest-to-the-Pin";
    }
  };

  const updateActiveStatus = (id: number | string, newStatus: string) => {
    const status = newStatus === "AC" ? "Active" : "Inactive";
    const newData = totalAdminCount.map((contest: any) => {
      if (contest.id === id) {
        return {
          ...contest,
          activeStatus: status,
        };
      }
      return contest;
    });
    setTotalAdminCount(newData);
  };

  const fetchContestList = async (status: any) => {
    try {
      var res = null;
      if (status == "All Contests") {
        res = await apiService.post<ContestApiResponse>(
          API_URL.getAllContests,
          { data: { activeStatus: null } },
        );
      } else {
        res = await apiService.post<ContestApiResponse>(
          API_URL.getAllContests,
          { data: { activeStatus: status } },
        );
      }

      if (res.status === 200 && !res.data.error) {
        setTotalAdminCount(res.data.data);
        computePagination();
      } else {
        ToastError(res.data.description || "Error fetching contest data");
      }
    } catch (error) {
      ToastError("Error fetching contest data");
    }
  };

  const mapStatusToBackend = (status: boolean) => {
    if (status) {
      return "AC"; // Backend expects 'DE' for Inactive
    } else {
      return "DE"; // Backend expects 'AC' for Active
    }
  };

  const updateContestStatus = async (id: number, status: boolean) => {
    try {
      // Map the current status to the backend code

      const newStatus = mapStatusToBackend(status);

      const res = await apiService.post<any>(
        API_URL.updateStatusContest,

        {
          data: {
            contestId: id,
            activeStatus: newStatus,
          },
        }, // Send backend code (DE/AC)
      );

      if (res.status === 200 && res?.data != null && !res?.data.error) {
        ToastSuccess(res.data.data.message);
        updateActiveStatus(id, newStatus);
      } else if (res?.data.error && res.data.description) {
        ToastError(res.data.description || "Error updating contest status");
      }
    } catch (error) {
      ToastError("Error updating contest status");
    }
  };
  if (userPermisions?.data?.permission["is_player"]) {
    return (
      <div>
        <ContestList />
      </div>
    );
  }

  return (
    <div
      className="bg-admin-bg-position h-full bg-white bg-contain bg-fixed bg-no-repeat pt-10 md:flex-row"
      style={{ paddingTop: "20px", backgroundImage: `url(${BG})` }}
    >
      <div className="flex-1 px-4 md:flex-[0.75] md:px-8 lg:flex-[0.75] xl:flex-[0.75]">
        <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
          <div className="align-center flex justify-between">
            <select
              id="courses"
              style={{ marginLeft: "5px" }}
              className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:ml-2 md:mt-0 md:w-[320px]"
              onChange={(e) => {
                setCurrentPage(0);
                setCurrentStatus(e.target.value);
              }} // Update selected status
            >
              <option value="All Contests" selected>
                All Contests
              </option>
              <option value="DE">Inactive</option>
              <option value="AC">Active</option>
              <option value="CP">Completed</option>
            </select>
          </div>
          {!isCourseAdmin && !userPermisions?.data?.permission["is_player"] && (
            <button
              className="mb-0 mt-4 flex h-9 gap-2 rounded-md bg-[#95c11e] px-4 py-2 pb-0 pt-2 text-sm text-white md:mr-2 md:mt-0 md:px-6"
              onClick={() => {
                navigate(ROUTES.CREATE_CONTEST);
              }}
            >
              <Plus height={18} width={18} /> Create Contest
            </button>
          )}
        </div>
        <PageLoader isActive={loader}>
          <TableComponent
            Headers={tableHeaders}
            rowData={rowData}
            currentPage={currentPage}
            totalPages={Math.ceil(totalAdminCount.length / Number(pageSize))}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalAdminCount={totalAdminCount}
          />
        </PageLoader>
      </div>

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
                    `${ROUTES.UPDFATE_CONTEST.replace(":id", selectedId?.toString())}`,
                  );
                }
              }}
              className="w-32 rounded-md bg-[#95c11e] py-2 text-white"
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
