/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
import edit from '../../assets/img/editIcon.svg';
import view from '../../assets/img/GridIcons/view.svg';
import ConstColumnDiv, {
    CustomName,
    RedirectionToBillableCustomRate,
    RedirectionToBillableDefaultRate,
} from '../Generics/Grid/CommonFunction';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/index';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import {
    clearMetaData,
    editAuthorizationCodeCall,
    viewOnlyMode,
} from '../../redux/slice/EditAuthorizationCode/editAuthorizationCode';
import { getMetaDataAuthorizationCodeCall } from '../../redux/slice/EditAuthorizationCode/getMetaData';
import addDefault from '../../assets/img/Rate/addDefault.svg';
import addCustom from '../../assets/img/Rate/addCustom.svg';
import AddCustomRate from '../Rate/Modal/addCustomRate';
import AddDefaultRate from '../Rate/Modal/addDefaultRate';
import activateIcon from '../../assets/img/activateCode.svg';
import inactiveIcon from '../../assets/img/inactivateCode.svg';

import { feeScheduleCall } from '../../redux/slice/FeeSchedule/getFeeSchedule';
import {
    getAllClientForRateCall,
    getAllEmployeeForRateCall,
} from '../../redux/slice/Rate/customRateSlice';
import { getAllServicePlacesCall } from '../../redux/slice/ServicePlaces/getAllServicePlaces';
import { usePermission } from '../../hooks/usePermission';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import AuthorizedCodeGrid from '../../api/services/AuthorizationCode/AuthorizationCodeGridApi.service';

