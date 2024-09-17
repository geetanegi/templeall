import React, { useEffect } from 'react';
import Timer from '../../../../assets/img/LandingPageIcons/Timer.svg';
import { productivityCall } from '../../../../redux/slice/UserDashboardData/userDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function Productivity(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const productivity = useSelector(
        ({ userDashboard }: any) => userDashboard?.productivity
    );
    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
        };
        dispatch(productivityCall(payload));
    }, [
        dispatch,
        isNavigatedUser,
        params?.orgId,
        params?.userId,
        userPermission?.orgId,
        userPermission?.userId,
        userPermission?.value?.data?.orgId,
        userPermission?.value?.data?.userId,
    ]);

    return (
        <div className="sessionCount mx-3">
            <div className="flex py-3 px-3 ">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img
                        className="py-1 px-1 align-middle"
                        src={Timer}
                        alt=""
                    />
                </div>
                <h1 className="font-[lato] mx-4 font-semibold p-1">
                    Productivity
                </h1>
            </div>
            <div className=" overflow-hidden font-[lato] mt-4">
                <h1 className=" mx-10 my-7">Appointment Count</h1>
                <div className="  ml-12 space-y-6 text-zinc-600 text-sm">
                    <p className="flex">
                        Total Appointments :
                        <h1 className="font-semibold">
                            {productivity?.totalAppointmentCount}
                        </h1>
                    </p>
                    <p className="flex">
                        Cancelled Appointments :
                        <h1 className="font-semibold">
                            {productivity?.cancelAppointmentCount}
                        </h1>
                    </p>
                    <p className="flex">
                        Rescheduled Appointments :
                        <h1 className="font-semibold">
                            {productivity?.rescheduleAppointmentCount}
                        </h1>
                    </p>
                </div>
                <div className=" h-[0.1rem] w-[21rem] bg-zinc-200 mx-3  my-3"></div>
                <h1 className="mx-10 my-7">Hours</h1>
                <div className="ml-12 space-y-6  text-zinc-600 text-sm">
                    <p className="flex">
                        Billable Hours :
                        <h1 className="font-semibold">
                            {productivity?.billableHours}
                        </h1>
                    </p>
                    <p className="flex">
                        Non-Billable Hours :
                        <h1 className="font-semibold">
                            {productivity?.nonBillableHours}
                        </h1>
                    </p>
                </div>
                <div className=" h-[0.1rem] w-[21rem] bg-zinc-200 mx-3 my-3"></div>
            </div>
        </div>
    );
}
