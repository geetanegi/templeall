import React, { useEffect } from 'react';
import Goal from '../../../../assets/img/LandingPageIcons/Goal.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { intakesCall } from '../../../../redux/slice/UserDashboardData/userDashboard';
import moment, { utc } from 'moment';
import { AppDispatch } from '../../../../redux/store';
interface RootState {
    userDashboard: {
        intakes: string[];
    };
}
export default function Intakes(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const intake = useSelector(
        ({ userDashboard }: RootState) => userDashboard?.intakes
    );
    const ApiArray = intake?.map((data: any) => {
        const completed = moment(utc(data?.completedOn).local()).format(
            'YYYY-MM-DD'
        );

        return { ...data, completed };
    });

    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
            name: 'Waitlist',
        };
        dispatch(intakesCall(payload));
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
        <div className="py-3 mx-3">
            <div className="flex py-3 px-3">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img className="py-1 px-1 align-middle" src={Goal} alt="" />
                </div>
                <h1 className="font-[lato] mx-4 font-semibold p-1">
                    Intakes - Next in Line
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
                                            Client Name
                                        </th>
                                        <th className=" text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Child Name
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Desired Services
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Completed On
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" whitespace-nowrap text-xs font-normal text-left">
                                    {ApiArray?.map((item: any) => (
                                        <tr
                                            key={item}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className=" py-3 whitespace-nowrap text-black text-base font-medium  font-['Lato']">
                                                {item?.clientName}
                                            </td>
                                            <td className="py-3 text-black text-base font-medium font-['Lato'] align-top my-1">
                                                {item?.childName}
                                            </td>
                                            <td className="py-3 text-base font-medium font-['Lato'] align-top my-1">
                                                <div
                                                    className="max-w-[10rem] truncate overflow-hidden"
                                                    title={item?.desiredService}
                                                >
                                                    {item?.desiredService}
                                                </div>
                                            </td>
                                            <td className="py-3 text-base font-medium font-['Lato'] align-top my-1">
                                                {item?.completed}
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
