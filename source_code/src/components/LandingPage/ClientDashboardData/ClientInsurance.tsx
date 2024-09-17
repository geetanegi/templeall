import React, { useEffect } from 'react';
import clock from '../../../assets/img/LandingPageIcons/Clock.svg';
import { useDispatch, useSelector } from 'react-redux';
import { insuranceCall } from '../../../redux/slice/UserDashboardData/userDashboard';
import { useParams } from 'react-router-dom';
export default function ClientInsurance(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const insurance = useSelector(
        ({ userDashboard }: any) => userDashboard?.insurances
    );
    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
            clientId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
        };
        dispatch(insuranceCall(payload));
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
        <div className="clientInsurance my-2 mx-3">
            <div className="flex py-1 px-3 ">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img
                        className="py-1 px-1 align-middle"
                        src={clock}
                        alt=""
                    />
                </div>
                <h1 className="font-[lato] mx-4 font-semibold p-1">
                    Insurance
                </h1>
            </div>
            <div className="flex flex-col">
                <div className="p-1 min-w-full inline-block align-middle">
                    <div className="mx-2 p-1.5 py-3 min-w-full inline-block align-middle h-[13rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <table className="min-w-full">
                            <thead className="h-8 text-left">
                                <tr>
                                    <th className="text-neutral-500 text-xs font-normal  font-['Lato']">
                                        Child Name
                                    </th>
                                    <th className="text-neutral-500 text-xs font-normal  font-['Lato']">
                                        Insurance Provider
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="whitespace-nowrap text-base font-base ">
                                {insurance?.map((data: any) => (
                                    <tr
                                        key={data}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="py-4   font-normal font-['Lato']">
                                            {data?.childFullName}
                                        </td>
                                        <td className="py-4   font-normal font-['Lato']">
                                            {data?.insuranceProvider}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
