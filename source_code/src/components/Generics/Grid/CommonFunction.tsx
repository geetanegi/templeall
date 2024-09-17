/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useState } from 'react';
import publish from '../../../assets/img/publish.svg';
import draft from '../../../assets/img/draft.svg';
import systemGen from '../../../assets/img/systemGen.svg';
import customMade from '../../../assets/img/customMade.svg';
import downArrow from '../../../assets/img/downArrow.svg';
import unpublished from '../../../assets/img/unpublished.svg';
import upArrow from '../../../assets/img/upArrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Tooltip';
import {
    getActiveAsync,
    savingAuthCodeId,
    savingSortingData,
    savingTabData,
} from '../../../redux/slice/MineSlice/getMine';
import { utc } from 'moment';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePermission } from '../../../hooks/usePermission';
import {
    clearProgramBookTree,
    savingDomainIndex,
} from '../../../redux/slice/GetDomainById/getDomainById';
import { ROUTES } from '../../../constants';
import {
    clearExpandDomain,
    setActiveDomainId,
} from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import {
    clearExpandDomainIntervention,
    clearExpandLongTermIntervention,
    setActiveDomainIdIntervention,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import { getActiveAsyncHistory } from '../../../redux/slice/MineSlice/getOtherGridData';
import UserDetailsModal from '../../LandingPage/UserDetailsModal';
export const CustomStatusGuideline = (rowData: any): React.JSX.Element => {
    return rowData === true ? (
        <img className="w-3" src={systemGen} alt="" />
    ) : (
        <img className="w-3" src={customMade} alt="" />
    );
};
export const CustomStatusInsurance = (rowData: any): React.JSX.Element => {
    return rowData === true ? <span>Active</span> : <span>Inactive</span>;
};
export const CustomStatusBilling = (rowData: any): React.JSX.Element => {
    return rowData === true ? (
        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-orange-400 rounded-full shadow" />
    ) : rowData === false ? (
        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-red-400 rounded-full shadow" /> // Example for false case
    ) : rowData === null || rowData === '' ? (
        <></> // Example for null/blank case
    ) : (
        <div className="Ellipse95 ml-3 mr-2 w-2.5 h-2.5 bg-transparent rounded-full shadow" /> // Default case
    );
};
export const CustomStatusGuidelinePublish = (
    rowData: string
): React.JSX.Element => {
    return rowData === 'Draft' ? (
        <div className="flex ">
            <img className="mr-2 w-4" src={draft} alt="draft" />
            <span>Draft</span>
        </div>
    ) : rowData === 'Published' ? (
        <div className="flex ">
            <img className="mr-2 w-4" src={publish} alt="draft" />
            <span>Published</span>
        </div>
    ) : (
        <div className="flex">
            <img className="w-4 mr-2" src={unpublished} alt="publish" />
            <span>Unpublished</span>
        </div>
    );
};
export const CustomStatusSessionNote = (rowData: string): React.JSX.Element => {
    switch (rowData) {
        case 'Draft':
            return (
                <div className="flex ">
                    <img className="mr-2 w-4" src={draft} alt="draft" />
                    <span>Draft</span>
                </div>
            );
        case 'Unpublished':
            return (
                <div className="flex">
                    <img
                        className="mr-2 w-4"
                        src={unpublished}
                        alt="unpublished"
                    />
                    <span>Unpublished</span>
                </div>
            );
        case 'Published':
            return (
                <div className="flex">
                    <img className="w-4 mr-2" src={publish} alt="publish" />
                    <span>Published</span>
                </div>
            );
        default:
            break;
    }
    return rowData === 'Draft' ? (
        <div className="flex ">
            <img className="mr-2 w-4" src={draft} alt="" />
            <span>Draft</span>
        </div>
    ) : (
        <div className="flex">
            <img className="w-4 mr-2" src={publish} alt="" />
            <span>UnPublish</span>
        </div>
    );
};
export const CustomNameForRolesDes = (
    first: string,
    last: string
): React.JSX.Element => {
    if (first?.length) {
        return (
            <Tooltip
                title={
                    first.charAt(0).toUpperCase() +
                    first.slice(1) +
                    ' ' +
                    last.charAt(0).toUpperCase() +
                    last.slice(1)
                }
            >
                <div style={{ width: '20rem' }} className="truncate">
                    <span className="font-light  text-ellipsis whitespace-nowrap truncate ">
                        {first.charAt(0).toUpperCase() +
                            first.slice(1) +
                            ' ' +
                            last.charAt(0).toUpperCase() +
                            last.slice(1)}
                    </span>
                </div>
            </Tooltip>
        );
    } else {
        return <></>;
    }
};
export const CustomNameForUsers = (
    first: string,
    last: string
): React.JSX.Element => {
    if (first?.length) {
        return (
            <Tooltip
                title={
                    first.charAt(0).toUpperCase() +
                    first.slice(1) +
                    ' ' +
                    last.charAt(0).toUpperCase() +
                    last.slice(1)
                }
            >
                <div style={{ width: '7rem' }} className="truncate">
                    <span className="font-light text-ellipsis whitespace-nowrap truncate">
                        {first.charAt(0).toUpperCase() +
                            first.slice(1) +
                            ' ' +
                            last.charAt(0).toUpperCase() +
                            last.slice(1)}
                    </span>
                </div>
            </Tooltip>
        );
    } else {
        return <></>;
    }
};
export const CustomDateWithoutTime = (e: any): any => {
    const utcTimeString = e === null ? '' : e;
    if (!utcTimeString) return ' ';
    const utcDateTime = new Date(utcTimeString + 'Z');
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    return (
        <span className="font-light">
            {utcDateTime.toLocaleString('en-US', options)}
        </span>
    );
};
export const CustomName = (
    first: string,
    last: string,
    userDetails: any = false
): React.JSX.Element => {
    const [showUserModal, setShowUserModal] = useState(false);
    const navigate = useNavigate();
    const { permissions } = usePermission({
        itemsToCheck: ['view_other_users_dashboard'],
    });
    if (first === null) {
        first = '';
    }
    const convertFirst = first?.toString();
    if (last === null) {
        last = '';
    }
    const convertLast = last?.toString();
    const handleUserNameClick = (): void => {
        if (userDetails) {
            if (permissions.view_other_users_dashboard) {
                navigate(
                    `${ROUTES.user}/${userDetails.id}/${userDetails.organizationId}`
                );
            } else {
                setShowUserModal(true);
            }
        }
    };
    if (convertFirst && convertFirst.length) {
        return (
            <>
                <Tooltip
                    title={
                        convertFirst.charAt(0).toUpperCase() +
                        convertFirst.slice(1) +
                        ' ' +
                        convertLast.charAt(0).toUpperCase() +
                        convertLast.slice(1)
                    }
                    placement="right"
                >
                    <div className="truncate text-ellipsis w-[10rem]">
                        <span
                            onClick={handleUserNameClick}
                            className={`${first === 'Total --->' ? 'font-semibold text-right' : 'font-light'} text-ellipsis whitespace-nowrap truncate  ${userDetails ? 'text-primary-800 cursor-pointer hover:underline' : ''}`}
                        >
                            {convertFirst.charAt(0).toUpperCase() +
                                convertFirst.slice(1) +
                                ' ' +
                                convertLast.charAt(0).toUpperCase() +
                                convertLast.slice(1)}
                        </span>
                    </div>
                </Tooltip>
                {showUserModal ? (
                    <UserDetailsModal
                        userValue={userDetails}
                        open={showUserModal}
                        onClose={() => setShowUserModal(false)}
                    />
                ) : null}
            </>
        );
    } else {
        return <></>;
    }
};
export const CustomNewOld = (first: string): React.JSX.Element => {
    if (first === null) {
        first = '';
    }
    const convertFirst = first?.toString();
    //
    if (convertFirst && convertFirst.length) {
        return (
            <Tooltip
                title={
                    convertFirst.charAt(0).toUpperCase() + convertFirst.slice(1)
                }
            >
                <div className="truncate">
                    <pre>{first}</pre>
                </div>
            </Tooltip>
        );
    } else {
        return <></>;
    }
};
export const CustomNameIntervention = (
    first: string,
    last: string,
    data: any
): React.JSX.Element => {
    const dispatch = useDispatch<any>();
    const handleClearToggle = (): void => {
        dispatch(clearExpandDomainIntervention());
        dispatch(clearExpandLongTermIntervention());
        dispatch(setActiveDomainIdIntervention(null));
    };
    if (first === null || undefined) {
        first = '';
    }
    const convertFirst = first?.toString();
    //
    if (last === null || undefined) {
        last = '';
    }
    const convertLast = last?.toString();
    if (convertFirst && convertFirst.length) {
        return (
            <Tooltip
                title={
                    convertFirst.charAt(0).toUpperCase() +
                    convertFirst.slice(1) +
                    ' ' +
                    convertLast.charAt(0).toUpperCase() +
                    convertLast.slice(1)
                }
            >
                <Link to={`/interventionLanding/${data?.id}`}>
                    <div
                        className="truncate"
                        onClick={() => handleClearToggle()}
                    >
                        <span className="font-light text-ellipsis whitespace-nowrap truncate">
                            {convertFirst.charAt(0).toUpperCase() +
                                convertFirst.slice(1) +
                                ' ' +
                                convertLast.charAt(0).toUpperCase() +
                                convertLast.slice(1)}
                        </span>
                    </div>
                </Link>
            </Tooltip>
        );
    } else {
        return <></>;
    }
};
export const CustomNameGoalLibrary = (
    first: string,
    last: string,
    data: any
): React.JSX.Element => {
    const dispatch = useDispatch<any>();
    const handleClearToggle = (): void => {
        dispatch(clearExpandDomain());
        dispatch(setActiveDomainId(null));
    };
    if (first === null || undefined) {
        first = '';
    }
    const convertFirst = first?.toString();
    if (last === null || undefined) {
        last = '';
    }
    const convertLast = last?.toString();
    if (convertFirst && convertFirst.length) {
        return (
            <Tooltip
                title={
                    convertFirst.charAt(0).toUpperCase() +
                    convertFirst.slice(1) +
                    ' ' +
                    convertLast.charAt(0).toUpperCase() +
                    convertLast.slice(1)
                }
            >
                <Link to={`/GoalLibraryLanding/${data?.id}`}>
                    <div
                        className="truncate"
                        onClick={() => handleClearToggle()}
                    >
                        <span className="font-light text-ellipsis whitespace-nowrap truncate">
                            {convertFirst.charAt(0).toUpperCase() +
                                convertFirst.slice(1) +
                                ' ' +
                                convertLast.charAt(0).toUpperCase() +
                                convertLast.slice(1)}
                        </span>
                    </div>
                </Link>
            </Tooltip>
        );
    } else {
        return <></>;
    }
};
const getDefaultValue = (value?: string | null, defaultValue = '--'): any => {
    return value === null || value === undefined || value === ''
        ? defaultValue
        : value;
};
export const CustomNameForModifier = (
    Modifier1?: string,
    Modifier2?: string,
    Modifier3?: string,
    Modifier4?: string
): React.JSX.Element => {
    // Apply the default value function to each modifier
    const mod1 = getDefaultValue(Modifier1);
    const mod2 = getDefaultValue(Modifier2);
    const mod3 = getDefaultValue(Modifier3);
    const mod4 = getDefaultValue(Modifier4);
    // Combine modifiers into a single string with separators
    const combinedModifiers = [mod1, mod2, mod3, mod4].join(' | ');
    return (
        <Tooltip title={combinedModifiers}>
            <div className="truncate">
                <span className="font-light text-ellipsis whitespace-nowrap truncate">
                    {combinedModifiers}
                </span>
            </div>
        </Tooltip>
    );
};
export const CustomDate = (e: any): React.JSX.Element | null => {
    if (!e) {
        return null;
    }
    // Parse the UTC date and convert it to the local timezone
    const date = utc(e).local().isValid()
        ? utc(e).local().format('YYYY-MM-DD hh:mm A')
        : '';
    return (
        <div style={{ width: '10rem' }} className="truncate">
            <span className="font-light">
                {date === 'Invalid date' ? '' : date}
            </span>
        </div>
    );
};
export const CurrentDuration = (e: any): any => {
    const duration = utc(e * 1000).format('HH:mm:ss');
    return (
        <div style={{ width: '10rem' }} className="truncate">
            <span className="font-light">{duration}</span>
        </div>
    );
};
export default function ConstColumnDiv(
    name: string,
    getGridData: any,
    sortingKey: string,
    id?: any
): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const location = useLocation();
    const { state } = location;
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const appointmentVal = useSelector(
        ({ appointment }: any) => appointment.value
    );
    const code = useSelector(
        ({ scheduling }: any) => scheduling?.codeAfterEdit
    );
    const codeWithNonBilable = useSelector(
        ({ scheduling }: any) => scheduling?.setCodes
    );
    const provider = useSelector(({ scheduling }: any) => scheduling?.provider);
    const allCodes = Array.isArray(codeWithNonBilable)
        ? codeWithNonBilable.filter(
              (item: any) =>
                  item?.codeType === 'Billable' ||
                  item?.codeType?.name === 'Billable'
          )
        : [];
    const handleDescSorting = (order: string): any => {
        // Helper function to get the authorization code
        const getAuthorizationCode = (): string | undefined => {
            return (
                code?.id ??
                (allCodes.length > 0 ? allCodes[0]?.id : undefined) ??
                (appointmentVal?.authorizationCodes?.length > 0
                    ? appointmentVal.authorizationCodes[0]?.authorizationCode
                          ?.id
                    : '')
            );
        };
        // Define the data object
        const data = {
            ...getGridData,
            authorizationCodeId: state?.id,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: {
                startIndex: getGridData?.value?.data?.pageable?.pageNumber ?? 0,
                noOfRecords: 19,
            },
            filterValue: '',
            name: sortingKey,
            order,
            appointmentId: appointmentVal?.id,
            authorizationCode: getAuthorizationCode(),
            appointmentWith: appointmentVal?.appointmentWith?.id,
            serviceProviderId:
                provider || appointmentVal?.primaryProvider?.id || '',
        };
        // Define the initialData object
        const initialData = {
            id,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tabHistory,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: {
                startIndex: getGridData?.value?.data?.pageable?.pageNumber ?? 0,
                noOfRecords: 19,
            },
            name: sortingKey,
            order,
            filterValue: getMineData?.searchValue1,
            publishStatus: 'Published',
            appointmentId: appointmentVal?.id,
            appointmentWith: appointmentVal?.appointmentWith?.id,
            authorizationCode: getAuthorizationCode(),
        };
        // Define the payload object
        const payload = {
            ...getGridData,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: {
                startIndex: getGridData?.value?.data?.pageable?.pageNumber ?? 0,
                noOfRecords: 19,
            },
            name: sortingKey,
            order,
            appointmentId: appointmentVal?.id,
            appointmentWith: appointmentVal?.appointmentWith?.id,
            authorizationCode: getAuthorizationCode(),
        };
        // Dispatch actions based on tabHistory
        if (
            getMineData?.tabHistory === 'INTERVENTION_HISTORY' ||
            getMineData?.tabHistory === 'PROGRAMBOOK_HISTORY'
        ) {
            dispatch(getActiveAsyncHistory(initialData));
        } else if (getMineData?.tabHistory === 'SESSION_EXISTING_NOTE') {
            dispatch(getActiveAsync(payload));
        } else {
            dispatch(getActiveAsync(data));
        }
        // Dispatch sorting data
        dispatch(savingSortingData({ sortingData: { sortingKey, order } }));
    };
    const handleAceSorting = (order: string): void => {
        // Define a helper function to get the authorization code
        const getAuthorizationCode = (): string | undefined => {
            if (code?.id) {
                return code.id;
            }
            if (allCodes.length > 0) {
                return allCodes[0]?.id;
            }
            if (appointmentVal?.authorizationCodes?.length > 0) {
                return appointmentVal.authorizationCodes[0]?.authorizationCode
                    ?.id;
            }
            return '';
        };
        // Create the data object
        const data = {
            ...getGridData,
            authorizationCodeId: state?.id,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: {
                startIndex: getGridData?.value?.data?.pageable?.pageNumber ?? 0,
                noOfRecords: 19,
            },
            filterValue: '',
            name: sortingKey,
            order,
            appointmentId: appointmentVal?.id,
            appointmentWith: appointmentVal?.appointmentWith?.id,
            authorizationCode: getAuthorizationCode(),
            serviceProviderId:
                provider || appointmentVal?.primaryProvider?.id || '',
        };
        // Create the initialData object
        const initialData = {
            id,
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tabHistory,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: {
                startIndex: getGridData?.value?.data?.pageable?.pageNumber ?? 0,
                noOfRecords: 19,
            },
            name: sortingKey,
            order,
            filterValue: getMineData?.searchValue1,
            publishStatus: 'Published',
            appointmentId: appointmentVal?.id,
            appointmentWith: appointmentVal?.appointmentWith?.id,
            authorizationCode: getAuthorizationCode(),
        };
        // Create the payload object
        const payload = {
            ...getGridData,
            appointmentId: appointmentVal?.id,
            appointmentWith: appointmentVal?.appointmentWith?.id,
            authorizationCode: getAuthorizationCode(),
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getMineData?.tab,
            assignedTo: userPermission?.value?.data?.userId,
            pagination: {
                startIndex: getGridData?.value?.data?.pageable?.pageNumber ?? 0,
                noOfRecords: 19,
            },
            name: sortingKey,
            order,
        };
        // Dispatch actions based on tabHistory
        if (
            getMineData?.tabHistory === 'INTERVENTION_HISTORY' ||
            getMineData?.tabHistory === 'PROGRAMBOOK_HISTORY'
        ) {
            dispatch(getActiveAsyncHistory(initialData));
        } else if (getMineData?.tab === 'SESSION_EXISTING_NOTE') {
            dispatch(getActiveAsync(payload));
        } else {
            dispatch(getActiveAsync(data));
        }
        // Dispatch sorting data
        dispatch(savingSortingData({ sortingData: { sortingKey, order } }));
    };
    return (
        <div className="flex flex-row">
            <span className="text-base font-normal">{name}</span>
            {name === 'Questions' ||
            name === 'Answer Type' ||
            name === 'Parent/Guardian Name' ||
            name === "Child's Name" ||
            name === 'Employee  ' ||
            name === 'Client ' ||
            name === 'Client Name' ||
            name === 'Modified By' ||
            name === 'Action ' ||
            name === 'Created By' ||
            name === 'Old Value ' ||
            name === 'New Value ' ||
            name === 'Executed By ' ||
            name === 'Location ' ||
            name === 'Time ' ||
            name === 'Billing  Code' ||
            name === 'Billed Rate' ||
            name === 'Modifiers ' ||
            name === 'Modifier Name' ||
            name === 'Agreed Rate' ||
            name === 'Work  Hour' ||
            name === 'Work  Units' ||
            name === 'Billed  Charges' ||
            name === 'Agreed  Charges' ||
            name === 'Rate' ||
            name === 'Clinician' ||
            name === 'Published By' ||
            name === 'Admin' ||
            name === 'Admin E-mail' ||
            name === 'Organization E-mail' ||
            name === 'Actions' ||
            name === 'Discharge Reason' ||
            name === 'Published On' ||
            name === 'Insurance' ||
            name === 'Services' ||
            name === 'Phone Number' ||
            name === 'Email' ||
            name === 'Availability' ||
            name === 'Private Pay' ||
            name === 'Location' ||
            name === 'Date of Birth' ||
            name === "Parent's Name" ||
            name === "Client's Name" ||
            name === '' ||
            name === 'E-mail' ||
            name === 'Cell Phone' ||
            name === 'ID' ||
            name === 'Zip Code' ||
            name === 'Description' ||
            name === 'Default' ||
            name === 'Rate' ||
            name === 'Members' ||
            name === 'Employee Type' ||
            name === 'Name' ||
            name === 'Long Form' ||
            name === 'Client' ||
            name === 'Payor' ||
            name === 'Service Date' ||
            name === 'Parent COB Claim ID' ||
            name === 'Amount $' ||
            name === 'Exported' ||
            name === 'Responses' ||
            name === 'Total Paid' ||
            name === 'Errors' ||
            name === 'Actions' ||
            name === 'Date ' ||
            name === 'Payment Type' ||
            name === 'Applied By' ||
            name === 'Resource' ||
            name === 'ERA Number' ||
            name === 'Amount' ||
            name === 'Version' ||
            name === 'Deleted By' ? (
                ''
            ) : (
                <div className="flex flex-col ml-2 mt-1 ">
                    <button
                        onClick={() => handleAceSorting('ASC')}
                        className="m-.8"
                        style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <img className="h-2 w-2" src={upArrow} alt="upArrow" />
                    </button>
                    <button
                        onClick={() => handleDescSorting('DESC')}
                        className="m-.8"
                        style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            className="h-2 w-2"
                            src={downArrow}
                            alt="downArrow"
                        />
                    </button>
                </div>
            )}
        </div>
    );
}
export const CustomStatus = (rowData: any): React.JSX.Element => {
    return (
        <div
            className={`w-2 h-2 ml-2 mr-2 rounded-full ${
                rowData === 'active' || 'Published'
                    ? 'bg-[#33AE10]'
                    : 'bg-[#FF6C59]'
            }`}
        />
    );
};
export const RedirectionToProgramBook = (e: any): any => {
    const dispatch = useDispatch<any>();
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const { permissions } = usePermission({
        itemsToCheck: ['create_program_book'],
    });
    const RedirectToProgramBook = (): any => {
        if (
            permissions?.create_program_book ||
            getMineData?.tab != 'discharged'
        ) {
            dispatch(savingDomainIndex({ domainIndex: '', programIndex: '' }));
            dispatch(clearProgramBookTree({}));
        }
    };
    return (
        <Tooltip title={e?.name?.charAt(0).toUpperCase() + e?.name?.slice(1)}>
            <div style={{ width: '12rem' }} className="truncate">
                {/* <span>
                    {e?.name?.charAt(0)?.toUpperCase() + e?.name?.slice(1)}
                </span> */}
                <Link
                    to={`/program-book/${e?.programBookUUID}`}
                    className={`${!permissions?.create_program_book || getMineData?.tab === 'discharged' ? 'pointer-events-none' : ''}`}
                >
                    <span onClick={() => RedirectToProgramBook()}>
                        {e?.name?.charAt(0)?.toUpperCase() + e?.name?.slice(1)}
                    </span>
                </Link>
            </div>
        </Tooltip>
    );
};
export const RedirectionToBillableCustomRate = (
    rate: any,
    id: any,
    code: any,
    description: any
): any => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const handleClick = (): any => {
        dispatch(savingTabData({ tab: 'Custom Rate' }));
        dispatch(savingAuthCodeId({ authorizationCodeId: id }));
        navigate(ROUTES.RateGrid, {
            state: {
                rate,
                id,
                code,
                description,
            },
        });
        // navigate(ROUTES.RateGrid);
    };
    return (
        <Tooltip title={rate} placement="middle">
            <div style={{ color: '#035387' }}>
                <button className="text-[#035387]" onClick={handleClick}>
                    {rate}
                </button>
            </div>
        </Tooltip>
    );
};
export const RedirectionToBillableDefaultRate = (
    rate: any,
    id: any,
    code: any,
    description: any
): any => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const handleClick = (): any => {
        dispatch(savingTabData({ tab: 'Default Rate' }));
        dispatch(savingAuthCodeId({ authorizationCodeId: id }));
        navigate(ROUTES.RateGrid, {
            state: {
                rate,
                id,
                code,
                description,
            },
        });
        // navigate(ROUTES.RateGrid);
    };
    return (
        <Tooltip title={rate} placement="middle">
            <div style={{ color: '#035387' }}>
                <button className="text-[#035387]" onClick={handleClick}>
                    {rate}
                </button>
            </div>
        </Tooltip>
    );
};
