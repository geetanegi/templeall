import * as React from 'react';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import CommonGrid from '../Generics/Grid';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import edit from '../../assets/img/GridIcons/edit.svg';
import publishImg from '../../assets/img/publish.svg';
import unpublishedImg from '../../assets/img/unpublished.svg';
import { Link } from 'react-router-dom';
import Tooltip from '../Generics/Tooltip';
import { savingValue } from '../../redux/slice/users/usersSlice';
import { savingClientId } from '../../redux/slice/Insurance/insurance';

import {
    setOnEdit,
    setOnView,
} from '../../redux/slice/Authorizations/authorization';
import { AppDispatch } from '../../redux/store';
import ConfirmationModal from '../Generics/ConfirmationModal';
import IntakeEditorApi from '../../api/services/IntakeEditor/IntakeEditorApi';
import { openNotification } from '../../redux/slice/Notification/notifications';
interface RootState {
    getUserPermission: {
        userRoles: { data: { roleId: number } };
        value: { data: { userId: number } };
    };
}
export default function ClientIntakeGrid(): React.JSX.Element {
    const userPermission = useSelector(
        (state: RootState) => state.getUserPermission
    );
    const title = 'Client Intake Forms';
    const dispatch = useDispatch<AppDispatch>();
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const [openConfirmationModal, setOpenConfirmationModal] =
        React.useState(false);
    const [onClickAction, setOnClickAction] = React.useState('');
    const [event, setEvent] = React.useState({ id: '', name: '', version: '' });

    const data = {
        heading: 'Client Intake Forms',
        roleId: userPermission?.userRoles?.data?.roleId || '',
        type: getGridData?.tab || 'Client Intake Forms',
        assignedTo: userPermission?.value?.data?.userId || '',
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(
            savingTabData({ tab: getGridData?.tab || 'Client Intake Forms' })
        );
    }, [dispatch]);
    const ActionIntakeGrid = (e: any): any => {
        const editEmployee = (): void => {
            dispatch(savingClientId(e?.userId));
            dispatch(savingValue(true));
            dispatch(setOnView(false));
            dispatch(setOnEdit(true));
        };
        const unpublished = (): any => {
            setOpenConfirmationModal(true);
            setOnClickAction('Unpublish');
            setEvent({ id: e?.id, name: e?.name, version: e?.version });
        };
        const publish = (): any => {
            setOpenConfirmationModal(true);
            setOnClickAction('Publish');
            setEvent({ id: e?.id, name: e?.name, version: e?.version });
        };

        return (
            <div className="flex item-start space-x-5">
                <Tooltip title="Edit">
                    <Link
                        to={`/add-user/${e?.id}`}
                        className={`${
                            e?.clientIntakeStatus?.name === 'Unpublished'
                                ? 'cursor-pointer'
                                : 'opacity-50 pointer-events-none'
                        }`}
                    >
                        <img
                            data-testid="edit-element"
                            src={edit}
                            onClick={editEmployee}
                            alt="Edit"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Publish">
                    <img
                        data-testid="publish-goal-mode-button"
                        src={publishImg}
                        className={`${
                            e?.clientIntakeStatus?.name === 'Published' ||
                            e?.fullySaved !== true
                                ? 'opacity-50 pointer-events-none'
                                : 'cursor-pointer'
                        }`}
                        alt="publish"
                        onClick={publish}
                    />
                </Tooltip>
                <Tooltip title="Unpublish" placement="middle">
                    <img
                        data-testid="unpublished-goal-mode-button"
                        src={unpublishedImg}
                        className={`${e?.clientIntakeStatus?.name === 'Published' ? 'cursor-pointer' : 'opacity-50 pointer-events-none'}`}
                        alt="unpublished"
                        onClick={unpublished}
                    />
                </Tooltip>
            </div>
        );
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('Version', getGridData, 'name'),
            width: '12rem',
            body: (e: any) => CustomName(e?.version, ''),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            body: (e: any) => CustomDate(e?.createdDate),
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
            header: ConstColumnDiv(
                'Published On  ',
                getGridData,
                'publishedDate'
            ),
            body: (e: any) => CustomDate(e?.publishedDate),
        },
        {
            header: ConstColumnDiv('Published By', getGridData, 'description'),
            width: '12rem',
            body: (e: any) =>
                CustomName(
                    e?.publishedBy?.firstName,
                    e?.publishedBy?.lastName,
                    e?.publishedBy
                ),
        },
        {
            header: ConstColumnDiv(
                'Status',
                getGridData,
                'clientIntakeStatus.name'
            ),
            width: '12rem',
            body: (e: any) => CustomName(e?.clientIntakeStatus?.name, ''),
        },

        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '12rem',
            body: (e: any) => ActionIntakeGrid(e),
        },
    ];
    const publishTemplate = async (): Promise<any> => {
        const publishData = {
            clientIntakeFormId: event?.id,
        };
        const res = await IntakeEditorApi.publish(publishData);
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Client Intake Form published successfully.',
                        description: '',
                    })
                );
            }, 800);
        } else {
            return res;
        }
    };
    const unpublishTemplate = async (): Promise<any> => {
        const unpublishData = {
            clientIntakeFormId: event?.id,
        };
        const res = await IntakeEditorApi.unpublish(unpublishData);
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);

            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Client Intake Form unpublished successfully.',
                        description: '',
                    })
                );
            }, 800);
        } else {
            return res;
        }
    };
    return (
        <div data-testid="client-intake-grid-page">
            <CommonSubHeader title={title} />
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openConfirmationModal && (
                <ConfirmationModal
                    header={
                        onClickAction === 'Publish'
                            ? 'Publish Client Intake Form'
                            : 'Unpublish Client Intake Form'
                    }
                    title={
                        onClickAction === 'Publish'
                            ? `Are you sure you want to publish this version of client intake form ?`
                            : `Are you sure you want to unpublish this version of client intake form ?`
                    }
                    name={event?.version}
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={() => {
                        onClickAction === 'Publish'
                            ? publishTemplate()
                            : unpublishTemplate();
                    }}
                />
            )}
        </div>
    );
}
