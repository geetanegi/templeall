import React, { useEffect } from 'react';
import Count from '../../../../assets/img/LandingPageIcons/SessionCount.svg';
import { clientSessionCall } from '../../../../redux/slice/UserDashboardData/userDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
export default function TechnicianClientSession(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const clientSession = useSelector(
        ({ userDashboard }: any) => userDashboard?.clientSession
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
        dispatch(clientSessionCall(payload));
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
        <div className="ClientSession py-3 mx-3">
            <div className="flex py-2 px-3 ">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img
                        className="py-1.5 px-1.5 align-middle"
                        src={Count}
                        alt=""
                    />
                </div>
                <h1 className="text-black text-base font-semibold font-['Lato'] mx-5 p-1">
                    Client Session
                </h1>
            </div>
            <div className="">
                <div className="flex flex-col">
                    <div className="p-1 min-w-full inline-block align-middle">
                        <div className="mx-2 p-1.5 py-3 min-w-full inline-block align-middle h-[12rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <table className="min-w-full">
                                <thead className="h-6  text-left">
                                    <tr className="">
                                        <th className=" text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Session Name
                                        </th>
                                        <th className=" text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Created For
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Created On
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" whitespace-nowrap text-sm font-normal  overflow-y-auto">
                                    {clientSession?.map((item: any) => (
                                        <tr
                                            key={item}
                                            className="hover:bg-gray-100"
                                        >
                                            <Link
                                                to={`${ROUTES.runSession}/${item?.sessionId}`}
                                            >
                                                <td className=" py-3 text-[#158BB0] align-top font-normal font-['Lato']">
                                                    {item?.SessionName}
                                                </td>
                                            </Link>
                                            <td className=" py-3 text-black text-base font-medium font-['Lato'] align-top">
                                                {item?.createdFor}
                                            </td>
                                            <td className=" py-3 text-black text-base font-medium font-['Lato'] align-top">
                                                {item?.CreatedOn?.split('T')[0]}
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
