/* eslint-disable max-lines */
import * as React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-calendar/dist/Calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import CustomEvents from './CustomEvents';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    savingColorMapMonth,
    savingColorMapWeek,
    savingColorUsers,
    setDateChange,
} from '../../redux/slice/Scheduling/getServices';
import { usePermission } from '../../hooks/usePermission';
import {
    clearHours,
    setCurrentWeekDays,
    setCurrentWeekEnd,
    setCurrentWeekStart,
    setEndTime,
    setStartTime,
} from '../../redux/slice/SchedulingRedux/Scheduling';
import EventDragModal from './EventDragModal';
import { ROUTES } from '../../constants';
import PlannerViewWeek from './PlannerViewWeek';
import {
    adjustments,
    eventColors,
    eventColorsWeekView,
} from '../../constants/HoursCal';
import clock from '../../assets/img/clockRequest.svg';
import RequestAvailabilityModal from './RequestAvailabilityModal';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
export default function Timeline({
    calendarView,
    selectedDate,
}: {
    calendarView?: any;
    selectedDate?: any;
}): React.JSX.Element {
    const navigateRef = useNavigate();
    const dispatch = useDispatch<any>();
    const [date, setDate] = React.useState(moment());
    const plannerView = useSelector(
        ({ scheduling }: any) => scheduling?.plannerView
    );
    const [openEventDragModal, setOpenEventDragModal] = React.useState(false);
    const [openAvailabilityModal, setOpenAvailabilityModal] =
        React.useState(false);
    const [eventData, setEventData] = React.useState<any>('');
    const eventsApi = useSelector(
        ({ getServices }: any) => getServices?.scheduledEvents
    );
    const permission = useSelector(
        ({ getUserPermission }: any) =>
            getUserPermission?.userRoles?.data?.roleName
    );
    const users = useSelector(
        ({ getServices }: any) => getServices?.multipleUsers
    );
    const userSearch = useSelector(
        ({ getServices }: any) => getServices?.searchedUsers
    );
    const { permissions } = usePermission({
        itemsToCheck: ['view_others_calendar'],
    });
    const navigate = (action: any): any => {
        let newDate = moment(date);
        if (action === 'PREV') {
            if (calendarView === 'month') {
                newDate = newDate.subtract(1, 'month');
            } else if (calendarView === 'week') {
                newDate = newDate.subtract(1, 'week');
            } else {
                newDate = newDate.subtract(1, 'day');
                dispatch(
                    setCurrentWeekStart(newDate.format('YYYY-MM-DDTHH:mm:ss'))
                );
                dispatch(
                    setCurrentWeekEnd(newDate.format('YYYY-MM-DDTHH:mm:ss'))
                );
            }
        } else if (action === 'NEXT') {
            if (calendarView === 'month') {
                newDate = newDate.add(1, 'month');
            } else if (calendarView === 'week') {
                newDate = newDate.add(1, 'week');
            } else {
                newDate = newDate.add(1, 'day');
                dispatch(
                    setCurrentWeekStart(newDate.format('YYYY-MM-DDTHH:mm:ss'))
                );
                dispatch(
                    setCurrentWeekEnd(newDate.format('YYYY-MM-DDTHH:mm:ss'))
                );
            }
        } else if (action === 'TODAY') {
            newDate = moment();
            dispatch(
                setCurrentWeekStart(newDate.format('YYYY-MM-DDTHH:mm:ss'))
            );
            dispatch(setCurrentWeekEnd(newDate.format('YYYY-MM-DDTHH:mm:ss')));
        }
        if (calendarView === 'day') {
            const currentDay: any = [newDate?.format('YYYY-MM-DD')];
            dispatch(setCurrentWeekDays(currentDay));
        }
        setDate(newDate);
    };
    const handleEventClick = (id: string): void => {
        if (permissions?.view_others_calendar) {
            dispatch(clearHours());
            setTimeout(() => {
                navigateRef(`${ROUTES.appointmentDetails}/${id}`);
            }, 700);
        }
    };
    const getDayRepeat = (lastItem: any, frequency: number): any => {
        return {
            ...lastItem,
            startDate: moment(lastItem?.startDate)
                .add(frequency, 'days')
                .format('YYYY-MM-DDTHH:mm:ss'),
            startTime: moment(lastItem?.startDate)
                .add(frequency, 'days')
                .format('YYYY-MM-DDTHH:mm:ss'),
            endDate: moment(lastItem?.endDate)
                .add(frequency, 'days')
                .format('YYYY-MM-DDTHH:mm:ss'),
            endTime: moment(lastItem?.endDate)
                .add(frequency, 'days')
                .format('YYYY-MM-DDTHH:mm:ss'),
        };
    };
    const getDayINeed = (
        startDate: string,
        dayINeed: number,
        frequency: number
    ): string => {
        const currentDay = moment(startDate, 'YYYY-MM-DD').isoWeekday();
        // if we haven't yet passed the day of the week that I need:
        if (currentDay <= dayINeed) {
            // then just give me this week's instance of that day
            return moment(startDate, 'YYYY-MM-DDTHH:mm:ss')
                .isoWeekday(dayINeed)
                .format('YYYY-MM-DDTHH:mm:ss');
        } else {
            // otherwise, give me *next week's* instance of that same day
            const startTime = startDate.split('T')[1];
            return moment(startTime, 'HH:mm:ss')
                .add(frequency, 'weeks')
                .isoWeekday(dayINeed)
                .format('YYYY-MM-DDTHH:mm:ss');
        }
    };
    const getWeekRepeat = (
        lastItem: any,
        weekRepeatDays: any,
        frequency: number
    ): any => {
        return weekRepeatDays.map((item: any) => {
            return {
                ...lastItem,
                startDate:
                    moment(
                        lastItem?.startDate,
                        'YYYY-MM-DDTHH:mm:ss'
                    ).isoWeekday() === parseInt(item)
                        ? moment(lastItem?.startDate, 'YYYY-MM-DDTHH:mm:ss')
                              .add(frequency, 'weeks')
                              .format('YYYY-MM-DDTHH:mm:ss')
                        : getDayINeed(
                              lastItem.startDate,
                              parseInt(item),
                              frequency
                          ),
                startTime:
                    moment(
                        lastItem?.startDate,
                        'YYYY-MM-DDTHH:mm:ss'
                    ).isoWeekday() === parseInt(item)
                        ? moment(lastItem?.startDate, 'YYYY-MM-DDTHH:mm:ss')
                              .add(frequency, 'weeks')
                              .format('YYYY-MM-DDTHH:mm:ss')
                        : getDayINeed(
                              lastItem.startDate,
                              parseInt(item),
                              frequency
                          ),
                endDate:
                    moment(
                        lastItem?.endDate,
                        'YYYY-MM-DDTHH:mm:ss'
                    ).isoWeekday() === parseInt(item)
                        ? moment(lastItem?.endDate, 'YYYY-MM-DDTHH:mm:ss')
                              .add(frequency, 'weeks')
                              .format('YYYY-MM-DDTHH:mm:ss')
                        : getDayINeed(
                              lastItem?.endDate,
                              parseInt(item),
                              frequency
                          ),
                endTime:
                    moment(
                        lastItem?.endDate,
                        'YYYY-MM-DDTHH:mm:ss'
                    ).isoWeekday() === parseInt(item)
                        ? moment(lastItem?.endDate, 'YYYY-MM-DDTHH:mm:ss')
                              .add(frequency, 'weeks')
                              .format('YYYY-MM-DDTHH:mm:ss')
                        : getDayINeed(
                              lastItem?.endDate,
                              parseInt(item),
                              frequency
                          ),
            };
        });
    };
    const getMonthRepeat = (
        lastItem: any,
        monthDay: string,
        frequency: number
    ): any => {
        return {
            ...lastItem,
            startDate: moment(lastItem?.startDate)
                .add(frequency, 'months')
                .date(parseInt(monthDay))
                .format('YYYY-MM-DDTHH:mm:ss'),
            startTime: moment(lastItem?.startDate)
                .add(frequency, 'months')
                .date(parseInt(monthDay))
                .format('YYYY-MM-DDTHH:mm:ss'),
            endDate: moment(lastItem?.endDate)
                .add(frequency, 'months')
                .date(parseInt(monthDay))
                .format('YYYY-MM-DDTHH:mm:ss'),
            endTime: moment(lastItem?.endDate)
                .add(frequency, 'months')
                .date(parseInt(monthDay))
                .format('YYYY-MM-DDTHH:mm:ss'),
        };
    };
    const handleFrequencyDays = (
        endType: string,
        endsOn: any,
        repeatArr: any,
        frequency: any,
        flag: any,
        endsAfter: any
    ): any => {
        while (flag) {
            const startDate = moment(
                repeatArr[repeatArr.length - 1].startDate
            ).add(1, 'days');
            if (endType === 'on') {
                const lastDate = moment(endsOn?.startDate, 'YYYY-MM-DD');
                if (startDate.diff(lastDate) <= 0) {
                    const eventConfig = getDayRepeat(
                        repeatArr[repeatArr.length - 1],
                        parseInt(frequency)
                    );
                    repeatArr?.push(eventConfig);
                } else {
                    flag = false;
                    break;
                }
            } else if (endType === 'after') {
                if (repeatArr.length <= endsAfter) {
                    const eventConfig = getDayRepeat(
                        repeatArr[repeatArr.length - 1],
                        parseInt(frequency)
                    );
                    repeatArr?.push(eventConfig);
                } else {
                    flag = false;
                    break;
                }
            } else {
                flag = false;
                break;
            }
        }
    };
    const handleFrequencyWeek = (
        endType: string,
        endsOn: any,
        repeatArr: any,
        frequency: any,
        flag: any,
        endsAfter: any,
        frequencyDays: any
    ): any => {
        while (flag) {
            const startDate = moment(
                repeatArr[repeatArr.length - 1].startDate,
                'YYYY-MM-DD'
            )
                .add(1, 'weeks')
                .isoWeekday(frequencyDays[0]);
            if (endType === 'on') {
                const lastDate = moment(endsOn?.startDate, 'YYYY-MM-DD');
                if (startDate.diff(lastDate) <= 0) {
                    const eventConfig = getWeekRepeat(
                        repeatArr[repeatArr.length - 1],
                        frequencyDays,
                        parseInt(frequency)
                    ).sort((a: any, b: any) =>
                        moment(a.startDate, 'YYYY-MM-DD').diff(
                            moment(b.startDate, 'YYYY-MM-DD')
                        )
                    );
                    repeatArr = [...repeatArr, ...eventConfig];
                } else {
                    flag = false;
                    break;
                }
            } else if (endType === 'after') {
                if (repeatArr.length <= endsAfter) {
                    const eventConfig = getWeekRepeat(
                        repeatArr[repeatArr.length - 1],
                        frequencyDays,
                        parseInt(frequency)
                    ).sort((a: any, b: any) =>
                        moment(a.startDate, 'YYYY-MM-DD').diff(
                            moment(b.startDate, 'YYYY-MM-DD')
                        )
                    );
                    repeatArr = [...repeatArr, ...eventConfig];
                } else {
                    flag = false;
                    break;
                }
            } else {
                flag = false;
                break;
            }
        }
    };
    const handleFrequencyMonths = (
        endType: string,
        endsOn: any,
        repeatArr: any,
        frequency: any,
        flag: any,
        endsAfter: any,
        monthDay: any
    ): any => {
        while (flag) {
            const startDate = moment(repeatArr[repeatArr.length - 1].startDate)
                .add(1, 'months')
                .date(monthDay?.value);
            if (endType === 'on') {
                const lastDate = moment(endsOn.startDate, 'YYYY-MM-DD');
                if (startDate.diff(lastDate) <= 0) {
                    const eventConfig = getMonthRepeat(
                        repeatArr[repeatArr.length - 1],
                        monthDay?.value,
                        parseInt(frequency)
                    );
                    repeatArr.push(eventConfig);
                } else {
                    flag = false;
                    break;
                }
            } else if (endType === 'after') {
                if (repeatArr.length <= endsAfter) {
                    const eventConfig = getMonthRepeat(
                        repeatArr[repeatArr.length - 1],
                        monthDay?.value,
                        parseInt(frequency)
                    );
                    repeatArr.push(eventConfig);
                } else {
                    flag = false;
                    break;
                }
            } else {
                flag = false;
                break;
            }
        }
    };
    const getRepeatedEvents = (item: any): any => {
        const repeatArr = [item];
        if (item.repeat) {
            const repeatConfig = JSON?.parse(item?.repeatConfiguration);
            const {
                frequencyType,
                frequencyDays,
                endType,
                endsOn,
                endsAfter,
                monthDay,
                frequency,
            } = repeatConfig;
            const flag = true;
            if (frequencyType) {
                if (frequencyType?.value === 'days') {
                    handleFrequencyDays(
                        endType,
                        endsOn,
                        repeatArr,
                        frequency,
                        flag,
                        endsAfter
                    );
                } else if (frequencyType?.value === 'weeks') {
                    handleFrequencyWeek(
                        endType,
                        endsOn,
                        repeatArr,
                        frequency,
                        flag,
                        endsAfter,
                        frequencyDays
                    );
                } else if (frequencyType?.value === 'months') {
                    handleFrequencyMonths(
                        endType,
                        endsOn,
                        repeatArr,
                        frequency,
                        flag,
                        endsAfter,
                        monthDay
                    );
                }
            }
            return repeatArr;
        } else {
            return repeatArr;
        }
    };
    const getAllEvents = (): any => {
        let allEvents: any = [];
        eventsApi?.forEach((event: any) => {
            const data = getRepeatedEvents({
                ...event,
                startDate: event.startTime,
                endDate: event.endTime,
            });
            allEvents = [...allEvents, ...data];
        });
        return [...allEvents];
    };
    const getTransformedEvents = (): any => {
        const userIds = userSearch?.map(
            (user: any) => user.id || user?.childId
        );
        const eventIds = eventsApi?.map((event: any) => event.searchUserId);
        const hasMatchingId = userIds.some((userId: any) =>
            eventIds.includes(parseInt(userId))
        );
        const colorMapMonth: any = {};
        const colorMapWeek: any = {};
        if (hasMatchingId) {
            userSearch.forEach((item: any, index: any) => {
                colorMapMonth[item.id || item.childId] =
                    eventColors[index % eventColors.length];
            });
            userSearch.forEach((item: any, index: any) => {
                colorMapWeek[item.id || item.childId] =
                    eventColorsWeekView[index % eventColorsWeekView.length];
            });
            dispatch(savingColorMapMonth(colorMapMonth));
            dispatch(savingColorMapWeek(colorMapWeek));
        }
        const colorForUsers: any = {};
        users.forEach((item: any, index: any) => {
            colorForUsers[item.id || item?.groupId || item?.childId] =
                eventColors[index % eventColors.length];
        });
        dispatch(savingColorUsers(colorForUsers));
        const allEvents = getAllEvents();
        return allEvents?.map((event: any) => {
            const startTimeUTC = moment
                .utc(event?.startTime)
                .local()
                .format('YYYY-MM-DDTHH:mm:ss');
            const endTimeUTC = moment
                .utc(event?.endTime)
                .local()
                .format('YYYY-MM-DDTHH:mm:ss');
            const startDateTime = moment(
                `${startTimeUTC}`,
                'YYYY-MM-DD hh:mm a'
            ).toDate();
            const endDateTime = moment(
                `${endTimeUTC}`,
                'YYYY-MM-DD hh:mm a'
            ).toDate();
            return {
                id: event?.id,
                title: event?.title,
                start: startDateTime,
                end: endDateTime,
                isBillable: event?.isBillable,
                authorizationCode: event?.authorizationCode,
                backgroundColorMonth: colorMapMonth?.[event?.searchUserId],
                backgroundColorWeek: colorMapWeek?.[event?.searchUserId],
                onClick: handleEventClick,
                view: calendarView,
                providerName: `${event?.providerId?.firstName} ${event?.providerId?.lastName}`,
                authorizationData: event?.authorizationCodeData,
                providerId: event?.primaryProvider,
                sessionNoteBilling: event?.sessionNoteBilling,
                slotselection: event?.slotselection,
                availabilityShow: event?.availabilityShow,
            };
        });
    };
    const currentWeek = (): any => {
        const start = date;
        const from = date?.startOf('week').format('MMMM DD');
        const to = date?.endOf('week').format('MMMM DD');
        const currentWeekStart = date
            ?.startOf('week')
            .format('YYYY-MM-DDTHH:mm:ss');
        const currentWeekEnd = date
            ?.endOf('week')
            .format('YYYY-MM-DDTHH:mm:ss');
        dispatch(setCurrentWeekStart(currentWeekStart));
        dispatch(setCurrentWeekEnd(currentWeekEnd));
        dispatch(setDateChange(true));
        const days: any = [];
        for (let i = 0; i < 7; i++) {
            const day = start.startOf('week').add(i, 'days');
            days.push(day.format('YYYY-MM-DD')); // Format as '28 Sun'
        }
        dispatch(setCurrentWeekDays(days));
        return `${from} - ${to}`;
    };
    const handleOpenAvailabilityModal = (): any => {
        setOpenAvailabilityModal(true);
    };
    const customToolbar = (): any => {
        return (
            <div
                className="rbc-toolbar flex justify-between w-full"
                data-testid="click-to-navigate"
            >
                <div>
                    <button
                        className="font-sm text-sm hover:bg-gray-200 hover:text-white h-[34px]"
                        onClick={() => navigate('PREV')}
                        data-testid="click-to-navigate"
                    >
                        <svg
                            width="9"
                            height="13"
                            viewBox="0 0 9 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.22483 1L1 6.22483L6.22483 11.4497"
                                stroke="#626262"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        className="font-md text-sm hover:bg-gray-200"
                        onClick={() => navigate('TODAY')}
                    >
                        {'Today'}
                    </button>
                    <button
                        className="font-sm text-sm hover:bg-gray-200 hover:text-white h-[34px]"
                        onClick={() => navigate('NEXT')}
                    >
                        <svg
                            width="9"
                            height="13"
                            viewBox="0 0 9 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.85646 11.4502L7.0813 6.22536L1.85646 1.00053"
                                stroke="#626262"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="">
                    <label className="font-md text-md">
                        {calendarView === 'month'
                            ? date.format('MMMM-YYYY')
                            : calendarView === 'week'
                              ? currentWeek()
                              : date?.format('MMMM-YYYY-DD')}
                    </label>
                </div>
                <div
                    className="mr-3 flex space-x-2 items-start"
                    onClick={() => handleOpenAvailabilityModal()}
                >
                    <img src={clock} alt="request" />
                    {permission === 'Admin' && (
                        <label className="font-[lato] text-primary-700 font-semibold text-base cursor-pointer hover:underline">
                            Request Technician Availability
                        </label>
                    )}
                </div>
            </div>
        );
    };
    const [currentEvent, setCurrentEvent] = React.useState<any>(null);
    const [adjustedEnd, setAdjustedEnd] = React.useState<any>(null);
    React.useEffect(() => {
        const newDate = moment(selectedDate);
        const currentWeekStart = newDate?.format('YYYY-MM-DDTHH:mm:ss');
        const currentWeekEnd = newDate?.format('YYYY-MM-DDTHH:mm:ss');
        dispatch(setCurrentWeekStart(currentWeekStart));
        dispatch(setCurrentWeekEnd(currentWeekEnd));
        setDate(newDate);
    }, [selectedDate]);
    React.useEffect(() => {
        if (calendarView === 'day') {
            const newDate = moment();
            setDate(newDate);
            const currentWeekStart = newDate?.format('YYYY-MM-DDTHH:mm:ss');
            const currentWeekEnd = newDate?.format('YYYY-MM-DDTHH:mm:ss');
            dispatch(setCurrentWeekStart(currentWeekStart));
            dispatch(setCurrentWeekEnd(currentWeekEnd));
            const currentDay: any = [newDate?.format('YYYY-MM-DD')];
            dispatch(setCurrentWeekDays(currentDay));
        }
        setCurrentEvent(null);
    }, [calendarView]);
    const onEventDrop = (data: any): any => {
        setOpenEventDragModal(true);
        setEventData(data);
    };
    const [startDrag, setStartDrag] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const handleSelectSlot = ({ start }: any): any => {
        if (calendarView === 'month') {
            const selectedStart = moment(start);
            const today = moment();
            const endOfCurrentMonth = today.clone().endOf('month');
            if (selectedStart.day() === 4) {
                // Check if it's the 1st Saturday of the month
                if (selectedStart.date() <= 7) {
                    // add 2 days for the 1st Saturday
                    selectedStart.add(2, 'days');
                } else {
                    // Add 1 day for other Saturdays
                    selectedStart.add(1, 'days');
                }
            } else if (selectedStart.day() === 0) {
                // Check if the selected day is Sunday
                const isFirstSunday = selectedStart.date() <= 14;
                const isLastSunday = selectedStart.isSame(
                    endOfCurrentMonth.clone().startOf('week'),
                    'day'
                );
                const isSecondLastSunday = selectedStart.isSame(
                    endOfCurrentMonth
                        .clone()
                        .subtract(1, 'week')
                        .startOf('week'),
                    'day'
                );
                if (isFirstSunday) {
                    // Do nothing if it's the first Sunday of the month
                } else if (isLastSunday || isSecondLastSunday) {
                    selectedStart.subtract(7, 'day'); // Subtract 1 day for the last or second to last Sunday
                }
            } else if (selectedStart.day() !== 0) {
                selectedStart.add(8, 'days'); // Add 8 days for other days
            }
            const formatDate: any = moment(selectedStart.toDate()).format(
                'YYYY-MM-DD'
            );
            const time: any = `${formatDate} 8:00 am`;
            const blank: any = '';
            dispatch(setStartTime(time));
            dispatch(setEndTime(blank));
        }
        setCurrentEvent(null);
        setStartDrag(false);
        document.body.style.cursor = 'auto';
        setTimeout(() => {
            navigateRef('/add-new-event');
        }, 2000);
    };
    const adjustEndTime = (time: any): any => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        if (hours === 21) {
            if (minutes === 0) {
                setAdjustedEnd(new Date(time.setHours(23, 0, 0, 0)));
            } else {
                setAdjustedEnd(new Date(time.setHours(23, 30, 0, 0)));
            }
        } else if (hours === 22) {
            setAdjustedEnd(new Date(time.setHours(0, 0, 0, 0)));
        } else {
            setAdjustedEnd(new Date(time.getTime() + 60 * 60 * 1000)); // Add 1 hour for all other times
        }
    };
    const adjustStartTime = (time: any, time2: any): any => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const timeKey = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        if (adjustments[timeKey] !== undefined) {
            const adjustmentMinutes = adjustments[timeKey];
            const newTime = new Date(
                time.getTime() + adjustmentMinutes * 60 * 1000
            );
            setAdjustedEnd(time2);
            if (timeKey === '07:00' || timeKey === '07:30') {
                return new Date(time.setHours(8, 0, 0, 0)); // Set to 08:00 AM for 07:00 or 07:30
            } else if (timeKey === '20:30') {
                adjustEndTime(time2);
            }
            return newTime;
        } else {
            setAdjustedEnd(time2);
            return new Date(time.getTime() + 60 * 60 * 1000); // Default: Add 1 hour
        }
    };
    const handleSelecting = ({ start, end }: any): any => {
        document.body.style.cursor = 'none';
        setStartDrag(true);
        const adjustedStart = adjustStartTime(start, end);
        const selectedStart = moment(adjustedStart);
        const selectedEnd = moment(adjustedEnd);
        const formatStartDate: any =
            moment(selectedStart).format('YYYY-MM-DD hh:mm a');
        const formatEndDate: any =
            moment(selectedEnd).format('YYYY-MM-DD hh:mm a');
        if (calendarView !== 'month') {
            setCurrentEvent({
                title: `${formatStartDate?.split(' ')[1]} ${formatStartDate?.split(' ')[2]} - ${formatEndDate?.split(' ')[1]} ${formatEndDate?.split(' ')[2]}`, // Temporary title
                start: adjustedStart,
                end: adjustedEnd,
                backgroundColorWeek: 'lightgrey',
                slotselection: true,
            });
            dispatch(setStartTime(formatStartDate));
            dispatch(setEndTime(formatEndDate));
        }
        return true;
    };
    const newDate = new Date();
    const minTime: any = newDate.setHours(0, 0, 0); // 12 AM
    const maxTime: any = newDate.setHours(23, 59, 59); // 11:59 PM
    const scrollToTime: any = newDate.setHours(8, 0, 0); // 8 AM
    const start: any = 'start';
    const end: any = 'end';
    React.useEffect(() => {
        const updateMousePosition = (e: any): any => {
            setPosition({ x: e.pageX + 128, y: e.pageY + 0 }); // Adjust vertical position here
        };
        document.addEventListener('mousemove', updateMousePosition);
        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return (
        <>
            {startDrag && (
                <div
                    className="custom-cursor"
                    style={{ left: position.x, top: position.y }}
                >
                    <span className="cursor-icon">&#10021;</span>{' '}
                    {/* Unicode arrow for move cursor */}
                </div>
            )}
            <DnDCalendar
                dayLayoutAlgorithm={'no-overlap'}
                date={date.toDate()}
                onSelecting={handleSelecting}
                localizer={localizer}
                events={
                    currentEvent
                        ? [...getTransformedEvents(), currentEvent]
                        : getTransformedEvents()
                }
                startAccessor={start}
                endAccessor={end}
                style={{ height: plannerView ? '5vh' : '102vh' }}
                views={['month', 'week', 'day']}
                view={calendarView}
                step={30}
                timeslots={1}
                selectable
                components={{
                    event: CustomEvents,
                    toolbar: customToolbar,
                }}
                onEventDrop={onEventDrop}
                onSelectSlot={handleSelectSlot}
                min={minTime}
                max={maxTime}
                className={plannerView ? 'plannerView' : 'normalView'}
                scrollToTime={scrollToTime}
            />
            {plannerView && <PlannerViewWeek calendarView={calendarView} />}
            {openEventDragModal && (
                <EventDragModal
                    open={openEventDragModal}
                    onClose={() => setOpenEventDragModal(false)}
                    data={eventData}
                />
            )}{' '}
            {openAvailabilityModal && (
                <RequestAvailabilityModal
                    open={openAvailabilityModal}
                    onClose={() => setOpenAvailabilityModal(false)}
                />
            )}
        </>
    );
}
