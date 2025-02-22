import React from "react";
import { getIconComponent } from "./utils/iconUtils";

interface subMenus {
  name: string;
  icon: string;
  submenu: [] | null;
}

interface UserSubMenuProps {
  selectedMenu: string;
  menu: any;
  handleMenuClick: (menuName: string) => void;
  usersSubMenu: boolean;
}

const NavUserMenu: React.FC<UserSubMenuProps> = ({
  selectedMenu,
  menu,
  handleMenuClick,
  usersSubMenu,
}) => {
  const subMenus = menu && menu?.subMenus;
  return (
    <span
      className={`flex cursor-pointer items-center rounded px-3 py-2 text-center md:flex-col md:p-0 ${
        selectedMenu === menu.name
          ? "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" // Background unchanged
          : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      }`}
      onClick={() => handleMenuClick(menu.name)}
    >
      {getIconComponent({
        strokeWidth: 1,
        name: menu.name,
        size: 32,
        color: selectedMenu === menu.name ? "#95c11e" : "#7b7887", // Change icon color
      })}
      <span
        style={{
          color: selectedMenu === menu.name ? "#95c11e" : "#7b7887",
        }}
        className={`px-2 pb-2 md:px-0`}
      >
        {menu.name}
      </span>
      {selectedMenu === menu.name && (
        <div className="w-full border-b-2 border-[#95c11e]" />
      )}
      {/* sub menu for user */}
      {selectedMenu === menu.name && usersSubMenu && (
        <div
          className="absolute left-1 top-11 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-left shadow dark:divide-gray-600 dark:bg-gray-700"
          id="user-dropdown"
        >
          <ul className="py-2" aria-labelledby="user-menu-button">
            {subMenus.map((menu: subMenus, i: number) => {
              return (
                <li
                  key={i}
                  className="block w-40 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <a href="#">{menu.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </span>
  );
};

export default NavUserMenu;
