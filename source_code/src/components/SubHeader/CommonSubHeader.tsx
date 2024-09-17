/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import plus from '../../assets/img/plus.svg';
import search from '../../assets/img/search.svg';
import CrossIcon from '../../assets/img/CrossIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import AddProgramBookLibraryModal from '../AddProgramBookLibraryModal';
import {
    getClientServicesCall,
    getClientServicesCallIntervention,
} from '../../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
import { getUsersDetailCall } from '../../redux/slice/getUser/getUserByOrganizationId';
import { getAllUsers } from '../../redux/slice/users/usersSlice';
import AddClientProgramBookModal from '../AddClientProgramBook';
import {
    getActiveAsync,
    savingSearchData,
} from '../../redux/slice/MineSlice/getMine';
import {
    clearingData,
    savingOnEdit,
} from '../../redux/slice/template/templateSlice';
import {
    returnInitialStateCard,
    savingMasterData,
    setCardCount,
    setCardCountDuration,
    setCardCountFirst,
    setCardCountFrequency,
    setCardCountLat,
    setCardCountRate,
    setCardCountRating,
    setCardCountScore,
    setCardCountTime,
    setCardCountTask,
    setDataType,
    setOnEdit,
    setOnView,
    setCardCountGeneral,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { savingGetMasteryCriteriaTemplateData } from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { getTemplateData } from '../../redux/slice/GetTemplate/getTemplate';
import TabMenu from './TabMenu';
import { reInitSessionData } from '../../redux/slice/session/sessionSlice';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import { clearOrgById } from '../../redux/slice/organizations/organizationByIdSlice';
import { usePermission } from '../../hooks/usePermission';
import Button from '../Generics/Button';
import { ROUTES } from '../../constants';
import { getMetaDataAuthorizationCodeCall } from '../../redux/slice/EditAuthorizationCode/getMetaData';
import { clearMetaData } from '../../redux/slice/EditAuthorizationCode/editAuthorizationCode';
import { clearingTargetData } from '../../redux/slice/getTarget/getTargetByProgramId';
import { clearProgramData } from '../../redux/slice/RenameProgram/renameProgram';
import AddIntervention from '../InterventionFiles/Modal/AddIntervention';
import AddGoalLibrary from '../GoalLibrary/Modal/AddGoalLibrary';
import AddInsurance from '../MetaDataManagement/InsuranceFiles/Modal/AddInsurance';
import AddDiagnosisCodeModal from '../MetaDataManagement/InsuranceFiles/Modal/addDiagnosisCode';

import AddQuestionModal from '../QuestionBankAvailable/Modal/AddQuestionModal';
import AddWord from '../Dictionary/AddWord';
import { clearIntakeValues } from '../../redux/slice/IntakeEditor/intakeEditor';
// Interface for the SubHeader component props
interface SubHeaderProps {
    title: string;
    renderTabButton: () => React.JSX.Element;
    searchData: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchApiCall: () => void;
    handleClearApiCall: () => void;
    changeIcon: boolean;
    renderAddNewButtonBasedOnTab: () => React.JSX.Element;
}
// SubHeader component for rendering the common subheader
const SubHeader: React.FC<SubHeaderProps> = ({
    title,
    renderTabButton,
    searchData,
    handleSearch,
    handleSearchApiCall,
    handleClearApiCall,
    changeIcon,
    renderAddNewButtonBasedOnTab,
}) => {
    const location = useLocation();
    const { state } = location;
    const onEnterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchApiCall();
            // Optionally, you can also call handleSearch or any other function here
        }
    };
    const excludedTitles = [
        'Rate',
        'Billing',
        'Users',
        'Claims Inbox',
        'Client Intake Details',
    ];
    return (
        <>
            {/* Check if title is not one of the specified values */}
            {!(
                title === 'Intervention Plan' ||
                title === 'Program Book' ||
                title === 'Session' ||
                title === 'Client Intake Details' ||
                title === 'Users' ||
                title === 'Rate' ||
                title === 'Meta Data Management' ||
                title === 'Billing' ||
                title === 'Rate' ||
                title === 'Claims Inbox'
            ) ? (
                <div className="mt-5">
                    <div className="title flex justify-between">
                        <div className="flex flex-col w-1/2">
                            <span className="text-xl font-bold ml-4 mb-3">
                                {title === 'Dictionary'
                                    ? 'Organization Dictionary'
                                    : title}
                            </span>
                            <div className="ml-4 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-md"></div>
                        </div>
                        {title !== 'Previous Rates' &&
                            title !== 'Client Intake Forms' && (
                                <div className="searchAndFilter flex justify-center items-center text-center px-5">
                                    <div className="searchBar shadow-xl mr-5  flex w-[30rem] h-[2.5rem] rounded-full">
                                        <input
                                            className="outline-none border-none w-[26rem] rounded-full pl-5"
                                            type="text"
                                            value={searchData}
                                            placeholder="Search"
                                            onChange={handleSearch}
                                            onKeyDown={onEnterHandle}
                                        />
                                        {changeIcon ? (
                                            <Button
                                                type={''}
                                                className={'ml-5'}
                                                onClick={handleClearApiCall}
                                            >
                                                <img
                                                    className="w-7"
                                                    src={CrossIcon}
                                                    alt="Clear search"
                                                />
                                            </Button>
                                        ) : (
                                            <Button
                                                type={''}
                                                className={'ml-5'}
                                                onClick={handleSearchApiCall}
                                            >
                                                <img
                                                    className="w-7"
                                                    src={search}
                                                    alt="Search"
                                                />
                                            </Button>
                                        )}
                                    </div>
                                    {title !== 'Organization Dictionary' &&
                                        renderAddNewButtonBasedOnTab()}
                                </div>
                            )}
                        {title === 'Client Intake Forms' && (
                            <div className="searchAndFilter flex justify-center items-center text-center px-5">
                                {renderAddNewButtonBasedOnTab()}
                            </div>
                        )}
                    </div>
                    <div className="tabMenu flex justify-between w-full px-5 ">
                        {renderTabButton()}
                    </div>
                </div>
            ) : (
                <div className="mt-5">
                    {title === 'Users' ? (
                        <div>
                            <div className="title flex flex-col justify-between">
                                <span className="text-xl font-bold ml-4 mb-1">
                                    {title}
                                </span>
                                <div className="ml-4 mb-3 w-[93rem] bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                            </div>
                        </div>
                    ) : title === 'Rate' ? (
                        <div>
                            <div className="title flex justify-between">
                                <span className="text-xl font-bold ml-4 mb-1">
                                    {state?.code}{' '}
                                    {state?.description
                                        ? state?.description
                                        : ''}
                                </span>
                            </div>
                            <div className="ml-4 mb-3 w-[93rem] bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                        </div>
                    ) : (
                        <div className="title flex flex-col justify-between">
                            <span className="text-xl font-bold ml-4 mb-3">
                                {title}
                            </span>
                            <div className="ml-4 mb-3 w-[93rem] bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                        </div>
                    )}
                    <div className="tabMenu flex justify-between w-full px-5 ">
                        {renderTabButton()}
                        <div className="searchAndFilter flex justify-center items-center text-center">
                            {!excludedTitles.includes(title) && (
                                <div className="searchBar shadow-xl mr-5  flex w-[30rem] h-[2.5rem] rounded-full">
                                    <input
                                        className="outline-none w-[26rem] rounded-full pl-5 focus:outline-none focus:border-none border-none"
                                        type="text"
                                        value={searchData}
                                        placeholder="Search"
                                        onChange={handleSearch}
                                        onKeyDown={onEnterHandle}
                                    />
                                    {changeIcon ? (
                                        <button
                                            className="ml-5"
                                            onClick={handleClearApiCall}
                                            aria-label="Clear search"
                                        >
                                            <img
                                                className="w-7"
                                                src={CrossIcon}
                                                alt="Clear search"
                                            />
                                        </button>
                                    ) : (
                                        <button
                                            className="ml-5"
                                            onClick={handleSearchApiCall}
                                            aria-label="Search"
                                        >
                                            <img
                                                className="w-7"
                                                src={search}
                                                alt="Search"
                                            />
                                        </button>
                                    )}
                                </div>
                            )}
                            {renderAddNewButtonBasedOnTab()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
// CommonSubHeader component
const CommonSubHeader: React.FC<{ title: string }> = ({ title }) => {
    const location = useLocation();
    const { state } = location;
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const dispatch = useDispatch<any>();
    const [searchData, setSearchData] = useState<string>('');
    const [openAddLibraryModal, setOpenAddLibraryModal] = useState(false);
    const [openQuestionBankManagement, setOpenQuestionBankManagement] =
        useState(false);
    const [openDictionary, setOpenDictionary] = useState(false);

    const [openAddInterventionModal, setAddInterventionModal] = useState(false);
    const [openGoalLibraryModal, setGoalLibraryModal] =
        useState<boolean>(false);
    const [openAddInsuranceModal, setAddInsuranceModal] =
        useState<boolean>(false);
    const [openAddDiagnosisCodeModal, setAddDiagnosisCodeModal] =
        useState<boolean>(false);
    const [changeIcon, setChangeIcon] = useState(false);
    const [openClientBookModal, isOpenClientBookModal] =
        useState<boolean>(false);
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const userExist = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const { permissions } = usePermission({
        itemsToCheck: [
            'create_program_book',
            'view_program_book',
            'create_mastery_criteria_template',
            'create_guideline_template',
            'create_program_book_library',
            'create_session',
            'create_group',
            'create_goal_library',
            'create_user',
            'create_intervention_plan',
            'create_session_note_template',
            'create_billing_code',
            'create_role_and_permission',
        ],
    });
    // Handle opening client book modal
    const handleClientBook = (): void => {
        isOpenClientBookModal(true);
        dispatch(getClientServicesCall({ type: 'ORGANIZATION_DATA' }));
        dispatch(getUsersDetailCall());
        dispatch(getAllUsers());
    };
    const handleIntervention = (): void => {
        dispatch(getUsersDetailCall());
        setAddInterventionModal(true);
        dispatch(getClientServicesCallIntervention());
        dispatch(getAllUsers());
    };
    // Handle search input change
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchData(e.target.value);
        dispatch(savingSearchData({ searchValue1: e.target.value }));
    };
    // Handle search API call
    const handleSearchApiCall = (): void => {
        setChangeIcon(true);
        const data = {
            heading: '',
            authorizationCodeId: state?.id || getGridData?.authorizationCodeId,
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: searchData.trim(),
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        // Switch statement to dispatch API calls based on tab
        dispatch(getActiveAsync(data));
    };
    // Handle clearing search and filter
    const handleClearApiCall = (): void => {
        setSearchData('');
        setChangeIcon(false);
        const data = {
            authorizationCodeId: state?.id || getGridData?.authorizationCodeId,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        dispatch(savingSearchData({ searchValue1: '' }));
        // Switch statement to dispatch API calls based on tab
        dispatch(getActiveAsync(data));
    };
    // Clear function for specific cases
    const clear = (): void => {
        dispatch(savingOnEdit(false));
        dispatch(clearingData());
        dispatch(clearIntakeValues());
        dispatch(reInitSessionData());
        dispatch(clearOrgById());
    };
    const metaData = (): void => {
        dispatch(savingOnEdit(false));
        dispatch(clearingData());
        dispatch(clearIntakeValues());
        dispatch(clearMetaData());
        dispatch(reInitSessionData());
        dispatch(clearOrgById());
        dispatch(getMetaDataAuthorizationCodeCall());
    };
    const addGoalLibrary = (): void => {
        setGoalLibraryModal(true);
        dispatch(getClientServicesCallIntervention());
    };
    const addInsuranceModal = (): void => {
        setAddInsuranceModal(true);
    };
    const addDiagnosisCodeModal = (): void => {
        setAddDiagnosisCodeModal(true);
    };

    const addQuestionBankModal = (): void => {
        setOpenQuestionBankManagement(true);
    };
    const addDictionary = (): void => {
        setOpenDictionary(true);
    };
    // Clear data function for specific cases
    const clearData = (): void => {
        dispatch(savingMasterData([]));
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(setCardCount(1));
        dispatch(setCardCountDuration(1));
        dispatch(setCardCountFrequency(1));
        dispatch(setCardCountScore(1));
        dispatch(setCardCountLat(1));
        dispatch(setCardCountRating(1));
        dispatch(setCardCountFirst(1));
        dispatch(setCardCountRate(1));
        dispatch(setCardCountTime(1));
        dispatch(setCardCountTask(1));
        dispatch(setCardCountGeneral(1));
        dispatch(setOnEdit(false));
        dispatch(setOnView(false));
        dispatch(getTemplateData([]));
        dispatch(setDataType('Percent'));
        dispatch(clearingData());
        dispatch(returnInitialStateCard());
        dispatch(clearingTargetData());
        dispatch(clearProgramData());
        dispatch(clearIntakeValues());
    };
    const checkPermission = (key: string): boolean => {
        if (key === 'PROGRAMBOOK_LIBRARY' || key === 'CLIENT_PROGRAMBOOK_LIB') {
            return permissions?.create_program_book_library;
        } else if (key === 'MASTERY_CRITERIA_TEMPLATE') {
            return permissions?.create_mastery_criteria_template;
        } else if (key === 'GUIDELINE_TEMPLATE') {
            return permissions?.create_guideline_template;
        } else if (key === 'SESSION') {
            return permissions?.create_session;
        } else if (key === 'CLIENT_PROGRAMBOOK') {
            return permissions?.create_program_book;
        } else if (key === 'GROUPS') {
            return permissions?.create_group;
        } else if (key === 'ROLES') {
            return permissions?.create_role_and_permission;
        } else if (key === 'Users') {
            return permissions?.create_user;
        } else if (key === 'GOAL_LIBRARY') {
            return permissions?.create_goal_library;
        } else if (key === 'INTERVENTION PLAN') {
            return permissions?.create_intervention_plan;
        } else if (key === 'SESSION NOTE') {
            return permissions?.create_session_note_template;
        } else if (key === 'BILLING CODES') {
            return permissions?.create_billing_code;
        } else {
            return true;
        }
    };
    // Function to render the Add New button
    const renderAddNewButton1 = (
        route: string,
        key: string,
        clearFunction: () => void
    ): React.JSX.Element => (
        <div className="filter flex justify-center items-center">
            {route ? (
                <Link
                    to={route}
                    className={` ${!checkPermission(key) ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <button
                        data-testid="AddNew"
                        disabled={!checkPermission(key)}
                        type="button"
                        onClick={clearFunction}
                        className=" relative h-[2.5rem] w-32   flex justify-evenly items-center font-normal text-sm rounded border border-transparent bg-[#47AAC9] text-white hover:bg-[#47AAC9] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <img src={plus} alt="plus" />
                        Add New
                    </button>
                </Link>
            ) : (
                <button
                    data-testid="AddNew"
                    disabled={!checkPermission('CLIENT_PROGRAMBOOK_LIB')}
                    type="button"
                    onClick={clearFunction}
                    className=" relative h-[2.5rem] w-32   flex justify-evenly items-center font-normal text-sm rounded border border-transparent bg-[#47AAC9] text-white hover:bg-[#47AAC9] disabled:opacity-50 disabled:pointer-events-none"
                >
                    <img src={plus} alt="plus" />
                    Add New
                </button>
            )}
        </div>
    );
    // Function to render the Add New button based on tab
    const renderAddNewButtonBasedOnTab = (): React.JSX.Element => {
        switch (getMineData?.tab) {
            case 'mine ':
            case 'all ':
            case 'discharged ':
                return renderAddNewButton1(
                    ROUTES.interventionGrid,
                    'INTERVENTION',
                    () => handleIntervention()
                );
            case 'PROGRAMBOOK_LIBRARY':
                return renderAddNewButton1(
                    ROUTES.programbookLibrary,
                    'PROGRAMBOOK_LIBRARY',
                    () => setOpenAddLibraryModal(true)
                );
            case 'MASTERY_CRITERIA_TEMPLATE':
                return renderAddNewButton1(
                    ROUTES.MasteryCriteriaLandingPageUrl,
                    'MASTERY_CRITERIA_TEMPLATE',
                    () => clearData()
                );
            case 'GUIDELINE_TEMPLATE':
                return renderAddNewButton1(
                    ROUTES.guidelineTemplate,
                    'GUIDELINE_TEMPLATE',
                    () => clear()
                );
            case 'mine':
            case 'all':
            case 'discharged':
                return renderAddNewButton1(
                    ROUTES.programBookDetails,
                    'CLIENT_PROGRAMBOOK',
                    () => handleClientBook()
                );
            case 'SESSION':
            case 'Mine':
            case 'All':
            case 'Discontinued':
                return renderAddNewButton1(
                    ROUTES.createSession,
                    'SESSION',
                    () => clear()
                );
            case 'All ':
            case 'allNote':
            case 'Published':
                return renderAddNewButton1(
                    ROUTES.sessionCreateNote,
                    'All',
                    () => clear()
                );
            case 'Client':
            case 'Employee':
            case 'Users':
                return renderAddNewButton1(ROUTES.addUser, 'Users', () =>
                    clear()
                );
            case 'ROLES':
                return renderAddNewButton1(ROUTES.AddNewRoles, 'ROLES', () =>
                    clear()
                );
            case 'ORGANIZATIONS':
                return renderAddNewButton1(
                    ROUTES.organizationsForm,
                    'ORGANIZATIONS',
                    () => clear()
                );
            case 'GROUPS':
                return renderAddNewButton1(ROUTES.addNewGroup, 'GROUPS', () =>
                    clear()
                );
            case 'AUTHORIZED_CODE':
                return renderAddNewButton1(
                    ROUTES.AuthorizationCodePage,
                    'AUTHORIZED_CODE',
                    () => metaData()
                );
            case 'Default Rate':
            case 'Custom Rate':
            case 'RATE':
                return renderAddNewButton1(
                    ROUTES.AuthorizationCodePage,
                    'RATE',
                    () => metaData()
                );
            case 'GOAL_LIBRARY':
                return renderAddNewButton1(
                    ROUTES.goalLibraryPageGrid,
                    'GOAL_LIBRARY',
                    () => addGoalLibrary()
                );
            case 'Diagnosis Codes':
                return renderAddNewButton1(
                    ROUTES.diagnosisCodeGrid,
                    'Diagnosis Codes',
                    () => addDiagnosisCodeModal()
                );
            case 'Insurances':
                return renderAddNewButton1(
                    ROUTES.diagnosisCodeGrid,
                    'Insurances',
                    () => addInsuranceModal()
                );
            case 'EmailForamt':
                return renderAddNewButton1(
                    ROUTES.diagnosisCodeGrid,
                    'EmailForamt',
                    () => addInsuranceModal()
                );
            case 'Question Bank Management':
                return renderAddNewButton1(
                    ROUTES.questionBankAvailablePage,
                    'Question Bank Management',
                    () => addQuestionBankModal()
                );
            case 'Dictionary':
                return renderAddNewButton1(
                    ROUTES.DictionaryPage,
                    'Dictionary',
                    () => addDictionary()
                );
            case 'Client Intake Forms':
                return renderAddNewButton1(
                    ROUTES.intakeForm,
                    'Client Intake Forms',
                    () => {}
                );

            default:
                return <></>;
        }
    };
    const defaultTabClientIntake = (): any => {
        if (getGridData?.tab === 'Sent for Information') {
            return 'Sent for Information';
        } else {
            return 'New Inquiry';
        }
    };
    const defaultTabRate = (): any => {
        if (getGridData?.tab === 'Default Rate') {
            return 'Default Rate';
        } else {
            return 'Custom Rate';
        }
    };
    const defaultTabMetaData = (): any => {
        if (getGridData?.tab?.length) {
            return getGridData?.tab;
        } else {
            return 'Diagnosis Codes';
        }
    };
    const selectedTabMenuClientIntake = (): any => {
        if (getGridData?.tab === 'Sent for Information') {
            return 2;
        } else {
            return 1;
        }
    };
    const selectedTabMenuRate = (): any => {
        if (getGridData?.tab === 'Default Rate') {
            return 1;
        } else {
            return 2;
        }
    };
    const selectedTabMetaData = (): any => {
        if (getGridData?.tab === 'Email Format') {
            return 4;
        } else {
            return 1;
        }
    };
    // Function to render the tab button based on title
    const renderTabButton = (): React.JSX.Element => {
        switch (title) {
            case 'Program Book':
                return (
                    <TabMenu
                        selectedTabMenu={1}
                        menuItems={['mine', 'all', 'discharged']}
                        defaultTab="mine"
                        apiCallParams={{
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                        }}
                        numColumns={3}
                    />
                );
            case 'Client Intake Details':
                return (
                    <TabMenu
                        selectedTabMenu={selectedTabMenuClientIntake()}
                        menuItems={[
                            'New Inquiry',
                            'Sent for Information',
                            'Waitlist',
                        ]}
                        defaultTab={defaultTabClientIntake()}
                        apiCallParams={{
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                        }}
                        numColumns={3}
                    />
                );
            case 'Users':
                return (
                    <TabMenu
                        selectedTabMenu={1}
                        menuItems={['Employee', 'Client']}
                        defaultTab="Employee"
                        apiCallParams={{
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                        }}
                        numColumns={2}
                    />
                );
            case 'Session':
                if (
                    !userPermission?.userRoles?.data?.permission
                        ?.view_all_session
                ) {
                    return (
                        <TabMenu
                            selectedTabMenu={1}
                            menuItems={['Mine', 'Discontinued']}
                            defaultTab="Mine"
                            apiCallParams={{
                                roleId: userPermission?.userRoles?.data?.roleId,
                                assignedTo: userPermission?.value?.data?.userId,
                                pagination: { startIndex: 0, noOfRecords: 19 },
                                order: '',
                                name: '',
                                filterValue: '',
                            }}
                            numColumns={2}
                        />
                    );
                } else {
                    return (
                        <TabMenu
                            selectedTabMenu={1}
                            menuItems={['Mine', 'All', 'Discontinued']}
                            defaultTab="Mine"
                            apiCallParams={{
                                roleId: userPermission?.userRoles?.data?.roleId,
                                assignedTo: userPermission?.value?.data?.userId,
                                pagination: { startIndex: 0, noOfRecords: 19 },
                                order: '',
                                name: '',
                                filterValue: '',
                            }}
                            numColumns={3}
                        />
                    );
                }
            case 'Intervention Plan':
                return (
                    <TabMenu
                        selectedTabMenu={1}
                        menuItems={['mine ', 'all ', 'discharged ']}
                        defaultTab="mine "
                        apiCallParams={{
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                        }}
                        numColumns={3}
                    />
                );
            case 'Rate':
                return (
                    <TabMenu
                        selectedTabMenu={selectedTabMenuRate()}
                        menuItems={['Default Rate', 'Custom Rate']}
                        defaultTab={defaultTabRate()}
                        apiCallParams={{
                            authorizationCodeId:
                                state?.id || getGridData?.authorizationCodeId,
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                        }}
                        numColumns={2}
                    />
                );
            case 'Meta Data Management':
                return (
                    <TabMenu
                        selectedTabMenu={selectedTabMetaData()}
                        menuItems={[
                            'Diagnosis Codes',
                            'Insurances',
                            'Services',
                            'Email Format',
                        ]}
                        defaultTab={defaultTabMetaData()}
                        apiCallParams={{
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                        }}
                        numColumns={4}
                    />
                );
            case 'Claims Inbox':
                return (
                    <TabMenu
                        selectedTabMenu={2}
                        menuItems={[
                            'All',
                            'Inbox',
                            'Sent',
                            'Responses',
                            'Archived',
                            'Deleted',
                        ]}
                        defaultTab="Inbox"
                        apiCallParams={{
                            roleId: userPermission?.userRoles?.data?.roleId,
                            assignedTo: userPermission?.value?.data?.userId,
                            pagination: { startIndex: 0, noOfRecords: 19 },
                            order: '',
                            name: '',
                            filterValue: '',
                        }}
                        numColumns={6}
                    />
                );
            default:
                return <></>;
        }
    };
    return (
        <>
            {/* Render SubHeader component */}
            <SubHeader
                title={title}
                renderTabButton={renderTabButton}
                searchData={searchData}
                handleSearch={handleSearch}
                handleSearchApiCall={handleSearchApiCall}
                handleClearApiCall={handleClearApiCall}
                changeIcon={changeIcon}
                renderAddNewButtonBasedOnTab={renderAddNewButtonBasedOnTab}
            />
            {/* Render modals if open */}
            {openAddLibraryModal && (
                <AddProgramBookLibraryModal
                    open={openAddLibraryModal}
                    onClose={() => setOpenAddLibraryModal(false)}
                />
            )}
            {openClientBookModal && (
                <AddClientProgramBookModal
                    open={openClientBookModal}
                    onClose={() => isOpenClientBookModal(false)}
                />
            )}
            {openAddInterventionModal && (
                <AddIntervention
                    open={openAddInterventionModal}
                    onClose={() => setAddInterventionModal(false)}
                />
            )}
            {openGoalLibraryModal && (
                <AddGoalLibrary
                    open={openGoalLibraryModal}
                    onClose={() => setGoalLibraryModal(false)}
                />
            )}
            {openAddInsuranceModal && (
                <AddInsurance
                    open={openAddInsuranceModal}
                    onClose={() => setAddInsuranceModal(false)}
                />
            )}
            {openAddDiagnosisCodeModal && (
                <AddDiagnosisCodeModal
                    open={openAddDiagnosisCodeModal}
                    onClose={() => setAddDiagnosisCodeModal(false)}
                />
            )}
            {openQuestionBankManagement && (
                <AddQuestionModal
                    open={openQuestionBankManagement}
                    onClose={() => setOpenQuestionBankManagement(false)}
                />
            )}
            {openDictionary && (
                <AddWord
                    open={openDictionary}
                    onClose={() => setOpenDictionary(false)}
                />
            )}
        </>
    );
};
export default CommonSubHeader;
