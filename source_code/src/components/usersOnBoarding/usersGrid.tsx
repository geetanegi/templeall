import * as React from 'react';
import ConstColumnDiv, {
    CustomDateWithoutTime,
    CustomName,
    CustomNameForUsers,
} from '../Generics/Grid/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import CommonGrid from '../Generics/Grid';
import { savingTabData } from '../../redux/slice/MineSlice/getMine';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import edit from '../../assets/img/GridIcons/edit.svg';
import view from '../../assets/img/GridIcons/view.svg';
import history from '../../assets/img/GridIcons/history.svg';
import { Link } from 'react-router-dom';
import Tooltip from '../Generics/Tooltip';
import { getEmployeeByIdCall } from '../../redux/slice/GetEmployeeById/getEmployeeById';
import {
    getHistoryById,
    savingValue,
} from '../../redux/slice/users/usersSlice';
import { savingClientId } from '../../redux/slice/Insurance/insurance';
import { usePermission } from '../../hooks/usePermission';
import HistoryModal from './HistoryModal';
import {
    setOnEdit,
    setOnView,
} from '../../redux/slice/Authorizations/authorization';
import resend from '../../assets/img/userOnBoarding/resend.svg';
import resetPasswordLinkApi from '../../api/services/Users/resetLink.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { AppDispatch } from '../../redux/store';
export default function ContactGrid(): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: ['create_user', 'view_user', 'reset_link'],
    });
    const title = 'Users';
    const dispatch = useDispatch<AppDispatch>();
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const [
        openConfirmationModalForActivateCode,
        setOpenConfirmationModalForActivateCode,
    ] = React.useState(false);
    const [event, setEvent] = React.useState(false);
    React.useEffect(() => {
        dispatch(savingTabData({ tab: getGridData?.tab || 'Employee' }));
    }, [dispatch, getGridData?.tab]);
    const ActionIntakeGrid = (e: any): any => {
        const editEmployee = (): void => {
            if (permissions?.create_user) {
                dispatch(savingClientId(e?.userId));
                dispatch(savingValue(true));
                dispatch(setOnView(false));
                dispatch(setOnEdit(true));
            }
        };
        const viewEmployee = (): void => {
            if (permissions?.view_user) {
                const data = {
                    id: e?.id,
                };
                dispatch(getEmployeeByIdCall(data));
                dispatch(savingClientId(e?.userId));
                dispatch(savingValue(true));
                dispatch(setOnView(true));
                dispatch(setOnEdit(false));
            }
        };
        const watchHistory = (): void => {
            const payload = {
                id: e?.userId,
                organizationSpecificId: e?.organizationId,
            };
            dispatch(getHistoryById(payload));
            setOpenConfirmationModalForActivateCode(true);
            setEvent(e);
        };
        const handleResetPasswordLink = async (): Promise<void> => {
            const payload = {
                resetEmail: e?.email,
            };
            const res = await resetPasswordLinkApi.resetLink(payload);
            if (!res?.data?.error) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Mail to reset password has been sent to user successfully.',
                        description: '',
                    })
                );
            }
        };
        return (
            <div className="flex item-start space-x-5">
                <Tooltip title="View">
                    <Link
                        to={`/view-user/${e?.id}`}
                        className={`${!permissions?.view_user ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} `}
                    >
                        <img
                            data-testid="view-element"
                            src={view}
                            onClick={viewEmployee}
                            alt="Edit"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Edit">
                    <Link
                        to={`/add-user/${e?.id}`}
                        className={`${!permissions?.create_user ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img
                            data-testid="edit-element"
                            src={edit}
                            onClick={editEmployee}
                            alt="Edit"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="History">
                    <img
                        data-testid="history-element"
                        src={history}
                        onClick={watchHistory}
                        alt="history"
                    />
                </Tooltip>
                <Tooltip title="Reset Password">
                    <img
                        className={`${!permissions?.reset_link ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} `}
                        src={resend}
                        onClick={handleResetPasswordLink}
                        alt="reset link"
                    />
                </Tooltip>
            </div>
        );
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv(
                'Employee Type',
                getGridData,
                'primaryRoleName'
            ),
            body: (e: any) => CustomNameForUsers(e?.primaryRoleName, ''),
        },
        {
            header: ConstColumnDiv('Name', getGridData, 'userId.firstName'),
            body: (e: any) =>
                CustomName(
                    e?.firstName,
                    e?.lastName,
                    getGridData?.tab === 'Employee'
                        ? { ...e, id: e.userId }
                        : null
                ),
        },
        {
            header: ConstColumnDiv('ID', getGridData, 'id'),
            body: (e: any) => {
                const idData = e?.id?.toString();
                return (
                    <div className="w-[4rem]">
                        <span
                            key={idData}
                            className="font-light whitespace-nowrap truncate"
                        >
                            {idData}
                        </span>
                    </div>
                );
            },
        },
        {
            header: ConstColumnDiv('Status', getGridData, 'ui.isActive'),
            body: (e: any) =>
                CustomNameForUsers(e?.status ? 'Active' : 'Inactive', ''),
        },
        {
            header: ConstColumnDiv('City', getGridData, 'up.personalCity'),
            body: (e: any) => CustomNameForUsers(e?.personalCity, ''),
        },
        {
            header: ConstColumnDiv('State', getGridData, 'up.personalState'),
            body: (e: any) => CustomNameForUsers(e?.personalState, ''),
        },
        {
            header: ConstColumnDiv(
                'Zip Code',
                getGridData,
                'personalPostalCode'
            ),
            body: (e: any) => CustomNameForUsers(e?.personalPostalCode, ''),
        },
        {
            header: ConstColumnDiv('Cell Phone', getGridData, 'cellPhone'),
            body: (e: any) => CustomNameForUsers(e?.cellPhone, ''),
        },
        {
            header: ConstColumnDiv('E-mail', getGridData, 'email'),
            body: (e: any) => CustomNameForUsers(e?.email, ''),
        },
        {
            header: ConstColumnDiv('Date of Birth', getGridData, 'dateOfBirth'),
            body: (e: any) => CustomDateWithoutTime(e?.dateOfBirth),
        },
        {
            header: ConstColumnDiv('Location', getGridData, 'workCity'),
            body: (e: any) => {
                const formattedLocation = `${e?.workCity}, ${e?.workPostalCode} - ${e?.workState}`;
                return CustomName(formattedLocation, '');
            },
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '10%',
            body: (e: any) => ActionIntakeGrid(e),
        },
    ];
    return (
        <>
            <CommonSubHeader title={title} />
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openConfirmationModalForActivateCode && (
                <HistoryModal
                    open={openConfirmationModalForActivateCode}
                    onClose={() =>
                        setOpenConfirmationModalForActivateCode(false)
                    }
                    data={event}
                />
            )}
        </>
    );
}
