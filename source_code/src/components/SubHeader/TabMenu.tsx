import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';

interface TabMenuProps {
    selectedTabMenu?: number;
    menuItems: any;
    defaultTab: string;
    apiCallParams: {
        authorizationCodeId?: any;
        roleId: number;
        assignedTo: string;
        pagination: {
            startIndex: number;
            noOfRecords: number;
        };
        order: string;
        name: string;
        filterValue: string;
        serviceProviderId?: string;
        // Add any other properties here if needed
    };
    numColumns: number;
}

const TabMenu: React.FC<TabMenuProps> = ({
    selectedTabMenu,
    menuItems,
    defaultTab,
    apiCallParams,
    numColumns,
}: TabMenuProps) => {
    const dispatch = useDispatch<any>();
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const [selectedTab, setSelectedTab] = useState<number>(
        selectedTabMenu || 1
    );
    const [selectedTabVal, setSelectedTabValue] = useState<string>(defaultTab);

    const handleApiCall = (tabName: string): void => {
        const data = {
            ...apiCallParams,
            heading: '',
            type: tabName,
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: tabName }));
    };

    const handleTabClick = (tabName: string, tabIndex: number): void => {
        setSelectedTab(tabIndex);
        setSelectedTabValue(tabName);
        handleApiCall(tabName);
    };

    useEffect(() => {
        if (!getMineData?.loading && !getMineData?.value?.length) {
            handleApiCall(defaultTab);
        }
    }, [defaultTab]);
    const gridColumnsClass = `grid grid-cols-${numColumns}`;
    return (
        <div
            role="tablist"
            aria-label="tabs"
            className={`${menuItems?.length > 3 ? 'w-[30rem]' : 'w-[23rem]'} relative mt-3 h-[2.5rem] flex  items-center rounded-full bg-[#EEFBFF] overflow-hidden tab-list shadow-md ${menuItems?.length > 4 ? 'flex w-[34rem]' : gridColumnsClass} `}
        >
            {menuItems.map((tabName: any, index: any) => (
                <button
                    data-testid="tab-btn"
                    key={`tab-${index + 1}`}
                    role="tab"
                    aria-selected={
                        (selectedTab || selectedTabVal) === index + 1
                    }
                    aria-controls={`panel-${index + 1}`}
                    id={`tab-${index + 1}`}
                    tabIndex={selectedTab === index + 1 ? 0 : -1}
                    className={`relative flex-1 text-sm tab rounded-full items-center justify-center h-[2.5rem] cursor-pointer ${
                        selectedTab === index + 1
                            ? 'bg-[#48ABCA] text-white'
                            : 'bg-[#EEFBFF] relative z-10 text-black'
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleTabClick(tabName, index + 1);
                    }}
                >
                    <span
                        className={
                            selectedTab === index + 1 ? 'relative z-10' : ''
                        }
                    >
                        {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default TabMenu;
