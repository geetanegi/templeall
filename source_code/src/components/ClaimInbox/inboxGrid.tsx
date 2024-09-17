/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import CommonGrid from '../Generics/Grid';
import ConstColumnDiv, {
    CustomDateWithoutTime,
    CustomName,
} from '../Generics/Grid/CommonFunction';
import Button from '../Generics/Button';
import edit from '../../assets/img/GridIcons/edit.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import ConfirmationModal from '../Generics/ConfirmationModal';
import deleteClaimApi from '../../api/services/ClaimInbox/deleteClaim.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import clearall from '../../assets/img/clearall.svg';
import { Link } from 'react-router-dom';
import Tooltip from '../Generics/Tooltip';
import Datepicker from 'react-tailwindcss-datepicker';
import deletedIcon from '../../assets/img/ClaimInbox/deleted.svg';
import { ROUTES } from '../../constants';
export default function InboxGrid(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const title = 'Claims Inbox';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const [loading, setLoading] = React.useState(false);
    const [dateValue, setDateValue] = React.useState({
        startDate: null,
        endDate: null,
    });
    const [dateValueFrom, setDateValueFrom] = React.useState({
        startDate: null,
        endDate: null,
    });
    useEffect(() => {
        dispatch(savingTabData({ tab: getGridData?.tab }));
    }, [dispatch, getGridData?.tab]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [claimId, setClaimId] = useState('');
    const handleYes = async (): Promise<any> => {
        setOpenDeleteModal(false);
        try {
            const res = await deleteClaimApi.deleteClaim({ id: claimId });
            if (!res?.data?.error) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Claim deleted successfully.',
                        description: '',
                    })
                );
                dispatch(savingTabData({ tab: 'Inbox' }));
                const initialData = {
                    id: '',
                    heading: '',
                    roleId: userPermission?.userRoles?.data?.roleId,
                    type: 'Inbox',
                    assignedTo: userPermission?.value?.data?.userId,
                    pagination: { startIndex: 0, noOfRecords: 19 },
                    order: '',
                    name: '',
                    filterValue: '',
                    appointmentWith: '1',
                    publishStatus: 'Published',
                };
                setTimeout(() => {
                    dispatch(getActiveAsync(initialData));
                }, 1000);
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    };
    const ActionGrid = (e: any): React.JSX.Element => {
        const handleDelete = (): void => {
            setOpenDeleteModal(true);
            setClaimId(e?.id);
        };
        return (
            <div className="flex  items-center ">
                <Tooltip title="Edit">
                    <Link to={`${ROUTES.inboxGrid}/${e?.id}`}>
                        <Button className={''} type="">
                            <img src={edit} alt="Edit" className="" />
                        </Button>
                    </Link>
                </Tooltip>
                <Tooltip title="Delete">
                    <Button
                        type=""
                        loading={false}
                        onClick={() => {
                            handleDelete();
                        }}
                        className=""
                    >
                        <img
                            className=" mt-1 ml-4 "
                            src={deleteIcon}
                            alt="View"
                        />
                    </Button>
                </Tooltip>
            </div>
        );
    };
    const columnDefinitions = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '2rem',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('ID', getGridData, 'id'),
            body: (e: any) => CustomName(e?.id, ''),
        },
        {
            header: ConstColumnDiv('Client', getGridData, 'client'),
            body: (e: any) =>
                CustomName(`${e?.clientFirstName} ${e?.clientLastName}`, ''),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdOn'),
            width: '10%',
            body: (e: any) => CustomDateWithoutTime(e?.createdOn),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdByFirstName'
            ),
            body: (e: any) =>
                CustomName(
                    `${e?.createdByFirstName} ${e?.createdByLastName}`,
                    ''
                ),
        },
        {
            header: ConstColumnDiv('Service Date', getGridData, 'serviceDate'),
            body: (e: any) =>
                CustomName(` ${e?.serviceDateTo} - ${e?.serviceDateFrom}`, ''),
        },
        {
            header: ConstColumnDiv('Payor', getGridData, 'payor'),
            body: (e: any) => CustomName(e?.payor, ''),
        },
        {
            header: ConstColumnDiv('Amount $', getGridData, 'amount'),
            body: (e: any) => CustomName(e?.amount, ''),
        },
        {
            header: ConstColumnDiv('Total Paid', getGridData, 'totalPaid'),
            body: (e: any) => CustomName(e?.totalPaid, ''),
        },
        {
            header: ConstColumnDiv('Errors', getGridData, 'errorCount'),
            body: (e: any) => CustomName(e?.errorCount, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            body: (e: any) => ActionGrid(e),
        },
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '2rem',
            body: () => CustomName('', ''),
        },
    ];
    const ActionDeletedGrid = (): React.JSX.Element => {
        return (
            <div className="flex  items-center ">
                <Tooltip title="Edit">
                    <Link to={``}>
                        <Button className={''} type={''} onClick={() => {}}>
                            <img src={edit} alt="Edit" className="" />
                        </Button>
                    </Link>
                </Tooltip>
                <Tooltip title="Delete">
                    <Button
                        type=""
                        loading={false}
                        onClick={() => {}}
                        className=""
                    >
                        <img
                            className=" mt-1 ml-4"
                            src={deletedIcon}
                            alt="View"
                        />
                    </Button>
                </Tooltip>
            </div>
        );
    };
    const columnDeletedDefinitions = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '6rem',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('ID', getGridData, 'id'),
            body: (e: any) => CustomName(e?.id, ''),
        },
        {
            header: ConstColumnDiv('Client', getGridData, 'client'),
            body: (e: any) =>
                CustomName(`${e?.clientFirstName} ${e?.clientLastName}`, ''),
        },
        {
            header: ConstColumnDiv('Deleted On', getGridData, 'deletedOn'),
            width: '10%',
            body: (e: any) => CustomDateWithoutTime(e?.deletedOn),
        },
        {
            header: ConstColumnDiv(
                'Deleted By',
                getGridData,
                'deletedByFirstName'
            ),
            body: (e: any) =>
                CustomName(
                    `${e?.deletedByFirstName} ${e?.deletedByLastName}`,
                    ''
                ),
        },
        {
            header: ConstColumnDiv('Service Date', getGridData, 'serviceDate'),
            body: (e: any) =>
                CustomName(` ${e?.serviceDateTo} - ${e?.serviceDateFrom}`, ''),
        },
        {
            header: ConstColumnDiv('Payor', getGridData, 'payor'),
            body: (e: any) => CustomName(e?.payor, ''),
        },
        {
            header: ConstColumnDiv('Amount $', getGridData, 'amount'),
            body: (e: any) => CustomName(e?.amount, ''),
        },
        {
            header: ConstColumnDiv('Total Paid', getGridData, 'totalPaid'),
            body: (e: any) => CustomName(e?.totalPaid, ''),
        },
        {
            header: ConstColumnDiv('Errors', getGridData, 'errorCount'),
            body: (e: any) => CustomName(e?.errorCount, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            body: () => ActionDeletedGrid(),
        },
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '6rem',
            body: () => CustomName('', ''),
        },
    ];
    const handleDateChangeFrom = (newValue: any): void => {
        console.log(newValue?.startDate);
        setDateValueFrom(newValue);
    };
    const handleDateChange = (newValue: any): void => {
        setDateValue(newValue);
    };
    const formatDate = (date: any) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const checkButton = (): void => {
        const dataFilter = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getGridData?.tab,
            assignedTo: userPermission?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: [
                {
                    filterKey: '',
                    filterValue: formatDate(dateValueFrom?.startDate),
                },
                {
                    filterKey: '',
                    filterValue: formatDate(dateValue?.startDate),
                },
            ],
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        setLoading(true);
        dispatch(getActiveAsync(dataFilter));
        dispatch(savingTabData({ tab: getGridData?.tab }));
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const clearButton = (): void => {
        const dataFilter = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: getGridData?.tab,
            assignedTo: userPermission?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        setDateValueFrom({ startDate: null, endDate: null });
        setDateValue({ startDate: null, endDate: null });
        dispatch(getActiveAsync(dataFilter));
        dispatch(savingTabData({ tab: getGridData?.tab }));
    };
    const datepickerKey = React.useMemo(
        () => Math.random().toString(),
        [dateValueFrom]
    );
    return (
        <>
            <CommonSubHeader title={title} />
            <div className="check flex justify-end -mt-10 mr-2">
                <div className="ml-5 mr-16">
                    <Datepicker
                        key={datepickerKey}
                        toggleClassName="absolute bg-theme-lightBlue1 rounded-r-lg text-white
                    h-full px-3 text-gray-400 focus:outline-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
                        placeholder="Select Date"
                        value={dateValueFrom}
                        onChange={handleDateChangeFrom}
                        popoverDirection="down"
                        useRange={false}
                        asSingle={true}
                        inputClassName="py-[0.5rem] px-3 border-2 border-[#E5E5E5]-800 rounded-l-lg text-sm disabled:opacity-30"
                    />
                </div>
                <span className="flex justify-center items-center">To</span>
                <div className=" ml-5 mr-16">
                    <Datepicker
                        key={datepickerKey}
                        toggleClassName="absolute bg-theme-lightBlue1 rounded-r-lg text-white
                    h-full px-3 text-gray-400 focus:outline-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
                        placeholder="Select Date"
                        value={dateValue}
                        onChange={handleDateChange}
                        popoverDirection="down"
                        useRange={false}
                        asSingle={true}
                        inputClassName="py-[0.5rem] px-3 border-2 border-[#E5E5E5]-800 rounded-l-lg text-sm disabled:opacity-30"
                    />
                </div>
                <div className="btn">
                    <Button
                        onClick={() => checkButton()}
                        data-testid="check-btn"
                        type="submit"
                        loading={loading}
                        disabled={false}
                        className="py-2 px-[3rem]  justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                    >
                        <span>{loading ? '' : 'Search'}</span>
                    </Button>
                </div>
                <div className="btn ml-2 mr-4">
                    <Button
                        onClick={() => clearButton()}
                        type="submit"
                        data-testid="clear-btn"
                        loading={false}
                        disabled={false}
                        className="py-2   justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent  text-[#48abca] hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                    >
                        <img src={clearall} alt="" className="mr-2 w-5" />
                        <span>Clear All</span>
                    </Button>
                </div>
            </div>
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={
                    getGridData?.tab === 'Inbox'
                        ? columnDefinitions
                        : getGridData?.tab === 'Deleted'
                          ? columnDeletedDefinitions
                          : columnDefinitions
                }
            />
            {openDeleteModal && (
                <ConfirmationModal
                    header={'Delete Claim'}
                    title={` Are you sure you want to delete this claim ?`}
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    handleStop={() => handleYes()}
                />
            )}
        </>
    );
}
