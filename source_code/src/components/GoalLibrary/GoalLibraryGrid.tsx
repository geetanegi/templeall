/* eslint-disable max-len */
import * as React from 'react';
import Grid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
import { Link } from 'react-router-dom';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { getGoalLibraryById } from '../../redux/slice/GoalLibrary/GoalLibraryData';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
    CustomNameGoalLibrary,
} from '../Generics/Grid/CommonFunction';

// Icons Import
import editIcon from '../../assets/img/editIcon.svg';
import copyIcon from '../../assets/img/GridIcons/copy.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import { usePermission } from '../../hooks/usePermission';
import GoalLibraryDataApi from '../../api/services/GoalLibrary/GoalLibraryDataApi.service';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import Button from '../Generics/Button';
import CopyGoalLibraryModal from './Modal/CopyGoalLibrary';

export default function GoalLibraryGrid(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [copy, setCopy] = React.useState(false);
    const [data1, setData] = React.useState({});
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const { permissions } = usePermission({
        itemsToCheck: [
            'create_goal_library',
            'delete_goal_library',
            'copy_goal_library',
        ],
    });
    const [goalLibraryId, setGoalLibraryId] = React.useState('');
    const handleDelete = async (): Promise<void> => {
        try {
            const response =
                await GoalLibraryDataApi.deleteGoalLibrary(goalLibraryId);

            if (response.status === 500) {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Goal Library not deleted successfully.',
                        description: '',
                    })
                );
                setGoalLibraryId('');
                // Handle the 500 error specifically here
                // onDeleteError(new Error('Internal Server Error'));
            } else {
                setGoalLibraryId('');
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Goal Library deleted successfully.',
                        description: '',
                    })
                );
                const data = {
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'GOAL_LIBRARY',
                    assignedTo: userPermission?.value?.data?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: '',
                    name: '',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };

                dispatch(getActiveAsync(data));
                dispatch(savingTabData({ tab: 'GOAL_LIBRARY' }));

                // Handle success here
                // onDeleteSuccess();
            }
        } catch (error) {
            dispatch(
                openNotification({
                    success: false,
                    title: 'Goal Library not deleted successfully.',
                    description: '',
                })
            );
            setGoalLibraryId('');
        }
    };

    const handleEdit = (e: any): void => {
        if (permissions?.create_goal_library) {
            dispatch(getGoalLibraryById({ id: e?.id }));
        }
    };

    const deleteGoal = (e: any): void => {
        if (permissions?.delete_goal_library) {
            setGoalLibraryId(e?.id);
        }
    };
    const copyLibrary = (e: any): void => {
        setCopy(true);
        setData(e);
    };
    const ActionTemplateGrid = (e: any): React.JSX.Element => (
        <div className="flex ml-[-2rem] justify-evenly items-center">
            <Tooltip title="Edit">
                <Link
                    to={`/GoalLibraryLanding/${e?.id}`}
                    className={`${!permissions?.create_goal_library ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <img
                        className="mt-1"
                        src={editIcon}
                        onClick={() => handleEdit(e)}
                        alt="edit"
                    />
                </Link>
            </Tooltip>
            <Tooltip title="Copy">
                <Button className="" type="" onClick={() => copyLibrary(e)}>
                    <img
                        src={copyIcon}
                        alt="copy"
                        className={`${!permissions?.copy_goal_library ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Button>
            </Tooltip>
            <Tooltip title="Delete">
                <Button className={''} type={''} onClick={() => deleteGoal(e)}>
                    <img
                        src={deleteIcon}
                        alt="deleteIcon"
                        className={`${!permissions?.delete_goal_library ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Button>
            </Tooltip>
        </div>
    );

    const title = 'Goal Library';
    const getGridData = useSelector(({ getMine }: any) => getMine);

    const data = React.useMemo(
        () => ({
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'GOAL_LIBRARY',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        }),
        [userPermission]
    );

    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'GOAL_LIBRARY' }));
    }, [data, dispatch]);

    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '25px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Goal Name', getGridData, 'name'),
            body: (e: any) => CustomNameGoalLibrary(e?.name, '', e),
        },
        {
            header: ConstColumnDiv('Type', getGridData, 'services.name'),
            body: (e: any) => CustomName(e?.services?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            body: (e: any) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            body: (e: any) => ActionTemplateGrid(e),
        },
    ];

    return (
        <>
            <CommonSubHeader title={title} />
            <Grid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {goalLibraryId && (
                <ConfirmationModal
                    title={
                        'Are you sure you want to delete this goal library ?'
                    }
                    open={goalLibraryId ? true : false}
                    onClose={() => setGoalLibraryId('')}
                    handleStop={handleDelete}
                />
            )}
            {copy && (
                <CopyGoalLibraryModal
                    header={'Copy Goal Library'}
                    title={'Are you sure you want to copy this library ?'}
                    data={data1}
                    open={copy}
                    onClose={() => setCopy(false)}
                />
            )}
        </>
    );
}
