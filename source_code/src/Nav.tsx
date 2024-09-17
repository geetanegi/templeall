import React, { useState } from "react";
import { House, Trophy, TvMinimalPlay, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "./utils/routesPath";
import aceCampLogo from "./assets/images/aceCamp_logo.png";
import { useDispatch } from "react-redux";
import { logout } from "./reducers/login/login";
const Nav: React.FC = () => {
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNav = () => {
    setNavCollapsed(!navCollapsed);
  };
  return (
    <nav className="w-full border-gray-200 bg-white shadow dark:bg-gray-900">
      <div className="relative flex w-full items-center justify-between p-4">
        <div className="align-center flex h-full justify-center">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={aceCampLogo} alt="" className="h-16 w-16" />
          </a>
        </div>
        <div className="flex items-center justify-between md:w-3/4">
          <div
            className={` ${navCollapsed ? "hidden" : ""
              } absolute right-0 top-12 w-full items-center justify-end md:static md:order-2 md:flex md:justify-center`}
            id="navbar-user"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
              <li className="">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="flex items-center rounded bg-blue-700 px-3 py-2 text-center text-white md:flex-col md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
                >
                  <House className="mx-1" />
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex items-center rounded px-3 py-2 text-center text-gray-900 hover:bg-gray-100 md:flex-col md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  <UserRound className="mx-1" />
                  PLAYER PROFILE
                </Link>
              </li>
              <li>
                <Link
                  to="/jackpot"
                  className="flex items-center rounded px-3 py-2 text-center text-gray-900 hover:bg-gray-100 md:flex-col md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  <UserRound className="mx-1" />
                  JACKPOT TRAKER
                </Link>
              </li>
              <li>
                <Link
                  to="/bet-centeral"
                  className="flex items-center rounded px-3 py-2 text-center text-gray-900 hover:bg-gray-100 md:flex-col md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  <TvMinimalPlay className="mx-1" />
                  BET CENTERAL
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="flex items-center rounded px-3 py-2 text-center text-gray-900 hover:bg-gray-100 md:flex-col md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  <Trophy className="mx-1" />
                  EVENTS
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-3 md:order-3 rtl:space-x-reverse">
            <button
              type="button"
              className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
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
    </nav>
  );
};

export default Nav;
