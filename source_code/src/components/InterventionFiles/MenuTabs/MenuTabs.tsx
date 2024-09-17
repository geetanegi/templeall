import React from 'react';
import add from '../../../assets/img/add.svg';
import Button from '../../Generics/Button';
interface MenuItem {
    icon: string;
    label: string;
    onClick: () => void;
}

interface MenuTabsProps {
    menuItems: MenuItem[];
    clientDocDiv?: boolean;
}

const MenuTabs: React.FC<MenuTabsProps> = ({ menuItems, clientDocDiv }) => {
    const isViewMode = window.location.href.includes('view');
    // const viewScore = menuItems.filter((item) => item.label === 'View Score');
    return (
        <div
            className={` bg-white rounded-md  mt-5 shadow-[0_3px_8px_rgb(0,0,0,0.2)]`}
        >
            {clientDocDiv ? (
                <div className="w-[55vw] mt-0 rounded-t-md bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]" />
            ) : (
                ''
            )}
            <div
                className={`flex py-4 justify-between ${menuItems?.length < 3 ? `w-[30rem]` : `w-[60rem]`} `}
            >
                {menuItems.map((menuItem, index) => (
                    <div
                        key={index}
                        className={`${isViewMode ? 'cursor-not-allowed opacity-50' : ''} relative inline-block `}
                    >
                        <Button
                            data-testid={menuItem.label}
                            disabled={
                                menuItem?.label === 'View Score'
                                    ? false
                                    : isViewMode
                            }
                            onClick={menuItem.onClick}
                            type=""
                            loading={false}
                            className={`${
                                menuItem?.label === 'View Score'
                                    ? false
                                    : isViewMode
                                      ? 'pointer-events-none cursor-not-allowed'
                                      : ''
                            }`}
                            key={index}
                        >
                            <div className="flex">
                                <div className="flex flex-col ml-4 items-center w-[14vw]">
                                    <img
                                        className="w-10"
                                        src={menuItem.icon}
                                        alt={menuItem.label}
                                    />
                                    <div>
                                        <label className="text-black flex items-center text-sm font-medium cursor-pointer">
                                            <img src={add} alt="Add Icon" />
                                            {menuItem.label}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuTabs;
