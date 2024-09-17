import * as React from 'react';
import ConstColumnDiv, {
    CustomNameForRolesDes,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import CommonGrid from '../Generics/Grid';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import Tooltip from '../Generics/Tooltip';
import view from '../../assets/img/GridIcons/view.svg';
import edit from '../../assets/img/GridIcons/edit.svg';
import Delete from '../../assets/img/delete.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import {
    EditRoleCall,
    viewOnlyData,
} from '../../redux/slice/EditRole/getRoleById';
import { usePermission } from '../../hooks/usePermission';
import ConfirmationModal from '../Generics/ConfirmationModal';
import DeleteRoleApi from '../../api/services/RoleAndPermissions/deleteRole.service';
import { openNotification } from '../../redux/slice/Notification/notifications';

export default function RolesGrid(): React.JSX.Element {
    const title = 'Roles';
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );

    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);

    const { permissions } = usePermission({
        itemsToCheck: [
            'create_role_and_permission',
            'view_role_and_permission',
            'delete_role_and_permission',
        ],
    });
    React.useEffect(() => {
        const data = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            appointmentId: 1,
            authorizationCode: 1,
            type: 'ROLES',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'ROLES' }));
    }, [
        dispatch,
        userPermission?.userRoles?.data?.roleId,
        userPermission?.value?.data?.userId,
    ]);

    const ActionIntakeGrid = (e: any, setEvent: any): any => {
        const viewMode = (): any => {
            if (permissions?.view_role_and_permission) {
                const data = {
                    roleId: e.id,
                };
                dispatch(viewOnlyData(true));
                dispatch(EditRoleCall(data));
                setTimeout(() => {
                    navigate(ROUTES.AddNewRoles);
                }, 2000);
            }
        };

        const deleteRole = (): void => {
            if (permissions?.delete_role_and_permission) {
                setEvent({
                    id: e?.id,
                    name: e?.name,
                });
                setOpenConfirmationModalForDelete(true);
            }
        };
        return (
            <div className="flex items-center ">
                <Tooltip title="Edit">
                    <Link
                        to={`${ROUTES.editRole}/${e?.id}`}
                        className={`${!permissions?.create_role_and_permission ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img src={edit} alt="Edit" className=" mt-2" />
                    </Link>
                </Tooltip>
                <Tooltip title="View">
                    <Link
                        to={ROUTES.AddNewRoles}
                        className={`${!permissions?.view_role_and_permission ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img
                            onClick={viewMode}
                            src={view}
                            alt="view"
                            className=" mt-2 ml-4"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Delete">
                    <img
                        src={Delete}
                        alt="Delete"
                        onClick={deleteRole}
                        className={`${!permissions?.delete_role_and_permission || !e?.deleteEnabled ? 'opacity-50 pointer-events-none' : ''} ml-4`}
                    />
                </Tooltip>
            </div>
        );
    };
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const [event, setEvent] = React.useState({ id: '', name: '' });
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            roleId: event?.id,
        };
        const res = await DeleteRoleApi.deleteRole(payload);
        const data = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            appointmentId: 1,
            authorizationCode: 1,
            type: 'ROLES',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Role deleted successfully.',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            setOpenConfirmationModalForDelete(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to delete this record',
                        description: '',
                    })
                );
            }, 800);
        }
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('Role', getGridData, 'name'),
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Members', getGridData, 'members'),
            body: (e: any) => CustomName(e?.members?.toString(), ''),
        },
        {
            header: ConstColumnDiv('Description', getGridData, 'description'),
            body: (e: any) => CustomNameForRolesDes(e?.description, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: any) => ActionIntakeGrid(e, setEvent),
        },
    ];

    return (
        <>
            <CommonSubHeader title={title} />
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Role'}
                    name={event?.name}
                    title={`Are you sure you want to delete this role  ${event?.name} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
        </>
    );
}
