import React, { useEffect, useState } from 'react';
import Timer from '../../../../assets/img/LandingPageIcons/Timer.svg';
import calendar from '../../../../assets/img/calendarIcon.svg';
import notification from '../../../../assets/img/alertIcon.svg';
import {
    getUnapprovedAvailabilityRequestCall,
    technicianAvailabilityDaysCall,
} from '../../../../redux/slice/UserDashboardData/userDashboard';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SetAvailabilityModal from './SetAvailabilityModal';
import { daysOfWeek } from '../../../../constants/HoursCal';
import { useParams } from 'react-router-dom';
export default function ClinicianWorkingHours(): React.JSX.Element {
    const [openModal, setOpenModal] = useState<any>(false);
    const dispatch = useDispatch<any>();
    const params = useParams();
    const clientSession = useSelector(
        ({ userDashboard }: any) => userDashboard?.technicianAvailability
    );
    const request = useSelector(
        ({ userDashboard }: any) => userDashboard?.UnapprovedAvailabilityRequest
    );
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const formatTime = (time: any): any =>
        moment(time, 'HH:mm:ss').format('hh:mm A');
    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
        };
        dispatch(technicianAvailabilityDaysCall(payload));
        dispatch(getUnapprovedAvailabilityRequestCall(payload));
    }, [dispatch]);
    return (
        <>
            <div className="sessionCount my-3 mx-3">
                <div className="flex flex-col py-1 px-5 ">
                    <div className="flex justify-between">
                        <div className="flex">
                            <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                                <img
                                    className="p-1 align-middle"
                                    src={Timer}
                                    alt=""
                                />
                            </div>
                            <h1 className="font-[lato] font-semibold mx-6 p-1">
                                Technician Availability
                            </h1>
                        </div>
                        <div
                            className="flex w-40 space-x-2 items-center cursor-pointer"
                            onClick={() => setOpenModal(true)}
                        >
                            <img src={calendar} className="cursor-pointer" />
                            <label className="text-sm text-primary-600 font-[lato] cursor-pointe">
                                Set Availability
                            </label>
                            {!request?.requestApproved && (
                                <img
                                    src={notification}
                                    className="pb-3 cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex ml-14 p-1 border-b-[1px] border-secondary-200 space-x-2 items-center">
                        <label className="text-sm font-light text-secondary-300 font-[lato]">
                            Date Range:
                        </label>
                        <label className="text-base font-light font-[lato]">
                            {clientSession?.fromDate && clientSession?.toDate
                                ? `${moment(clientSession?.fromDate).format('MM/DD/YYYY')} to ${moment(clientSession?.toDate).format('MM/DD/YYYY')}`
                                : ''}
                        </label>
                    </div>
                </div>
                <div className="ml-5 mt-2 flex flex-col space-y-1 h-[9.2rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    {daysOfWeek?.map((day) => (
                        <div key={day} className="flex items-center space-x-4">
                            <div className="w-[8px] h-[8px] bg-primary-600 rounded-full"></div>
                            <div className="w-24 font-semibold font-[lato] text-sm">
                                {day}
                            </div>
                            <div className="flex flex-wrap space-x-2 ml-2">
                                {clientSession?.slotsData?.[day] &&
                                clientSession.slotsData[day].length > 0 ? (
                                    clientSession?.slotsData[day]?.map(
                                        (interval: any, index: any) => (
                                            <span
                                                key={index}
                                                className={`${index !== clientSession.slotsData[day].length - 1 ? 'border-r-[2px] border-secondary-200' : ''} inline-block font-[lato] text-[12px] font-light px-2 py-1`}
                                            >
                                                {`${formatTime(interval.from)} - ${formatTime(interval.to)}`}
                                            </span>
                                        )
                                    )
                                ) : (
                                    <span className="inline-block   px-2 py-1">
                                        -------
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {openModal && (
                <SetAvailabilityModal
                    data={clientSession}
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                />
            )}
        </>
    );
}
