/* eslint-disable max-lines */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import * as React from 'react';
import CommonGrid from '../Generics/Grid';
import { useSelector, useDispatch } from 'react-redux';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import Tooltip from '../Generics/Tooltip';
import view from '../../assets/img/GridIcons/view.svg';
import DeleteIcon from '../../assets/img/GridIcons/delete.svg';
import eventIcon from '../../assets/img/GridIcons/pullNote.svg';
import clearall from '../../assets/img/clearall.svg';
import ConstColumnDiv, {
    CustomDateWithoutTime,
    CustomName,
    CustomStatusBilling,
} from '../Generics/Grid/CommonFunction';
import SideModal from './Modal/SideModal';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { ToastContext } from '../../contexts/ToastContext';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import BillingGrids from '../../api/services/Billing/BillingGrid.service';
import { getScheduleEventCall } from '../../redux/slice/Scheduling/getServices';
import AddNewNote from '../AddNewNote';
import {
    getClientProviderDetails,
    getNoteById,
    setFullData,
} from '../../redux/slice/template/templateSlice';
import { usePermission } from '../../hooks/usePermission';
import Datepicker from 'react-tailwindcss-datepicker';
import Button from '../Generics/Button';
import SavePrAmtApi from '../../api/services/Billing/SavePrAmtApi.service';
import { debounce } from 'lodash';
import PaymentModal from './Modal/PaymentModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
    getOrganizationEmployeeCall,
    getSelectedBillingDataCall,
    setMultipleGridData,
} from '../../redux/slice/MergeClaims/mergeClaims';
import { getPrimaryProvider } from '../../redux/slice/SchedulingRedux/Scheduling';
export default function BillingGrid(): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: [
            'delete_billing',
            'preview_billing',
            'pull_session_note',
        ],
    });
    const navigateRef = useNavigate();
    const { addToast } = React.useContext(ToastContext);
    const title = 'Billing';
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalData, setOpenModalData] = React.useState('');
    const [name, setFullName] = React.useState<any>('');
    const [newNote, setNewNote] = React.useState(false);
    const [isClosable, setIsClosable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showAddPaymentModal, setShowAddPaymentModal] = React.useState(false);
    const [activeRecord, setActiveRecord] = React.useState(null);
    const [dateValue, setDateValue] = React.useState({
        startDate: null,
        endDate: null,
    });
    const [dateValueFrom, setDateValueFrom] = React.useState({
        startDate: null,
        endDate: null,
    });
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const sumTotalData = getGridData?.value?.data?.sumTotalData;
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const [selectedProducts, setSelectedProducts] = React.useState<any>([]);
    const dispatch = useDispatch<any>();
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'BILLING',
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'BILLING' }));
    }, [dispatch]);
    const ActionIntakeGrid = (e: any, setEvent: any): React.JSX.Element => {
        const ViewBilling = (): void => {
            if (permissions?.preview_billing) {
                setOpenModalData(e);
                setOpenModal(true);
            }
        };
        const handleDeleteRow = (): void => {
            if (permissions?.delete_billing) {
                setEvent({
                    id: e?.id,
                    name: e?.name,
                    providerId: e?.providerId?.id,
                });
                setOpenConfirmationModalForDelete(true);
                setFullName(e);
            }
        };
        const pullSessionNote = (): any => {
            if (permissions?.pull_session_note) {
                setEvent({
                    id: e?.id,
                    name: e?.name,
                    providerId: e?.providerId?.id,
                    billingCode: e?.billingCode,
                    event: e,
                });
                const data1 = {
                    sessionNoteDataId: e?.sessionNotesDataId,
                };
                const payload = {
                    providerId: e?.providerId?.id || '',
                    clientId: e?.clientId?.childId || '',
                    appointmentId: e?.sessionNotesDataId || '',
                };
                dispatch(getClientProviderDetails(payload));
                dispatch(getNoteById(data1));
                dispatch(setFullData(e));
                setNewNote(true);
            }
        };
        const getClassNamesBasedOnPermissions = (
            givenPermissions: any
        ): string => {
            return !givenPermissions ? 'opacity-50 pointer-events-none' : '';
        };
        return (
            <div className="flex item-start justify-between w-40">
                {e?.billingCode?.code === 'Total --->' ? (
                    <></>
                ) : (
                    <>
                        <Tooltip title="Add Payment">
                            <Button
                                className={
                                    'bg-primary-600 px-1 text-white rounded-full'
                                }
                                type={''}
                                onClick={() => {
                                    setShowAddPaymentModal(true);
                                    setActiveRecord(e);
                                }}
                            >
                                Add Payment
                            </Button>
                        </Tooltip>
                        <Tooltip title="View">
                            <img
                                src={view}
                                onClick={() => ViewBilling()}
                                data-testid="open-modal-button"
                                alt="view"
                                className={getClassNamesBasedOnPermissions(
                                    permissions?.preview_billing
                                )}
                            />
                        </Tooltip>
                        <Tooltip title="Pull Session Note" placement="left">
                            <img
                                src={eventIcon}
                                onClick={() => {
                                    pullSessionNote();
                                }}
                                alt="Pull Session Note"
                                className={getClassNamesBasedOnPermissions(
                                    permissions?.pull_session_note
                                )}
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <img
                                src={DeleteIcon}
                                alt="Delete"
                                onClick={() => handleDeleteRow()}
                                className={getClassNamesBasedOnPermissions(
                                    permissions?.delete_billing &&
                                        e.paymentMarkedVoid
                                )}
                            />
                        </Tooltip>
                    </>
                )}
            </div>
        );
    };
    const PrAmt = (e: any): any => {
        const [inputValue, setInputValue] = React.useState(
            e.patientResponsibilityAmount
        );
        const savePatientResponsibilityAmount = React.useMemo(
            () =>
                debounce(async (value: string) => {
                    try {
                        await SavePrAmtApi.PrAmtData({
                            billingId: e?.id,
                            patientResponsibilityAmount: value,
                        });
                        addToast({
                            type: 'success',
                            message: `PR Amount updated successfully`,
                        });
                    } catch (error) {
                        addToast({
                            type: 'error',
                            message: `PR Amount is not updated successfully`,
                        });
                    }
                }, 2000), // Adjust the debounce delay as needed
            [e?.id]
        );
        const handleInputChange = async (
            event: React.ChangeEvent<HTMLInputElement>
        ): Promise<void> => {
            const { value } = event.target;
            const validFormat = /^\d{0,2}(\.\d{0,2})?$/; // Regex for 00.00 format
            if (validFormat.test(value)) {
                setInputValue(value); // Update the input value state
                savePatientResponsibilityAmount(value);
            }
        };
        return (
            <div className="w-14 border-b-2 border-black">
                <input
                    onChange={handleInputChange}
                    value={inputValue}
                    className="outline-none border-none bg-transparent w-fit "
                    placeholder="00.00"
                    type="text"
                />
            </div>
        );
    };
    const [event, setEvent] = React.useState({
        id: '',
        name: '',
        providerId: '',
        billingCode: '',
        event: '',
    });
    const columnDefinitionsTemplateGrid = [
        {
            body: (e: any) => CustomStatusBilling(e?.billingStatus),
        },
        {
            header: ConstColumnDiv('Date', getGridData, 'dateOfAppointment'),
            body: (e: any) => CustomDateWithoutTime(e?.dateOfAppointment),
        },
        {
            header: ConstColumnDiv('Time ', getGridData, 'timeOfAppointment'),
            body: (e: any) => CustomName(e?.timeOfAppointment, ''),
        },
        {
            header: ConstColumnDiv(
                'Client ',
                getGridData,
                'clientId.firstName'
            ),
            body: (e: any) =>
                CustomName(e?.clientId?.firstName, e?.clientId?.lastName),
        },
        {
            header: ConstColumnDiv('Payor', getGridData, 'payor.name'),
            body: (e: any) => CustomName(e?.payor?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Provider',
                getGridData,
                'providerId.firstName'
            ),
            body: (e: any) =>
                CustomName(e?.providerId?.firstName, e?.providerId?.lastName),
        },
        {
            header: ConstColumnDiv('Billing  Code', getGridData, ''),
            body: (e: any) =>
                CustomName(e?.billingCode?.code, e?.billingCode?.description),
        },
        {
            header: ConstColumnDiv('Work  Hour', getGridData, ''),
            body: (e: any) => CustomName(e?.hour, ''),
        },
        {
            header: ConstColumnDiv('Work  Units', getGridData, ''),
            body: (e: any) => CustomName(e?.unit, ''),
        },
        {
            header: ConstColumnDiv('Billed  Charges', getGridData, ''),
            body: (e: any) => CustomName(e?.billedRate, ''),
        },
        {
            header: ConstColumnDiv('Agreed  Charges', getGridData, ''),
            body: (e: any) => CustomName(e?.agreedRate, ''),
        },
        {
            header: ConstColumnDiv('Calc Adj', getGridData, ''),
            body: (e: any) => CustomName(e?.calculatedAdjustment, ''),
        },
        {
            header: ConstColumnDiv('PR Amt', getGridData, ''),
            body: (e: any) => PrAmt(e),
        },
        {
            header: ConstColumnDiv('Adj', getGridData, ''),
            body: (e: any) => CustomName(e?.adjustmentAmount, ''),
        },
        {
            header: ConstColumnDiv('Paid', getGridData, ''),
            body: (e: any) => CustomName(e?.paidAmount, ''),
        },
        {
            header: ConstColumnDiv('Owed', getGridData, ''),
            body: (e: any) => CustomName(e?.owedAmount, ''),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            width: '10rem',
            body: (e: any) => ActionIntakeGrid(e, setEvent),
        },
    ];
    const handleDateChangeFrom = (newValue: any): void => {
        setDateValueFrom(newValue);
    };
    const handleDateChange = (newValue: any): void => {
        setDateValue(newValue);
    };
    const formatDate = (date: any): any => {
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
            type: 'BILLING',
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
        dispatch(savingTabData({ tab: 'BILLING' }));
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const clearButton = (): void => {
        const dataFilter = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'BILLING',
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
        dispatch(savingTabData({ tab: 'BILLING' }));
    };
    const onClose = (): any => {
        setNewNote(false);
        checkButton();
    };
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            billingId: event?.id,
        };
        const res = await BillingGrids.deleteBillingGrid(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Billing record deleted successfully',
                        description: '',
                    })
                );
            }, 800);
            const data1: any = {
                providerId:
                    parseInt(event?.providerId) ||
                    parseInt(userPermission?.value?.data?.userId),
            };
            dispatch(getScheduleEventCall(data1));
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
    const newobj: {
        id: string;
        dateOfAppointment: string;
        timeOfAppointment: string;
        clientId: {
            childId: number;
            firstName: string;
            lastName: string;
        };
        payor: {
            id: number;
            name: string;
            isActive: boolean;
        };
        providerId: {
            id: number;
            username: string;
            firstName: string;
            lastName: string;
            roleName: string;
        };
        sessionNotesDataId: number;
        billingCode: {
            id: number;
            defaults: number;
            rate: number;
            code: string;
            name: string;
            description: string;
            status: string;
            codeType: {
                id: number;
                name: string;
                type: string;
            };
        };
        hour: string;
        unit: any;
        billedRate: any;
        agreedRate: any;
        billingStatus: any;
        servicePlaceId: {
            id: number;
            code: string;
            service: string;
        };
        calculatedAdjustment: number;
        patientResponsibilityAmount: number;
        adjustmentAmount: number;
        paidAmount: number;
        owedAmount: number;
    } = {
        id: '',
        dateOfAppointment: '',
        timeOfAppointment: '',
        clientId: {
            childId: 0,
            firstName: '',
            lastName: '',
        },
        payor: {
            id: 0,
            name: '',
            isActive: true,
        },
        providerId: {
            id: 0,
            username: '',
            firstName: '',
            lastName: '',
            roleName: '',
        },
        sessionNotesDataId: 0,
        billingCode: {
            id: 0,
            defaults: 0,
            rate: 0,
            code: 'Total --->',
            name: '',
            description: '',
            status: '',
            codeType: {
                id: 27,
                name: '',
                type: '',
            },
        },
        hour: sumTotalData?.totalWorkHour,
        unit: sumTotalData?.totalWorkUnit,
        billedRate: sumTotalData?.totalBilledRate,
        agreedRate: sumTotalData?.totalAgreedRate,
        billingStatus: null,
        servicePlaceId: {
            id: 1,
            code: '',
            service: '',
        },
        calculatedAdjustment: sumTotalData?.totalCalculatedAdjustment,
        patientResponsibilityAmount:
            sumTotalData?.totalPatientResponsibilityAmount,
        adjustmentAmount: sumTotalData?.totalAdjustmentAmount,
        paidAmount: sumTotalData?.totalPaidAmount,
        owedAmount: sumTotalData?.totalOwedAmount,
    };
    const handleCloseModal = (): void => {
        setOpenModal(false);
        checkButton();
    };
    const handlePaymentModal = (): void => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'BILLING' }));
        setShowAddPaymentModal(false);
    };
    const rowClassName = (item: any) => (rowData: any) =>
        item?.includes(rowData) ? 'bg-[#48ABCA78] text-black' : '';
    const onSelectionChange: (e: any) => void = (e) => {
        setSelectedProducts(e.value);
        dispatch(setMultipleGridData(e?.value));
    };
    const handleMergeClaim = (): any => {
        const checkPayorMismatch = (selectedProductsData: any): any => {
            const groupedClaims: any = {};
            selectedProductsData.forEach((claim: any) => {
                const key = `${claim.clientId.childId}_${claim.billingCode.code}`;
                if (!groupedClaims[key]) {
                    groupedClaims[key] = [];
                }
                groupedClaims[key].push(claim);
            });
            for (const key in groupedClaims) {
                const claims = groupedClaims[key];
                const payorIdSet = new Set(
                    claims.map((claim: any) => claim.payor.id)
                );
                if (payorIdSet.size > 1) {
                    const childName =
                        claims[0].clientId.firstName +
                        ' ' +
                        claims[0].clientId.lastName;
                    return `Cannot merge claims as payors of '${childName}' are different.`;
                }
            }
            return null;
        };
        const errorMessage = checkPayorMismatch(selectedProducts);
        if (errorMessage) {
            addToast({
                type: 'error',
                message: errorMessage,
            });
        } else {
            const payloadData = {
                billingIds: selectedProducts?.map((user: any) => user.id),
            };
            dispatch(getSelectedBillingDataCall(payloadData));
            dispatch(getPrimaryProvider());
            dispatch(getOrganizationEmployeeCall());
            navigateRef(ROUTES.bulkClaims);
        }
    };
    const handleBulkPayment = (): void => {
        navigateRef(ROUTES.bulkPayment, {
            state: {
                selectedRecords: selectedProducts.map((record: any) => {
                    return {
                        clientId: record.clientId.childId,
                        billingId: record.id,
                    };
                }),
            },
        });
    };
    return (
        <>
            <CommonSubHeader title={title} />
            <div className="flex items-center justify-between mt-5 mx-7">
                <div className="flex items-center">
                    <div className="mr-16">
                        <Datepicker
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
                    <div className="btn">
                        <Button
                            onClick={() => clearButton()}
                            type="submit"
                            data-testid="clear-btn"
                            loading={false}
                            disabled={false}
                            className="py-2 px-[3rem]  justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent  text-[#48abca] hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                        >
                            <img src={clearall} alt="" className="mr-2 w-5" />
                            <span>Clear All</span>
                        </Button>
                    </div>
                </div>
                <div className="flex space-x-6 items-center">
                    <div className="">
                        <button
                            type="button"
                            disabled={
                                selectedProducts?.length >= 1 ? false : true
                            }
                            onClick={() => handleBulkPayment()}
                            className="py-2 px-3 cursor-pointer inline-flex items-center text-base font-semibold rounded-md bg-white text-primary-700  disabled:opacity-50 disabled:pointer-events-none disabled:text-secondary-300"
                        >
                            Apply Bulk Payments
                        </button>
                    </div>
                    <span>|</span>
                    <div className="">
                        <button
                            type="button"
                            disabled={
                                selectedProducts?.length >= 1 ? false : true
                            }
                            onClick={() => handleMergeClaim()}
                            className="py-2 px-3 cursor-pointer inline-flex items-center text-base font-semibold rounded-md bg-white text-primary-700  disabled:opacity-50 disabled:pointer-events-none disabled:text-secondary-300"
                        >
                            Bulk Merge Claims
                        </button>
                    </div>
                </div>
            </div>
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
                sumTotalData={newobj}
                filter={[
                    { filterKey: '', filterValue: dateValueFrom?.startDate },
                    { filterKey: '', filterValue: dateValue?.startDate },
                ]}
                mode={'multiple'}
                selection={selectedProducts}
                onSelectionChange={onSelectionChange}
                rowClassName={rowClassName(selectedProducts)}
            />
            {openModal && (
                <SideModal
                    openModalData={openModalData}
                    onClose={handleCloseModal}
                />
            )}
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Billing Record'}
                    name={event?.name}
                    title={`Are you sure you want to delete this billing for ${name?.clientId?.firstName} ${name?.clientId?.lastName} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
            {showAddPaymentModal && (
                <PaymentModal
                    handleClose={() => {
                        handlePaymentModal();
                    }}
                    activeRecord={activeRecord}
                />
            )}
            {newNote && (
                <AddNewNote
                    onClose={onClose}
                    isOpen={newNote}
                    setNewNote={setNewNote}
                    setName={''}
                    isEdit={true}
                    mode={'view'}
                    isClosable={isClosable}
                    setIsClosable={setIsClosable}
                    code={event?.billingCode}
                />
            )}
        </>
    );
}
