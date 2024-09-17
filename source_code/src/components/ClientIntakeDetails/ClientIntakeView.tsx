import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizationIntakeByIdCall } from '../../redux/slice/ClientIntakeDetails/clientIntakeDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import sentForInformationAPI from '../../api/services/ClientIntake/sentForInformation.service';
import ConfirmationModal from '../Generics/ConfirmationModal';
import moment from 'moment';
import {
    getClientInsuranceCall,
    getClientServicesCall,
} from '../../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
export default function ClientIntakeView(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [openConfirmationModal, setOpenConfirmationModal] =
        React.useState(false);
    const clientIntakeData = useSelector(
        ({ clientIntakeDetails }: any) =>
            clientIntakeDetails?.clientIntakeDetails
    );
    const allServices = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall?.services?.data
    );
    const allInsurance = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall?.value?.data
    );
    const params = useParams();
    const navigateRef = useNavigate();
    React.useEffect(() => {
        const data = {
            id: params?.id,
        };
        dispatch(getOrganizationIntakeByIdCall(data));
    }, [dispatch]);
    const dataChild = clientIntakeData?.userChildren?.length
        ? JSON?.parse(clientIntakeData?.userChildren)
        : [];
    const desiredServices = allServices
        ?.filter((item: { id: number }) =>
            dataChild?.[0]?.services.includes(item.id)
        )
        .map((item: { name: string }) => item.name)
        .join(', ');
    const primaryIns = allInsurance
        ?.filter(
            (item: { id: number }) =>
                dataChild?.[0]?.primaryInsurance === item?.id
        )
        .map((item: { name: string }) => item.name)
        .join(', ');
    const SecondaryIns = allInsurance
        ?.filter((item: { id: number }) =>
            dataChild?.[0]?.secondaryInsurance?.includes(item.id)
        )
        .map((item: { name: string }) => item.name)
        .join(', ');
    const isArrayOfObjectsServices = dataChild?.[0]?.services?.every(
        (item: null) => typeof item === 'object' && item !== null
    );
    const parentData = [
        {
            label: "Parent/Guardian's Name",
            value: `${clientIntakeData?.parentFirstname} ${clientIntakeData?.parentLastname}`,
        },
        {
            label: 'Email Address',
            value: clientIntakeData?.email,
        },
        {
            label: 'Cell Phone',
            value: clientIntakeData?.phoneNumber,
        },
        {
            label: 'Home Phone',
            value: clientIntakeData?.homePhone,
        },
        {
            label: 'Work Phone',
            value: clientIntakeData?.workPhone,
        },
        {
            label: 'Date of Birth',
            value: moment(clientIntakeData?.dateOfBirth).format('MM/DD/YYYY'),
        },
        {
            label: 'Primary Language',
            value: clientIntakeData?.primaryLanguage,
        },
    ];
    const addressData = [
        {
            label: 'Address Line 1',
            value: clientIntakeData?.addressLine1,
        },
        {
            label: 'City',
            value: clientIntakeData?.city,
        },
        {
            label: 'State',
            value: clientIntakeData?.state,
        },
        {
            label: 'Zip/Postal Code',
            value: clientIntakeData?.zipCode,
        },
    ];
    const childData = [
        {
            label: "Child's Name",
            value: dataChild?.[0]?.name
                ? dataChild?.[0]?.name
                : `${dataChild?.[0]?.childFirstName} ${dataChild?.[0]?.childLastName}`,
        },
        {
            label: 'Gender',
            value: dataChild?.[0]?.gender
                ? dataChild?.[0]?.gender
                : dataChild?.[0]?.childGender,
        },
        {
            label: 'Date of Birth',
            value: dataChild?.[0]?.dateOfBirth
                ? moment(dataChild?.[0]?.dateOfBirth).format('MM/DD/YYYY')
                : moment(dataChild?.[0]?.childDateOfBirth).format('MM/DD/YYYY'),
        },
        {
            label: 'Primary Language',
            value: clientIntakeData?.primaryLanguage,
        },
        {
            label: 'Desired Services',
            value: isArrayOfObjectsServices
                ? dataChild?.[0]?.services
                      ?.map((item: { name: string }) => item?.name)
                      .join(', ')
                : desiredServices,
        },
        {
            label: 'Primary Insurance Provider',
            value: dataChild?.[0]?.primaryInsuranceProvider
                ? dataChild?.[0]?.primaryInsuranceProvider
                      ?.map((item: { name: string }) => item?.name)
                      .join(', ')
                : primaryIns,
        },
        {
            label: 'Secondary Insurance Provider',
            value: dataChild?.[0]?.secondaryInsuranceProvider
                ? dataChild?.[0]?.secondaryInsuranceProvider
                      ?.map((item: { name: string }) => item?.name)
                      .join(', ')
                : SecondaryIns,
        },
    ];
    const handleSent = async (): Promise<any> => {
        const payload = { id: params?.id };
        const res = await sentForInformationAPI.sentForInformation(payload);
        if (!res?.data?.error) {
            setTimeout(() => {
                navigateRef('/client-intake-details-grid');
            }, 1000);
        } else {
            return res;
        }
    };
    const handleCancel = (): void => {
        navigateRef('/client-intake-details-grid');
    };
    React.useEffect(() => {
        dispatch(getClientInsuranceCall({ type: 'MASTER_DATA' }));
        dispatch(getClientServicesCall({ type: 'MASTER_DATA' }));
    }, []);
    return (
        <>
            <div className="px-8 py-2" data-testid="client-intake-page">
                <div className="text-center pb-3 mt-2">
                    <label className="text-base font-semibold font-[lato] text-zinc-800">
                        Welcome to Iris Insights
                    </label>
                </div>
                <div>
                    <div className="flex flex-col">
                        <label className="text-base font-semibold font-[lato]">
                            {"Parent Guardian's Details"}
                        </label>
                        <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent w-full h-[0.2rem] rounded-md"></div>
                        <div className="py-3 space-y-3 my-3">
                            {parentData?.map((item, index) => {
                                if (
                                    item.label === 'Cell Phone' ||
                                    item.label === 'Home Phone' ||
                                    item.label === 'Work Phone'
                                ) {
                                    return (
                                        <div key={index}>
                                            {index === 2 && (
                                                <div className="flex  justify-between w-1/2 items-center">
                                                    {parentData
                                                        .filter(
                                                            (phoneItem) =>
                                                                phoneItem.label ===
                                                                    'Cell Phone' ||
                                                                phoneItem.label ===
                                                                    'Home Phone' ||
                                                                phoneItem.label ===
                                                                    'Work Phone'
                                                        )
                                                        .map(
                                                            (
                                                                phoneItem,
                                                                phoneIndex
                                                            ) => (
                                                                <div
                                                                    className="flex space-x-1 items-center"
                                                                    key={
                                                                        phoneIndex
                                                                    }
                                                                >
                                                                    <label className="text-sm font-semibold font-[lato]">
                                                                        {
                                                                            phoneItem.label
                                                                        }
                                                                        :
                                                                    </label>
                                                                    <label className="text-sm font-light text-secondary-400 font-[lato]">
                                                                        {
                                                                            phoneItem.value
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            className="flex space-x-2 items-center"
                                            key={index}
                                        >
                                            <label className="text-sm font-semibold font-[lato]">
                                                {`${item.label}:`}
                                            </label>
                                            <label className="text-sm font-light text-secondary-400 font-[lato]">
                                                {item.value}
                                            </label>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-base font-semibold font-[lato]">
                            {'Address Details'}
                        </label>
                        <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent w-full h-[0.2rem] rounded-md"></div>
                        <div className="py-3 space-y-3 my-3">
                            {addressData?.map(
                                (itemAddress, indexAddress: number) => {
                                    return (
                                        <div
                                            className="flex space-x-2 items-center"
                                            key={indexAddress}
                                        >
                                            <label className="text-sm font-semibold font-[lato]">
                                                {`${itemAddress?.label}:`}
                                            </label>
                                            <label className="text-sm font-light text-secondary-400 font-[lato]">
                                                {itemAddress?.value}
                                            </label>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>{' '}
                    <div className="flex flex-col">
                        <label className="text-base font-semibold font-[lato]">
                            {"Child's Information"}
                        </label>
                        <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent w-full h-[0.2rem] rounded-md"></div>
                        <div className="py-3 space-y-3 my-3">
                            {childData
                                ?.filter(
                                    (item) =>
                                        item.label !==
                                            'Primary Insurance Provider' &&
                                        item.label !==
                                            'Secondary Insurance Provider'
                                )
                                .map((itemChild, indexChild) => (
                                    <div
                                        className="flex space-x-2 items-center"
                                        key={indexChild}
                                    >
                                        <label className="text-sm font-semibold font-[lato]">
                                            {itemChild.label}:
                                        </label>
                                        <label className="text-sm font-light text-secondary-400 font-[lato]">
                                            {itemChild.value}
                                        </label>
                                    </div>
                                ))}
                            <div className="flex justify-between w-1/2">
                                {childData
                                    ?.filter(
                                        (item) =>
                                            item.label ===
                                                'Primary Insurance Provider' ||
                                            item.label ===
                                                'Secondary Insurance Provider'
                                    )
                                    .map((insuranceItem, insuranceIndex) => (
                                        <div
                                            className="flex space-x-1 items-center"
                                            key={insuranceIndex}
                                        >
                                            <label className="text-sm font-semibold font-[lato]">
                                                {insuranceItem.label}:
                                            </label>
                                            <label className="text-sm font-light text-secondary-400 font-[lato]">
                                                {insuranceItem.value}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right space-x-5 my-6">
                    <button
                        onClick={() => handleCancel()}
                        className="text-sm bg-secondary-100  bg-white py-2 px-5 rounded-md cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setOpenConfirmationModal(true)}
                        className="text-sm text-white bg-primary-700 py-2 px-8 rounded-md cursor-pointer"
                    >
                        Sent for more information
                    </button>
                </div>
            </div>{' '}
            {openConfirmationModal && (
                <ConfirmationModal
                    header={
                        'Are you sure you want to ask client for registration?'
                    }
                    name={
                        'This action will also make intake form available for client.'
                    }
                    title={''}
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={() => {
                        handleSent();
                    }}
                    yesButtonText={'Submit'}
                    noButtonText={'Cancel'}
                />
            )}
        </>
    );
}