export default function AuthorizationCodeGrid(): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: [
            'create_billing_code',
            'view_billing_code',
            'create_default_rate',
            'change_assignee',
        ],
    });
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [openCustom, setOpenCustom] = React.useState(false);
    const [openDefault, setOpenDefault] = React.useState(false);
    const [
        openConfirmationModalForActivateCode,
        setOpenConfirmationModalForActivateCode,
    ] = React.useState(false);
    const [
        openConfirmationModalForInactiveCode,
        setOpenConfirmationModalForInactiveCode,
    ] = React.useState(false);

    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const ActionTemplateGrid = (e: any, setEvent: any): any => {
        const editOrganizations = (): any => {
            if (permissions?.create_billing_code) {
                dispatch(clearMetaData());
                dispatch(getMetaDataAuthorizationCodeCall());
                setTimeout(() => {
                    navigate(`${ROUTES.AuthorizationCodePage}/${e.id}`);
                }, 1000);
            }
        };
        const ViewOrganizations = (): any => {
            if (permissions?.view_billing_code) {
                dispatch(viewOnlyMode(true));
                dispatch(
                    editAuthorizationCodeCall({ authorizationCodeId: e.id })
                );
                dispatch(getMetaDataAuthorizationCodeCall());
                setTimeout(() => {
                    navigate(ROUTES.AuthorizationCodePage);
                }, 1000);
            }
        };
        const handleCustomRate = (): any => {
            const data = {
                authorizationCodeId: e?.id,
            };
            dispatch(editAuthorizationCodeCall({ authorizationCodeId: e.id }));
            dispatch(getAllEmployeeForRateCall(data));
            dispatch(getAllClientForRateCall(data));
            setOpenCustom(true);
        };
        const handleDefaultRate = (): any => {
            if (permissions?.create_default_rate) {
                dispatch(feeScheduleCall());
                dispatch(
                    editAuthorizationCodeCall({ authorizationCodeId: e.id })
                );
                dispatch(getAllServicePlacesCall());
                setOpenDefault(true);
            }
        };
        const activateCode = (): any => {
            if (e?.status === 'Inactive') {
                setEvent({
                    id: e?.id,
                    name: e?.code,
                });
                setOpenConfirmationModalForActivateCode(true);
            }
        };
        const inactiveCode = (): any => {
            if (e?.status === 'Active') {
                setEvent({
                    id: e?.id,
                    name: e?.code,
                });
                setOpenConfirmationModalForInactiveCode(true);
            }
        };
        return (
            <div className="flex  items-center">
                <Tooltip title="View">
                    <Link
                        to={''}
                        className={`${!permissions?.view_billing_code ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img
                            data-testid="View-element"
                            className="mt-1"
                            onClick={ViewOrganizations}
                            src={view}
                            alt="View"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Edit">
                    <Link
                        to={''}
                        className={`${!permissions?.create_billing_code ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img
                            data-testid="edit-element"
                            className=" mt-1 ml-4"
                            onClick={editOrganizations}
                            src={edit}
                            alt="edit"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Add Default">
                    <Link
                        to={''}
                        className={`${!permissions?.create_default_rate ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img
                            data-testid="Default-element"
                            onClick={handleDefaultRate}
                            className=" mt-1 ml-4"
                            src={addDefault}
                            alt="Add Default"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Add Custom">
                    <img
                        data-testid="customRate-modal-open"
                        onClick={handleCustomRate}
                        className=" mt-1 ml-4"
                        src={addCustom}
                        alt="Add Custom"
                    />
                </Tooltip>
                <Tooltip title="Active">
                    <img
                        data-testid="activateIcon"
                        src={activateIcon}
                        alt="activateIcon"
                        onClick={activateCode}
                        className={`${e?.status === 'Active' ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} ml-4 `}
                    />
                </Tooltip>
                <Tooltip title="Inactive">
                    <img
                        data-testid="inactiveIcon"
                        src={inactiveIcon}
                        alt="inactiveIcon"
                        onClick={inactiveCode}
                        className={`${e?.status === 'Inactive' ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} ml-4`}
                    />
                </Tooltip>
            </div>
        );
    };

    const title = 'Billing Codes';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'AUTHORIZED_CODE',
        assignedTo: userPermission?.value?.data?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'AUTHORIZED_CODE' }));
    }, [dispatch]);
    const [event, setEvent] = React.useState({
        id: '',
        name: '',
    });
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '5rem',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Id', getGridData, 'id'),
            body: (e: any) => CustomName(e?.id, ''),
        },
        {
            header: ConstColumnDiv('Default', getGridData, 'defaults'),
            body: (e: any) =>
                RedirectionToBillableDefaultRate(
                    e?.defaults,
                    e?.id,
                    e?.code,
                    e?.description
                ),
        },
        {
            header: ConstColumnDiv('Rate', getGridData, 'rate'),
            body: (e: any) =>
                RedirectionToBillableCustomRate(
                    e?.rate,
                    e?.id,
                    e?.code,
                    e?.description
                ),
        },
        {
            header: ConstColumnDiv('Code', getGridData, 'code'),
            body: (e: any) => CustomName(e?.code, ''),
        },
        {
            header: ConstColumnDiv('Description', getGridData, 'description'),
            width: '40rem',
            body: (e: any) => CustomName(e?.description, ''),
        },
        {
            header: ConstColumnDiv('Code Type', getGridData, 'codeType.name'),
            body: (e: any) => CustomName(e?.codeType?.name, ''),
        },
        {
            header: ConstColumnDiv('Status', getGridData, 'status'),
            body: (e: any) => CustomName(e?.status, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            body: (e: any) => ActionTemplateGrid(e, setEvent),
        },
    ];
    const handleActivateCode = async (): Promise<any> => {
        const payload = {
            authorizationCodeId: event?.id,
            status: 'Active',
        };
        const res = await AuthorizedCodeGrid.changeBillingCodeStatus(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForActivateCode(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Billing Code activated successfully',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            setOpenConfirmationModalForActivateCode(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to activate this record',
                        description: '',
                    })
                );
            }, 800);
        }
    };
    const handleInactiveCode = async (): Promise<any> => {
        const payload = {
            authorizationCodeId: event?.id,
            status: 'Inactive',
        };
        const res = await AuthorizedCodeGrid.changeBillingCodeStatus(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForInactiveCode(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Billing code is inactive now',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            setOpenConfirmationModalForInactiveCode(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to inactive this record',
                        description: '',
                    })
                );
            }, 800);
        }
    };

    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openCustom && (
                <AddCustomRate
                    open={openCustom}
                    onClose={() => setOpenCustom(false)}
                />
            )}
            {openDefault && (
                <AddDefaultRate
                    open={openDefault}
                    onClose={() => setOpenDefault(false)}
                />
            )}
            {openConfirmationModalForActivateCode && (
                <ConfirmationModal
                    header={'Activate Code'}
                    name={event?.name}
                    title={`Are you sure you want to activate this billing code ${event?.name} ?`}
                    open={openConfirmationModalForActivateCode}
                    onClose={() =>
                        setOpenConfirmationModalForActivateCode(false)
                    }
                    handleStop={handleActivateCode}
                />
            )}
            {openConfirmationModalForInactiveCode && (
                <ConfirmationModal
                    header={'Inactive Code'}
                    name={event?.name}
                    title={`Are you sure you want to make this billing code inactive ${event?.name} ?`}
                    open={openConfirmationModalForInactiveCode}
                    onClose={() =>
                        setOpenConfirmationModalForInactiveCode(false)
                    }
                    handleStop={handleInactiveCode}
                />
            )}
        </>
    );
}
