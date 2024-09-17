import * as React from 'react';
import Grid from '../Generics/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
import Assignee from '../../assets/img/GridIcons/assign.svg';
import view from '../../assets/img/GridIcons/view.svg';
import goals from '../../assets/img/GridIcons/goalView.svg';
import edit from '../../assets/img/GridIcons/edit.svg';
import history from '../../assets/img/GridIcons/history.svg';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
    CustomNameIntervention,
} from '../Generics/Grid/CommonFunction';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import ViewGoalInterventionModal from './Modal/ViewGoalIntervention';
import { Link } from 'react-router-dom';
import Button from '../Generics/Button';
import { getAllUsers } from '../../redux/slice/users/usersSlice';
import { getClinicianAndTechNamesCall } from '../../redux/slice/Scheduling/getServices';
import AssigneeModal from '../Assignee';
import DischargeModal from '../Generics/DischargeModal';
import {
    clearExpandDomainIntervention,
    clearExpandLongTermIntervention,
    getInterventionPlanById,
    setActiveDomainIdIntervention,
} from '../../redux/slice/InterventionAll/InterventionSlice';
import { usePermission } from '../../hooks/usePermission';
import InterventionHistory from './Modal/InterventionHistory';
import {
    getActiveAsyncHistory,
    savingInterventionId,
    savingTabData1,
} from '../../redux/slice/MineSlice/getOtherGridData';
import { savingTabHistoryData } from '../../redux/slice/MineSlice/getMine';
export default function InterventionGrid(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const { permissions } = usePermission({
        itemsToCheck: [
            'edit_all_intervention_plan',
            'discharge_intervention_plan',
            'view_intervention_plan',
            'change_assignee_intervention_plan',
            'discharge_intervention_plan',
            'edit_self_assgined_intervention_plan',
        ],
    });
    const [open, setOpen] = React.useState(false);
    const [openAssignee, setOpenAssignee] = React.useState(false);
    const [openHistory, setOpenHistory] = React.useState(false);
    const [openAssigneeData, setOpenAssigneeData] = React.useState({});
    const [openDischarge, setOpenDischarge] = React.useState(false);
    const [dischargeData, setDischargeData] = React.useState({});
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const ActionInterventionGrid = (e: any): any => {
        const editIntervention = (): void => {
            if (
                permissions?.edit_all_intervention_plan ||
                permissions?.edit_self_assgined_intervention_plan
            ) {
                dispatch(getInterventionPlanById({ id: e.id }));
                dispatch(clearExpandDomainIntervention());
                dispatch(clearExpandLongTermIntervention());
                dispatch(setActiveDomainIdIntervention(null));
            }
        };
        const openGoalModal = (): void => {
            setOpen(true);
            dispatch(getInterventionPlanById({ id: e.id }));
        };
        const openInterventionView = (): void => {
            if (permissions?.view_intervention_plan) {
                dispatch(getInterventionPlanById({ id: e.id }));
                dispatch(clearExpandDomainIntervention());
                dispatch(clearExpandLongTermIntervention());
                dispatch(setActiveDomainIdIntervention(null));
            }
        };
        const openInterventionHistory = (): void => {
            const initialData = {
                id: e.id,
                heading: '',
                roleId: userPermission?.userRoles?.data?.roleId,
                type: 'INTERVENTION_HISTORY',
                assignedTo: userPermission?.value?.data?.userId,
                pagination: { startIndex: 0, noOfRecords: 19 },
                order: '',
                name: '',
                filterValue: '',
                appointmentWith: '1',
                publishStatus: 'Published',
            };
            setTimeout(() => {
                dispatch(getActiveAsyncHistory(initialData));
            }, 1000);
            dispatch(savingTabData1({ tab: 'INTERVENTION_HISTORY' }));
            dispatch(
                savingTabHistoryData({ tabHistory: 'INTERVENTION_HISTORY' })
            );
            dispatch(savingInterventionId({ id: e.id }));
            dispatch(getInterventionPlanById({ id: e.id }));
            setOpenAssigneeData(e);

            setOpenHistory(true);
            dispatch(clearExpandDomainIntervention());
            dispatch(clearExpandLongTermIntervention());
            dispatch(setActiveDomainIdIntervention(null));
        };
        const openAssigneeModal = (): void => {
            if (permissions?.change_assignee_intervention_plan) {
                setOpenAssigneeData(e);
                setOpenAssignee(true);
                dispatch(getAllUsers());
                dispatch(getClinicianAndTechNamesCall({ id: 1 }));
            }
        };
        const openDischargeModal = (): void => {
            if (permissions?.discharge_intervention_plan) {
                setOpenDischarge(true);
                setDischargeData(e);
            }
        };
        return (
            <div className="w-48 flex justify-between items-center">
                <Tooltip title="History">
                    <Button
                        data-testid="history-element"
                        type=""
                        loading={false}
                        onClick={openInterventionHistory}
                        className=""
                    >
                        <img className="" src={history} alt="history" />
                    </Button>
                </Tooltip>
                <Tooltip title="View">
                    <Link
                        to={`/interventionLanding/${e?.id}/view`}
                        className={`${!permissions?.view_intervention_plan ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <Button
                            type=""
                            loading={false}
                            onClick={openInterventionView}
                            className=""
                        >
                            <img
                                data-testid="openInterventionView-element"
                                className=""
                                src={view}
                                alt="View"
                            />
                        </Button>
                    </Link>
                </Tooltip>
                <Tooltip title="View Goal">
                    <Button
                        type=""
                        loading={false}
                        onClick={openGoalModal}
                        className=""
                    >
                        <img
                            data-testid="openGoalModal-element"
                            className=""
                            src={goals}
                            alt="img"
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Edit">
                    <Link
                        to={`/interventionLanding/${e?.id}`}
                        className={`${
                            getGridData?.tab === 'discharged '
                                ? getGridData?.tab === 'discharged '
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                                : permissions?.edit_all_intervention_plan
                                  ? !permissions?.edit_all_intervention_plan ||
                                    getGridData?.tab === 'discharged '
                                  : !(
                                          permissions?.edit_self_assgined_intervention_plan &&
                                          e?.assignedTo?.id ===
                                              userPermission?.userId
                                      )
                                    ? 'pointer-events-none opacity-50'
                                    : ''
                        }`}
                        onClick={editIntervention}
                    >
                        <img
                            data-testid="editIntervention-element"
                            className=""
                            src={edit}
                            alt="img"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Assignee" placement="middle">
                    <Link
                        to={''}
                        className={`${!permissions?.change_assignee_intervention_plan ? 'opacity-50 pointer-events-none' : ''} `}
                        onClick={openAssigneeModal}
                    >
                        <img
                            data-testid="openAssigneeModal-element"
                            className=""
                            src={Assignee}
                            alt="img"
                        />
                    </Link>
                </Tooltip>
                {getGridData?.tab != 'discharged ' && (
                    <Tooltip title="discharge" placement="middle">
                        <Button
                            data-testid="openDischargeModal-element"
                            onClick={openDischargeModal}
                            className={` text-md font-bold text-[#1A99C1]  ${!permissions?.discharge_intervention_plan ? 'opacity-50 pointer-events-none' : ''} `}
                            type={''}
                        >
                            Discharge
                        </Button>
                    </Tooltip>
                )}
            </div>
        );
    };
    const title = 'Intervention Plan';
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Plan Name', getGridData, 'name'),
            width: '',
            body: (e: any) => CustomNameIntervention(e?.name, '', e),
        },
        {
            header: ConstColumnDiv('Client Name', getGridData, ''),
            width: '',
            body: (e: any) =>
                CustomName(e?.clientId?.firstName, e?.clientId?.lastName),
        },
        {
            header: ConstColumnDiv('Type', getGridData, 'therapyType.name'),
            width: '',
            body: (e: any) => CustomName(e?.therapyType?.name, ''),
        },
        {
            header: ConstColumnDiv('Created By', getGridData, ''),
            width: '',
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
            width: '',
            // field: 'createdDate',
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv(
                'Modified By',
                getGridData,
                'modifiedBy.firstName'
            ),
            body: (e: any) =>
                CustomName(
                    e?.modifiedBy?.firstName,
                    e?.modifiedBy?.lastName,
                    e?.modifiedBy
                ),
        },
        {
            header: ConstColumnDiv('Modified On', getGridData, ''),
            body: (e: any) => CustomDate(e?.modifiedDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '12rem',
            body: (e: any) => ActionInterventionGrid(e),
        },
    ];
    const columnDefinitionsTemplateGrid1 = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Plan Name', getGridData, 'name'),
            width: '',
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Client Name', getGridData, ''),
            width: '',
            body: (e: any) =>
                CustomName(e?.clientId?.firstName, e?.clientId?.lastName),
        },
        {
            header: ConstColumnDiv('Type', getGridData, 'therapyType.name'),
            width: '',
            body: (e: any) => CustomName(e?.therapyType?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Clinician',
                getGridData,
                'assignedTo?.firstName'
            ),
            width: '',
            body: (e: any) =>
                CustomName(
                    e?.assignedTo?.firstName,
                    e?.assignedTo?.lastName,
                    e?.assignedTo
                ),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            width: '',
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
            width: '',
            // field: 'createdDate',
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv(
                'Modified By',
                getGridData,
                'modifiedBy.firstName'
            ),
            body: (e: any) =>
                CustomName(
                    e?.modifiedBy?.firstName,
                    e?.modifiedBy?.lastName,
                    e?.modifiedBy
                ),
        },
        {
            header: ConstColumnDiv('Modified On', getGridData, 'modifiedDate'),
            body: (e: any) => CustomDate(e?.modifiedDate),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '12rem',
            body: (e: any) => ActionInterventionGrid(e),
        },
    ];
    const columnDefinitionsTemplateGrid2 = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Plan Name', getGridData, 'name'),
            width: '',
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Client Name',
                getGridData,
                'clientId?.firstName'
            ),
            width: '',
            body: (e: any) =>
                CustomName(e?.clientId?.firstName, e?.clientId?.lastName),
        },
        {
            header: ConstColumnDiv('Type', getGridData, 'therapyType.name'),
            width: '',
            body: (e: any) => CustomName(e?.therapyType?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            width: '',
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
            width: '',
            // field: 'createdDate',
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv(
                'Modified By',
                getGridData,
                'modifiedBy.firstName'
            ),
            body: (e: any) =>
                CustomName(
                    e?.modifiedBy?.firstName,
                    e?.modifiedBy?.lastName,
                    e?.modifiedBy
                ),
        },
        {
            header: ConstColumnDiv('Modified On', getGridData, 'modifiedDate'),
            body: (e: any) => CustomDate(e?.modifiedDate),
        },
        {
            header: ConstColumnDiv(
                'Discharged On',
                getGridData,
                'dischargeDate'
            ),
            body: (e: any) => CustomDate(e?.dischargeDate),
        },
        {
            header: ConstColumnDiv(
                'Discharged Reason',
                getGridData,
                'dischargeReason'
            ),
            body: (e: any) => CustomName(e?.dischargeReason, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '12rem',
            body: (e: any) => ActionInterventionGrid(e),
        },
    ];
    let columnOfGrid: (
        | {
              header: React.JSX.Element;
              width: string;
              // field: 'createdDate',
              body: (e: any) => any;
          }
        | {
              header: React.JSX.Element;
              body: (e: any) => any;
              width?: undefined;
          }
    )[];
    if (getGridData?.tab === 'mine ') {
        columnOfGrid = columnDefinitionsTemplateGrid;
    } else if (getGridData?.tab === 'all ') {
        columnOfGrid = columnDefinitionsTemplateGrid1;
    } else if (getGridData?.tab === 'discharged ') {
        columnOfGrid = columnDefinitionsTemplateGrid2;
    } else {
        columnOfGrid = [];
    }
    return (
        <>
            <CommonSubHeader title={title} />
            <Grid getGridData={getGridData} columnOfGrid={columnOfGrid} />
            {open && (
                <ViewGoalInterventionModal
                    open={open}
                    onClose={() => setOpen(false)}
                />
            )}
            {openDischarge && (
                <DischargeModal
                    open={openDischarge}
                    onClose={() => setOpenDischarge(false)}
                    data={dischargeData}
                />
            )}
            {openAssignee && (
                <AssigneeModal
                    moduleName={'intervention'}
                    dataProgramBook={openAssigneeData}
                    open={openAssignee}
                    onClose={() => setOpenAssignee(false)}
                />
            )}
            {openHistory && (
                <InterventionHistory
                    dataProgramBook={openAssigneeData}
                    open={openHistory}
                    onClose={() => setOpenHistory(false)}
                />
            )}
        </>
    );
}
