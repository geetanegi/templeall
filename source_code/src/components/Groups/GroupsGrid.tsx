/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
//Icons Import
import edit from '../../assets/img/editIcon.svg';
import view from '../../assets/img/GridIcons/view.svg';
import Delete from '../../assets/img/delete.svg';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { Link } from 'react-router-dom';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import { ROUTES } from '../../constants';
import { usePermission } from '../../hooks/usePermission';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import groupApi from '../../api/services/Groups/saveGroup.service';
export default function GroupsGrid(): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: ['delete_group', 'view_group', 'create_group'],
    });
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const dispatch = useDispatch<any>();
    const ActionTemplateGrid = (e: any, setEvent: any): any => {
        const deleteGroup = (): void => {
            if (permissions?.delete_group) {
                setEvent({
                    id: e?.id,
                    name: e?.name,
                });
                setOpenConfirmationModalForDelete(true);
            }
        };
        return (
            <div className="flex items-center">
                <Tooltip title="View">
                    <Link
                        to={`${ROUTES.viewGroup}/${e?.id}`}
                        className={`${!permissions?.view_group ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img className=" mt-1" src={view} alt="View" />
                    </Link>
                </Tooltip>
                <Tooltip title="Edit">
                    <Link
                        to={`${ROUTES.addNewGroup}/${e?.id}`}
                        className={`${!permissions?.create_group ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img className=" mt-1 ml-4" src={edit} alt="edit" />
                    </Link>
                </Tooltip>
                <Tooltip title="Delete">
                    <Link
                        to={''}
                        onClick={deleteGroup}
                        className={`${!permissions?.delete_group || !e?.deleteEnabled ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {' '}
                        <img src={Delete} alt="Delete" className="ml-4" />
                    </Link>
                </Tooltip>
            </div>
        );
    };
    const title = 'Groups';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'GROUPS',
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
        dispatch(savingTabData({ tab: 'GROUPS' }));
    }, [dispatch]);
    const [event, setEvent] = React.useState({ id: '', name: '' });
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            groupId: event?.id,
        };
        const res = await groupApi.deleteGroup(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Group deleted successfully.',
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
            header: ConstColumnDiv('', getGridData, ''),
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Name', getGridData, 'name'),
            width: '12rem',
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Description', getGridData, 'description'),
            width: '12rem',
            body: (e: any) => CustomName(e?.description, ''),
        },
        {
            header: ConstColumnDiv('Members', getGridData, 'members'),
            width: '40px',
            body: (e: any) => CustomName(e?.members, ''),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            width: '12rem',
            // field: 'createdBy.username',
            body: (e: any) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            width: '12rem',
            // field: 'createdDate',
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '12rem',
            body: (e: any) => ActionTemplateGrid(e, setEvent),
        },
    ];
    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Group'}
                    name={event?.name}
                    title={`Are you sure you want to delete this group  ${event?.name} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
        </>
    );
}
