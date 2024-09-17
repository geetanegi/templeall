import React, { useState } from 'react';
import forwardWhiteArrow from '../../assets/img/forwardWhiteArrow.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getMultipleUsersOrganizationInfoAPI from '../../api/services/OrganizationsApi/getMultipleUsersOrganizationInfo.service';
import { ROUTES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import {
    SavingLoginData,
    SavingPermission,
} from '../../redux/slice/getUserPermission/getUserPermissionSlice';
import getUserPermissions from '../../api/services/getUserPermission.service';
import { getUserProfileDataCall } from '../../redux/slice/UserProfileData/userProfileDataSlice';
import SmallLoaderComponent from '../LoaderComponent/smallLoader';
export default function SelectOrganization(): React.JSX.Element {
    const navigate = useNavigate();
    const { login } = useAuth();
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false);
    const organizationData = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const userData = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.user
    );
    const handleLogin = async (value: any): Promise<any> => {
        setLoading(true);
        const data = {
            userId: organizationData?.userId,
            username: userData?.username,
            userLoginId: organizationData?.userLoginId,
            orgId: value?.id,
        };
        const res =
            await getMultipleUsersOrganizationInfoAPI.getMultipleUsersOrganizationInfo(
                data
            );
        if (!res?.data?.error) {
            localStorage.setItem(
                'access_token',
                JSON.stringify(res.data?.data)
            );
            const res1 = await getUserPermissions.userPermission();
            if (!res1?.data?.error) {
                setTimeout(() => {
                    navigate(ROUTES.LandingPage);
                }, 1000);
                dispatch(SavingLoginData(res?.data));
            }
            dispatch(SavingPermission(res1?.data));
            login().then(() => {
                dispatch(getUserProfileDataCall());
            });
        } else {
            setLoading(false);
            return res;
        }
    };
    return (
        <div
            className={`w-1/3 flex items-center justify-center`}
            data-testid="organization-page"
        >
            <div className="bg-[#FAFAFA] mr-8 rounded-[2rem] w-full shadow-2xl border-2 border-[#45D2F5] md:mr-20 lg:mr-40">
                <div className="p-4 mx-4 md:mx-8">
                    <div className="flex flex-col space-y-6 w-full md:w-[30rem]">
                        <h1 className="font-['Lato'] leading-tight text-3xl font-semibold">
                            Select Organization
                        </h1>
                        <label className="font-['Lato'] leading-tight text-medium font-medium">
                            Select the organization you want to login to
                        </label>
                    </div>
                    <div className="space-y-12 mt-10 mb-[10rem]">
                        {organizationData?.organizations?.map(
                            (item: any, index: any) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-between border border-gray-300 rounded-lg"
                                    >
                                        <div className="pl-5 py-5 ">
                                            <label className="text-lg font-semibold text-zinc-800 font-['Lato'] leading-tight">
                                                {item?.name}
                                            </label>
                                        </div>
                                        <div
                                            className="flex px-4 text-center items-center  rounded-r-lg bg-[#45D2F5] cursor-pointer"
                                            onClick={() => handleLogin(item)}
                                            // data-testid={`organization-click-${index}`}
                                        >
                                            {loading ? (
                                                <div>
                                                    <SmallLoaderComponent />
                                                </div>
                                            ) : (
                                                <img src={forwardWhiteArrow} />
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
