import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Field, Formik, FormikProps } from 'formik';
import edit from '../../../assets/img/edit.svg';
import Select from '../../Generics/Select';
import generateClaimAPI from '../../../api/services/MergeClaims/generateClaim.service';
import { AppDispatch } from '../../../redux/store';
import { openNotification } from '../../../redux/slice/Notification/notifications';
interface Values {
    provider: any;
    facility: any;
    billing: any;
}
export default function MergeClaims(): React.JSX.Element {
    const navigateRef = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOptions, setSelectedOptions] = React.useState<number[]>([2]);
    const [expandedHeader, setExpandedHeader] = React.useState<any>([]);
    const [isStartGenerationDisabled, setIsStartGenerationDisabled] =
        React.useState(true);
    const [generatedClaims, setGeneratedClaims] = React.useState<string[]>([]);
    const claimsData = useSelector(
        ({ mergeClaims }: any) => mergeClaims?.selectedBilling
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const organizationData = useSelector(
        ({ mergeClaims }: any) => mergeClaims?.organizationEmployee
    );
    const providerList = useSelector(
        (state: any) => state.scheduling.getPrimaryProvider
    );
    const checkboxOptions = [
        { id: 1, label: 'Split on Provider' },
        { id: 2, label: 'Split on Authorization' },
        { id: 3, label: 'Split on Service Address' },
        { id: 4, label: 'Split on Place of Service' },
    ];
    const tableHeaderData = [
        'Date',
        'Codes to be billed',
        'Pointer',
        'Modifiers',
        'Provider',
        'Payor',
        'Facility',
        'Billing',
    ];
    const getSearchProviders = (): string => {
        return providerList?.map((item: any) => ({
            label: `${item?.firstName} ${item?.lastName}`,
            value: `${item?.firstName} ${item?.lastName}`,
        }));
    };
    const getSearchFacility = (): string => {
        return organizationData?.map((item: any) => ({
            label: `${item?.firstName} ${item?.lastName}`,
            value: `${item?.firstName} ${item?.lastName}`,
        }));
    };
    const getSearchBilling = (): string => {
        return organizationData?.map((item: any) => ({
            label: `${item?.firstName} ${item?.lastName}`,
            value: `${item?.firstName} ${item?.lastName}`,
        }));
    };
    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): any => {
        const { id, checked } = e.target;
        const checkboxId = parseInt(id, 10); // Convert id to number
        if (checked) {
            setSelectedOptions((prevSelected) => [...prevSelected, checkboxId]);
        } else {
            setSelectedOptions((prevSelected) =>
                prevSelected.filter((option) => option !== checkboxId)
            );
        }
    };
    const handleSearchClick = (
        field: string,
        index: string | number | undefined | any
    ): any => {
        setExpandedHeader(
            (prevState: { [x: string]: { [x: string]: any } }) => ({
                ...prevState,
                [index]: {
                    ...prevState[index],
                    [field]: !prevState[index]?.[field],
                },
            })
        );
    };
    const getAllValues = (): Values => {
        return {
            provider: '',
            facility: '',
            billing: '',
        };
    }; // Function to generate unique key based on selected options
    const getUniqueKey = (claimItem: any, selectedOptionsData: any): any => {
        let uniqueKey = `${claimItem.clientId.id}`;
        if (selectedOptionsData.includes(1)) {
            uniqueKey += `-${claimItem.providerId.id}`;
        }
        if (selectedOptionsData.includes(2)) {
            uniqueKey += `-${claimItem.billingCode.code}`; // Split on Authorization is default based on billing code
        }
        if (selectedOptionsData.includes(3)) {
            uniqueKey += `-${claimItem.serviceAddress.id}`;
        }
        if (selectedOptionsData.includes(4)) {
            uniqueKey += `-${claimItem.placeOfService.cdde}`;
        }
        return uniqueKey;
    };
    const groupedClaims = Array.from(
        claimsData?.reduce((map: any, claimItem: any) => {
            const uniqueKey1 = getUniqueKey(claimItem, selectedOptions);
            if (!map.has(uniqueKey1)) {
                map.set(uniqueKey1, [claimItem]);
            } else {
                map.get(uniqueKey1).push(claimItem);
            }
            return map;
        }, new Map())
    );
    const handleGenerateClaim = async (
        values: Values,
        claimItem: any,
        claimGroup: any
    ): Promise<any> => {
        console.log(values);
        const appointmentDates = claimGroup.map(
            (item: any) => new Date(item.appointmentDate)
        );
        const minAppointmentDate = new Date(Math.min(...appointmentDates));
        const maxAppointmentDate = new Date(Math.max(...appointmentDates));
        const payloadData = {
            parentCobClaimId: '',
            amount: '200.00',
            totalPaid: '200.00',
            payorId: claimItem?.payer?.id,
            clientId: claimItem?.clientId?.id,
            userChildId: claimItem?.clientId?.id,
            errorCount: '1',
            serviceDateTo: maxAppointmentDate.toISOString().split('T')[0],
            serviceDateFrom: minAppointmentDate.toISOString().split('T')[0],
            organizationId:
                userPermission?.value?.data?.orgId || userPermission?.orgId,
            userId: userPermission?.userId,
        };
        const data: any = { data: [payloadData] };
        const res = await generateClaimAPI.generateClaim(data);
        if (!res?.data?.error) {
            const ids = JSON?.parse(res.data.data.ids);
            const generatedClaimId = ids[0];
            setGeneratedClaims((prev: any) => [
                ...prev,
                { id: claimItem.clientId.id, claimId: generatedClaimId },
            ]);
            setIsStartGenerationDisabled(false);
            dispatch(
                openNotification({
                    success: true,
                    title: 'Claim generated successfully.',
                    description: '',
                })
            );
        } else {
            return 'error';
        }
    };
    const handleStartClaimGeneration = async (): Promise<any> => {
        const generatedClaimIds = generatedClaims.map((claim: any) => claim.id);
        // Collect all appointment dates from non-generated claims
        const allAppointmentDates = groupedClaims
            .filter(
                ([, claimGroup]: any) =>
                    !generatedClaimIds.includes(claimGroup[0]?.clientId?.id)
            )
            .flatMap(([, claimGroup]: any) =>
                claimGroup.map((item: any) => new Date(item.appointmentDate))
            );
        // Find the min and max dates
        const minAppointmentDate = new Date(Math.min(...allAppointmentDates));
        const maxAppointmentDate = new Date(Math.max(...allAppointmentDates));
        const nonGeneratedClaimsPayload: any = groupedClaims
            .filter(
                ([, claimGroup]: any) =>
                    !generatedClaimIds.includes(claimGroup[0]?.clientId?.id)
            ) // Exclude already generated claims
            .map(([, claimGroup]: any) => {
                const claimItem = claimGroup[0]; // Assuming each group has a claim item
                return {
                    parentCobClaimId: '',
                    amount: '200.00',
                    totalPaid: '200.00',
                    payorId: claimItem?.payer?.id,
                    clientId: claimItem?.clientId?.id,
                    userChildId: claimItem?.clientId?.id,
                    errorCount: '1',
                    serviceDateTo: maxAppointmentDate
                        .toISOString()
                        .split('T')[0],
                    serviceDateFrom: minAppointmentDate
                        .toISOString()
                        .split('T')[0],
                    organizationId:
                        userPermission?.value?.data?.orgId ||
                        userPermission?.orgId,
                    userId: userPermission?.userId,
                };
            });
        const data = {
            data: nonGeneratedClaimsPayload,
        };
        const res = await generateClaimAPI.generateClaim(data);
        if (!res?.data?.error) {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Claim generated successfully.',
                    description: '',
                })
            );
        } else {
            return 'error';
        }
    };
    return (
        <>
            <div
                className="my-3 mx-6 justify-between flex"
                data-testid="show-BulkMergeClaims-page"
            >
                <div className="w-1/2">
                    <ol
                        className="flex items-center whitespace-nowrap mb-1"
                        aria-label="Breadcrumb"
                        data-testid="bread-crumb"
                    >
                        <li className="inline-flex items-center cursor-pointer">
                            <Link to={`${ROUTES.BillingGrid}`}>
                                <label className="cursor-pointer flex items-center text-sm ">
                                    Billing
                                </label>
                            </Link>
                        </li>
                        <li
                            className="inline-flex pl-1 items-center text-lg font-semibold text-gray-800 truncate"
                            aria-current="page"
                        >
                            / Claims
                        </li>
                    </ol>
                    <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.15rem] rounded-md"></div>
                </div>
                <div className="flex space-x-8 w-1/2">
                    {checkboxOptions.map((option: any) => (
                        <div
                            key={option.id}
                            className="flex items-center space-x-3 float-right"
                        >
                            <input
                                className="border-none checked:bg-primary-700 w-6 h-6 focus:border-none cursor-pointer rounded-sm shadow-[0_2px_7px_rgb(0,0,0,0.2)] focus:ring-transparent"
                                type="checkbox"
                                id={option.id.toString()}
                                checked={selectedOptions.includes(option.id)}
                                onChange={handleCheckboxChange}
                            />
                            <label className="text-sm ms-2 font-[lato]">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <Formik
                initialValues={getAllValues()}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false); // Stop Formik from submitting form
                }}
            >
                {(props: FormikProps<Values>) => {
                    const { values, setFieldValue, handleSubmit } = props;
                    return (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <div className="flex flex-col space-y-3 overflow-y-scroll h-[46rem]">
                                {groupedClaims.map(
                                    ([, claimGroup]: any, claimIndex: any) => {
                                        // If the split on Authorization is unchecked, mark the status as "Not Ready"
                                        const status = selectedOptions.includes(
                                            2
                                        )
                                            ? claimGroup[0]?.status
                                            : 'Not Ready';
                                        // Check if claim is already generated and retrieve generated claim ID
                                        const generatedClaim: any =
                                            generatedClaims.find(
                                                (g: any) =>
                                                    g.id ===
                                                    claimGroup[0]?.clientId?.id
                                            );
                                        const isClaimGenerated =
                                            !!generatedClaim;
                                        // Collect unique diagnosis codes
                                        const diagnosisCodes =
                                            claimGroup.reduce(
                                                (acc: any, claimItem: any) => {
                                                    claimItem.diagnosisCodes.forEach(
                                                        (code: any) => {
                                                            if (
                                                                !acc.some(
                                                                    (
                                                                        existingCode: any
                                                                    ) =>
                                                                        existingCode.id ===
                                                                        code.id
                                                                )
                                                            ) {
                                                                acc.push(code); // Only add if the code is not already in the list
                                                            }
                                                        }
                                                    );
                                                    return acc;
                                                },
                                                []
                                            );
                                        return (
                                            <div
                                                key={claimIndex} // Use claimIndex for unique keys in the main div
                                                className="border rounded-xl p-4 mx-8 shadow-md"
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>
                                                        <h3 className="text-base font-medium">
                                                            {`${claimGroup[0]?.clientId?.firstName} ${claimGroup[0]?.clientId?.lastName}`}
                                                            <span className="text-secondary-300 text-base ml-3 font-normal">
                                                                {`(ID: ${claimGroup[0]?.clientId?.id})`}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    <div className="flex text-sm">
                                                        {isClaimGenerated && (
                                                            <div className="text-right flex space-x-2">
                                                                <span className="">
                                                                    Status:
                                                                    <span className="text-yellow-500 ml-1 font-medium">
                                                                        {
                                                                            'Processed'
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <span className="">
                                                                    Claim ID:
                                                                    {
                                                                        generatedClaim.claimId
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {!isClaimGenerated && (
                                                            <span className="block mr-8 font-normal">
                                                                Status:
                                                                <span className="text-green-500 ml-1 font-medium">
                                                                    {status}
                                                                </span>
                                                            </span>
                                                        )}
                                                        {diagnosisCodes.length ? (
                                                            <>
                                                                <span className="block mr-1 font-normal">
                                                                    Diagnosis
                                                                    Codes:
                                                                </span>
                                                                {diagnosisCodes.map(
                                                                    (
                                                                        code: any,
                                                                        codeIndex: any
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                codeIndex
                                                                            }
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                code.code
                                                                            }
                                                                            {codeIndex <
                                                                                diagnosisCodes.length -
                                                                                    1 &&
                                                                                ', '}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.15rem] rounded-md"></div>
                                                <table className="min-w-full table-fixed border-collapse mt-3">
                                                    <thead className="text-left">
                                                        <tr className="font-medium">
                                                            {tableHeaderData?.map(
                                                                (
                                                                    itemHeader,
                                                                    indexHeader
                                                                ) => {
                                                                    if (
                                                                        [
                                                                            'Billing',
                                                                            'Facility',
                                                                            'Provider',
                                                                        ].includes(
                                                                            itemHeader
                                                                        )
                                                                    ) {
                                                                        return (
                                                                            <th
                                                                                key={
                                                                                    indexHeader
                                                                                }
                                                                                className="text-base p-2 font-medium"
                                                                            >
                                                                                <div className="flex flex-col space-y-2">
                                                                                    <div className="flex items-center space-x-1">
                                                                                        <span>
                                                                                            {
                                                                                                itemHeader
                                                                                            }
                                                                                        </span>
                                                                                        <img
                                                                                            src={
                                                                                                edit
                                                                                            }
                                                                                            alt="edit icon"
                                                                                            className="w-4 cursor-pointer"
                                                                                            onClick={() =>
                                                                                                handleSearchClick(
                                                                                                    itemHeader,
                                                                                                    claimIndex
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </th>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <th
                                                                                key={
                                                                                    indexHeader
                                                                                }
                                                                                className="text-base p-2 font-medium"
                                                                            >
                                                                                {
                                                                                    itemHeader
                                                                                }
                                                                            </th>
                                                                        );
                                                                    }
                                                                }
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(expandedHeader[
                                                            claimIndex
                                                        ]?.Provider ||
                                                            expandedHeader[
                                                                claimIndex
                                                            ]?.Facility ||
                                                            expandedHeader[
                                                                claimIndex
                                                            ]?.Billing) && (
                                                            <tr className="text-left">
                                                                <td className="font-light text-sm"></td>
                                                                <td className="font-light text-sm"></td>
                                                                <td className="font-light text-sm"></td>
                                                                <td className="font-light text-sm"></td>
                                                                <td className="text-sm font-light">
                                                                    {expandedHeader[
                                                                        claimIndex
                                                                    ]
                                                                        ?.Provider && (
                                                                        <div className="w-64">
                                                                            <Field
                                                                                id={`provider-${claimIndex}`}
                                                                                name={`provider.${claimIndex}`}
                                                                                autoComplete="off"
                                                                                isRequired={
                                                                                    false
                                                                                }
                                                                                isSearchable={
                                                                                    true
                                                                                }
                                                                                hideLabel={
                                                                                    true
                                                                                }
                                                                                value={
                                                                                    values
                                                                                        ?.provider[
                                                                                        claimIndex
                                                                                    ]
                                                                                }
                                                                                component={
                                                                                    Select
                                                                                }
                                                                                inputClassName={
                                                                                    'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                                }
                                                                                options={getSearchProviders()}
                                                                                onChange={(
                                                                                    selectedOption: string
                                                                                ) => {
                                                                                    if (
                                                                                        selectedOption?.[0]
                                                                                    ) {
                                                                                        setFieldValue(
                                                                                            `provider.${claimIndex}`,
                                                                                            selectedOption?.[0]
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                placeholder={
                                                                                    'Search Provider'
                                                                                }
                                                                                showSearch={
                                                                                    true
                                                                                }
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="text-sm font-light"></td>
                                                                <td className="text-sm font-light">
                                                                    {expandedHeader[
                                                                        claimIndex
                                                                    ]
                                                                        ?.Facility && (
                                                                        <div className="w-64">
                                                                            <Field
                                                                                id={`facility-${claimIndex}`}
                                                                                name={`facility.${claimIndex}`}
                                                                                autoComplete="off"
                                                                                isRequired={
                                                                                    false
                                                                                }
                                                                                isSearchable={
                                                                                    true
                                                                                }
                                                                                hideLabel={
                                                                                    true
                                                                                }
                                                                                value={
                                                                                    values
                                                                                        .facility[
                                                                                        claimIndex
                                                                                    ]
                                                                                }
                                                                                component={
                                                                                    Select
                                                                                }
                                                                                inputClassName={
                                                                                    'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                                }
                                                                                options={getSearchFacility()}
                                                                                onChange={(
                                                                                    selectedOption: string
                                                                                ) => {
                                                                                    if (
                                                                                        selectedOption?.[0]
                                                                                    ) {
                                                                                        setFieldValue(
                                                                                            `facility.${claimIndex}`,
                                                                                            selectedOption?.[0]
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                placeholder={
                                                                                    'Search Facility'
                                                                                }
                                                                                showSearch={
                                                                                    true
                                                                                }
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="font-light text-sm">
                                                                    {expandedHeader[
                                                                        claimIndex
                                                                    ]
                                                                        ?.Billing && (
                                                                        <div className="w-64">
                                                                            <Field
                                                                                id={`billing-${claimIndex}`}
                                                                                name={`billing.${claimIndex}`}
                                                                                autoComplete="off"
                                                                                isRequired={
                                                                                    false
                                                                                }
                                                                                isSearchable={
                                                                                    true
                                                                                }
                                                                                hideLabel={
                                                                                    true
                                                                                }
                                                                                value={
                                                                                    values
                                                                                        .billing[
                                                                                        claimIndex
                                                                                    ]
                                                                                }
                                                                                component={
                                                                                    Select
                                                                                }
                                                                                inputClassName={
                                                                                    'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                                }
                                                                                options={getSearchBilling()}
                                                                                onChange={(
                                                                                    selectedOption: string
                                                                                ) => {
                                                                                    if (
                                                                                        selectedOption?.[0]
                                                                                    ) {
                                                                                        setFieldValue(
                                                                                            `billing.${claimIndex}`,
                                                                                            selectedOption?.[0]
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                placeholder={
                                                                                    'Search Billing'
                                                                                }
                                                                                showSearch={
                                                                                    true
                                                                                }
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )}
                                                        {claimGroup.map(
                                                            (
                                                                claimItem: any,
                                                                index: number
                                                            ) => (
                                                                <tr
                                                                    key={index}
                                                                    className="text-left "
                                                                >
                                                                    <td className="p-2 font-light text-sm w-40">
                                                                        {moment(
                                                                            claimItem.appointmentDate
                                                                        ).format(
                                                                            'MM/DD/YYYY'
                                                                        )}
                                                                    </td>
                                                                    <td className="p-2 font-light text-sm w-96">
                                                                        {`${claimItem.billingCode?.code} ${claimItem.billingCode?.description}`}
                                                                    </td>
                                                                    <td className="p-2 flex font-light text-sm">
                                                                        {Array.isArray(
                                                                            claimItem.diagnosisCodes
                                                                        ) &&
                                                                        claimItem
                                                                            .diagnosisCodes
                                                                            .length >
                                                                            0 ? (
                                                                            claimItem.diagnosisCodes.map(
                                                                                (
                                                                                    code: any,
                                                                                    pointerIndex: number
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            pointerIndex
                                                                                        }
                                                                                        className="mr-2 border-b border-gray-400 text-center w-8"
                                                                                    >
                                                                                        <span className="">
                                                                                            {pointerIndex +
                                                                                                1}
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            )
                                                                        ) : (
                                                                            <span>
                                                                                {
                                                                                    '-'
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td className="p-2 font-light text-sm">
                                                                        <div className="flex space-x-4">
                                                                            {[
                                                                                claimItem.modifier1,
                                                                                claimItem.modifier2,
                                                                                claimItem.modifier3,
                                                                                claimItem.modifier4,
                                                                            ]
                                                                                .filter(
                                                                                    Boolean
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        modifier,
                                                                                        indexModifier
                                                                                    ) => (
                                                                                        <div
                                                                                            key={
                                                                                                indexModifier
                                                                                            }
                                                                                            className="border-b border-gray-400 text-center w-8"
                                                                                        >
                                                                                            <span>
                                                                                                {
                                                                                                    modifier
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2 text-sm font-light">
                                                                        {values?.provider
                                                                            ? values?.provider
                                                                            : `${claimItem?.providerId?.firstName} ${claimItem?.providerId?.lastName}`}
                                                                    </td>
                                                                    <td className="p-2 text-sm font-light">
                                                                        {
                                                                            claimItem
                                                                                ?.payer
                                                                                ?.name
                                                                        }
                                                                    </td>
                                                                    <td className="p-2 text-sm font-light">
                                                                        {values?.facility
                                                                            ? values?.facility
                                                                            : `${claimItem?.facility?.firstName ? claimItem?.facility?.firstName : ''} ${claimItem?.facility?.lastName ? claimItem?.facility?.lastName : ''}`}
                                                                    </td>
                                                                    <td className="p-2 font-light text-sm">
                                                                        {values?.billing
                                                                            ? values?.billing
                                                                            : `${claimItem?.billing?.firstName ? claimItem?.billing?.firstName : ''} ${claimItem?.billing?.lastName ? claimItem?.billing?.lastName : ''}`}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                                <div className="mt-4 text-right">
                                                    <button
                                                        disabled={
                                                            status ===
                                                                'Not Ready' ||
                                                            isClaimGenerated
                                                        }
                                                        onClick={() =>
                                                            handleGenerateClaim(
                                                                values,
                                                                claimGroup[0],
                                                                claimGroup
                                                            )
                                                        }
                                                        className="py-2 px-9 inline-flex items-center text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Generate This Claim
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <div className="flex justify-end my-4 mx-10 space-x-6">
                                <button
                                    type="button"
                                    disabled={isStartGenerationDisabled}
                                    onClick={() => handleStartClaimGeneration()}
                                    className="py-2 px-9 inline-flex items-center  text-base font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                                >
                                    Start Claim Generation
                                </button>
                                <button
                                    type="button"
                                    disabled={isStartGenerationDisabled}
                                    onClick={() =>
                                        navigateRef(ROUTES.inboxGrid)
                                    }
                                    className="py-2 px-3 cursor-pointer inline-flex items-center  text-lg font-medium rounded-md bg-white text-primary-700   disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Go to Claim Inbox
                                </button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
}
