import React, { useEffect } from 'react';
import ClientInvoice from './ClientDashboardData/ClientInvoices';
import CurrentGoal from './ClientDashboardData/CurrentGoal';
import ClientInsurance from './ClientDashboardData/ClientInsurance';
import ClientReferringProvider from './ClientDashboardData/ReferringProvider';
import MyDocuments from './ClientDashboardData/MyDocuments';
import ClinicianUpcomingAppointments from './Clinician/TechnicianDashboardData/UpComingAppointments';
import ClientUpcomingAppointments from './ClientDashboardData/UpcomingAppointments';
import Notes from './Clinician/TechnicianDashboardData/Notes';
import ClinicianWorkingHours from './Clinician/TechnicianDashboardData/ClinicianWorkingHours';
import ClinicianTodoList from './Clinician/TechnicianDashboardData/ToDoList';
import Productivity from './Clinician/TechnicianDashboardData/Productivity';
import TechnicianClientSession from './Clinician/TechnicianDashboardData/ClientSession';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from './userProfile';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getUserDetailsCall,
    getUserDetailsPermissionCall,
    clearUserDetails,
} from '../../redux/slice/userDetails/userDetailsSlice';
import { ArrowLeft } from 'lucide-react';
import Authorizations from './Clinician/TechnicianDashboardData/Authorizations';
import Intakes from './Clinician/TechnicianDashboardData/Intakes';
import Inquiries from './Clinician/TechnicianDashboardData/Inquiries';
export default function LandingPage(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const navigate = useNavigate();
    const isNavigatedUser = params.userId && params.orgId ? true : false;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const profileData = useSelector((state: any) =>
        isNavigatedUser
            ? state.userDetails?.value?.data
            : state.userProfileData?.value?.data
    );
    useEffect(() => {
        if (params.userId && params.orgId && !userPermission.loading) {
            const payload = {
                profileUserId: params.userId,
                profileOrgId: params.orgId,
            };
            dispatch(getUserDetailsCall(payload));
            dispatch(getUserDetailsPermissionCall(payload));
        }
    }, [params, dispatch, userPermission.loading]);
    const showName = (): any => {
        if (profileData?.userId?.firstName) {
            return `${profileData?.userId?.firstName} ${profileData?.userId?.lastName}`;
        } else {
            return '';
        }
    };
    const employee =
        userPermission?.userRoles?.data?.roleName === 'Admin' ||
        userPermission?.userRoles?.data?.roleName === 'Intake Coordinator' ||
        userPermission?.userRoles?.data?.roleName === 'Clinician' ||
        userPermission?.userRoles?.data?.roleName === 'Technician';
    const permissionAdminAndIntake =
        userPermission?.userRoles?.data?.roleName === 'Admin' ||
        userPermission?.userRoles?.data?.roleName === 'Intake Coordinator';
    const permissionGoalAdmin =
        userPermission?.userRoles?.data?.roleName === 'Admin';
    const permissionGoalClient =
        userPermission?.userRoles?.data?.roleName === 'Client';
    const permissionNotesClinician =
        userPermission?.userRoles?.data?.roleName === 'Clinician';

    return (
        <div
            className="bg-[#e5f3f8] flex pb-5 "
            data-testid="client-dashboard-page"
        >
            <div className="profile w-1/4 shadow-lg rounded-xl bg-white text-center font-[lato]">
                <UserProfile />
            </div>
            <div className="dashboard w-3/4 mx-3 bg-[#f5faff] ">
                <div className="bg-[#e5f3f8]  ">
                    <div className="flex justify-between">
                        <h1 className="font-[lato] text-xl py-4">
                            {isNavigatedUser ? (
                                <span
                                    className="flex items-center hover:underline hover:cursor-pointer"
                                    onClick={() => {
                                        navigate(-1);
                                        dispatch(clearUserDetails());
                                    }}
                                >
                                    <ArrowLeft />
                                    <span className="ml-2">Go Back</span>
                                </span>
                            ) : (
                                <>{`Welcome ${showName()}`}</>
                            )}
                        </h1>
                    </div>
                    <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-1"></div>
                </div>
                {employee ? (
                    <div className="clinician mb-3 shadow-lg  rounded-xl bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <ClinicianUpcomingAppointments />
                    </div>
                ) : userPermission?.userRoles?.data?.roleName === 'Client' ? (
                    <div className="client flex my-3 ">
                        <div className="w-full shadow-lg mr-3 rounded-xl bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <ClientUpcomingAppointments />
                        </div>
                        <div className="w-1/2  shadow-lg rounded-xl bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                            <ClientInvoice />
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {userPermission?.userRoles?.data?.roleName ===
                'Intake Coordinator' ? (
                    <div className="clinician mb-3 shadow-lg  rounded-xl bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <Authorizations />
                    </div>
                ) : (
                    ''
                )}
                <div className="flex  ">
                    {permissionNotesClinician ? (
                        <div className="w-full mr-3">
                            <div className="shadow-lg rounded-xl bg-white h-[30rem] ">
                                <Notes />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mr-3">
                            {permissionGoalClient ? (
                                <div className="shadow-lg rounded-xl bg-white ">
                                    <CurrentGoal />
                                </div>
                            ) : userPermission?.userRoles?.data?.roleName ===
                              'Admin' ? (
                                <div className="shadow-lg rounded-xl bg-white ">
                                    <Productivity />
                                </div>
                            ) : userPermission?.userRoles?.data?.roleName ===
                              'Technician' ? (
                                <div className="shadow-lg rounded-xl bg-white ">
                                    <TechnicianClientSession />
                                </div>
                            ) : (
                                ''
                            )}
                            {permissionGoalAdmin ? (
                                <div className=" mt-3 shadow-lg rounded-xl bg-white mr-1 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
                                    <CurrentGoal />
                                    {/* <ClinicianWorkingHours /> */}
                                </div>
                            ) : userPermission?.userRoles?.data?.roleName ===
                              'Client' ? (
                                <div className="flex pt-4">
                                    <div className="shadow-lg rounded-xl bg-white w-1/2 mr-2 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
                                        <ClientInsurance />
                                    </div>
                                    <div className="shadow-lg  rounded-xl bg-white w-1/2 ml-2  overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                        <ClientReferringProvider />
                                    </div>
                                </div>
                            ) : userPermission?.userRoles?.data?.roleName ===
                              'Technician' ? (
                                <div className=" mt-3 shadow-lg rounded-xl bg-white mr-1 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
                                    <ClinicianWorkingHours />
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    )}
                    {userPermission?.userRoles?.data?.roleName === 'Client' ||
                    userPermission?.userRoles?.data?.roleName === 'Admin' ? (
                        <div className="w-1/2 shadow-lg rounded-xl bg-white">
                            <MyDocuments />
                        </div>
                    ) : userPermission?.userRoles?.data?.roleName ===
                      'Technician' ? (
                        <div className="w-1/2 shadow-lg rounded-xl bg-white">
                            <Notes />
                        </div>
                    ) : userPermission?.userRoles?.data?.roleName ===
                      'Clinician' ? (
                        <div className="w-1/2 shadow-lg rounded-xl bg-white">
                            <Productivity />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                {permissionAdminAndIntake ? (
                    <div className="admin mt-3">
                        <div className="flex pr-1">
                            {userPermission?.userRoles?.data?.roleName ===
                            'Admin' ? (
                                <div className="shadow-lg rounded-xl mr-3  bg-white w-1/2 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                    <ClinicianTodoList />
                                </div>
                            ) : userPermission?.userRoles?.data?.roleName ===
                              'Intake Coordinator' ? (
                                <div className="shadow-lg rounded-xl mr-3  bg-white w-1/2 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                    <Intakes />
                                </div>
                            ) : (
                                ''
                            )}
                            {userPermission?.userRoles?.data?.roleName ===
                            'Admin' ? (
                                <div className="shadow-lg rounded-xl w-1/2  bg-white overflow-y-auto">
                                    <Notes />
                                </div>
                            ) : userPermission?.userRoles?.data?.roleName ===
                              'Intake Coordinator' ? (
                                <div className="shadow-lg rounded-xl w-1/2  bg-white overflow-y-auto">
                                    <Inquiries />
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
