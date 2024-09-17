import React, { useEffect } from 'react';
import Goal from '../../../assets/img/LandingPageIcons/Goal.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { viewOnlyValueData } from '../../../redux/slice/ViewOnlyComponent/ViewOnly';
import { currentGoalCall } from '../../../redux/slice/UserDashboardData/userDashboard';
export default function CurrentGoal(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const programBook = useSelector(
        ({ userDashboard }: any) => userDashboard?.currentGoal
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
        dispatch(currentGoalCall(payload));
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
    const ViewMode = (): void => {
        dispatch(viewOnlyValueData(true));
    };
    return (
        <div className="UpcomingAppointments  mx-3">
            <div className="flex py-3 px-3 ">
                <div className=" w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img className="py-1 px-1 align-middle" src={Goal} alt="" />
                </div>

                <h1 className="font-[lato] font-semibold mx-6 p-1">
                    Current Goals
                </h1>
            </div>
            <div className="flex flex-col">
                <div className="p-1 min-w-full inline-block align-middle">
                    <div className="mx-2 p-1.5 py-3 min-w-full inline-block align-middle h-[14rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <table className="min-w-full">
                            <thead className="h-8 text-left">
                                <tr>
                                    <th className="text-neutral-500 text-xs font-normal  font-['Lato']">
                                        Child Name
                                    </th>
                                    <th className="text-neutral-500 text-xs font-normal  font-['Lato']">
                                        Service Provider
                                    </th>
                                    <th className="text-neutral-500 text-xs font-normal  font-['Lato']">
                                        Program Book
                                    </th>
                                    <th className="text-neutral-500 text-xs font-normal  font-['Lato']">
                                        Service Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="whitespace-nowrap text-base font-base ">
                                {programBook?.programBook?.map((data: any) => (
                                    <tr
                                        key={data}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="py-4   font-normal font-['Lato']">
                                            {data?.childName}
                                        </td>
                                        <td className="py-4   font-normal font-['Lato']">
                                            {data?.serviceProvider}
                                        </td>
                                        <Link
                                            to={`/program-book/${data?.programBookUUID}`}
                                        >
                                            <td
                                                className="py-4 text-[#158BB0] align-top font-normal font-['Lato']"
                                                onClick={() => ViewMode()}
                                            >
                                                {data?.programBookName}
                                            </td>
                                        </Link>
                                        <td className="py-4 align-top font-normal font-['Lato']">
                                            {data?.serviceType}
                                        </td>
                                    </tr>
                                ))}
                                {programBook?.interventionPlan?.map(
                                    (data: any) => (
                                        <tr
                                            key={data}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="py-4   font-normal font-['Lato']">
                                                {data?.childName}
                                            </td>
                                            <td className="py-4   font-normal font-['Lato']">
                                                {data?.serviceProvider}
                                            </td>
                                            <Link
                                                to={`/interventionLanding/${data?.interventionPlanId}`}
                                            >
                                                <td
                                                    className="py-4 text-[#158BB0] align-top font-normal font-['Lato']"
                                                    onClick={() => ViewMode()}
                                                >
                                                    {data?.interventionPlanName}
                                                </td>
                                            </Link>
                                            <td className="py-4 align-top font-normal font-['Lato']">
                                                {data?.serviceType}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
