/* eslint-disable max-len */
import * as React from 'react';
import Megamenu from '../Megamenu';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { ROUTES } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { clearingPermissionData } from '../../redux/slice/getUserPermission/getUserPermissionSlice';
import { useAuth } from '../../hooks/useAuth';
import PlaceHolderImage from '../../assets/img/PlaceHolderImage.svg';
import LogoWhite from '../../assets/img/logos/IrisInsights_white.svg';
import { clearUser } from '../../redux/slice/Scheduling/getServices';
import { setCount } from '../SchedulingComponents/Header';
import loginApi from '../../api/services/login.service';
import { setPlannerView } from '../../redux/slice/SchedulingRedux/Scheduling';
import {
    account,
    userAccountCall,
} from '../../redux/slice/UserAccount/UserAccount';
import { savingClientId } from '../../redux/slice/Insurance/insurance';

export default function Navigation(): React.JSX.Element {
    const [showLogoutModal, setShowLogoutModal] = React.useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const logoutFn = async (): Promise<void> => {
        const res = await loginApi.userLogout();
        logout().then(async () => {
            if (res) {
                dispatch(clearingPermissionData());
                dispatch(clearUser());
                dispatch(setPlannerView(false));
                navigate(ROUTES.LoginPage);
                setCount(0);
            }
        });
    };
    const user = useSelector(({ getUserPermission }: any) => getUserPermission);
    const userId = user?.value?.data?.userId || user?.userId;
    const profileData = useSelector(
        ({ userProfileData }: any) => userProfileData?.value?.data
    );
    const handleMyAccount = (): void => {
        dispatch(userAccountCall({ id: userId }));
        dispatch(savingClientId(userId));
        dispatch(account(true));
        navigate(`${ROUTES.addUser}`);
    };
    return (
        <>
            {/* ========== HEADER ========== */}
            <nav
                className="sticky top-0 w-full h-16 flex justify-between items-center bg-gradient-to-r from-[#47AAC9] from-50% to-white z-50"
                aria-label="Global"
            >
                <div className="ml-5">
                    <Link
                        className=" text-sm font-semibold text-white"
                        aria-label="Brand"
                        to={''}
                    >
                        <div className="Branding">
                            <img
                                src={LogoWhite}
                                alt="Branding"
                                width="150"
                                height="150"
                            />
                        </div>
                    </Link>
                </div>
                <Megamenu />
                <div id="navbar-collapse-with-animation" className="mr-5">
                    <div className="flex">
                        <div className=" flex items-center">
                            <Link
                                className="font-medium text-black/[.8] hover:text-black"
                                to={''}
                            >
                                <div className="flex-shrink-0 group block">
                                    <div className="flex items-center">
                                        <div className="ms-3">
                                            <h3 className="text-xs text-[#019987]">
                                                {profileData?.userId?.firstName}{' '}
                                                {profileData?.userId?.lastName}
                                            </h3>
                                        </div>
                                        {/* <img
                                                className="ml-4 inline-block flex-shrink-0 h-[2.5rem] w-[2.5rem] rounded-full"
                                                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                                alt="Profile"
                                            /> */}
                                        <img
                                            className="ml-4 inline-block flex-shrink-0 h-[2.5rem] w-[2.5rem] rounded-full"
                                            src={
                                                profileData?.imageData
                                                    ? profileData?.imageData
                                                    : PlaceHolderImage
                                            }
                                        />
                                    </div>
                                </div>
                            </Link>
                            <div className="log flex-col relative text-sm uppercase font-light font-Lato hover-trigger flex hover:border-b-2 border-white hover:pb-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                                <div className="absolute bg-transparent  text-black  px-4 py-2 hover-target"></div>
                                <div className="absolute text-sm rounded drop-shadow-sm font-normal bg-white border text-black  border-grey-100 hover-target w-[12rem] h-14 -translate-x-[8rem] translate-y-6 ">
                                    <div className="main flex flex-wrap bg-white border border-gray-200">
                                        <span
                                            className="p-[1rem] hover:cursor-pointer hover:bg-gray-100 w-full"
                                            onClick={handleMyAccount}
                                        >
                                            My Account
                                        </span>
                                        <span className="p-[1rem] hover:cursor-pointer hover:bg-gray-100  w-full">
                                            <Link
                                                to={
                                                    ROUTES.changePasswordWithLayout
                                                }
                                            >
                                                Change Password
                                            </Link>
                                        </span>
                                        <span
                                            className="p-[1rem] hover:cursor-pointer hover:bg-gray-100 w-full"
                                            onClick={() =>
                                                setShowLogoutModal(true)
                                            }
                                        >
                                            Logout
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {showLogoutModal ? (
                <ConfirmationModal
                    title={'Are you sure you want to Logout?'}
                    header={'Log-out!'}
                    open={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    handleStop={logoutFn}
                />
            ) : null}
            {/* ========== END HEADER ========== */}
        </>
    );
}
