import React, { useEffect } from 'react';
import InquiryIcon from '../../../../assets/img/LandingPageIcons/inquiries.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { inquiriesCall } from '../../../../redux/slice/UserDashboardData/userDashboard';
import { getClientServicesCall } from '../../../../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
import moment, { utc } from 'moment';
import { AppDispatch } from '../../../../redux/store';
export default function Inquiries(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const inquiry = useSelector(
        ({ userDashboard }: any) => userDashboard?.inquiries
    );
    const clientService = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall
    );
    const getServiceNameById = (id: number): string => {
        const service = clientService?.services?.data?.find(
            (s: any) => s.id === id
        );
        return service ? service.name : '';
    };
    const dataArray: any[] = [];
    inquiry?.forEach((userItem: any) => {
        const children = JSON.parse(userItem?.userChildren);
        children?.forEach((childItem: any) => {
            if (Array.isArray(childItem.services)) {
                const serviceNames = childItem.services
                    .map(getServiceNameById)
                    .join(', ');
                dataArray?.push({
                    parentName: userItem?.clientName,
                    requestedOn: userItem?.requestedOn
                        ? moment(utc(userItem?.requestedOn).local()).format(
                              'YYYY-MM-DDTHH:mm'
                          )
                        : '',
                    serviceName: serviceNames,
                    ...childItem,
                });
            }
        });
    });
    useEffect(() => {
        const payload = {
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
            name: 'Under Inquiry',
        };
        dispatch(inquiriesCall(payload));
        dispatch(getClientServicesCall({ type: '' }));
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
                        className="p-0.5 align-middle"
                        src={InquiryIcon}
                        alt=""
                    />
                </div>
                <h1 className="font-[lato] mx-4 font-semibold p-1">
                    Inquiries
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
                                            Requested On
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" whitespace-nowrap text-xs font-normal text-left">
                                    {dataArray?.map((item: any) => (
                                        <tr
                                            key={item}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="py-3 whitespace-nowrap text-black text-base font-medium font-['Lato']">
                                                {item?.parentName}
                                            </td>
                                            <td className="py-3 text-black text-base font-medium font-['Lato'] align-top my-1">
                                                {`${item?.childFirstName} ${item?.childLastName}`}
                                            </td>
                                            <td className="py-3 text-base font-medium font-['Lato'] align-top my-1">
                                                <div
                                                    className="max-w-[10rem] truncate overflow-hidden"
                                                    title={item?.serviceName}
                                                >
                                                    {item?.serviceName}
                                                </div>
                                            </td>
                                            <td className="py-3 text-base font-medium font-['Lato'] align-top my-1">
                                                {
                                                    item?.requestedOn?.split(
                                                        'T'
                                                    )[0]
                                                }
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
