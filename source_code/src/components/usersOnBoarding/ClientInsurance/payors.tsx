import * as React from 'react';
import insuranceImg from '../../../assets/img/insurance.svg';
import archive from '../../../assets/img/archive.svg';
import unarchive from '../../../assets/img/unarchive.svg';
import creditCard from '../../../assets/img/creditCard.svg';
import shared from '../../../assets/img/shared.svg';
import {
    getInsuranceByIdCall,
    getInsurancePlanCall,
    getOtherPayorCall,
    isInsuranceCopied,
} from '../../../redux/slice/Insurance/insurance';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import edit from '../../../assets/img/edit.svg';
import copy from '../../../assets/img/copy.svg';
import view from '../../../assets/img/GridIcons/view.svg';
import archiveInsuranceApi from '../../../api/services/Users/archiveInsurance.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import unarchiveInsuranceApi from '../../../api/services/Users/unarchiveInsurance.service';
import { AppDispatch, IRootState } from '../../../redux/store';
import OtherPayors from './otherPayors';
import { setOnView } from '../../../redux/slice/Authorizations/authorization';
interface RootState {
    insurance: { value: { data: string[] }; clientId: number };
}
export default function Payor(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const modeView = useSelector(
        ({ authorization }: IRootState) => authorization?.view
    );
    const modeEdit = useSelector(
        ({ authorization }: IRootState) => authorization?.edit
    );
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [insuranceID, setInsuranceID] = React.useState('');
    const insuranceData = useSelector(
        ({ insurance }: RootState) => insurance?.value?.data
    );
    const id = useSelector(({ insurance }: RootState) => insurance?.clientId);
    const archivedInsurance: any = insuranceData?.filter(
        (data: any) => data?.isArchive === true
    );
    const cards = [
        {
            label: 'Credit Card',
            imageUrl: creditCard,
        },
        {
            label: 'Shared',
            imageUrl: shared,
        },
    ];
    const getCardDataInsurance = (data: any): any => [
        {
            label: 'Valid From',
            value: moment(data?.coverageFrom).format('MM/DD/YYYY'),
        },
        {
            label: 'Valid To',
            value: moment(data?.coverageTo).format('MM/DD/YYYY'),
        },
        {
            label: 'Subscriber',
            value: `${data?.subscriberId?.firstName} ${data?.subscriberId?.lastName}`,
        },
        {
            label: "Child's Name",
            value: `${data?.child?.childFirstName} ${data?.child?.childLastName}`,
        },
        {
            label: 'Patient Responsibility Amount',
            value: data?.patientResponsibilityAmount,
        },
    ];
    React.useEffect(() => {
        const data = {
            clientId: id,
        };
        dispatch(getInsurancePlanCall(data));
        dispatch(getOtherPayorCall(data));
    }, []);
    const handleEditInsurance = (insuranceId: number): void => {
        dispatch(getInsuranceByIdCall({ id: insuranceId }));
        navigate(ROUTES.addInsurance);
    };
    const handleViewInsurance = (insuranceId: number): void => {
        dispatch(getInsuranceByIdCall({ id: insuranceId }));
        dispatch(setOnView(true));
        navigate(ROUTES.viewInsurance);
    };
    const handleCopyInsurance = (insuranceId: number): void => {
        dispatch(getInsuranceByIdCall({ id: insuranceId }));
        dispatch(isInsuranceCopied(true));
        navigate(ROUTES.addInsurance);
    };
    const handleArchiveInsurance = async (
        insuranceId: string
    ): Promise<any> => {
        setOpen(true);
        setInsuranceID(insuranceId);
    };
    const handleArchiveInsuranceApiCall = async (): Promise<any> => {
        const data = {
            id: insuranceID,
        };
        const payload = {
            clientId: id,
        };
        const res = await archiveInsuranceApi.archiveInsurance(data);
        if (!res?.data?.error) {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Insurance archived successfully.',
                    description: '',
                })
            );
            dispatch(getInsurancePlanCall(payload));
            setInsuranceID('');
            setOpen(false);
        } else {
            return res;
        }
    };
    const unArchivedInsurance = insuranceData?.filter(
        (data: any) => data?.isArchive !== true
    );
    const permission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const isClient =
        permission?.userRoles?.data?.primaryRoleName === 'Client'
            ? true
            : false;
    const handleUnarchiveInsurance = async (insuranceId: any): Promise<any> => {
        setModalOpen(true);
        setInsuranceID(insuranceId);
    };
    const handleUnarchiveInsuranceApiCall = async (): Promise<any> => {
        const data = {
            id: insuranceID,
        };
        const payload = {
            clientId: id,
        };
        const res = await unarchiveInsuranceApi.unarchiveInsurance(data);
        if (!res?.data?.error) {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Insurance unarchived successfully.',
                    description: '',
                })
            );
            setInsuranceID('');
            setModalOpen(false);
            dispatch(getInsurancePlanCall(payload));
        } else {
            return res;
        }
    };
    return (
        <>
            <div className="w-3/4 pr-3" data-testid="payor-page">
                <div className="flex flex-col space-y-1">
                    <label className="text-lg font-semibold">Payors</label>
                    <div className="bg-gradient-to-r from-gray-300 from-70% to-transparent w-full h-[0.2rem]"></div>
                </div>
                <div className="h-[46rem] overflow-y-scroll pr-2">
                    <div className="my-10">
                        <div className="flex flex-col space-y-1">
                            <div className="flex space-x-1">
                                <img src={insuranceImg}></img>
                                <label className="text-md font-semibold">
                                    Insurance
                                </label>
                            </div>
                            <div className="flex items-center relative">
                                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent w-4/5 h-[0.2rem] rounded-md"></div>
                                <button
                                    type="button"
                                    disabled={modeView || isClient}
                                    className={`absolute end-0 bg-theme-lightBlue1 py-2 shadow-md text-white w-1/5 rounded-md text-[12.9px] disabled:pointer-events-none disabled:bg-secondary-100`}
                                    id="fill-and-justify-item-1"
                                    data-hs-tab="#fill-and-justify-1"
                                    aria-controls="fill-and-justify-1"
                                    onClick={() => {
                                        navigate(ROUTES.addInsurance);
                                    }}
                                >
                                    {'+ Add New Insurance'}
                                </button>
                            </div>
                        </div>
                        <div className="my-8">
                            {unArchivedInsurance?.length ? (
                                <label className="text-sm font-medium ps-1">
                                    Active Insurances
                                </label>
                            ) : (
                                ''
                            )}
                            {unArchivedInsurance?.map(
                                (itemCard: any, indexCard: any) => {
                                    const cardDataInsurance =
                                        getCardDataInsurance(itemCard);
                                    return (
                                        <div
                                            className="border shadow-lg p-4 mt-3 mb-6 rounded-md"
                                            key={indexCard}
                                        >
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="flex space-x-1">
                                                        <label className="text-sm font-semibold">
                                                            {`${itemCard?.insurerResponsibility}:`}
                                                        </label>
                                                        <label className="text-sm font-light text-secondary-500">
                                                            {
                                                                itemCard
                                                                    ?.insuranceProvider
                                                                    ?.name
                                                            }
                                                        </label>
                                                    </div>
                                                    <div className="flex space-x-6">
                                                        {!modeEdit && (
                                                            <div
                                                                className="flex space-x-2 items-center"
                                                                onClick={() =>
                                                                    handleViewInsurance(
                                                                        itemCard?.id
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={view}
                                                                    className="w-4 h-4 cursor-pointer"
                                                                ></img>
                                                                <label className="text-sm font-medium">
                                                                    View
                                                                </label>{' '}
                                                            </div>
                                                        )}

                                                        {!modeView &&
                                                            !isClient && (
                                                                <>
                                                                    <div
                                                                        className={`${modeView ? 'pointer-events-none' : 'cursor-pointer'} flex space-x-2 items-center`}
                                                                        onClick={() =>
                                                                            handleEditInsurance(
                                                                                itemCard?.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                edit
                                                                            }
                                                                            className="w-4 h-4 cursor-pointer"
                                                                        ></img>
                                                                        <label className="text-sm font-medium">
                                                                            Edit
                                                                        </label>
                                                                    </div>
                                                                    <div
                                                                        className={`${modeView ? 'pointer-events-none' : 'cursor-pointer'} flex space-x-2 items-center`}
                                                                        onClick={() =>
                                                                            handleCopyInsurance(
                                                                                itemCard?.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                copy
                                                                            }
                                                                            className="w-4 h-4"
                                                                        ></img>
                                                                        <label className="text-sm font-medium">
                                                                            Copy
                                                                        </label>
                                                                    </div>
                                                                    <div
                                                                        className={`flex cursor-pointer space-x-2 ${
                                                                            itemCard?.archiveEnabled ||
                                                                            modeView
                                                                                ? 'pointer-events-none opacity-50'
                                                                                : ''
                                                                        }`}
                                                                        onClick={() =>
                                                                            handleArchiveInsurance(
                                                                                itemCard?.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                archive
                                                                            }
                                                                            className="w-4 h-4 cursor-pointer"
                                                                        ></img>
                                                                        <label className="text-sm font-medium">
                                                                            Archive
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            )}
                                                    </div>
                                                </div>
                                                <div className="bg-gradient-to-r from-gray-300 from-70% to-transparent w-full h-[0.2rem]"></div>
                                            </div>
                                            <div className="flex justify-between mt-7 flex-wrap items-center space-y-1">
                                                {cardDataInsurance?.map(
                                                    (
                                                        itemCardDataIns: any,
                                                        indexCardDataIns: any
                                                    ) => {
                                                        return (
                                                            <div
                                                                className="flex space-x-1"
                                                                key={
                                                                    indexCardDataIns
                                                                }
                                                            >
                                                                <label className="text-sm font-semibold">
                                                                    {`${itemCardDataIns?.label}:`}
                                                                </label>
                                                                <label className="text-sm font-light text-secondary-500">
                                                                    {
                                                                        itemCardDataIns?.value
                                                                    }
                                                                </label>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <div className="mt-5">
                                                {itemCard?.subscriberId
                                                    ?.parentDetails
                                                    ?.isActive ? (
                                                    <label className="text-sm font-light text-[#0DB60A]">
                                                        This is a verified
                                                        insurance
                                                    </label>
                                                ) : (
                                                    <label className="text-sm font-light text-[#FF7A30]">
                                                        There are no recorded
                                                        coverage verifications
                                                        for this insurance, so
                                                        it is considered to be
                                                        unverified
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                            {archivedInsurance?.length ? (
                                <div className="text-sm font-medium ps-1">
                                    Archived Insurances
                                </div>
                            ) : (
                                ''
                            )}
                            {archivedInsurance?.map(
                                (itemCard: any, indexCard: any) => {
                                    const cardDataInsurance =
                                        getCardDataInsurance(itemCard);
                                    return (
                                        <div
                                            className="border shadow-lg p-4 mt-3 mb-6 rounded-md"
                                            key={indexCard}
                                        >
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="flex space-x-1">
                                                        <label className="text-sm font-semibold">
                                                            {`${itemCard?.insurerResponsibility}:`}
                                                        </label>
                                                        <label className="text-sm font-light text-secondary-500">
                                                            {
                                                                itemCard
                                                                    ?.insuranceProvider
                                                                    ?.name
                                                            }
                                                        </label>
                                                    </div>
                                                    {!modeView && (
                                                        <div className="flex space-x-6">
                                                            <div
                                                                className="flex space-x-2 "
                                                                onClick={() =>
                                                                    handleEditInsurance(
                                                                        itemCard?.id
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={edit}
                                                                    className="w-4 h-4 cursor-pointer"
                                                                ></img>
                                                                <label className="text-sm font-medium">
                                                                    Edit
                                                                </label>
                                                            </div>
                                                            <div
                                                                className="flex space-x-2"
                                                                onClick={() =>
                                                                    handleCopyInsurance(
                                                                        itemCard?.id
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={copy}
                                                                    className="w-4 h-4"
                                                                ></img>
                                                                <label className="text-sm font-medium">
                                                                    Copy
                                                                </label>
                                                            </div>
                                                            <div
                                                                className={`flex space-x-2`}
                                                                onClick={() =>
                                                                    handleUnarchiveInsurance(
                                                                        itemCard?.id
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        unarchive
                                                                    }
                                                                    className="w-4 h-4 cursor-pointer"
                                                                ></img>
                                                                <label className="text-sm font-medium">
                                                                    Unarchive
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="bg-gradient-to-r from-gray-300 from-70% to-transparent w-full h-[0.2rem]"></div>
                                            </div>
                                            <div className="flex justify-between mt-7 flex-wrap items-center space-y-1">
                                                {cardDataInsurance?.map(
                                                    (
                                                        itemCardDataIns: any,
                                                        indexCardDataIns: any
                                                    ) => {
                                                        return (
                                                            <div
                                                                className="flex space-x-1"
                                                                key={
                                                                    indexCardDataIns
                                                                }
                                                            >
                                                                <label className="text-sm font-semibold">
                                                                    {`${itemCardDataIns?.label}:`}
                                                                </label>
                                                                <label className="text-sm font-light text-secondary-500">
                                                                    {
                                                                        itemCardDataIns?.value
                                                                    }
                                                                </label>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <div className="mt-5">
                                                {itemCard?.subscriberId
                                                    ?.parentDetails
                                                    ?.isActive ? (
                                                    <label className="text-sm font-light text-[#0DB60A]">
                                                        This is a verified
                                                        insurance
                                                    </label>
                                                ) : (
                                                    <label className="text-sm font-light text-[#FF7A30]">
                                                        There are no recorded
                                                        coverage verifications
                                                        for this insurance, so
                                                        it is considered to be
                                                        unverified
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <OtherPayors />
                    <div className="flex flex-col py-2 space-y-5">
                        {cards?.map((item, index) => {
                            return (
                                <div className="flex-col" key={index}>
                                    <div className="flex-col space-y-1">
                                        <div className="flex space-x-2">
                                            <img src={item?.imageUrl} />
                                            <label className="text-md font-semibold">
                                                {item?.label}
                                            </label>
                                        </div>
                                        <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent w-full h-[0.2rem] rounded-md"></div>
                                    </div>
                                    <div className="flex-col space-y-6 my-7">
                                        <div className="bg-gradient-to-r from-gray-100 from-20% to-transparent rounded-md w-full h-[1rem]"></div>
                                        <div className="bg-gradient-to-r from-gray-100 from-20% to-transparent rounded-md w-full h-[1rem]"></div>
                                        <div className="bg-gradient-to-r from-gray-100 from-20% to-transparent rounded-md w-full h-[1rem]"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="text-end pr-2">
                    <Link to={ROUTES.addUser}>
                        <button
                            type="button"
                            className="py-2 px-8 w-[110px] border border-gray-800 inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-transparent text-gray-800 shadow-sm hover:bg-theme-lightBlue1 hover:border-theme-lightBlue1 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
                            data-hs-overlay="#hs-slide-down-animation-modal"
                        >
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
            {open && (
                <ConfirmationModal
                    header={''}
                    name={''}
                    title={'Are you sure you want to archive this insurance ?'}
                    open={open}
                    onClose={() => setOpen(false)}
                    handleStop={() => handleArchiveInsuranceApiCall()}
                />
            )}
            {modalOpen && (
                <ConfirmationModal
                    header={''}
                    name={''}
                    title={
                        'Are you sure you want to unarchive this insurance ?'
                    }
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleStop={() => handleUnarchiveInsuranceApiCall()}
                />
            )}
        </>
    );
}
