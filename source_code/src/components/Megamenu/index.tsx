/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import Home from '../../assets/img/home.svg';
import clinical from '../../assets/img/clinical.svg';
import scheduling from '../../assets/img/scheduling.svg';
import menu from '../../assets/img/menu.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    savingSortingData,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { ROUTES } from '../../constants';
import { clearLibraryId } from '../../redux/slice/ProgramBookLibrarySlice/getProgramBookLibraryDataById';
import { clearDomainLibrary } from '../../redux/slice/ProgramBookLibrarySlice/getProgramBookDomainFolderByUUID';
import { clearLibraryData } from '../../redux/slice/ProgramBookLibrarySlice/saveProgramBookLibrarySlice';
import {
    clearProgramBookTree,
    savingCurrentTab,
} from '../../redux/slice/GetDomainById/getDomainById';
import {
    viewOnlyValueData,
    viewOnlyValueLibrary,
} from '../../redux/slice/ViewOnlyComponent/ViewOnly';
import { savingSelectedName } from '../../redux/slice/Scheduling/getServices';
import {
    clearOrgById,
    organizationByIdSlice,
} from '../../redux/slice/organizations/organizationByIdSlice';
import { usePermission } from '../../hooks/usePermission';
import { savingOnClickQuickLook } from '../../redux/slice/QuickLook/quickLook';
export default function Megamenu(): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: [
            'program_book',
            'program_book_library',
            'guideline_template',
            'mastery_criteria_template',
            'session',
            'session_note',
            'billing_codes',
            'groups',
            'roles_and_permissions',
            'users',
            'organizations',
            'CLINICAL',
            'CALENDAR',
            'MENU',
            'billing',
            'client_intake',
            'dictionary',
        ],
    });
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const permission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const handleApiCall = (e: any): void => {
        dispatch(savingTabData({ tab: e }));
        dispatch(clearDomainLibrary());
        dispatch(clearLibraryId());
        dispatch(clearLibraryData());
        dispatch(clearProgramBookTree({}));
        dispatch(viewOnlyValueData(false));
        dispatch(viewOnlyValueLibrary(false));
        dispatch(clearOrgById());
        dispatch(
            savingSortingData({
                sortingData: {
                    fieldName:
                        getMineData?.sortingData?.fieldName || 'createdDate',
                    order: getMineData?.sortingData?.order,
                },
            })
        );
        dispatch(savingOnClickQuickLook(false));
    };
    const handleOrgNavigation = (): void => {
        if (permission?.userRoles?.data?.roleName === 'Super Admin') {
            handleApiCall('ORGANIZATIONS');
            navigate(ROUTES.organizationsGrid);
        } else {
            dispatch(
                organizationByIdSlice(
                    permission?.value?.data?.orgId || permission?.orgId
                )
            );
            navigate(ROUTES.organizationsForm);
        }
    };
    return (
        <>
            <div className="relative flex justify-evenly text-white items-center bg-transparent w-[35rem] content-center ">
                <div className="relative text-center text-white text-sm font-light font-Lato uppercase hover-trigger flex hover:border-b-2 border-white hover:pb-1">
                    <img src={Home} alt="img" />
                    <Link to={ROUTES.LandingPage}> Home</Link>
                    <div className="absolute bg-transparent text-black  px-4 py-2 hover-target"></div>
                </div>
                <div
                    className={`${!permissions?.CLINICAL ? 'hidden' : 'relative text-sm uppercase font-light font-Lato hover-trigger flex hover:border-b-2 border-white hover:pb-1'}`}
                >
                    <img src={clinical} alt="img" />
                    Clinical
                    <div className="absolute z-50 text-sm rounded drop-shadow-sm font-normal bg-white border text-black  border-grey-100 hover-target w-[18rem] h-auto -translate-x-[5rem] translate-y-6">
                        <div className="main flex flex-col flex-wrap">
                            <span
                                className={`${!permissions?.program_book ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() => {
                                    handleApiCall('mine');
                                    dispatch(savingCurrentTab('Current'));
                                }}
                            >
                                <Link to={ROUTES.programBookDetails}>
                                    Program Book
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.program_book_library ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() =>
                                    handleApiCall('PROGRAMBOOK_LIBRARY')
                                }
                            >
                                <Link to={ROUTES.programBookLibrary}>
                                    Program Book Library
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.guideline_template ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() =>
                                    handleApiCall('GUIDELINE_TEMPLATE')
                                }
                            >
                                <Link to={ROUTES.guidelineGrid}>
                                    Guideline Templates
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.mastery_criteria_template ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() =>
                                    handleApiCall('MASTERY_CRITERIA_TEMPLATE')
                                }
                            >
                                <Link to={ROUTES.masterCriteriaTemplate}>
                                    MASTERY CRITERIA TEMPLATES
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.session ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() => {
                                    handleApiCall('SESSION');
                                }}
                            >
                                <Link to={ROUTES.sessionGrid}>SESSION</Link>
                            </span>
                            <span
                                className={`${!permissions?.session_note ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() => handleApiCall('SESSION')}
                            >
                                <Link to={ROUTES.sessionNoteGrid}>
                                    SESSION NOTE
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.session_note ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() => handleApiCall('mine ')}
                            >
                                <Link to={ROUTES.interventionGrid}>
                                    INTERVENTION PLAN
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.session_note ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() => handleApiCall('GOAL_LIBRARY')}
                            >
                                <Link to={ROUTES.goalLibraryPageGrid}>
                                    GOAL LIBRARY
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    className={`${!permissions?.CALENDAR ? 'hidden' : 'relative text-sm uppercase font-light font-Lato hover-trigger flex hover:border-b-2 border-white hover:pb-1'}`}
                >
                    <img src={scheduling} className="mr-1" alt="img" />
                    Calendar
                    <div className="absolute bg-transparent  text-black  px-4 py-2 hover-target"></div>
                    <div className="absolute p-[1rem] hover:bg-gray-300 text-sm rounded drop-shadow-sm font-normal bg-white border text-black  border-grey-100 hover-target w-[14rem] h-14 -translate-x-[4rem] translate-y-6">
                        <span
                            className="p-[1rem]"
                            onClick={() => {
                                dispatch(savingSelectedName(''));
                            }}
                        >
                            <Link to={ROUTES.scheduling}>View My Calendar</Link>
                        </span>
                    </div>
                </div>
                <div
                    className={`${!permissions?.MENU ? 'hidden' : 'relative text-sm uppercase font-light font-Lato hover-trigger flex hover:border-b-2 border-white hover:pb-1'}`}
                >
                    <img src={menu} className="mr-1" alt="img" />
                    Menu
                    <div className="absolute z-50 text-sm rounded drop-shadow-sm font-normal bg-white border text-black  border-grey-100 hover-target  w-[16rem] h-auto  -translate-x-[5rem] translate-y-6">
                        <div className="main flex flex-col flex-wrap">
                            <span
                                className={`${!permissions?.billing ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                            >
                                <Link to={ROUTES.questionBankAvailablePage}>
                                    Question bank Management
                                </Link>
                            </span>
                            <span className="p-[1rem] hidden">
                                <Link to={ROUTES.guidelineGrid}>
                                    Guideline Templates
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.billing ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                            >
                                <Link to={ROUTES.BillingGrid}>Billing</Link>
                            </span>
                            <span
                                className={`${!permissions?.billing_codes ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                            >
                                <Link to={ROUTES.authorizationCodeGrid}>
                                    Billing Codes
                                </Link>
                            </span>
                            <span
                                className={`${!permissions?.groups ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                            >
                                <Link to={ROUTES.groupsGrid}>Groups</Link>
                            </span>
                            <span
                                className={`${!permissions?.roles_and_permissions ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                            >
                                <Link to={ROUTES.RolesGrid}>
                                    Roles and Permissions
                                </Link>
                            </span>
                            <span
                                onClick={() => handleApiCall('Users')}
                                className={`${!permissions?.users ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                            >
                                <Link to={ROUTES.contactGrid}>Users</Link>
                            </span>
                            <span
                                className={`${!permissions?.organizations ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={handleOrgNavigation}
                            >
                                <Link to={ROUTES.organizationsGrid}>
                                    ORGANIZATIONS
                                </Link>
                            </span>
                            <span
                                className="p-[1rem] hover:bg-gray-300"
                                onClick={() => handleApiCall('Diagnosis Codes')}
                            >
                                <Link to={ROUTES.diagnosisCodeGrid}>
                                    Meta Data Management
                                </Link>
                            </span>
                            <span
                                className={`${permissions?.client_intake ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                                onClick={() =>
                                    handleApiCall('Client Intake Details')
                                }
                            >
                                <Link to={ROUTES.ClientIntakeDetailsPage}>
                                    Client Intake
                                </Link>
                            </span>
                            <span
                                className={` p-[1rem] hover:bg-gray-300`}
                                onClick={() => handleApiCall('Claims Inbox')}
                            >
                                <Link to={ROUTES.inboxGrid}>Claim Inbox</Link>
                            </span>
                            <span
                                onClick={() =>
                                    handleApiCall('Organization Dictionary')
                                }
                                className={`${!permissions?.dictionary ? 'hidden' : 'p-[1rem] hover:bg-gray-300'}`}
                            >
                                <Link to={ROUTES.DictionaryPage}>
                                    Dictionary
                                </Link>
                            </span>
                            <span
                                className={` p-[1rem] hover:bg-gray-300`}
                                onClick={() =>
                                    handleApiCall('Client Intake Forms')
                                }
                            >
                                <Link to={ROUTES.clientIntakeForm}>
                                    Client Intake Forms
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: '\n.hover-trigger .hover-target {\n    display: none;\n}\n\n.hover-trigger:hover .hover-target {\n    display: block;\n}\n',
                }}
            />
        </>
    );
}
