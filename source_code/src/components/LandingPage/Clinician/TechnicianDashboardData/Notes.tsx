import React, { useEffect } from 'react';
import notes from '../../../../assets/img/LandingPageIcons/Notes.svg';
import { useDispatch, useSelector } from 'react-redux';
import { userNotesCall } from '../../../../redux/slice/UserDashboardData/userDashboard';
import time from '../../../../assets/img/LandingPageIcons/time.svg';
import redTime from '../../../../assets/img/LandingPageIcons/redTime.svg';
import dot from '../../../../assets/img/LandingPageIcons/dot.svg';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../constants';
import moment, { utc } from 'moment';
export default function Notes(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const notesData = useSelector(
        ({ userDashboard }: any) => userDashboard?.notes
    );
    const updatedNotesData = notesData?.map((data: any) => {
        const timePassed = moment(
            utc(data?.Date).local().format('YYYY-MM-DDTHH:mm')
        ).diff(moment().format('YYYY-MM-DDTHH:mm'), 'hours');
        const date = moment(utc(data?.Date).local()).format('YYYY-MM-DDTHH:mm');
        const day = moment(utc(data?.Date).local()).format('dddd');
        const startTime = moment(utc(data?.startTime).local()).format(
            'hh:mm A'
        );
        const endTime = moment(utc(data?.endTime).local()).format('hh:mm A');

        return { ...data, timePassed, day, startTime, endTime, date };
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
        dispatch(userNotesCall(payload));
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
        <div className="notes py-3 mx-3">
            <div className="flex py-2 px-3 ">
                <div className="watch w-8 h-8 bg-white rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]">
                    <img
                        className="py-1.5 px-1.5 align-middle"
                        src={notes}
                        alt=""
                    />
                </div>

                <h1 className="text-black text-base font-semibold font-['Lato'] mx-5 p-1">
                    Unconverted Session Notes
                </h1>
            </div>

            <div className="">
                <div className="flex flex-col">
                    <div className="p-1 min-w-full inline-block align-middle">
                        <div className="mx-2 p-1.5 py-3 min-w-full inline-block align-middle h-[25rem]  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <table className="min-w-full">
                                <thead className="h-3  text-left">
                                    <tr className="">
                                        <th className=" text-neutral-500 text-xs font-normal  font-['Lato']">
                                            {''}
                                        </th>
                                        <th className=" text-neutral-500 text-xs font-normal  font-['Lato']">
                                            {''}
                                        </th>
                                        <th className="  text-neutral-500 text-xs font-normal  font-['Lato']">
                                            {''}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className=" whitespace-nowrap text-xs font-normal  overflow-y-auto">
                                    {updatedNotesData?.map((item: any) => (
                                        <tr
                                            key={item}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className=" pt-4 text-base font-medium font-['Lato'] align-top mr-1">
                                                <img src={dot} alt="" />
                                            </td>
                                            <td
                                                className={`py-1 text-base font-medium font-['Lato']`}
                                            >
                                                <div
                                                    className={` flex py-1 ${
                                                        item?.timePassed < -24
                                                            ? 'text-red-700'
                                                            : 'text-black'
                                                    }`}
                                                >
                                                    <div>
                                                        <p
                                                            className="max-w-[14rem] truncate overflow-hidden "
                                                            title={item?.Title}
                                                        >
                                                            {item?.Title}
                                                        </p>
                                                        <h1
                                                            className=" truncate overflow-hidden my-1 text-neutral-400 text-xs  font-['Lato']"
                                                            title={`${item?.day} | ${item?.date?.split('T')[0]} | ${item?.startTime}-${item?.endTime}`}
                                                        >
                                                            {`${item?.day} | ${item?.date?.split('T')[0]} | ${item?.startTime}-${item?.endTime}`}
                                                        </h1>
                                                    </div>

                                                    {item?.timePassed < 0 ? (
                                                        <div className="flex justify-end items-center">
                                                            <img
                                                                className={`pl-1 py-1   align-middle`}
                                                                src={
                                                                    item?.timePassed <
                                                                    -24
                                                                        ? redTime
                                                                        : time
                                                                }
                                                                alt=""
                                                            />
                                                            <p className=" mt-1 text-xs">
                                                                {Math.abs(
                                                                    item?.timePassed
                                                                )}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>

                                                <h1 className="text-sm">{`${item?.BillingCode ? item?.BillingCode : ''} ${item?.Client ? item?.Client : ''}`}</h1>
                                            </td>
                                            <Link
                                                to={`${ROUTES.appointmentDetails}/${item?.SchedulingEventId}`}
                                            >
                                                <td className=" py-2 text-[#48ABCA]  text-sm font-['Lato']">
                                                    Convert
                                                </td>
                                            </Link>
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
