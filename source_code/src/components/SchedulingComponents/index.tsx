/* eslint-disable max-len */
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Calendar from 'react-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import Timeline from './Timeline';
import MultipleUsers from './MultipleUsers';
import { setPlannerView } from '../../redux/slice/SchedulingRedux/Scheduling';
import { useDispatch, useSelector } from 'react-redux';
export default function Scheduling(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [selectedDate, setSelectedDate] = useState<any>(new Date());
    const [calendarView, setCalendarView] = useState<any>('week');
    const plannerView = useSelector(
        ({ scheduling }: any) => scheduling?.plannerView
    );
    const [calendarViewSmall, setCalendarViewSmall] = useState<any>('month');
    const handleDateClick = (date: any): any => {
        setSelectedDate(date);
    };
    const handlePlannerView = async (): Promise<any> => {
        dispatch(setPlannerView(false));
    };
    return (
        <div className="bg-[#FFFFFF]-50 mt-1" data-testid="scheduling-page">
            {plannerView && (
                <div className="my-3 mx-6">
                    <ol
                        className="flex items-center whitespace-nowrap"
                        aria-label="Breadcrumb"
                        data-testid="bread-crumb"
                    >
                        <li
                            className="inline-flex items-center cursor-pointer"
                            onClick={() => handlePlannerView()}
                        >
                            <label className="cursor-pointer flex items-center text-sm text-[#0D7899] hover:text-[#0D7899] focus:outline-none focus:text-[#0D7899]">
                                Calendar View /
                            </label>
                        </li>
                        <li
                            className="inline-flex pl-1 items-center text-sm font-semibold text-gray-800 truncate"
                            aria-current="page"
                        >
                            Planner
                        </li>
                    </ol>
                </div>
            )}
            <div>
                <Header
                    setCalendarView={setCalendarView}
                    setCalendarViewSmall={setCalendarViewSmall}
                />
            </div>
            <div className="flex space-x-4">
                <div
                    className={`${plannerView ? 'min-h-[45rem]' : 'h-[102vh]'} custom-calendar mt-4 rounded-r-3xl border shadow-md w-[24%] px-4 pt-5`}
                >
                    {!plannerView && (
                        <div>
                            {calendarViewSmall === 'month' ? (
                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    view={calendarViewSmall}
                                    className="calendar-week"
                                    onClickDay={(date) => handleDateClick(date)}
                                />
                            ) : (
                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    view={calendarViewSmall}
                                    className="calendar-month"
                                    onClickMonth={(date) =>
                                        handleDateClick(date)
                                    }
                                />
                            )}
                        </div>
                    )}
                    <MultipleUsers />
                </div>
                <div className="w-full mt-5">
                    <Timeline
                        calendarView={calendarView}
                        selectedDate={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
}
