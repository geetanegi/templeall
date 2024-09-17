import React, { useEffect } from 'react';
import clock from '../../../assets/img/LandingPageIcons/Clock.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { referringProviderCall } from '../../../redux/slice/UserDashboardData/userDashboard';
import dot from '../../../assets/img/LandingPageIcons/dot.svg';
export default function ClientReferringProvider(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const provider = useSelector(
        ({ userDashboard }: any) => userDashboard?.referringProvider
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
        dispatch(referringProviderCall(payload));
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
        <div className="referringProvider my-2 mx-2">
            <div className="flex py-1 px-3 ">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img
                        className="py-1 px-1 align-middle"
                        src={clock}
                        alt=""
                    />
                </div>
                <h1 className="font-[lato] mx-4 font-semibold p-1">
                    Referring Provider
                </h1>
            </div>
            <div className="flex flex-col">
                <div className="p-1 min-w-full inline-block align-middle">
                    <div className="mx-2 p-1.5 py-3 min-w-full inline-block align-middle h-[13rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <table className="min-w-full">
                            <tbody className="whitespace-nowrap text-base font-base ">
                                {provider?.map((data: any, index: any) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="pr-2 mt-4 float-right">
                                            <img
                                                className=" h-3"
                                                src={dot}
                                                alt=""
                                            />
                                        </td>
                                        <td className="font-normal font-['Lato']">
                                            <h1 className="my-2">
                                                {
                                                    data?.referringProviderFullName
                                                }
                                            </h1>
                                            <div className="space-y-1  ml-2 text-sm text-zinc-600">
                                                <h1 className="flex">
                                                    Phone :
                                                    <p className="text-black">
                                                        {
                                                            data?.referringProviderCellPhone
                                                        }
                                                    </p>
                                                </h1>
                                                <h1 className="flex">
                                                    Child :
                                                    <p className="text-black">
                                                        {data?.childFullName}
                                                    </p>
                                                </h1>
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
    );
}
