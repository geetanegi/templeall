import * as React from 'react';
import others from '../../../assets/img/others.svg';
import deleteIcon from '../../../assets/img/GridIcons/delete.svg';
import { useSelector, useDispatch } from 'react-redux';
import edit from '../../../assets/img/edit.svg';
import { AppDispatch, IRootState } from '../../../redux/store';
import AddOtherPayors from './AddOtherPayors';

import {
    clearOtherPayorsById,
    getOtherPayorByIdCall,
    getOtherPayorCall,
} from '../../../redux/slice/Insurance/insurance';
import { clearData } from '../../../redux/slice/ClientInsurance/ClientInsurance';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import deleteOtherPayorsAPI from '../../../api/services/Users/deleteOtherPayors.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
interface PayorData {
    id: number;
    name: string;
    childFirstName: string;
    childLastName: string;
    subscriberFirstName: string;
    subscriberLastName: string;
    insuranceContactPhone: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
}
interface RootState {
    insurance: { otherPayors: PayorData[] };
}
interface User {
    getEmployeeById: {
        value: {
            userId: number;
        };
    };
}
interface Insurance {
    insurance: {
        clientId: number;
    };
}
export default function OtherPayors(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const modeView = useSelector(
        ({ authorization }: IRootState) => authorization?.view
    );

    const otherPayorsData = useSelector(
        ({ insurance }: RootState) => insurance?.otherPayors
    );
    const userId = useSelector(
        ({ getEmployeeById }: User) => getEmployeeById?.value?.userId
    );
    const insuranceDetail = useSelector(
        ({ insurance }: Insurance) => insurance
    );
    const permission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const isClient =
        permission?.userRoles?.data?.primaryRoleName === 'Client'
            ? true
            : false;
    const [openAddOtherPayorModal, setOpenAddOtherPayorModal] =
        React.useState(false);
    const [deleteId, setDeleteId] = React.useState(0);
    const generateCardDataHeaderOthers = (
        headerData: PayorData
    ): { label: string; value: string }[] => [
        {
            label: 'Payor Name',
            value: headerData?.name,
        },
        {
            label: "Child's Name",
            value: `${headerData?.childFirstName} ${headerData?.childLastName}`,
        },
    ];
    const generateCardDataOthers = (
        data: PayorData
    ): { label: string; value: string }[] => [
        {
            label: 'Subcriber',
            value: `${data?.subscriberFirstName} ${data?.subscriberLastName}`,
        },
        {
            label: 'Cell Phone',
            value: data?.insuranceContactPhone,
        },
        {
            label: 'Address',
            value: data?.addressLine1,
        },
        {
            label: 'City',
            value: data?.city,
        },
        {
            label: 'State',
            value: data?.state,
        },
        {
            label: 'Zip/Postal Code',
            value: data?.postalCode,
        },
    ];
    const handleAddPayor = (): void => {
        setOpenAddOtherPayorModal(true);
        dispatch(clearData());
        dispatch(clearOtherPayorsById());
    };
    const handleEditPayor = (insuranceId: number): void => {
        dispatch(clearData());
        dispatch(getOtherPayorByIdCall({ id: insuranceId }));
        setOpenAddOtherPayorModal(true);
    };
    const handleDeletePayor = (insuranceId: number): void => {
        setDeleteId(insuranceId);
        setOpenConfirmationModalForDelete(true);
    };
    const deleteOtherPayor = async (): Promise<any> => {
        const payload = {
            id: deleteId,
        };
        const res = await deleteOtherPayorsAPI.deleteOtherPayors(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Private payor details deleted successfully.',
                        description: '',
                    })
                );
            }, 800);
            const data = {
                clientId: userId || insuranceDetail?.clientId,
            };
            dispatch(getOtherPayorCall(data));
            return res?.data;
        } else {
            return 'error';
        }
    };
    return (
        <>
            <div className="my-10">
                <div className="flex flex-col space-y-1">
                    <div className="flex space-x-1">
                        <img src={others}></img>
                        <label className="text-md font-semibold">Others</label>
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
                                handleAddPayor();
                            }}
                        >
                            {'+ Add Other Payor'}
                        </button>
                    </div>
                </div>
                <div className="my-8">
                    {otherPayorsData?.map((itemData, indexData: number) => {
                        const cardDataOthers = generateCardDataOthers(itemData);
                        const cardDataHeaderOthers =
                            generateCardDataHeaderOthers(itemData);
                        return (
                            <div
                                className="border shadow-lg p-4 mt-3 mb-6 rounded-md"
                                key={indexData}
                            >
                                <div className="flex flex-col space-y-2">
                                    <div className="flex justify-between">
                                        <div className="flex space-x-14">
                                            {cardDataHeaderOthers?.map(
                                                (
                                                    itemHeader: {
                                                        label: string;
                                                        value: string;
                                                    },
                                                    indexHeader: number
                                                ) => {
                                                    return (
                                                        <div
                                                            className="flex space-x-1"
                                                            key={indexHeader}
                                                        >
                                                            <label className="text-sm font-semibold">
                                                                {`${itemHeader?.label}:`}
                                                            </label>
                                                            <label className="text-sm font-light text-secondary-500">
                                                                {
                                                                    itemHeader?.value
                                                                }
                                                            </label>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        {!modeView && !isClient && (
                                            <div className="flex space-x-6">
                                                <div
                                                    onClick={() => {
                                                        handleEditPayor(
                                                            itemData?.id
                                                        );
                                                    }}
                                                    className={`${modeView ? 'pointer-events-none' : 'cursor-pointer'} flex space-x-2 items-center`}
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
                                                    onClick={() =>
                                                        handleDeletePayor(
                                                            itemData?.id
                                                        )
                                                    }
                                                    className={`${modeView ? 'pointer-events-none' : 'cursor-pointer'} flex space-x-2 items-center`}
                                                >
                                                    <img
                                                        src={deleteIcon}
                                                        className="w-4 h-4 cursor-pointer"
                                                    ></img>
                                                    <label className="text-sm font-medium">
                                                        Delete
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-gradient-to-r from-gray-300 from-70% to-transparent w-full h-[0.2rem]"></div>
                                </div>
                                <div className="flex justify-between mt-7 flex-wrap items-center space-y-1">
                                    {cardDataOthers?.map(
                                        (
                                            itemCardDataOthers,
                                            indexCardDataOthers: number
                                        ) => {
                                            return (
                                                <div
                                                    className="flex space-x-1"
                                                    key={indexCardDataOthers}
                                                >
                                                    <label className="text-sm font-semibold">
                                                        {`${itemCardDataOthers?.label}:`}
                                                    </label>
                                                    <label className="text-sm font-light text-secondary-500">
                                                        {
                                                            itemCardDataOthers?.value
                                                        }
                                                    </label>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {openAddOtherPayorModal && (
                <AddOtherPayors
                    open={openAddOtherPayorModal}
                    onClose={() => setOpenAddOtherPayorModal(false)}
                    modeView={modeView}
                />
            )}
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Other Payor'}
                    title={
                        'Are you sure you want to delete private payor details?'
                    }
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={deleteOtherPayor}
                />
            )}
        </>
    );
}
