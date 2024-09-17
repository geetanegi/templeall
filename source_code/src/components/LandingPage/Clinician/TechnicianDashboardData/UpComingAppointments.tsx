import React, { useEffect } from 'react';
import clock from '../../../../assets/img/LandingPageIcons/Clock.svg';
import { useDispatch, useSelector } from 'react-redux';
import { employeeAppointmentCall } from '../../../../redux/slice/UserDashboardData/userDashboard';
import { useParams } from 'react-router-dom';
import moment, { utc } from 'moment';

export default function ClinicianUpcomingAppointments(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const appointment = useSelector(
        ({ userDashboard }: any) => userDashboard?.employeeAppointment
    );
    const updatedAppointment = appointment?.map((data: any) => {
        const date = moment(utc(data?.Date).local()).format('YYYY-MM-DDTHH:mm');
        const startTime = moment(utc(data?.FromDate).local()).format('hh:mm A');
        const endTime = moment(utc(data?.ToDate).local()).format('hh:mm A');

        return { ...data, startTime, endTime, date };
    });
    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
        };
        dispatch(employeeAppointmentCall(payload));
    }, [
        dispatch,
        isNavigatedUser,
        params?.userId,
        params?.orgId,
        userPermission?.value?.data?.userId,
        userPermission?.userId,
        userPermission?.value?.data?.orgId,
        userPermission?.orgId,
    ]);
    return (
        <div className="UpcomingAppointments py-3 mx-3">
            <div className="flex py-1 px-3 ">
                <div className="time shadow-lg">
                    <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                        <img
                            className="py-1 px-1 align-middle"
                            src={clock}
                            alt=""
                        />
                    </div>
                </div>

                <h1 className="text-black text-base font-semibold font-['Lato'] mx-4 p-1">
                    Upcoming Appointments
                </h1>
            </div>

            <div className="">
                <div className="flex flex-col">
                    <div className="p-1 min-w-full inline-block align-middle">
                        <div className="mx-2 p-1.5 py-3 min-w-full inline-block align-middle h-[14rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <table className="min-w-full">
                                <thead className="h-10  text-left">
                                    <tr className="">
                                        <th className=" text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Appointment with
                                        </th>
                                        <th className=" text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Date
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Time
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Appointment Title
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" whitespace-nowrap text-xs font-normal text-left">
                                    {updatedAppointment?.map((item: any) => (
                                        <tr
                                            key={item}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className=" py-3 whitespace-nowrap text-black text-base font-medium  font-['Lato']">
                                                {item?.AppointmentWith}
                                                <h1 className="text-neutral-400 text-xs font-normal font-['Lato']">
                                                    {item?.role}
                                                </h1>
                                            </td>
                                            <td className=" py-3 text-black text-base font-medium font-['Lato'] align-top my-1">
                                                {item?.date?.split('T')[0]}
                                            </td>
                                            <td className=" py-3 text-base font-medium font-['Lato'] align-top my-1">
                                                {`${item?.startTime} - ${item?.endTime}`}
                                            </td>
                                            <td className="py-3 text-base font-medium font-['Lato'] align-top my-1">
                                                <div
                                                    className="max-w-[10rem] truncate overflow-hidden"
                                                    title={item?.Title}
                                                >
                                                    {item?.Title}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
