/* eslint-disable react/jsx-key */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { clearOrgById } from '../../redux/slice/organizations/organizationByIdSlice';
interface MyComponentProps {
    // Define props interface here
}
const OrgView: React.FC<MyComponentProps> = () => {
    const organizationDataById = useSelector(
        ({ organizationByIdSlice }: any) => organizationByIdSlice?.value?.data
    );
    const permission = useSelector(
        ({ getUserPermission }: any) =>
            getUserPermission?.userRoles?.data?.roleName
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Component logic here
    const onCancel = (): any => {
        dispatch(clearOrgById());
        if (permission === 'Admin') {
            setTimeout(() => {
                navigate(ROUTES.LandingPage);
            }, 1000);
        } else {
            setTimeout(() => {
                navigate(ROUTES.organizationsGrid);
            }, 1000);
        }
    };
    return (
        <div className="h-screen" data-testid="org-view-page">
            <div className="pl-9 pr-9 pb-9 pt-5 h-[40rem] items-center w-80rem border mt-[1.9375rem] mx-[2rem] rounded-lg shadow-lg overflow-scroll">
                <div className="head flex flex-col justify-between">
                    <div className="flex justify-between">
                        <h1>Organization Onboarding Form</h1>
                        <p>
                            Selected File:
                            <span className=" mx-2 text-ellipsis text-sm font-light">
                                {organizationDataById?.logoName}
                            </span>
                        </p>
                    </div>
                    <p className="w-[60rem] bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                    <div className="org mt-5 w-[40rem]">
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Organization Name:
                            </label>
                            <label className="text-sm font-light ">
                                {organizationDataById?.name}
                            </label>
                        </div>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Email Address:
                            </label>
                            <label className="text-sm font-light ">
                                {organizationDataById?.organizationEmail}
                            </label>
                        </div>
                    </div>
                    <div className="org mt-5 w-[40rem] ">
                        <h2>Location & Address Details</h2>
                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                        {organizationDataById?.locations?.map(
                            (item: any, index: any) => (
                                <div className="locations my-4" key={index}>
                                    {index > 0 && (
                                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                    )}
                                    <div className=" city select py-1 mt-3 flex space-x-2">
                                        <label className="Name text-sm font-medium flex">
                                            City:
                                        </label>
                                        <label className="text-sm font-light ">
                                            {item?.city}
                                        </label>
                                    </div>
                                    <div className=" state select py-2 mt-3 flex space-x-2">
                                        <label className="Name text-sm font-medium flex">
                                            State:
                                        </label>
                                        <label className="text-sm font-light ">
                                            {item?.state}
                                        </label>
                                    </div>
                                    <div className="name mt-5 flex space-x-2">
                                        <label className="Name text-sm font-medium flex">
                                            Zip/Postal Code:
                                        </label>
                                        <label className="text-sm font-light ">
                                            {item?.zipCode}
                                        </label>
                                    </div>
                                    <div className="name mt-5 flex space-x-2">
                                        <label className="Name text-sm font-medium flex">
                                            Complete Address:
                                        </label>
                                        <label className="text-sm font-light ">
                                            {item?.addressLine1}
                                        </label>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="org mt-5 w-[40rem] ">
                        <h2>Insurance & Services</h2>
                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Services Supported:
                            </label>
                            {organizationDataById?.orgService?.map(
                                (item: any) => (
                                    <span className="text-sm font-light ">
                                        {item?.name + ','}
                                    </span>
                                )
                            )}
                        </div>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Insurance Supported:
                            </label>
                            {organizationDataById?.orgInsurances?.map(
                                (item: any) => (
                                    <span className="text-sm font-light ">
                                        {item?.name + ','}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                    <div className="org mt-5 w-[40rem] ">
                        <h2>Admin Details</h2>
                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                First Name:
                            </label>
                            <label className="text-sm font-light ">
                                {organizationDataById?.firstName}
                            </label>
                        </div>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Last Name:
                            </label>
                            <label className="text-sm font-light ">
                                {organizationDataById?.lastName}
                            </label>
                        </div>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Email Address:
                            </label>
                            <label className="text-sm font-light ">
                                {organizationDataById?.userEmail}
                            </label>
                        </div>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Cell Phone:
                            </label>
                            <label className="text-sm font-light ">
                                {organizationDataById?.cellPhone}
                            </label>
                        </div>
                        <div className="name mt-5 flex space-x-2">
                            <label className="Name text-sm font-medium flex">
                                Work Phone:
                            </label>
                            <label className="text-sm font-light ">
                                {organizationDataById?.workPhone}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={onCancel} className=" mr-7 my-3 float-right ">
                Cancel
            </button>
        </div>
    );
};
export default OrgView;
