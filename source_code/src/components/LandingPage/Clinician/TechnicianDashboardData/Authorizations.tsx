import React, { useEffect } from 'react';
import user from '../../../../assets/img/userOnBoarding/user.svg';
import { authorizationsCall } from '../../../../redux/slice/UserDashboardData/userDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment, { utc } from 'moment';
import { AppDispatch } from '../../../../redux/store';
interface RootState {
    userDashboard: {
        authorizations: string[];
    };
}
export default function Authorizations(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const authorization = useSelector(
        ({ userDashboard }: RootState) => userDashboard?.authorizations
    );
    const arrayData = authorization?.map((data: any) => {
        const date = moment(utc(data?.expiryDate).local()).format('YYYY-MM-DD');

        return { ...data, date };
    });
    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
            currentDate: moment().format('YYYY-MM-DD'),
        };
        dispatch(authorizationsCall(payload));
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
                    <img
                        className="py-1 px-1 h-[2rem] w-[2rem] align-middle"
                        src={user}
                        alt=""
                    />
                </div>
                <h1 className="font-[lato] mx-4 font-semibold p-1">
                    Authorizations
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
                                            Child Name
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Authorizations
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            Expiry Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" whitespace-nowrap text-xs font-normal text-left">
                                    {arrayData?.map((item: any) => (
                                        <tr
                                            key={item}
                                            className="hover:bg-gray-100 border-b border-b-gray-400"
                                        >
                                            <td className="py-3 align-top whitespace-nowrap text-black text-base font-medium font-['Lato']">
                                                {item?.childName}
                                            </td>

                                            <td className="py-3 text-gray-500 font-medium font-['Lato'] align-top my-1">
                                                {item?.authorizationCodes?.map(
                                                    (data: any) => (
                                                        <div
                                                            key={data}
                                                            className="max-w-[20rem] my-2 text-base truncate overflow-hidden"
                                                            title={data?.code}
                                                        >
                                                            {`${data?.code ? data?.code : ''} - ${
                                                                data?.description
                                                                    ? data?.description
                                                                    : ''
                                                            }`}
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                            <td className="py-3 text-base font-medium font-['Lato'] align-top my-1">
                                                {item?.date}
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
