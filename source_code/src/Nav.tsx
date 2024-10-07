import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import aceCampLogo from "./assets/images/aceCamp_logo.png";
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
import { clearAllSelectedContests } from "./reducers/Courses_data/courses";

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const profileImage =
    useSelector((state: RootState) => state.profiler.profileImage) || "";
  const location = useLocation();
  const data = useSelector(
    (state: RootState) => state.permissions.userPermissions,
  );

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
  }, []);
  const menuList = data?.data?.menuList;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(true);
  const [usersSubMenu, setUsersSubMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null,
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNav = () => {
    setNavCollapsed(!navCollapsed);
  };

  // const handleMenuClick = (menuName: string) => {
  //   setSelectedMenu(menuName);
  //   setUsersSubMenu(!usersSubMenu);
  // };

  const handleMenuClick = (menuName: string, routeUrl: string) => {
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

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow dark:bg-gray-900">
      <div className="relative flex w-full items-center justify-between px-2 pt-1">
        <div className="align-center flex h-full justify-center">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={aceCampLogo} alt="Ace Camp Logo" className="h-16 w-16" />
          </a>
        </div>
        <div className="flex items-center justify-between md:w-full">
          <div
            className={`${
              navCollapsed ? "hidden" : ""
            } absolute right-0 top-12 w-full items-center justify-end md:static md:order-2 md:flex md:justify-center`}
            id="navbar-user"
          >
            <ul className="mt-8 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-xs font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              {menuList?.map((menu: any) => (
                <li
                  key={menu.name}
                  className={`w-15 ${
                    selectedMenu === menu.name
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
                        className={`flex items-center rounded px-3 py-2 text-center md:flex-col md:p-0 ${
                          selectedMenu === menu.name
                            ? "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" // Background unchanged
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
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
                          size: 32,
                          color:
                            menu.routeUrl === location.pathname
                              ? // ||selectedMenu === menu.name
                                "#95c11e"
                              : "#7b7887", // Change icon color
                        })}
                        <span
                          style={{
                            color:
                              menu.routeUrl === location.pathname
                                ? // || selectedMenu === menu.name
                                  "#95c11e"
                                : "#7b7887",
                          }}
                          className={`px-2 pb-2 md:px-0`}
                        >
                          {menu.name}
                        </span>
                        {menu.routeUrl === location.pathname && (
                          //  ||  selectedMenu === menu.name
                          <div className="w-full border-b-2 border-[#95c11e]" />
                        )}
                        {/* sub menu for user */}
                        {selectedMenu === menu.name && dropdownOpen && (
                          <div
                            className="absolute right-6 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                            id="user-dropdown"
                          >
                            <div className="px-4 py-3">
                              <span className="block text-sm text-gray-900 dark:text-white">
                                Bonnie Green
                              </span>
                              <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                                name@flowbite.com
                              </span>
                            </div>
                            <ul
                              className="py-2"
                              aria-labelledby="user-menu-button"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Dashboard
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Settings
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Earnings
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => {
                                    dispatch(loginUserDetails({}));
                                    dispatch(logout());
                                  }}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
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
            <button
              type="button"
              className="flex overflow-hidden rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              {profileImage ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={`data:image/png;base64,${profileImage}`}
                  alt="user photo"
                />
              ) : (
                <img src={defaultUserImage} alt="" className="h-8 w-8" />
              )}
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-6 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Bonnie Green
                  </span>
                  <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                    name@flowbite.com
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
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        dispatch(loginUserDetails({}));
                        dispatch(logout());
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
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
