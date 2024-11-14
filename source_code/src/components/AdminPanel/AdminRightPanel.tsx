import { Ban, CircleCheck, Plus, Search } from "lucide-react";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from "react";
import TableComponent from "../TableComponent";
import apiService from "../../services/apiService";
import SwitchComponent from "../SwitchComponent";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import { computeTableHeaders } from "./AddpanalUtils/AddPanelUtils";
import { RootState } from "../../store";
import { ToastError, ToastSuccess } from "../Toast";
import { API_URL } from "../../services/enums";
import { ROUTES } from "../../utils/routesPath";
import { useNavigate } from "react-router-dom";

interface AdminRightPanelProps {
  selectedUserTab: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  openModal: (item: any, roleIds: number) => void;
  handleRefreshUserCount: () => void;
  isCourseAdmin?: boolean;
}

interface PageSortingParam {
  sortDir: "ASC" | "DESC";
  sortBy: string;
  pageNumber?: any;
  pageSize?: any;
}

interface PayloadTypes {
  pageSortingParam?: PageSortingParam;
}

export interface AdminRightPanelHandle {
  getUserData: () => void;
}

const AdminRightPanel = forwardRef<AdminRightPanelHandle, AdminRightPanelProps>(
  (
    {
      openModal,
      selectedUserTab,
      currentPage,
      setCurrentPage,
      handleRefreshUserCount,
      isCourseAdmin = false,
    },
    ref: ForwardedRef<AdminRightPanelHandle>,
  ) => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const userPermisions = useSelector(
      (state: RootState) => state.auth.userPermissions,
    );
    const loader = useSelector((state: RootState) => state.loader.isLoading);
    const [tableHeaders, setTableHeaders] = useState<any>([]);
    const [rowData, setRowData] = useState<Array<any>>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalAdminCount, setTotalAdminCount] = useState<any>([]);
    const [searchString, setSearchString] = useState<string>("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
      getUserData,
    }));

    useEffect(() => {
      getUserData();
      setSearchString("");
    }, [selectedUserTab]);

    useEffect(() => {
      if (searchString.length === 0) {
        if (selectedUserTab === 2 || selectedUserTab === 1) {
          setTotalPages(0);
          const startIndex = currentPage * pageSize;
          const currentItems =
            totalAdminCount?.slice(
              startIndex,
              Number(startIndex) + Number(pageSize),
            ) || [];
          setRowData(computeTableData(currentItems, selectedUserTab));
        } else {
          if (searchString.length === 0 && !loader) {
            getUserData();
          }
        }
      }
    }, [pageSize, currentPage, totalAdminCount, searchString]);

    useEffect(() => {
      if (selectedUserTab === 3) {
        if (searchString.length) {
          handleUserSearch();
        }
      }
    }, [currentPage, pageSize]);

    const handleActiveDeactiveUser = async (value: boolean, userId: any) => {
      dispatch(setLoading(true));
      try {
        let payload = {};
        if (value) {
          payload = {
            selectedUserId: userId,
            activeStatus: "AC",
          };
        } else {
          payload = {
            selectedUserId: userId,
            activeStatus: "DE",
          };
        }
        const { data, status } = await apiService.post<any>(
          API_URL.activeInactiveUser,
          { data: payload },
        );
        if (status === 200 && data?.data != null && !data?.error) {
          getUserData();
          ToastSuccess(data.data.message);
        } else if (data?.error && data.description) {
          ToastError(data.description);
        }
      } catch (error) {
      } finally {
        dispatch(setLoading(false));
      }
    };

    const computeTableData = (Data: Array<any>, selectedUserTab: number) => {
      const userRole =
        selectedUserTab === 1
          ? "Super Admin"
          : selectedUserTab === 2
            ? "Course Admin"
            : "Player";
      return Data.map((item) => {
        const activeStatus = item.activeStatus === "Active";
        return {
          name: computeUserName(
            item.firstName,
            item.lastName,
            item?.userProfile?.imageBase64 || "",
            userRole,
            item.id,
            activeStatus,
          ),
          userName: item.username,
          email: item.email,
          status: statusField(activeStatus, item),
        };
      });
    };

    const getUserData = async () => {
      dispatch(setLoading(true));
      try {
        let payload: PayloadTypes = {};
        let listingEndPoint = API_URL.getAllPlayer;
        if (selectedUserTab === 3) {
          listingEndPoint = API_URL.getAllPlayer;
          setTableHeaders(computeTableHeaders("player"));
          payload.pageSortingParam = {
            sortDir: "ASC",
            sortBy: "username",
            pageNumber: currentPage,
            pageSize: pageSize,
          };
        } else if (selectedUserTab === 2) {
          if (
            isCourseAdmin &&
            userPermisions.data?.permission["is_course_admin"]
          ) {
            listingEndPoint = API_URL.getClubCourseAdmin;
            payload = {
              loginUserId:
                typeof userInfo === "object" && "userId" in userInfo
                  ? userInfo.userId
                  : undefined,
            } as PayloadTypes;
          } else {
            listingEndPoint = API_URL.getAllCourseAdmin;
          }
          setTableHeaders(computeTableHeaders("courseAdmin"));
        } else if (selectedUserTab === 1) {
          listingEndPoint = API_URL.getAllSuperAdmin;
          setTableHeaders(computeTableHeaders("superAdmin"));
        }

        const { data, status } = await apiService.post<any>(listingEndPoint, {
          data: payload,
        });

        if (status === 200 && data?.data != null && !data?.error) {
          setTotalPages(data.data.totalPages);
          if (selectedUserTab === 3) {
            setRowData(computeTableData(data.data.content, selectedUserTab));
          } else {
            setTotalAdminCount(data.data.content);
          }
          handleRefreshUserCount();
        } else if (data?.error && data.description) {
          ToastError(data.description);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    const computeUserName = (
      firstName: string,
      lastName: string,
      image: string,
      role: string,
      id: string,
      activeStatus: boolean,
    ) => {
      return (
        <div
          className={`flex h-[40px] ${activeStatus ? "cursor-pointer" : "cursor-not-allowed"}`}
          onClick={() => {
            if (activeStatus) {
              navigate(ROUTES.PROFILE, { state: { id: id, role: role } });
            }
          }}
        >
          <div className="mr-5 w-10 rounded-md border bg-[#ebf0fa]">
            {image ? (
              <img
                src={`data:image/png;base64,${image}`}
                alt=""
                className="h-10 w-10 rounded-md"
              />
            ) : null}
          </div>
          <div className="flex flex-col text-sm text-gray-500">
            <div
              className={`text-md text-lime-500 ${firstName && lastName ? "visible" : "invisible"}`}
            >
              {firstName || "dsds"} {lastName || "sdd"}
            </div>
            <div>{role}</div>
          </div>
        </div>
      );
    };

    const statusField = (activeStatus: boolean, item: any) => {
      return (
        <>
          {isCourseAdmin ? (
            getStatus(activeStatus ? "Active" : "Inactive")
          ) : (
            <div className="flex gap-4">
              <SwitchComponent
                isChecked={activeStatus}
                id={item.id}
                onChange={(value) => handleActiveDeactiveUser(value, item.id)}
              />
            </div>
          )}
        </>
      );
    };

    const getStatus = (status: string) => {
      if (status == "Inactive") {
        return (
          <div className="flex h-7 w-3/4 items-center justify-center space-x-2 rounded-md bg-[#D0D0D033] py-1 text-[#8E8E8E]">
            <Ban height={15} width={15} />
            <span className="text-xs">{status}</span>
          </div>
        );
      }
      if (status == "Active") {
        return (
          <div className="flex h-7 w-3/4 items-center justify-center space-x-2 rounded-md bg-[#97D0A533] py-1 text-[#248A3D]">
            <CircleCheck height={15} width={15} />
            <span className="text-xs">{status}</span>
          </div>
        );
      }
    };

    const computeSearchPlaceholder = () => {
      if (selectedUserTab == 1) {
        return "Search Super Admin";
      } else if (selectedUserTab == 2) {
        return "Search Course Admin";
      } else {
        return "Search Player";
      }
    };

    const getPlayer = async () => {
      dispatch(setLoading(true));
      try {
        const payload = {
          username: searchString,
          firstName: searchString,
          lastName: searchString,
        };

        const { data, status } = await apiService.post<any>(
          API_URL.searchAllPlayer,
          {
            data: {
              searchParams: payload,
              pageSortingParam: {
                sortDir: "ASC",
                sortBy: "username",
                pageNumber: currentPage,
                pageSize: pageSize,
              },
            },
          },
        );
        if (status === 200 && data?.data != null && !data?.error) {
          setRowData(
            computeTableData(data?.data?.content || [], selectedUserTab),
          );
          setTotalPages(data.data.totalPages);
        } else if (data?.error && data.description) {
          ToastError(data.description);
          setRowData([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
      if (!searchString) {
      }
    };

    const handleUserSearch = () => {
      if (selectedUserTab === 3) {
        if (searchString) {
          getPlayer();
        } else {
          getUserData();
        }
      } else {
        try {
          dispatch(setLoading(true));
          const lowercasedTerm = searchString.toLowerCase();
          const searchedData = totalAdminCount.filter(
            (user: any) =>
              user.firstName?.toLowerCase().includes(lowercasedTerm) ||
              user.lastName?.toLowerCase().includes(lowercasedTerm) ||
              user.username?.toLowerCase().includes(lowercasedTerm),
          );
          if (searchedData && searchedData.length) {
            const startIndex = currentPage * pageSize;
            const currentItems =
              searchedData?.slice(
                startIndex,
                Number(startIndex) + Number(pageSize),
              ) || [];
            setTotalPages(Math.ceil(searchedData.length / pageSize));
            setRowData(computeTableData(currentItems, selectedUserTab));
          } else {
            if (selectedUserTab === 2) {
              setRowData([]);
              ToastError("Sorry, no course admin matches your search criteria");
            } else if (selectedUserTab === 1) {
              setRowData([]);
              ToastError("Sorry, no super admin matches your search criteria");
            }
          }
        } catch (error) {
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    return (
      <div className="flex-1 px-4 md:flex-[0.75] md:px-8 lg:flex-[0.75] xl:flex-[0.75]">
        <div className="mb-4 flex flex-col justify-between md:flex-row">
          <div className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2 md:ml-2 md:mt-0 md:w-[320px]">
            <input
              className="w-full bg-gray-100 pl-2 focus:outline-none"
              type="text"
              value={searchString}
              onChange={(event) => {
                setSearchString(event.target.value);
              }}
              placeholder={computeSearchPlaceholder()}
              maxLength={100}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUserSearch();
                }
              }}
            />
            <Search
              size={20}
              color="gray"
              onClick={() => {
                handleUserSearch();
              }}
            />
          </div>
          {!isCourseAdmin && selectedUserTab != 3 && (
            <button
              className="mt-4 flex gap-2 rounded-md bg-lime-500 px-4 py-2 text-white md:mr-2 md:mt-0 md:px-6"
              onClick={() => openModal("", 0)}
            >
              <Plus /> {selectedUserTab === 2 ? "Course Admin" : "Super Admin"}
            </button>
          )}
        </div>
        {/* <PageLoader isActive={loader}> */}
        <TableComponent
          Headers={tableHeaders}
          rowData={rowData}
          currentPage={currentPage}
          totalPages={
            selectedUserTab == 3
              ? totalPages
              : searchString
                ? totalPages
                : Math.ceil(totalAdminCount.length / Number(pageSize))
          }
          pagination={
            selectedUserTab == 3 || searchString
              ? totalPages > 1
              : totalAdminCount.length / Number(pageSize) > 1
          }
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalAdminCount={totalAdminCount}
        />
        {/* </PageLoader> */}
      </div>
    );
  },
);

export default React.memo(AdminRightPanel);
