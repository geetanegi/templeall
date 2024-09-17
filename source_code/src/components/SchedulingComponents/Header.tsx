/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
    getAllUserAndGroupNamesCall,
    getScheduleEventCall,
    savingClickedUser,
    savingMultipleUsers,
    savingSearchedUsers,
    savingSelectedName,
    savingTechnicianAvailability,
} from '../../redux/slice/Scheduling/getServices';
import { Link } from 'react-router-dom';
import { setAppointmentData } from '../../redux/slice/appointment/appointmentSlice';
import { usePermission } from '../../hooks/usePermission';
import {
    clearHours,
    resetAuthCode,
    setClickedProvider,
    setCompleteScheduleEvent,
    setEndTime,
    setPlannerView,
    setStartTime,
    setTimezone,
} from '../../redux/slice/SchedulingRedux/Scheduling';
import groupApi from '../../api/services/Groups/saveGroup.service';
import getTechnicianAvailabilityAPI from '../../api/services/Scheduling/getTechnicianAvailability.service';
let count: any = 0;
export const setCount = (value: any): any => {
    count = value;
};
export default function Header({
    setCalendarView,
    setCalendarViewSmall,
}: {
    setCalendarView: any;
    setCalendarViewSmall: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const [searchTerm, setSearchTerm] = useState<any>('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const users = useSelector(
        ({ getServices }: any) => getServices?.multipleUsers
    );
    const clickedUsers = useSelector(
        ({ getServices }: any) => getServices?.clickedUser
    );
    const changeWeek = useSelector(
        ({ getServices }: any) => getServices?.dateChange
    );
    const profileData = useSelector(
        ({ userProfileData }: any) => userProfileData?.value?.data
    );
    const plannerView = useSelector(
        ({ scheduling }: any) => scheduling?.plannerView
    );
    const names = useSelector(
        ({ getServices }: any) => getServices?.getUserAndGroupNames
    );
    const selectedUser = useSelector(
        ({ getServices }: any) => getServices?.name
    );
    const currentDates = useSelector(({ scheduling }: any) => scheduling);
    const { permissions } = usePermission({
        itemsToCheck: ['create_appointment'],
    });
    const filteredData = names?.filter((item: any) =>
        item.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
    const initialValues: any = {
        viewCalendar: selectedUser,
    };
    const [selectedTab, setSelectedTab] = useState<number>(2);
    const [selectedTabVal, setSelectedTabValue] = useState<string>('Week');
    const menuItems = currentDates?.plannerView
        ? ['Week', 'Day']
        : ['Month', 'Week', 'Day'];
    const handleTabClick = (tabName: string, tabIndex: number): void => {
        setSelectedTab(tabIndex);
        setSelectedTabValue(tabName);
        setCalendarView(tabName?.toLowerCase());
        if (tabName === 'Month') {
            setCalendarViewSmall('year');
        } else if (tabName === 'Week') {
            setCalendarViewSmall('month');
        }
    };
    const handleAddEvent = (): any => {
        // if (permissions?.create_appointment) {
        dispatch(resetAuthCode());
        dispatch(clearHours());
        dispatch(setAppointmentData({}));
        const blank: any = '';
        dispatch(setStartTime(blank));
        dispatch(setEndTime(blank));
        dispatch(setClickedProvider(blank));
        dispatch(setTimezone(blank));
        // }
    };
    const events: any = [];
    const generateIdFromDateTimes = (lastname: any, endTime: any): any => {
        const startDate = new Date(lastname);
        const endDate = new Date(endTime);
        const formatPart = (part: any): any => part.toString().padStart(2, '0');
        const startMonth = formatPart(startDate.getMonth() + 1);
        const startDay = formatPart(startDate.getDate());
        const startHour = formatPart(startDate.getHours());
        const startMinute = formatPart(startDate.getMinutes());
        const endHour = formatPart(endDate.getHours());
        const endMinute = formatPart(endDate.getMinutes());
        return `${startMonth}${startDay}${startHour}${startMinute}${endHour}${endMinute}`;
    };
    const makingJSON = (techniciansData: any): any => {
        techniciansData.forEach((tech: any) => {
            tech.slotsData.forEach((slot: any) => {
                Object.keys(slot).forEach((dateKey) => {
                    if (dateKey === 'day') return;
                    const dateSlots = slot[dateKey];
                    if (Array.isArray(dateSlots)) {
                        dateSlots.forEach((slotTime) => {
                            const startDateTime = `${dateKey.split('T')[0]}T${slotTime.from}`;
                            const endDateTime = `${dateKey.split('T')[0]}T${slotTime.to}`;
                            events.push({
                                id: generateIdFromDateTimes(
                                    startDateTime,
                                    endDateTime
                                ),
                                searchUserId: parseInt(tech.technicianId),
                                title: '',
                                startTime: startDateTime,
                                endTime: endDateTime,
                                slotselection: true,
                                availabilityShow: true,
                            });
                        });
                    }
                });
            });
        });
        events.forEach((itemUser: any) => {
            dispatch(savingTechnicianAvailability(itemUser));
        });
    };
    const handleOptionClick = async (item: any): Promise<any> => {
        if (item?.groupId) {
            const groupData = {
                groupId: item?.groupId,
            };
            const res = await groupApi?.getGroupByID(groupData);
            res?.data?.data?.groupUser?.forEach((itemUser: any) => {
                dispatch(savingSearchedUsers(itemUser));
                if (!clickedUsers[itemUser?.id]) {
                    dispatch(savingClickedUser(itemUser?.id));
                }
            });
        } else {
            dispatch(savingSearchedUsers(item));
        }
        if (users?.length <= 4) {
            dispatch(savingMultipleUsers(item));
        }
        const data: any = {
            providerId: item?.id,
            groupId: item?.groupId,
            childId: item?.childId,
        };
        dispatch(savingSelectedName(item));
        setSearchTerm('');
        setIsOpen(false);
        if (!clickedUsers[item?.id || item?.childId]) {
            dispatch(
                savingClickedUser(item?.id || item?.groupId || item?.childId)
            );
        }
        dispatch(getScheduleEventCall(data));
        if (item?.roleName === 'Technician' && !plannerView) {
            const technicianData = {
                technicianIds: [item?.id],
                from: currentDates?.currentWeekStart,
                to: currentDates?.currentWeekEnd,
            };
            const res =
                await getTechnicianAvailabilityAPI.getTechnicianAvailability(
                    technicianData
                );
            if (!res?.data?.error) {
                makingJSON(res?.data?.data);
            } else {
                return res;
            }
        }
    };
    const availabilityShow = async (id: any, ids: any): Promise<any> => {
        const technicianData = {
            technicianIds: id ? [id] : ids,
            from: currentDates?.currentWeekStart,
            to: currentDates?.currentWeekEnd,
        };
        const res =
            await getTechnicianAvailabilityAPI.getTechnicianAvailability(
                technicianData
            );
        if (!res?.data?.error) {
            makingJSON(res?.data?.data);
        } else {
            return res;
        }
    };
    const handlePlannerView = async (): Promise<any> => {
        dispatch(setPlannerView(true));
    };
    useEffect(() => {
        dispatch(getAllUserAndGroupNamesCall({ organizationId: 1 }));
        const a: any = false;
        dispatch(setCompleteScheduleEvent(a));
    }, []);
    useEffect(() => {
        if (menuItems?.length === 2) {
            setSelectedTab(1);
        } else if (menuItems?.length === 3) {
            setSelectedTab(2);
        }
    }, [plannerView]);
    useEffect(() => {
        if (changeWeek && !plannerView) {
            const technicianIds = users
                ?.filter((item: any) => item.roleName === 'Technician')
                .map((item: any) => item.id);
            availabilityShow('', technicianIds);
        }
    }, [currentDates?.currentWeekStart, currentDates?.currentWeekEnd]);
    useEffect(() => {
        if (count === 0) {
            const userData: any = {
                firstName: profileData?.userId?.firstName,
                id:
                    parseInt(userPermission?.value?.data?.userId) ||
                    parseInt(profileData?.userId?.id),
                lastName: profileData?.userId?.lastName,
                roleName: userPermission?.userRoles?.data?.roleName,
                username: '',
            };
            dispatch(savingMultipleUsers(userData));
            dispatch(savingSearchedUsers(userData));
            dispatch(
                savingClickedUser(
                    userPermission?.value?.data?.userId ||
                        profileData?.userId?.id
                )
            );
            const data: any = {
                providerId:
                    parseInt(userPermission?.value?.data?.userId) ||
                    parseInt(profileData?.userId?.id),
            };
            dispatch(getScheduleEventCall(data));
            setCount(1);
            if (
                userPermission?.userRoles?.data?.roleName === 'Techinician' &&
                !plannerView
            ) {
                availabilityShow(
                    userPermission?.value?.data?.userId ||
                        profileData?.userId?.id,
                    ''
                );
            }
        }
    }, []);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): any => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <div
            className="px-5 pt-2 pb-3 relative rounded-xl border shadow-md flex items-center justify-between"
            data-testid="scheduling-header-page"
        >
            <div
                role="tablist"
                aria-label="tabs"
                className={`${currentDates?.plannerView ? 'grid-cols-2' : 'grid-cols-3'} w-[20rem] relative h-[2rem] grid  items-center rounded-full bg-[#E5EFFB] overflow-hidden tab-list shadow-md`}
            >
                {menuItems.map((tabName, index) => (
                    <button
                        key={`tab-${index + 1}`}
                        role="tab"
                        data-testid={`scheduling-header-tab-${index + 1}`}
                        aria-selected={
                            (selectedTab || selectedTabVal) === index + 1
                        }
                        aria-controls={`panel-${index + 1}`}
                        id={`tab-${index + 1}`}
                        tabIndex={selectedTab === index + 1 ? 0 : -1}
                        className={`relative flex-1 text-[12.8px] tab rounded-full items-center justify-center h-[2rem] cursor-pointer ${
                            selectedTab === index + 1
                                ? 'bg-[#FFFFFF] shadow-xl'
                                : 'bg-[#E5EFFB] relative z-10 text-gray-600'
                        }`}
                        onClick={() => handleTabClick(tabName, index + 1)}
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
            <div className="flex space-x-5 items-end">
                <div className="">
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={() => {}}
                    >
                        <>
                            <form>
                                <div className="px-2 w-[28rem] flex flex-col">
                                    <label className="text-sm font-md ml-1">
                                        View Calendar
                                    </label>
                                    <div className="flex w-full justify-between items-end h-[25px]">
                                        <div className="w-[27rem] absolute top-[25px]">
                                            <input
                                                type="text"
                                                className="border-b-2 border-gray-200 py-1 focus:outline-none text-sm ps-2 w-full border-t-0 border-l-0 border-r-0"
                                                placeholder="Type name to view other's calendar"
                                                value={searchTerm}
                                                autoFocus={true}
                                                data-testid="search-user"
                                                onChange={(e) => {
                                                    setSearchTerm(
                                                        e.target.value
                                                    );
                                                    setIsOpen(true);
                                                }}
                                            />
                                            {isOpen && (
                                                <div
                                                    ref={dropdownRef}
                                                    className="flex flex-col mt-1 border shadow-md bg-white z-50 relative h-auto max-h-[30rem] overflow-y-auto"
                                                >
                                                    {filteredData?.map(
                                                        (item: any) => (
                                                            <label
                                                                key={item.value}
                                                                onClick={() => {
                                                                    handleOptionClick(
                                                                        item
                                                                    );
                                                                }}
                                                                //data-testid={`view-my-calendar-option-click-${index}`}
                                                                className="text-sm font-md cursor-pointer px-3 py-2 hover:bg-[#5ab3cf] hover:text-white"
                                                            >
                                                                {`${item.firstName} ${item.lastName === undefined ? '' : item.lastName}`}
                                                            </label>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </>
                    </Formik>
                </div>
                {!currentDates?.plannerView && (
                    <div
                        className="flex items-center space-x-1"
                        onClick={() => handlePlannerView()}
                    >
                        <label className="text-sm cursor-pointer text-primary-700 hover:underline">
                            Planner View
                        </label>
                    </div>
                )}
                <Link to={'/add-new-event'}>
                    <button
                        // disabled={!permissions?.create_appointment}
                        type="button"
                        className={`bg-theme-lightBlue1 h-[2rem] shadow-md text-white  rounded-md text-[12.9px] px-7  ${!permissions?.create_appointment ? 'disabled:opacity-50' : ''}`}
                        id="fill-and-justify-item-1"
                        data-hs-tab="#fill-and-justify-1"
                        aria-controls="fill-and-justify-1"
                        role="tab"
                        onClick={() => handleAddEvent()}
                        data-testid="add-new-event-button"
                    >
                        {'+ New Event'}
                    </button>
                </Link>
            </div>
        </div>
    );
}
