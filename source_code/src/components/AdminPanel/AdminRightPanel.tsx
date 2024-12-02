import { Ban, CircleCheck, Plus, Search } from "lucide-react";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  useCallback,
  useRef,
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
import { debounceFunc } from "../../utils/debounce-utils";

interface AdminRightPanelProps {
  selectedUserTab: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  openModal: (item: any, roleIds: number) => void;
  handleRefreshUserCount: (count?: number, searchFlag?: boolean) => void;
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
  searchParams?: any;
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
    const [tableHeaders, setTableHeaders] = useState<any>([]);
    const [rowData, setRowData] = useState<Array<any>>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchString, setSearchString] = useState<string>("");
    const [totalElement, setTotalElement] = useState<number>(10);
    const navigate = useNavigate();

    const isMounted = useRef<boolean>(false);

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
      getUserData,
    }));

    useEffect(() => {
      if (isMounted.current) {
        getUserData();
      } else {
        isMounted.current = true;
      }
      setSearchString("");
    }, [selectedUserTab]);

    useEffect(() => {
      if (searchString.length) {
        getUserData(searchString);
      } else {
        getUserData();
      }
    }, [currentPage]);

    const handleActiveDeactiveUser = async (
      value: boolean,
      userId: any,
      revert: () => void,
    ) => {
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
          revert();
        }
      } catch (error) {
        revert();
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
        const activeStatus = item.activeStatus;
        return {
          name: computeUserName(
            item.firstName,
            item.lastName,
            item?.imageUrl || "",
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

    const getUserData = useCallback(
      async (searchValue?: string) => {
        dispatch(setLoading(true));
        try {
          let payload: PayloadTypes = {};
          let listingEndPoint = API_URL.getAllPlayer;
          if (selectedUserTab === 3) {
            listingEndPoint = API_URL.getAllPlayer;
            setTableHeaders(computeTableHeaders("player"));
            payload.pageSortingParam = {
              sortDir: "DESC",
              sortBy: "createdDate",
              pageNumber: currentPage,
              pageSize: pageSize,
            };

            if (searchValue) {
              payload.searchParams = {
                username: searchValue,
                firstName: searchValue,
                lastName: searchValue,
              };
            }
          } else if (selectedUserTab === 2) {
            if (
              isCourseAdmin &&
              userPermisions.data?.permission?.["is_course_admin"]
            ) {
              listingEndPoint = API_URL.getClubCourseAdmin;
              payload = {
                loginUserId:
                  typeof userInfo === "object" && "userId" in userInfo
                    ? userInfo.userId
                    : undefined,
              } as PayloadTypes;
              payload.pageSortingParam = {
                sortDir: "DESC",
                sortBy: "createdDate",
                pageNumber: currentPage,
                pageSize: pageSize,
              };
              payload.searchParams = {};
              if (searchValue) {
                payload.searchParams = {
                  username: searchValue,
                  firstName: searchValue,
                  lastName: searchValue,
                };
              }
            } else {
              listingEndPoint = API_URL.getAllCourseAdmin;
              payload.pageSortingParam = {
                sortDir: "DESC",
                sortBy: "createdDate",
                pageNumber: currentPage,
                pageSize: pageSize,
              };
              if (searchValue) {
                payload.searchParams = {
                  username: searchValue,
                  firstName: searchValue,
                  lastName: searchValue,
                };
              }
            }
            setTableHeaders(computeTableHeaders("courseAdmin"));
          } else if (selectedUserTab === 1) {
            listingEndPoint = API_URL.getAllSuperAdmin;
            setTableHeaders(computeTableHeaders("superAdmin"));
            payload.pageSortingParam = {
              sortDir: "DESC",
              sortBy: "createdDate",
              pageNumber: currentPage,
              pageSize: pageSize,
            };
            if (searchValue) {
              payload.searchParams = {
                username: searchValue,
                firstName: searchValue,
                lastName: searchValue,
              };
            }
          }

          const { data, status } = await apiService.post<any>(listingEndPoint, {
            data: payload,
          });

          if (status === 200 && data?.data != null && !data?.error) {
            setTotalPages(data.data.totalPages);
            setTotalElement(data.data.totalElements);
            setRowData(computeTableData(data.data.content, selectedUserTab));
            if (searchValue) {
              handleRefreshUserCount(data.data.totalElements, true);
            } else {
              handleRefreshUserCount();
            }
          } else if (data?.error && data.description) {
            setRowData([]);
            setTotalPages(0);
            ToastError(data.description);
            handleRefreshUserCount(0, true);
          }
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      [
        selectedUserTab,
        currentPage,
        pageSize,
        handleRefreshUserCount,
        dispatch,
      ],
    );

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
              <img src={image} alt="" className="h-10 w-10 rounded-md" />
            ) : null}
          </div>
          <div className="flex flex-col text-sm text-gray-500">
            <div
              className={`text-md text-primaryColor ${firstName && lastName ? "visible" : "invisible"}`}
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
                onChange={(value, revert: any) =>
                  handleActiveDeactiveUser(value, item.id, revert)
                }
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

    const handleUserSearch = (value: string) => {
      getUserData(value);
    };

    const debouncedGetPlayer = useCallback(
      debounceFunc(
        (value: React.ChangeEvent<HTMLInputElement>) =>
          getUserData(value.target.value),
        1000,
      ),
      [selectedUserTab],
    );

    return (
      <div className="flex-1  md:flex-[0.75] pl-[24px] lg:flex-[0.75] xl:flex-[0.75]">
        <div className=" flex flex-col justify-between md:flex-row">
          <div className="align-center mt-5 flex w-full justify-between rounded-md border border-gray-300 bg-gray-100 px-4 py-2  md:mt-0 md:w-[320px]">
            <input
              className="w-full bg-gray-100 pl-2 focus:outline-none"
              type="text"
              value={searchString}
              onChange={(e) => {
                debouncedGetPlayer(e);
                setCurrentPage(0);
                setSearchString(e.target.value);
              }}
              placeholder={computeSearchPlaceholder()}
              maxLength={100}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUserSearch(searchString);
                }
              }}
            />
            <Search
              size={20}
              color="gray"
              onClick={() => {
                handleUserSearch(searchString);
              }}
            />
          </div>
          {!isCourseAdmin && selectedUserTab != 3 && (
            <button
              className="mt-4 flex gap-2 rounded-md bg-primaryColor px-4 py-2 text-white md:mt-0 md:px-6"
              onClick={() => openModal("", 0)}
            >
              <Plus /> {selectedUserTab === 2 ? "Course Admin" : "Super Admin"}
            </button>
          )}
        </div>
        <TableComponent
          Headers={tableHeaders}
          rowData={rowData}
          currentPage={currentPage}
          totalPages={totalPages}
          pagination={totalPages > 1}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalElement={totalElement}
          elementPerPage={rowData.length}
        />
      </div>
    );
  },
);

export default React.memo(AdminRightPanel);
