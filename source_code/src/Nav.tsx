import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import aceCampLogo from "./assets/images/Logo_new.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./reducers/login/login";
import { RootState } from "./store";
import { getIconComponent } from "./utils/iconUtils";
import NavUserMenu from "./NavUserMenu";
import { ROUTES } from "./utils/routesPath";
import apiService from "./services/apiService";
import { API_URL } from "./services/enums";
import { loginUserDetails } from "./reducers/permissions/permissions";
import { setLoading } from "./reducers/loader/loader";
import defaultUserImage from "./assets/images/default-user 1.png";
import BreadCumModal from "./components/Contests/Contest Components/BreadCumModal";
import {
  clearAllSelectedContests,
  resetCourseState,
} from "./reducers/Courses_data/courses";
import { ToastInfo } from "./components/Toast";
import {
  updateProfile,
  updateProfileImage,
} from "./reducers/Profiler/profiler";
import { Bell, ChevronDown, Dot } from "lucide-react";
import { Popover } from "./components/GenericUIcomponents/PopoverComponent";
import NotificationPopoverComponent from "./components/Notification/NotificationComponent";
import { timeZone } from "./utils/TimeUtils";
import { setPaymentSuccess } from "./reducers/Payment/Payment";

type Notification = {
  id: number;
  userId: number;
  message: string;
  isRead: boolean;
  readAt: string;
  createdDate: string;
};

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const paymentSucess = useSelector(
    (state: RootState) => state.payment.paymentSuccess,
  );

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  const profileImage =
    useSelector((state: RootState) => state.profiler.profileImage) || "";
  const profiledetails =
    useSelector((state: RootState) => state.profiler.profile) || "";
  const location = useLocation();
  const data = useSelector(
    (state: RootState) => state.permissions.userPermissions,
  );

  const menuList = data?.data?.menuList;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [usersSubMenu, setUsersSubMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );
  const [notficationList, setNotificationList] = useState<Array<any>>([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNav = () => {
    setNavCollapsed(!navCollapsed);
  };

  const getUserRole = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(loginUserDetails({}));

      const data = await apiService.post<any>(API_URL.getUserRole, {
        data: {
          profileUserId:
            typeof userInfo === "object" ? userInfo.userId : undefined,
        },
      });
      if (data.status === 200 && !data.data.error) {
        dispatch(loginUserDetails(data.data));
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  useEffect(() => {
    getUserRole();
    fetchUserInformation();
  }, []);
  // const handleMenuClick = (menuName: string) => {
  //   setSelectedMenu(menuName);
  //   setUsersSubMenu(!usersSubMenu);
  // };

  const handleMenuClick = (menuName: string, routeUrl: string) => {
    if (paymentSucess) {
      dispatch(setPaymentSuccess(false));
    }

    // Check if the current path is "/checkout"
    if (location.pathname === ROUTES.CHECKOUT) {
      // If on checkout page, store the pending navigation and show modal
      setSelectedMenu(menuName);
      setPendingNavigation(routeUrl);
      setModalOpen(true); // Open the modal
    } else {
      // If not on checkout page, navigate directly
      setUsersSubMenu(!usersSubMenu);
      navigate(routeUrl);
    }
  };

  const handleModalClose = (confirm: boolean) => {
    if (confirm && pendingNavigation) {
      dispatch(clearAllSelectedContests()); // Dispatch the action to clear selected contests
      navigate(pendingNavigation); // Navigate to the pending route
    }
    setModalOpen(false); // Close the modal
    setPendingNavigation(null); // Reset pending navigation
  };

  const fetchUserInformation = async () => {
    try {
      dispatch(setLoading(true));
      const { data, status } = await apiService.post<any>(
        API_URL.fetchUserProfile,
        {
          data: {
            loginUserId:
              typeof userInfo === "object" ? userInfo.userId : undefined,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        const profileImage = data?.data?.userProfile?.imageBase64;
        dispatch(updateProfileImage({ profileImage }));
        dispatch(updateProfile({ profiler: data.data }));
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    // Add event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getAllNotification();
  }, [location.pathname]);

  function countUnreadNotifications(notifications: Notification[]): number {
    return notifications.filter((notification) => !notification.isRead).length;
  }

  const getAllNotification = async () => {
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.getAllNotification,
        {
          data: {
            playerId:
              typeof userInfo === "object" ? userInfo.userId : undefined,
            zoneId: timeZone,
          },
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setNotificationList(data?.data);
      } else if (data?.error && data.description) {
        ToastInfo(data.description);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const isContestsRoute = (pathname: string): boolean => {
    const contestsRegex = /^\/contests\/\d+$/;
    return contestsRegex.test(pathname);
  };

  return (
    <nav className="h-[56px] w-full border-b border-gray-200 bg-white shadow">
      <div className="relative flex h-full w-full items-center justify-between px-2 pt-1">
        <div className="align-center flex h-full justify-center">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={aceCampLogo} alt="Ace Camp Logo" className="h-[56px] w-[82px]" />
          </a>
        </div>
        <div className="flex items-center justify-between md:h-full md:w-full">
          <div
            className={`${navCollapsed ? "hidden" : ""
              } absolute right-0 top-12 w-full items-center justify-end md:static md:order-2 md:flex md:h-full md:justify-center`}
            id="navbar-user"
          >
            <ul className="mt-8 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-xs font-medium md:mt-0 md:h-full md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
              {menuList?.map((menu: any) => (
                <li
                  key={menu.name}
                  className={`w-15 h-full px-2 ${selectedMenu === menu.name
                    ? "text-grayu-600" // Keep background unchanged
                    : "text-gray-600"
                    }`}
                >
                  {menu.subMenus !== null ? (
                    <div className="relative">
                      <NavUserMenu
                        selectedMenu={selectedMenu || ""}
                        menu={menu}
                        // handleMenuClick={handleMenuClick}
                        handleMenuClick={(name: string) =>
                          handleMenuClick(name, menu.routeUrl)
                        }
                        usersSubMenu={usersSubMenu}
                      />
                    </div>
                  ) : (
                    <>
                      <Link
                        to={menu.routeUrl}
                        className={`flex h-full items-center justify-center rounded px-3 md:flex-col md:justify-end md:p-0 ${selectedMenu === menu.name
                          ? "" // Background unchanged
                          : ""
                          }`}
                        // onClick={() => handleMenuClick(menu.name)}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent immediate navigation
                          handleMenuClick(menu.name, menu.routeUrl);
                        }}
                      >
                        {getIconComponent({
                          strokeWidth: 1,
                          name: menu.name,
                          size: 18,
                          color:
                            menu.routeUrl === location.pathname
                              ? // ||selectedMenu === menu.name
                              "#046221"
                              : location.pathname.startsWith(menu.routeUrl) &&
                                isContestsRoute(location.pathname)
                                ? "#046221"
                                : "#1D1A0C", // Change icon color
                        })}
                        <span
                          style={{
                            color:
                              menu.routeUrl === location.pathname
                                ? // || selectedMenu === menu.name
                                "#046221"
                                : location.pathname.startsWith(menu.routeUrl) &&
                                  isContestsRoute(location.pathname)
                                  ? "#046221"
                                  : "#1D1A0C",
                          }}
                          className={`px-2 text-[12px] md:mb-[6px] md:mt-[5px] md:px-0`}
                        >
                          {menu.name}
                        </span>
                        {menu.routeUrl === location.pathname && (
                          //  ||  selectedMenu === menu.name
                          <div className="w-[110%] border-b-2 border-primaryColor text-[#1D1A0C]" />
                        )}
                        {location.pathname.startsWith(menu.routeUrl) &&
                          isContestsRoute(location.pathname) && (
                            <div className="w-[110%] border-b-2 border-primaryColor text-[#1D1A0C]" />
                          )}
                        {/* sub menu for user */}
                        {selectedMenu === menu.name && dropdownOpen && (
                          <div
                            className="absolute right-6 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white shadow"
                            id="user-dropdown"
                          >
                            <div className="cursor-pointer px-4 py-3">
                              <span className="block cursor-pointer text-sm text-gray-900">
                                {profiledetails.firstName}{" "}
                                {profiledetails.lastName}
                              </span>
                              <span className="block cursor-pointer truncate text-sm text-gray-500">
                                {profiledetails.email}
                              </span>
                            </div>
                            <ul
                              className="py-2"
                              aria-labelledby="user-menu-button"
                            >
                              <li>
                                <a
                                  onClick={() => {
                                    // dispatch(loginUserDetails({}));
                                    dispatch(resetCourseState());
                                    dispatch(logout());
                                    navigate(ROUTES.LOGIN, { replace: true });
                                    // localStorage.clear();
                                  }}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Sign out
                                </a>
                              </li>
                            </ul>
                          </div>
                        )}
                      </Link>
                    </>
                  )}
                </li>
              ))}{" "}
            </ul>
          </div>
          <div className="flex items-center space-x-3 md:order-3 rtl:space-x-reverse">
            <div className="relative mt-[7px]">
              {userPermisions?.data?.permission["is_player"] ? (
                <Popover
                  content={
                    <NotificationPopoverComponent
                      notficationList={notficationList}
                      getAllNotification={getAllNotification}
                    />
                  }
                  position="bottom-left"
                  className="mt-7 rounded-md border border-[#04622133]"
                >
                  {countUnreadNotifications(notficationList || []) ? (
                    <span className="absolute -right-[2px] -top-[4px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {countUnreadNotifications(notficationList || [])}
                    </span>
                  ) : null}
                  <Bell
                    color="#7b7887"
                    className="cursor-pointer"
                    strokeWidth={2}
                  />
                </Popover>
              ) : null}
            </div>
            <button
              type="button"
              className="flex items-center justify-center "
              onClick={toggleDropdown}
              style={{ width: "max-content" }}
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex overflow-hidden rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0">
                {profileImage ? (
                  <div className="h-10 w-10 object-contain">
                    <img
                      className="w-full rounded-full"
                      src={`data:image/png;base64,${profileImage}`}
                      alt="user photo"
                    />
                  </div>
                ) : (
                  <div className="w-10">
                    <img src={defaultUserImage} alt="" className="w-full" />
                  </div>
                )}
              </div>
              <div className="mx-4">
                <div className="flex">
                  {profiledetails?.firstName || ""}{" "}
                  {profiledetails?.lastName || ""}
                </div>
                {userPermisions?.data?.permission["is_player"] ? (
                  <div className="flex items-center justify-center text-[#7B7887]">
                    <span className="text-[12px]">
                      HDCP: {profiledetails?.userProfile?.handicap}
                    </span>
                    <Dot className="mx-[-4px]" />
                    <span className="text-[12px]">
                      GHIN: {profiledetails?.userProfile?.ghin}
                    </span>
                  </div>
                ) : null}
              </div>
              <ChevronDown size={24} color="#1D1A0C" />
            </button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-6 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white shadow"
                id="user-dropdown"
              >
                <div className="cursor-pointer px-4 py-3">
                  <span className="block cursor-pointer text-sm text-gray-900">
                    {profiledetails.firstName} {profiledetails.lastName}
                  </span>
                  <span className="block cursor-pointer truncate text-sm text-gray-500">
                    {profiledetails.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      onClick={() => {
                        navigate(ROUTES.PROFILE);
                        setDropdownOpen(false);
                      }}
                      to={ROUTES.PROFILE}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <a
                      onClick={() => {
                        // localStorage.clear();
                        // window.location.reload();
                        // dispatch(loginUserDetails({}));
                        dispatch(resetCourseState());
                        dispatch(logout());
                        navigate(ROUTES.LOGIN, { replace: true });
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={!navCollapsed}
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <BreadCumModal
        isOpen={modalOpen}
        onClose={() => handleModalClose(false)}
        onLeave={() => handleModalClose(true)}
      />
    </nav>
  );
};

export default Nav;
