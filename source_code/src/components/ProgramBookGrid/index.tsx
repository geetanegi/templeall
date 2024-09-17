/* eslint-disable max-len */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import goals from '../../assets/img/GridIcons/goalView.svg';
import view from '../../assets/img/GridIcons/view.svg';
import edit from '../../assets/img/GridIcons/edit.svg';
import assignee from '../../assets/img/GridIcons/assign.svg';
import history from '../../assets/img/GridIcons/history.svg';
import Tooltip from '../Generics/Tooltip';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import CommonGrid from '../Generics/Grid';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
    CustomStatus,
    RedirectionToProgramBook,
} from '../Generics/Grid/CommonFunction';
import ViewGoalModal from '../ViewGoal';
import { getProgramBookDataByIdCall } from '../../redux/slice/GetProgramBookDataById/getProgramBookDataById';
import { Link } from 'react-router-dom';
import { viewOnlyValueData } from '../../redux/slice/ViewOnlyComponent/ViewOnly';
import {
    savingDomainIndex,
    clearProgramBookTree,
} from '../../redux/slice/GetDomainById/getDomainById';
import { usePermission } from '../../hooks/usePermission';
import withLayout from '../../containers/MasterLayoutContainer';
import AssigneeModal from '../Assignee';
import { getAllUsers } from '../../redux/slice/users/usersSlice';
import { getClinicianAndTechNamesCall } from '../../redux/slice/Scheduling/getServices';
import DischargeModal from '../Generics/DischargeModal';
import ProgramBookHistory from './ProgramBookHistory';
import Button from '../Generics/Button';
import {
    getActiveAsyncHistory,
    savingTabData1,
} from '../../redux/slice/MineSlice/getOtherGridData';
import {
    savingTabData,
    savingTabHistoryData,
} from '../../redux/slice/MineSlice/getMine';
import { Content } from '../../types/Programbook.types';
function ProgramBookGrid(): React.JSX.Element {
    const title = 'Program Book';
    const dispatch = useDispatch<any>();
    const getMineData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const { permissions } = usePermission({
        itemsToCheck: [
            'edit_all_program_book',
            'view_program_book',
            'discharge_program_book',
            'change_assignee_program_book',
            'edit_self_assgined_program_book',
        ],
    });
    const [open, setOpen] = React.useState(false);
    const [openAssignee, setOpenAssignee] = React.useState(false);
    const [openAssigneeData, setOpenAssigneeData] = React.useState({});
    const [openDischarge, setOpenDischarge] = React.useState(false);
    const [dischargeData, setDischargeData] = React.useState({});
    const [openHistory, setOpenHistory] = React.useState(false);

    const Action = (e: Content): JSX.Element => {
        const openGoalModal = (): void => {
            setOpen(true);
            const data = {
                programBookUUID: e.programBookUUID,
            };
            dispatch(getProgramBookDataByIdCall(data));
        };
        const openAssigneeModal = (): any => {
            if (permissions?.change_assignee_program_book) {
                setOpenAssigneeData(e);
                setOpenAssignee(true);
                dispatch(getAllUsers());
                dispatch(getClinicianAndTechNamesCall({ id: 1 }));
            }
        };
        const ViewMode = (): void => {
            if (permissions?.view_program_book) {
                dispatch(viewOnlyValueData(true));
            }
        };
        const RedirectToProgramBook = (): any => {
            if (
                permissions?.edit_all_program_book ||
                permissions?.edit_self_assgined_program_book
            ) {
                dispatch(
                    savingDomainIndex({ domainIndex: '', programIndex: '' })
                );
                dispatch(clearProgramBookTree({}));
                dispatch(viewOnlyValueData(false));
            }
        };
        const openDischargeModal = (): void => {
            if (permissions?.discharge_program_book) {
                setOpenDischarge(true);
                setDischargeData(e);
            }
        };
        const openProgramBookHistory = (): void => {
            const initialData = {
                id: e.programBookUUID,
                heading: '',
                roleId: userPermission?.userRoles?.data?.roleId,
                type: 'PROGRAMBOOK_HISTORY',
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
            dispatch(savingTabData1({ tab: 'PROGRAMBOOK_HISTORY' }));
            dispatch(
                savingTabHistoryData({ tabHistory: 'PROGRAMBOOK_HISTORY' })
            );
            setOpenAssigneeData(e);
            setOpenHistory(true);
        };
        return (
            <div className="flex ml-[-2rem] justify-evenly items-center">
                <Tooltip title="History">
                    <Button
                        data-testid="history-btn"
                        type=""
                        loading={false}
                        onClick={openProgramBookHistory}
                        className={`${getMineData?.tab === 'discharged' ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                    >
                        <img className=" mt-1 " src={history} alt="View" />
                    </Button>
                </Tooltip>
                <Tooltip title="View">
                    <Link
                        className={`truncate font-light text-sky-700 ${!permissions?.view_program_book ? 'opacity-50 pointer-events-none' : ''}`}
                        to={`/program-book/${e?.programBookUUID}`}
                    >
                        <img
                            onClick={ViewMode}
                            src={view}
                            alt="img"
                            data-testid="view-mode-button"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="View Goal">
                    <img
                        onClick={openGoalModal}
                        src={goals}
                        alt="img"
                        data-testid="view-goal-mode-button"
                        className={`${getMineData?.tab === 'discharged' ? 'opacity-50 pointer-events-none' : ''}`}
                    />
                </Tooltip>
                <Tooltip title="Edit" placement="middle">
                    <Link
                        to={`/program-book/${e?.programBookUUID}`}
                        className={`${
                            getMineData?.tab === 'discharged'
                                ? 'opacity-50 pointer-events-none'
                                : permissions?.edit_all_program_book
                                  ? !permissions?.edit_all_program_book
                                  : !(
                                          permissions?.edit_self_assgined_program_book &&
                                          e?.assignedTo?.id ===
                                              userPermission?.userId
                                      ) || getMineData?.tab === 'discharged'
                                    ? 'opacity-50 pointer-events-none'
                                    : ''
                        }`}
                    >
                        <img
                            onClick={RedirectToProgramBook}
                            src={edit}
                            alt="img"
                            data-testid="edit-program-book-button"
                        />
                    </Link>
                </Tooltip>
                <Tooltip title="Assignee" placement="middle">
                    <Link
                        className={`${!permissions?.change_assignee_program_book || getMineData?.tab === 'discharged' ? 'opacity-50 pointer-events-none' : ''}`}
                        to={''}
                    >
                        <img
                            onClick={openAssigneeModal}
                            src={assignee}
                            alt="img"
                            data-testid="Assignee-mode-button"
                        />
                    </Link>
                </Tooltip>
                {getMineData?.tab != 'discharged' && (
                    <Tooltip title="discharge" placement="middle">
                        <span onClick={openDischargeModal}>
                            <Link
                                to={''}
                                data-testid="discharge-link"
                                className={`text-md font-bold text-[#1A99C1] ml-4 ${!permissions?.discharge_program_book || getMineData?.tab === 'discharged' ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {'Discharge'}
                            </Link>
                        </span>
                    </Tooltip>
                )}
            </div>
        );
    };
    const columnDefinitions = [
        {
            field: 'status',
            body: (e: Content) => CustomStatus(e?.status?.value),
        },
        {
            header: ConstColumnDiv('Program Name', getMineData, 'name'),
            body: (e: Content) => RedirectionToProgramBook(e),
        },
        {
            header: ConstColumnDiv(
                'Client Name',
                getMineData,
                'userChildId.firstName'
            ),
            body: (e: Content) =>
                CustomName(e.userChildId?.firstName, e.userChildId?.lastName),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getMineData,
                'createdBy.firstName'
            ),
            body: (e: Content) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getMineData, 'createdDate'),
            body: (e: Content) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv(
                'Modified By',
                getMineData,
                'modifiedBy.username'
            ),
            body: (e: Content) =>
                CustomName(
                    e.modifiedBy?.firstName,
                    e.modifiedBy?.lastName,
                    e.modifiedBy
                ),
        },
        {
            header: ConstColumnDiv('Modified On', getMineData, 'modifiedDate'),
            body: (e: Content) => CustomDate(e?.modifiedDate),
        },
        {
            header: ConstColumnDiv(
                'Discharged On',
                getMineData,
                'dischargeDate'
            ),
            body: (e: Content) => CustomDate(e?.dischargeDate),
        },
        {
            header: ConstColumnDiv(
                'Discharged Reason',
                getMineData,
                'dischargeReason'
            ),
            body: (e: Content) => CustomName(e?.dischargeReason, ''),
        },
        {
            header: ConstColumnDiv('Actions', getMineData, ''),
            field: '',
            body: (e: Content) => Action(e),
        },
    ];
    const columnDefinitions1 = [
        {
            body: (e: Content) => CustomStatus(e?.status?.value),
        },
        {
            header: ConstColumnDiv('Program Name', getMineData, 'name'),
            body: (e: Content) => RedirectionToProgramBook(e),
            headerName: 'Program Book',
        },
        {
            header: ConstColumnDiv(
                'Client Name',
                getMineData,
                'userChildId.firstName'
            ),
            body: (e: Content) =>
                CustomName(e?.userChildId?.firstName, e?.userChildId?.lastName),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getMineData,
                'createdBy.firstName'
            ),
            body: (e: Content) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getMineData, 'createdDate'),
            body: (e: Content) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv(
                'Modified By',
                getMineData,
                'modifiedBy.firstName'
            ),
            body: (e: Content) =>
                CustomName(
                    e?.modifiedBy?.firstName,
                    e?.modifiedBy?.lastName,
                    e?.modifiedBy
                ),
        },
        {
            header: ConstColumnDiv('Modified On', getMineData, 'modifiedDate'),
            body: (e: Content) => CustomDate(e?.modifiedDate),
        },
        {
            header: ConstColumnDiv('Actions', getMineData, ''),
            field: '',
            body: (e: Content) => Action(e),
        },
    ];

    React.useEffect(() => {
        // dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'mine' }));
    }, [dispatch]);
    const closeGoalModal = (): void => {
        setOpenHistory(false);
        setOpenAssignee(false);
        setOpenDischarge(false);
        setOpen(false);
    };
    return (
        <>
            <CommonSubHeader title={title} />
            <CommonGrid
                getGridData={getMineData}
                columnOfGrid={
                    getMineData?.tab === 'discharged'
                        ? columnDefinitions
                        : columnDefinitions1
                }
            />
            {open && <ViewGoalModal open={open} onClose={closeGoalModal} />}
            {openDischarge && (
                <DischargeModal
                    open={openDischarge}
                    onClose={closeGoalModal}
                    data={dischargeData}
                    fromProgramBook={true}
                />
            )}
            {openAssignee && (
                <AssigneeModal
                    moduleName={'programbook'}
                    dataProgramBook={openAssigneeData}
                    open={openAssignee}
                    onClose={closeGoalModal}
                />
            )}
            {openHistory && (
                <ProgramBookHistory
                    dataProgramBook={openAssigneeData}
                    open={openHistory}
                    onClose={closeGoalModal}
                />
            )}
        </>
    );
}
export default withLayout(ProgramBookGrid);
