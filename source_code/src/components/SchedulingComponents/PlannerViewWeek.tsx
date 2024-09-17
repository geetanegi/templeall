import moment from 'moment';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import eventIcon from '../../assets/img/event.svg';
import billedTickIcon from '../../assets/img/billedTick.svg';
import { usePermission } from '../../hooks/usePermission';
import {
    clearHours,
    resetAuthCode,
    setClickedProvider,
    setStartTime,
    setTimezone,
} from '../../redux/slice/SchedulingRedux/Scheduling';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { savingHeights } from '../../redux/slice/Scheduling/getServices';
import { setAppointmentData } from '../../redux/slice/appointment/appointmentSlice';
export default function PlannerViewWeek({
    calendarView,
}: {
    calendarView?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const navigateRef = useNavigate();
    const divRefs = React.useRef<any>({});
    const header = useSelector(({ scheduling }: any) => scheduling);
    const { permissions } = usePermission({
        itemsToCheck: ['view_others_calendar'],
    });
    const eventsData = useSelector(
        ({ getServices }: any) => getServices?.scheduledEvents
    );
    const searchUsers = useSelector(
        ({ getServices }: any) => getServices?.searchedUsers
    );
    const searchUserIds = searchUsers.map(
        (user: any) => user.id || user?.childId
    );
    const newData: any = {};
    searchUserIds.forEach((id: any) => {
        newData[id] = [];
    });
    eventsData.forEach((event: any) => {
        if (searchUserIds.includes(event.searchUserId)) {
            newData[event.searchUserId].push(event);
        }
    });
    const borderColors = useSelector(
        ({ getServices }: any) => getServices?.colorMapMonth
    );
    const backgroundColors = useSelector(
        ({ getServices }: any) => getServices?.colorMapWeek
    );
    const formatTime = (time: any): any => {
        const minutes = moment(time).format('mm');
        if (minutes === '00') {
            return moment(time).format('h A'); // Show only hours if minutes are 00
        }
        return moment(time).format('h:mm A'); // Show full time otherwise
    };
    const handleEventClick = (id: string): void => {
        if (permissions?.view_others_calendar) {
            dispatch(clearHours());
            setTimeout(() => {
                navigateRef(`${ROUTES.appointmentDetails}/${id}`);
            }, 700);
        }
    };
    React.useEffect(() => {
        const newHeights: any = {};
        Object.keys(divRefs.current).forEach((provider: any) => {
            const div = divRefs.current[provider];
            if (div) {
                const heightPx = div.getBoundingClientRect().height;
                newHeights[provider] = heightPx;
            }
        });
        dispatch(savingHeights(newHeights));
    }, [newData]);
    const lines = Array.from({ length: 6 }, (_, index) => index + 1);
    return (
        <div
            className="bg-[#f5f5f5] min-h-[41rem] relative mt-3"
            data-testid="planner-view"
        >
            <div
                className="relative"
                style={{ minHeight: '41rem', maxHeight: '100rem' }}
            >
                {calendarView !== 'day' &&
                    lines.map((line) => (
                        <div
                            key={`vertical-${line}`}
                            className="grid-line vertical"
                            style={{ left: `${(line * 100) / 7}%` }}
                        ></div>
                    ))}
                {Object.keys(newData).length > 0 ? (
                    searchUserIds?.map((provider: any, providerIndex: any) => (
                        <div
                            ref={(el) => (divRefs.current[provider] = el)}
                            key={providerIndex}
                            className={`${calendarView === 'day' ? 'grid-cols-1' : 'grid-cols-7'} min-h-20 w-full grid border-b-2 border-[#ddd] pb-8`}
                        >
                            {header?.weekDays?.map(
                                (item: any, indexHeader: any) => {
                                    const eventsForTheDay = newData?.[
                                        provider
                                    ]?.filter((event: any) =>
                                        moment(event.startTime).isSame(
                                            moment(item),
                                            'day'
                                        )
                                    );
                                    return (
                                        <>
                                            <div
                                                onClick={() => {
                                                    const time: any =
                                                        moment(item).format(
                                                            'YYYY-MM-DD'
                                                        );
                                                    dispatch(
                                                        setStartTime(time)
                                                    );
                                                    dispatch(
                                                        setClickedProvider(
                                                            provider
                                                        )
                                                    );
                                                    dispatch(resetAuthCode());
                                                    dispatch(clearHours());
                                                    dispatch(
                                                        setAppointmentData({})
                                                    );
                                                    const blank: any = '';
                                                    dispatch(
                                                        setTimezone(blank)
                                                    );
                                                    setTimeout(() => {
                                                        navigateRef(
                                                            '/add-new-event'
                                                        );
                                                    }, 1000);
                                                }}
                                                data-testid={`click-add-event-${indexHeader}`}
                                                key={indexHeader}
                                                className="flex flex-col bg-[#f5f5f5] cursor-pointer"
                                            >
                                                <div
                                                    style={{
                                                        display:
                                                            providerIndex === 0
                                                                ? ''
                                                                : 'none',
                                                    }}
                                                    className={`${moment(item).isSame(moment(), 'day') ? 'bg-[#eaf6ff]' : 'bg-[#f5f5f5]'} ${providerIndex === 0 ? 'border-b-2 border-[#ddd]' : moment(item).isSame(moment(), 'day') ? 'text-[#eaf6ff]' : 'text-[#f5f5f5]'} text-center`}
                                                >
                                                    <label className="text-sm font-['Lato']">
                                                        {moment(item).format(
                                                            'DD ddd'
                                                        )}
                                                    </label>
                                                </div>
                                                {eventsForTheDay?.map(
                                                    (
                                                        event: any,
                                                        eventIndex: any
                                                    ) => (
                                                        <div
                                                            key={eventIndex}
                                                            className="pt-3"
                                                        >
                                                            <div
                                                                style={{
                                                                    backgroundColor:
                                                                        backgroundColors[
                                                                            event
                                                                                ?.searchUserId
                                                                        ],
                                                                    borderLeft:
                                                                        calendarView ===
                                                                        'day'
                                                                            ? '2px solid'
                                                                            : '7px solid',
                                                                    borderColor:
                                                                        borderColors[
                                                                            event
                                                                                ?.searchUserId
                                                                        ],
                                                                    height: '7rem',
                                                                    width: '100%',
                                                                    paddingTop:
                                                                        '10px',
                                                                    paddingRight:
                                                                        '5px',
                                                                    paddingLeft:
                                                                        '8px',
                                                                    marginBottom:
                                                                        '10px',
                                                                }}
                                                            >
                                                                {event?.isBillable &&
                                                                !event?.sessionNoteBilling ? (
                                                                    <div
                                                                        className="relative"
                                                                        onClick={(
                                                                            e: any
                                                                        ) => {
                                                                            e?.stopPropagation();
                                                                            handleEventClick(
                                                                                event.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                eventIcon
                                                                            }
                                                                            className={`w-[1rem] absolute end-0 ${!permissions?.view_others_calendar ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        className="relative"
                                                                        onClick={(
                                                                            e: any
                                                                        ) => {
                                                                            e?.stopPropagation();
                                                                            handleEventClick(
                                                                                event.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                billedTickIcon
                                                                            }
                                                                            className={`w-[1rem] absolute end-0 ${!permissions?.view_others_calendar ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div
                                                                    className="flex flex-row"
                                                                    onClick={(
                                                                        e: any
                                                                    ) => {
                                                                        e?.stopPropagation();
                                                                        handleEventClick(
                                                                            event.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            backgroundColor:
                                                                                borderColors[
                                                                                    event
                                                                                        ?.searchUserId
                                                                                ],
                                                                        }}
                                                                        className="w-[0.5rem] h-[0.5rem] rounded-full text-transparent mt-1 mr-1"
                                                                    >
                                                                        1
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <label className="font-light text-sm font-['Lato']">
                                                                            {
                                                                                event?.title
                                                                            }
                                                                        </label>
                                                                        {event?.isBillable && (
                                                                            <div className="flex space-x-1">
                                                                                <label className="font-light text-sm font-['Lato'] text-gray-500">
                                                                                    Billing
                                                                                    Code:
                                                                                </label>
                                                                                <label className="font-light text-sm font-['Lato']">
                                                                                    {
                                                                                        event?.authorizationCode
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between mt-7">
                                                                    <div>
                                                                        <label className="font-light text-[11px] font-['Lato']">
                                                                            {`${event?.providerId?.firstName} ${event?.providerId?.lastName}`}
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <label className="font-light text-[11px] font-['Lato']">
                                                                            {`${formatTime(event?.startTime)}-${formatTime(event?.endTime)}`}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    );
                                }
                            )}
                        </div>
                    ))
                ) : (
                    <div className="w-full grid grid-cols-7">
                        {header?.weekDays?.map(
                            (item: any, indexHeader: any) => {
                                return (
                                    <div
                                        key={indexHeader}
                                        className="flex flex-col gap-y-3"
                                    >
                                        <div
                                            className={`${
                                                moment(item).isSame(
                                                    moment(),
                                                    'day'
                                                )
                                                    ? 'bg-[#eaf6ff]'
                                                    : 'bg-[#f5f5f5]'
                                            } text-center border-b-2 border-[#ddd]`}
                                        >
                                            <label className="text-sm font-['Lato']">
                                                {moment(item).format('DD ddd')}
                                            </label>
                                        </div>
                                        <div className="bg-[#f5f5f5] h-[90vh]"></div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
