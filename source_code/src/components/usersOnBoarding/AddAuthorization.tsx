/* eslint-disable max-lines */
import * as React from 'react';
import Modal, {
    AddAuthorizationActionFooter,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import authorizationImg from '../../assets/img/authorizations.svg';
import document from '../../assets/img/tempFolder.svg';
import upload from '../../assets/img/uploadDoc.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import download from '../../assets/img/download.svg';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import Select from 'react-tailwindcss-select';
import Input from '../Generics/Inputs/Input';
import Datepicker from 'react-tailwindcss-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAuthorizationByIdCall,
    getAuthorizationCall,
    getAuthorizationPatientNamesCall,
    getAuthorizationPayorsCall,
    savingAuthorizationData,
} from '../../redux/slice/Authorizations/authorization';
import { getAuthorizationCode } from '../../redux/slice/template/templateSlice';
import { URLS } from '../../constants';
import apiClient from '../../api/client';
import { openNotification } from '../../redux/slice/Notification/notifications';
import {
    getClientTherapyByIdCall,
    getPrimaryDiagnosisCodeCall,
} from '../../redux/slice/users/usersSlice';
import { FrequencyForUser } from '../../constants/userOnboarding';
import { getAllEmployeeCall } from '../../redux/slice/Group/groupSlice';
import Notifications from '../Generics/Notifications';
import ConfirmationModal from '../Generics/ConfirmationModal';
import downloadFile from '../../api/services/Users/downloadFile.service';
import saveEmployeeApi from '../../api/services/saveEmployee.service';
import SelectComponent from '../Generics/Inputs/Select';
import Select1 from '../Generics/Select';
import redIcon from '../../assets/img/redIicon.svg';
import * as Yup from 'yup';
import {
    descriptionValidation,
    nameValidation,
} from '../../constants/ValidationMessages';
import moment from 'moment';
interface Values {
    patientName: any;
    documentName: any;
    description: any;
    payor: any;
    validFrom: any;
    validTo: any;
    code: any;
    frequency: any;
    primaryAuthorization: string;
    secondaryAuthorization: string;
    amount: string;
    visits: string;
    units: string;
    hour: string;
    isAmountOverBillingAllowed: boolean;
    isVisitOverBillingAllowed: boolean;
    isHourOverBillingAllowed: boolean;
    isUnitOverBillingAllowed: boolean;
    totalAmount: string;
    totalVisits: string;
    totalHours: string;
    totalUnits: string;
    isTotalAmountOverBillingAllowed: boolean;
    isTotalVisitOverBillingAllowed: boolean;
    isTotalHourOverBillingAllowed: boolean;
    isTotalUnitOverBillingAllowed: boolean;
    primaryProvider: string;
    primaryBilling: string;
    primaryFacility: string;
    secondaryProvider: string;
    secondaryBilling: string;
    secondaryFacility: string;
    therapyData: {
        therapyType: string;
        primaryDiagnosisCode: string;
        secondaryDiagnosisCodes: string[];
    }[];
}
interface ValueForImg {
    file?: FileList | File | null | any;
}
export default function AddAuthorization({
    open,
    onClose,
    modeView,
}: {
    open: boolean;
    onClose: any;
    modeView?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [error, setError] = React.useState(false);
    const authorizationData = useSelector(
        ({ authorization }: any) => authorization
    );
    const [stateImg, setStateImg] = React.useState<ValueForImg>({
        file: authorizationData?.authorizationData?.filename
            ? authorizationData?.authorizationData?.filename
            : null,
    });
    const [fromError, setFromError] = React.useState<any>(false);
    const [toError, setToError] = React.useState<any>(false);
    const authorizationCodes = useSelector(
        (state: any) => state?.template?.authorizationCode?.data
    );
    const desiredTherapy = useSelector(
        ({ users }: any) => users?.clientTherapyById
    );
    const diagnosisCodes = useSelector(
        ({ users }: any) => users?.diagnosisCode
    );
    const id = useSelector(({ insurance }: any) => insurance?.clientId);
    const userId = useSelector(
        ({ getEmployeeById }: any) => getEmployeeById?.value?.userId
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const profileData = useSelector(
        ({ userProfileData }: any) => userProfileData?.value?.data
    );
    const dropDownData = useSelector(
        ({ groupOfEmployee }: any) => groupOfEmployee?.Employee
    );
    const getPatientNamesData = (): any => {
        return authorizationData?.authorizationPatientNames?.data?.map(
            (item: any) => ({
                label: `${item?.firstName} ${item?.lastName}`,
                value: item?.id,
            })
        );
    };
    const getPayorsData = (): any => {
        return authorizationData?.authorizationPayors?.data?.map(
            (item: any) => ({
                label: `${item?.name} | ${item?.insurerAddressLine1}, ${item?.insurerCity}, ${item?.insurerState}, ${item?.insurerZipCode}`,
                value: item?.id,
            })
        );
    };
    const getAuthCodesData = (): any => {
        return authorizationCodes?.map((item: any) => ({
            label: item?.code === null ? '' : item?.code,
            value: item?.id,
        }));
    };
    const frequencyData = (): any => {
        return FrequencyForUser?.map((data: any) => ({
            label: data?.name,
            value: data?.name,
        }));
    };
    const employeeData = (): any => {
        return dropDownData?.map((data: any) => ({
            label: `${data?.firstName} ${data?.lastName}`,
            value: data?.id,
        }));
    };
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const [isDeleted, setIsDeleted] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState<any>(null);
    const handleChangeSelect = (value: any): any => {
        if (Array?.isArray(value)) {
            setSelectedOptions(value);
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };
    const transformValues = (values: Values): any => {
        const amounts = {
            amount: values.amount,
            hours: values.hour,
            units: values.units,
            visits: values.visits,
            amountType: 'AMOUNTS',
            isAmountOverBillingAllowed: values.isAmountOverBillingAllowed,
            isHourOverBillingAllowed: values.isHourOverBillingAllowed,
            isUnitOverBillingAllowed: values.isUnitOverBillingAllowed,
            isVisitOverBillingAllowed: values.isVisitOverBillingAllowed,
        };
        const totalAmounts = {
            amount: values.totalAmount,
            hours: values.totalHours,
            units: values.totalUnits,
            visits: values.totalVisits,
            amountType: 'TOTAL_GROUP_AMOUNTS',
            isAmountOverBillingAllowed: values.isTotalAmountOverBillingAllowed,
            isHourOverBillingAllowed: values.isTotalHourOverBillingAllowed,
            isUnitOverBillingAllowed: values.isTotalUnitOverBillingAllowed,
            isVisitOverBillingAllowed: values.isTotalVisitOverBillingAllowed,
        };
        return [amounts, totalAmounts];
    };
    const transformToContacts = (values: any): any => {
        const contacts = [
            {
                userId: values?.primaryProvider?.[0] || null,
                contactType: 'Provider',
                userType: 'PRIMARY',
            },
            {
                userId: values?.primaryBilling?.[0] || null,
                contactType: 'Billing',
                userType: 'PRIMARY',
            },
            {
                userId: values?.primaryFacility?.[0] || null,
                contactType: 'Facility',
                userType: 'PRIMARY',
            },
            {
                userId: values?.secondaryProvider?.[0] || null,
                contactType: 'Provider',
                userType: 'SECONDARY',
            },
            {
                userId: values?.secondaryBilling?.[0] || null,
                contactType: 'Billing',
                userType: 'SECONDARY',
            },
            {
                userId: values?.secondaryFacility?.[0] || null,
                contactType: 'Facility',
                userType: 'SECONDARY',
            },
        ];
        return contacts;
    };
    const handleSubmitSave = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        const filteredValues = selectedOptions?.map((item: any) => item.value);
        const transformedValues = transformValues(values);
        const Contact = transformToContacts(values);
        const therapyDataPayload = values?.therapyData?.map(
            (data: any, index: any) => ({
                therapyType: desiredTherapy[index]?.organizationServicesId?.id,
                primaryDiagnosisCode: data?.primaryDiagnosisCode?.value,
                secondaryDiagnosisCodes: data?.secondaryDiagnosisCodes?.map(
                    (item: any) => ({
                        id: item?.value,
                    })
                ),
            })
        );
        setSubmitting(true);
        const fdEdit = new FormData();
        fdEdit.append(
            'id',
            authorizationData?.authorizationData?.id
                ? authorizationData?.authorizationData?.id
                : null
        );
        fdEdit.append(
            'createdBy',
            userPermission?.value?.data?.userId ||
                profileData?.userId?.id ||
                userPermission?.userId
        );
        fdEdit.append('file', stateImg?.file);
        if (authorizationData?.authorizationData?.id) {
            apiClient
                .post(URLS.editAuthorization, fdEdit, {
                    onUploadProgress: () => {
                        // Update state or perform actions based on progress if needed
                    },
                })
                .then(() => {
                    onClose();
                    const data = {
                        clientId: userId || id?.id,
                    };
                    setTimeout(() => {
                        dispatch(getAuthorizationCall(data));
                    }, 1000);
                    setStateImg({
                        file: null,
                    });
                    dispatch(
                        openNotification({
                            success: true,
                            title: `${authorizationData?.authorizationData?.id ? 'Authorization details edited successfully' : 'Authorization details added successfully.'}`,
                            description: '',
                        })
                    );
                })
                .catch(() => {
                    setStateImg({
                        file: null,
                    });
                    dispatch(
                        openNotification({
                            success: false,
                            title: 'Unable to upload file. Please try again.',
                            description: '',
                        })
                    );
                });
        }
        const fd = new FormData();
        fd.append('childPayorInformationContacts', JSON.stringify(Contact));
        fd.append(
            'id',
            authorizationData?.authorizationData?.id
                ? authorizationData?.authorizationData?.id
                : null
        );
        fd.append('userChildId', values?.patientName[0] || '');
        fd.append('documentName', values?.documentName || '');
        fd.append('description', values?.description || '');
        fd.append(
            'validFrom',
            moment(values?.validFrom?.startDate).format('YYYY-MM-DD') || ''
        );
        fd.append(
            'validTo',
            moment(values?.validTo?.startDate).format('YYYY-MM-DD') || ''
        );
        fd.append('userInsuranceId', values?.payor[0] || '');
        fd.append('authorizations', JSON.stringify(filteredValues) || '');
        fd.append('primaryAuthorization', values?.primaryAuthorization || '');
        fd.append(
            'secondaryAuthorization',
            values?.secondaryAuthorization || ''
        );
        fd.append('therapyData', JSON.stringify(therapyDataPayload) || '');
        fd.append(
            'createdBy',
            userPermission?.value?.data?.userId ||
                profileData?.userId?.id ||
                userPermission?.userId
        );
        fd.append(
            'organizationId',
            userPermission?.value?.data?.orgId || userPermission?.orgId
        );
        fd.append('file', stateImg?.file);
        fd.append(
            'childPayorInformationAmounts',
            JSON.stringify(transformedValues)
        );
        fd.append('frequency', values?.frequency || '');
        apiClient
            .post(URLS.saveAuthorization, fd, {
                onUploadProgress: () => {
                    // Update state or perform actions based on progress if needed
                },
            })
            .then(() => {
                onClose();
                const data = {
                    clientId: userId || id?.id,
                };
                setTimeout(() => {
                    dispatch(getAuthorizationCall(data));
                }, 1000);
                setStateImg({
                    file: null,
                });
                dispatch(savingAuthorizationData([]));
                dispatch(
                    openNotification({
                        success: true,
                        title: `${authorizationData?.authorizationData?.id ? 'Authorization details edited successfully' : 'Authorization details added successfully.'}`,
                        description: '',
                    })
                );
            })
            .catch(() => {
                setStateImg({
                    file: null,
                });
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to upload file. Please try again.',
                        description: '',
                    })
                );
            });
    };
    const handleDisabled = (values: any): any => {
        const filteredValues = selectedOptions?.map((item: any) => item.value);
        const areUserTherapyFilled = values.therapyData?.every(
            (therapy: any) => {
                return therapy?.primaryDiagnosisCode;
            }
        );
        return (
            !values?.patientName ||
            !values?.validTo?.startDate ||
            !values?.validFrom?.startDate ||
            !values?.payor ||
            !filteredValues?.length ||
            !areUserTherapyFilled
        );
    };
    const authorization_Codes = authorizationData?.authorizationData
        ?.authorizationCodes
        ? authorizationData?.authorizationData?.authorizationCodes?.map(
              (item: any) => ({
                  label: item?.code,
                  value: item?.id,
              })
          )
        : null;
    const primaryProviderObj1 =
        authorizationData?.authorizationData?.contacts?.find(
            (data: any) =>
                data?.contactType === 'Provider' && data?.userType === 'PRIMARY'
        );
    const primaryProviderObj2 =
        authorizationData?.authorizationData?.contacts?.find(
            (data: any) =>
                data?.contactType === 'Provider' &&
                data?.userType === 'SECONDARY'
        );
    const BillingObj1 = authorizationData?.authorizationData?.contacts?.find(
        (data: any) =>
            data?.contactType === 'Billing' && data?.userType === 'PRIMARY'
    );
    const BillingObj2 = authorizationData?.authorizationData?.contacts?.find(
        (data: any) =>
            data?.contactType === 'Billing' && data?.userType === 'SECONDARY'
    );
    const FacilityObj1 = authorizationData?.authorizationData?.contacts?.find(
        (data: any) =>
            data?.contactType === 'Facility' && data?.userType === 'PRIMARY'
    );
    const FacilityObj2 = authorizationData?.authorizationData?.contacts?.find(
        (data: any) =>
            data?.contactType === 'Facility' && data?.userType === 'SECONDARY'
    );
    const getAllValues = (): any => {
        const therapyDataObj =
            authorizationData?.authorizationData?.therapyData?.map(
                (item: any) => ({
                    therapyType: item?.id,
                    primaryDiagnosisCode: {
                        label: item?.primaryDiagnosisCode?.name,
                        value: item?.primaryDiagnosisCode?.id,
                    },
                    secondaryDiagnosisCodes: item?.secondaryDiagnosisCodes?.map(
                        (data: any) => ({
                            label: data?.name,
                            value: data?.id,
                        })
                    ),
                })
            );
        return {
            patientName: authorizationData?.authorizationData?.id
                ? authorizationData?.authorizationData?.userChild?.id
                : null,
            documentName:
                authorizationData?.authorizationData?.documentName || '',
            description:
                authorizationData?.authorizationData?.description || '',
            payor: authorizationData?.authorizationData?.id
                ? authorizationData?.authorizationData?.payor?.id
                : null,
            validFrom: {
                startDate:
                    authorizationData?.authorizationData
                        ?.authorizationStartDate,
                endDate:
                    authorizationData?.authorizationData
                        ?.authorizationStartDate,
            },
            validTo: {
                startDate:
                    authorizationData?.authorizationData?.authorizationEndDate,
                endDate:
                    authorizationData?.authorizationData?.authorizationEndDate,
            },
            code: authorization_Codes || null,
            frequency: authorizationData?.authorizationData?.frequency
                ? authorizationData?.authorizationData?.frequency
                : ' Monthly',
            primaryAuthorization:
                authorizationData?.authorizationData?.primaryAuthorization ||
                '',
            secondaryAuthorization:
                authorizationData?.authorizationData?.secondaryAuthorization ||
                '',
            amount:
                authorizationData?.authorizationData?.amount?.[0]?.amount || 0,
            visits:
                authorizationData?.authorizationData?.amount?.[0]?.visits || 0,
            units:
                authorizationData?.authorizationData?.amount?.[0]?.units || 0,
            hour: authorizationData?.authorizationData?.amount?.[0]?.hours || 0,
            isAmountOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[0]
                    ?.isAmountOverBillingAllowed || false,
            isVisitOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[0]
                    ?.isVisitOverBillingAllowed || false,
            isHourOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[0]
                    ?.isHourOverBillingAllowed || false,
            isUnitOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[0]
                    ?.isUnitOverBillingAllowed || false,
            totalAmount:
                authorizationData?.authorizationData?.amount?.[1]?.amount || 0,
            totalVisits:
                authorizationData?.authorizationData?.amount?.[1]?.visits || 0,
            totalHours:
                authorizationData?.authorizationData?.amount?.[1]?.units || 0,
            totalUnits:
                authorizationData?.authorizationData?.amount?.[1]?.hours || 0,
            isTotalAmountOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[1]
                    ?.isAmountOverBillingAllowed || false,
            isTotalVisitOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[1]
                    ?.isVisitOverBillingAllowed || false,
            isTotalHourOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[1]
                    ?.isHourOverBillingAllowed || false,
            isTotalUnitOverBillingAllowed:
                authorizationData?.authorizationData?.amount?.[1]
                    ?.isUnitOverBillingAllowed || false,
            primaryProvider: primaryProviderObj1?.userId
                ? primaryProviderObj1?.userId
                : null,
            primaryBilling: BillingObj1?.userId ? BillingObj1?.userId : null,
            primaryFacility: FacilityObj1?.userId ? FacilityObj1?.userId : null,
            secondaryProvider: primaryProviderObj2?.userId
                ? primaryProviderObj2?.userId
                : null,
            secondaryBilling: BillingObj2?.userId ? BillingObj2?.userId : null,
            secondaryFacility: FacilityObj2?.userId
                ? FacilityObj2?.userId
                : null,
            therapyData: therapyDataObj || [
                {
                    therapyType: '',
                    primaryDiagnosisCode: null,
                    secondaryDiagnosisCodes: null,
                },
            ],
        };
    };
    React.useEffect(() => {
        const data1 = {
            parentUserId: userId || id,
        };
        dispatch(getPrimaryDiagnosisCodeCall());
        dispatch(getAuthorizationPatientNamesCall(data1));
        dispatch(getAuthorizationCode({ codeType: 'Billable' }));
        dispatch(getAllEmployeeCall());
    }, []);
    React.useEffect(() => {
        if (authorizationData?.authorizationData?.id > 0) {
            setSelectedOptions(authorization_Codes);
            const data2 = {
                clientId: authorizationData?.authorizationData?.userChild?.id,
            };
            dispatch(getAuthorizationPayorsCall(data2));
        }
    }, [authorizationData?.authorizationData?.id]);
    const handleNumber = (e: any, handleChange: any): void => {
        const value = e.target.value;
        const regex = /^[0-9\+\(\)]*$/;
        if (regex.test(value)) {
            handleChange(e);
        }
    };
    const calculateGroupTotals = (values: any, setFieldValue: any): any => {
        setFieldValue('totalAmount', values.amount);
        setFieldValue('totalHours', values.hour);
        setFieldValue('totalUnits', values.units);
        setFieldValue('totalVisits', values.visits);
    };
    const closeNotification = (): any => {
        setTimeout(() => {
            setIsDeleted(false);
        }, 800);
    };
    const deleteAuthorizationData = async (): Promise<any> => {
        const payload = {
            id: deleteId,
        };
        const res = await saveEmployeeApi.deleteAuthorizationFile(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            setIsDeleted(true);
            const data = {
                id: authorizationData?.authorizationData?.id,
            };
            dispatch(getAuthorizationByIdCall(data));
            return res?.data;
        } else {
            return 'error';
        }
    };
    React.useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(false);
            }, 6000);
        }
    }, [error]);
    const validationSchema = Yup.object().shape({
        documentName: Yup.string()
            .matches(
                /^[a-zA-Z0-9\s.,\-_/!@#$%^&*()+=\[\]{};':"\\|<>?]*$/,
                nameValidation
            )
            .max(150, nameValidation),
        description: Yup.string()
            .matches(
                /^[a-zA-Z0-9\s.,\-_/!@#$%^&*()+=\[\]{};':"\\|<>?]*$/,
                descriptionValidation
            )
            .max(400, descriptionValidation),
    });
    const parseDate = (dateString: string | number | Date): any => {
        return dateString ? new Date(dateString).toString() : null;
    };
    return (
        <>
            <Modal
                open={open}
                id={'add-authorization-modal'}
                expandModal={false}
            >
                <ModalHeader
                    title={`${authorizationData?.authorizationData?.id ? 'Edit Authorization' : 'Add New Authorization'}`}
                    onClose={onClose}
                    closeIcon={false}
                    titleIcon={true}
                    titleImg={authorizationImg}
                />
                <ModalBody expandModal={false}>
                    <div className="w-[60rem] flex flex-col">
                        <Formik
                            initialValues={getAllValues()}
                            onSubmit={handleSubmitSave}
                            enableReinitialize={true}
                            validateOnChange={true}
                            validateOnBlur={true}
                            validationSchema={validationSchema}
                        >
                            {(props: any) => {
                                const {
                                    values,
                                    setFieldValue,
                                    handleChange,
                                    handleSubmit,
                                    touched,
                                    errors,
                                    setFieldTouched,
                                } = props;
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col space-y-1 ">
                                            <Field
                                                label={'Patient Name'}
                                                id="patientName"
                                                name="patientName"
                                                autoComplete="off"
                                                isRequired={true}
                                                isSearchable={true}
                                                value={values?.patientName}
                                                component={Select1}
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                                isDisabled={
                                                    authorizationData
                                                        ?.authorizationData
                                                        ?.id || modeView
                                                        ? true
                                                        : false
                                                }
                                                options={getPatientNamesData()}
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    setFieldValue(
                                                        'patientName',
                                                        selectedOption
                                                    );
                                                    const data2 = {
                                                        clientId:
                                                            selectedOption?.[0],
                                                    };
                                                    dispatch(
                                                        getAuthorizationPayorsCall(
                                                            data2
                                                        )
                                                    );
                                                    dispatch(
                                                        getClientTherapyByIdCall(
                                                            {
                                                                childId:
                                                                    selectedOption?.[0],
                                                            }
                                                        )
                                                    );
                                                }}
                                            ></Field>
                                        </div>
                                        <div className="w-full flex flex-col space-x-1 mt-6">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Name of Document'}
                                                name={'documentName'}
                                                id={'documentName'}
                                                placeholder={'Name of document'}
                                                value={values?.documentName}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'documentName',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="w-full flex flex-col space-x-1 mt-6">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Description'}
                                                name={'description'}
                                                id={'description'}
                                                placeholder={'Description'}
                                                value={values?.description}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'description',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                disabled={modeView}
                                            />
                                        </div>
                                        {authorizationData?.authorizationData
                                            ?.fileName ? (
                                            <>
                                                <div className="deleteAndDownload flex items-center justify-between mt-5">
                                                    <span className="text-sm font-bold text-zinc-700 font-[lato] flex">
                                                        File Uploaded
                                                    </span>
                                                    <span className="flex space-x-8 items-end">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                downloadFile.DownloadFile(
                                                                    {
                                                                        id: authorizationData
                                                                            ?.authorizationData
                                                                            ?.id,
                                                                        name: authorizationData
                                                                            ?.authorizationData
                                                                            ?.fileName,
                                                                    }
                                                                );
                                                            }}
                                                            disabled={modeView}
                                                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 disabled:pointer-events-none"
                                                        >
                                                            <img
                                                                className="mr-1"
                                                                src={download}
                                                            />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setOpenConfirmationModalForDelete(
                                                                    true
                                                                );
                                                                setDeleteId(
                                                                    authorizationData
                                                                        ?.authorizationData
                                                                        ?.id
                                                                );
                                                            }}
                                                            disabled={modeView}
                                                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 disabled:pointer-events-none"
                                                        >
                                                            <img
                                                                className="mr-1"
                                                                src={deleteIcon}
                                                            />
                                                        </button>
                                                    </span>
                                                </div>
                                                <div className="flex space-x-3 items-end rounded-lg shadow-md p-5 mt-3 ">
                                                    <span className="flex">
                                                        <img
                                                            src={document}
                                                            className="w-[30px] mr-2"
                                                        />
                                                        {
                                                            authorizationData
                                                                ?.authorizationData
                                                                ?.fileName
                                                        }
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {error && (
                                                    <span className="mt-2 flex text-xs text-red-500">
                                                        <img
                                                            className="mr-2"
                                                            src={redIcon}
                                                            alt="redIcon"
                                                        />
                                                        File size exceeds the
                                                        maximum limit of 15 MB.
                                                    </span>
                                                )}
                                                <div className="mb-6 mt-7 border flex justify-center items-center border-gray-500 h-[6rem] border-dashed">
                                                    <label className="text-xl font-light text-gray-700">
                                                        {stateImg?.file?.name
                                                            ?.length ? (
                                                            <div className="flex space-x-3 items-end">
                                                                <img
                                                                    src={
                                                                        document
                                                                    }
                                                                    className="w-[30px] mr-2"
                                                                />
                                                                {
                                                                    stateImg
                                                                        ?.file
                                                                        ?.name
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div className="flex  justify-center items-center space-x-3">
                                                                <input
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        const file =
                                                                            e
                                                                                ?.target
                                                                                ?.files?.[0];
                                                                        const maxSizeInBytes =
                                                                            15 *
                                                                            1024 *
                                                                            1024; // 15 MB in bytes
                                                                        if (
                                                                            file &&
                                                                            file.size >
                                                                                maxSizeInBytes
                                                                        ) {
                                                                            setError(
                                                                                true
                                                                            );
                                                                            // alert('File size exceeds the maximum limit of 15 MB.');
                                                                            e.target.value =
                                                                                ''; // Reset the file input
                                                                            return;
                                                                        } else {
                                                                            setStateImg(
                                                                                {
                                                                                    file: e
                                                                                        ?.target
                                                                                        ?.files?.[0],
                                                                                }
                                                                            );
                                                                        }
                                                                        setStateImg(
                                                                            {
                                                                                file: e
                                                                                    ?.target
                                                                                    ?.files?.[0],
                                                                            }
                                                                        );
                                                                    }}
                                                                    type="file"
                                                                    id="upload-file"
                                                                    className="hidden ml-2"
                                                                    accept=".pdf"
                                                                />
                                                                <span className="flex flex-col items-center">
                                                                    <span className="flex">
                                                                        <img
                                                                            className="mr-2"
                                                                            src={
                                                                                upload
                                                                            }
                                                                            alt="upload"
                                                                        />
                                                                        Upload
                                                                        your
                                                                        document
                                                                        here
                                                                    </span>
                                                                    <span className="text-xs cursor-pointer">
                                                                        File
                                                                        must be
                                                                        under 15
                                                                        MB.
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex flex-col space-x-1 mt-6">
                                            <Field
                                                label={'Payor of Authorization'}
                                                id="payor"
                                                name="payor"
                                                autoComplete="off"
                                                isRequired={true}
                                                isSearchable={true}
                                                value={values?.payor}
                                                component={Select1}
                                                isDisabled={modeView}
                                                options={getPayorsData()}
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    setFieldValue(
                                                        'payor',
                                                        selectedOption
                                                    );
                                                }}
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                            ></Field>
                                        </div>
                                        <div className="flex-col my-6">
                                            <div className="flex space-x-4 mt-2">
                                                <div className="flex flex-col space-y-1 mr-5">
                                                    <label className="text-sm font-bold text-zinc-700 font-[lato]">
                                                        Valid From{' '}
                                                        <span className="text-red-500 ml-1">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="validFrom"
                                                        autoComplete="off"
                                                        isRequired={true}
                                                        value={{
                                                            // startDate:
                                                            //     values?.validFrom,
                                                            startDate:
                                                                parseDate(
                                                                    values
                                                                        ?.validFrom
                                                                        ?.startDate
                                                                ),
                                                        }}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Datepicker
                                                                id="validFrom"
                                                                {...field}
                                                                selected={
                                                                    field.value
                                                                }
                                                                disabled={
                                                                    modeView
                                                                }
                                                                useRange={false}
                                                                asSingle={true}
                                                                inputClassName="py-[0.5rem] px-3 w-[15rem] border-1 border-[#E5E5E5]-800 rounded-md text-sm "
                                                                onChange={(
                                                                    date: any
                                                                ) => {
                                                                    if (
                                                                        new Date(
                                                                            authorizationData?.authorizationData?.authorizationStartDate
                                                                        ) >
                                                                            new Date(
                                                                                date?.startDate
                                                                            ) &&
                                                                        date?.startDate
                                                                    ) {
                                                                        setFromError(
                                                                            true
                                                                        );
                                                                    } else {
                                                                        setFromError(
                                                                            false
                                                                        );
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            date
                                                                        );
                                                                    }
                                                                }}
                                                                popoverDirection="up"
                                                            />
                                                        )}
                                                    </Field>
                                                    {fromError && (
                                                        <label className="font-medium text-sm text-red-700">
                                                            {
                                                                'Cannot be before global start date'
                                                            }
                                                        </label>
                                                    )}
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <label className="text-sm font-bold text-zinc-700 font-[lato]">
                                                        Valid To
                                                        <span className="text-red-500 ml-1">
                                                            *
                                                        </span>
                                                    </label>
                                                    <Field
                                                        name="validTo"
                                                        autoComplete="off"
                                                        isRequired={true}
                                                        value={{
                                                            // startDate:
                                                            //     values?.validTo,
                                                            startDate:
                                                                parseDate(
                                                                    values
                                                                        ?.validTo
                                                                        ?.startDate
                                                                ),
                                                        }}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Datepicker
                                                                id="validTo"
                                                                {...field}
                                                                selected={
                                                                    field.value
                                                                }
                                                                disabled={
                                                                    modeView
                                                                }
                                                                useRange={false}
                                                                asSingle={true}
                                                                inputClassName="py-[0.5rem] px-3 w-[15rem] border-1 border-[#E5E5E5]-800 rounded-md text-sm "
                                                                onChange={(
                                                                    date: any
                                                                ) => {
                                                                    if (
                                                                        new Date(
                                                                            authorizationData?.authorizationData?.authorizationEndDate
                                                                        ) >
                                                                            new Date(
                                                                                date?.startDate
                                                                            ) &&
                                                                        date?.startDate
                                                                    ) {
                                                                        setToError(
                                                                            true
                                                                        );
                                                                    } else {
                                                                        setToError(
                                                                            false
                                                                        );
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            date
                                                                        );
                                                                    }
                                                                }}
                                                                minDate={
                                                                    values
                                                                        ?.validFrom
                                                                        ?.startDate
                                                                }
                                                                popoverDirection="up"
                                                            />
                                                        )}
                                                    </Field>
                                                    {toError && (
                                                        <label className="font-medium text-sm text-red-700">
                                                            {
                                                                'Cannot be before global end date'
                                                            }
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="select flex flex-col mb-6">
                                            <label className="text-sm font-bold text-zinc-700 font-[lato]">
                                                Billing Code
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>
                                            <Select
                                                isSearchable={true}
                                                primaryColor="indigo"
                                                placeholder="Select"
                                                onChange={handleChangeSelect}
                                                value={selectedOptions}
                                                isMultiple={true}
                                                options={getAuthCodesData()}
                                                isDisabled={modeView}
                                            />
                                        </div>
                                        <div className="w-full space-x-1 mt-6">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={'Primary Authorization'}
                                                name={'primaryAuthorization'}
                                                id={'primaryAuthorization'}
                                                placeholder={'Authorization'}
                                                value={
                                                    values?.primaryAuthorization
                                                }
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="w-full space-x-1 mt-6">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                component={Input}
                                                label={
                                                    'Secondary Authorization'
                                                }
                                                name={'secondaryAuthorization'}
                                                id={'secondaryAuthorization'}
                                                placeholder={'Authorization'}
                                                value={
                                                    values?.secondaryAuthorization
                                                }
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                disabled={modeView}
                                            />
                                        </div>
                                        {desiredTherapy?.map(
                                            (item: any, index: any) => {
                                                return (
                                                    <div
                                                        key={
                                                            item
                                                                .organizationServicesId
                                                                ?.name
                                                        }
                                                        className="my-4 py-5 rounded-lg shadow-[0_3px_8px_rgb(0,0,0,0.2)]"
                                                    >
                                                        <h1 className="font-[lato] text-md font-bold mx-3 mt-2">
                                                            {
                                                                item
                                                                    ?.organizationServicesId
                                                                    ?.name
                                                            }
                                                        </h1>
                                                        <div className="ml-3 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                                        <div className="flex">
                                                            <div className="therapyData select w-[45rem] py-2 mt-4 mx-4">
                                                                <Field
                                                                    placeholder="Select..."
                                                                    onChange={(
                                                                        e: any
                                                                    ) =>
                                                                        handleChange(
                                                                            e
                                                                        )
                                                                    }
                                                                    label="Desired Services"
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        true
                                                                    }
                                                                    id={`therapyData.${index}.primaryDiagnosisCode`}
                                                                    name={`therapyData.${index}.primaryDiagnosisCode`}
                                                                    className="border-b-2 border-gray-200 w-full bg-white rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                                    as="select"
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <SelectComponent
                                                                            isMultiple={
                                                                                false
                                                                            }
                                                                            isRequired={
                                                                                true
                                                                            }
                                                                            isSearchable={
                                                                                false
                                                                            }
                                                                            label={
                                                                                'Primary Diagnosis Code'
                                                                            }
                                                                            isDisabled={
                                                                                modeView
                                                                            }
                                                                            form={{
                                                                                touched,
                                                                                errors,
                                                                            }}
                                                                            options={diagnosisCodes?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: `${data?.code} : ${data?.name}`,
                                                                                    value: data?.id,
                                                                                })
                                                                            )}
                                                                            field={{
                                                                                value: field.value,
                                                                                name: field.name,
                                                                                onChange:
                                                                                    (
                                                                                        value
                                                                                    ) => {
                                                                                        form.setFieldValue(
                                                                                            `therapyData.${index}.primaryDiagnosisCode`,
                                                                                            value
                                                                                        );
                                                                                        setTimeout(
                                                                                            () => {
                                                                                                form.setFieldError(
                                                                                                    `therapyData.${index}.primaryDiagnosisCode`,
                                                                                                    ''
                                                                                                );
                                                                                            },
                                                                                            0
                                                                                        );
                                                                                    },
                                                                            }}
                                                                            handleBlur={
                                                                                setFieldTouched
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </div>
                                                            <div className="therapyData select w-[45rem] py-2 mt-4 mx-4">
                                                                <Field
                                                                    placeholder="Select..."
                                                                    onChange={(
                                                                        e: any
                                                                    ) =>
                                                                        handleChange(
                                                                            e
                                                                        )
                                                                    }
                                                                    label="Desired Services"
                                                                    autoComplete="off"
                                                                    id={`therapyData.${index}.secondaryDiagnosisCodes`}
                                                                    name={`therapyData.${index}.secondaryDiagnosisCodes`}
                                                                    className="border-b-2 border-gray-200 w-full bg-white rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                                    as="select"
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <SelectComponent
                                                                            isMultiple={
                                                                                true
                                                                            }
                                                                            isDisabled={
                                                                                modeView
                                                                            }
                                                                            isSearchable={
                                                                                false
                                                                            }
                                                                            label={
                                                                                'Secondary Diagnosis Code'
                                                                            }
                                                                            form={{
                                                                                touched,
                                                                                errors,
                                                                            }}
                                                                            options={diagnosisCodes?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: `${data?.code} : ${data?.name}`,
                                                                                    value: data?.id,
                                                                                })
                                                                            )}
                                                                            field={{
                                                                                value: field.value,
                                                                                name: field.name,
                                                                                onChange:
                                                                                    (
                                                                                        value
                                                                                    ) => {
                                                                                        form.setFieldValue(
                                                                                            `therapyData.${index}.secondaryDiagnosisCodes`,
                                                                                            value
                                                                                        );
                                                                                        setTimeout(
                                                                                            () => {
                                                                                                form.setFieldError(
                                                                                                    `therapyData.${index}.secondaryDiagnosisCodes`,
                                                                                                    ''
                                                                                                );
                                                                                            },
                                                                                            0
                                                                                        );
                                                                                    },
                                                                            }}
                                                                            handleBlur={
                                                                                setFieldTouched
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                        <h1 className="font-[lato]  font-bold mt-6">
                                            Frequency & Amount
                                        </h1>
                                        <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                        <div className="flex flex-col space-x-1 mt-6">
                                            <Field
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                                label={' Frequency'}
                                                id="frequency"
                                                name="frequency"
                                                autoComplete="off"
                                                isRequired={false}
                                                isSearchable={true}
                                                component={Select1}
                                                isDisabled={modeView}
                                                value={values?.frequency}
                                                options={frequencyData()}
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    setFieldValue(
                                                        'frequency',
                                                        selectedOption[0]
                                                    );
                                                }}
                                            ></Field>
                                        </div>
                                        <div className="flex ">
                                            <div className="amount w-[25rem] bg-zinc-100 border border-zinc-400 rounded-md my-6">
                                                <h1 className="font-[lato]  font-bold mt-2 mx-3">
                                                    Amount
                                                </h1>
                                                <div className="mx-3 bg-gradient-to-r from-zinc-400 from-0% to-transparent h-[0.1rem]"></div>
                                                <div className="flex mx-4 my-3">
                                                    <Field
                                                        className="border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                        component={Input}
                                                        disabled={modeView}
                                                        label={`Amount`}
                                                        name={`amount`}
                                                        id={`amount`}
                                                        placeholder="Enter"
                                                        value={values?.amount}
                                                        onChange={(e: any) =>
                                                            handleNumber(
                                                                e,
                                                                handleChange
                                                            )
                                                        }
                                                    />
                                                    <Field
                                                        className={`border-zinc-400 rounded-sm ${values?.isAmountOverBillingAllowed ? '' : 'bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                        type="checkbox"
                                                        name={`isAmountOverBillingAllowed`}
                                                        id={`isAmountOverBillingAllowed`}
                                                        checked={
                                                            values?.isAmountOverBillingAllowed
                                                        }
                                                        onChange={handleChange}
                                                        disabled={modeView}
                                                    />
                                                    <label
                                                        htmlFor=""
                                                        className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                    >
                                                        Allow Overbilling
                                                    </label>
                                                </div>
                                                <div className="flex mx-4 my-3">
                                                    <Field
                                                        className="border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                        component={Input}
                                                        label={`Hours`}
                                                        name={`hour`}
                                                        id={`hour`}
                                                        placeholder="Enter"
                                                        value={values?.hour}
                                                        onChange={(e: any) =>
                                                            handleNumber(
                                                                e,
                                                                handleChange
                                                            )
                                                        }
                                                        disabled={modeView}
                                                    />
                                                    <Field
                                                        className={`border-zinc-400 rounded-sm ${values?.isHourOverBillingAllowed ? '' : 'bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                        type="checkbox"
                                                        name={`isHourOverBillingAllowed`}
                                                        id={`isHourOverBillingAllowed`}
                                                        checked={
                                                            values?.isHourOverBillingAllowed
                                                        }
                                                        onChange={handleChange}
                                                        disabled={modeView}
                                                    />
                                                    <label
                                                        htmlFor=""
                                                        className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                    >
                                                        Allow Overbilling
                                                    </label>
                                                </div>
                                                <div className="flex mx-4 my-3">
                                                    <Field
                                                        className="border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                        component={Input}
                                                        label={`Units`}
                                                        name={`units`}
                                                        id={`units`}
                                                        placeholder="Enter"
                                                        disabled={modeView}
                                                        value={values?.units}
                                                        onChange={(e: any) =>
                                                            handleNumber(
                                                                e,
                                                                handleChange
                                                            )
                                                        }
                                                    />
                                                    <Field
                                                        className={`border-zinc-400 rounded-sm ${values?.isUnitOverBillingAllowed ? '' : 'bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                        type="checkbox"
                                                        name={`isUnitOverBillingAllowed`}
                                                        id={`isUnitOverBillingAllowed`}
                                                        disabled={modeView}
                                                        checked={
                                                            values?.isUnitOverBillingAllowed
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    <label
                                                        htmlFor=""
                                                        className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                    >
                                                        Allow Overbilling
                                                    </label>
                                                </div>
                                                <div className="flex mx-4 my-3">
                                                    <Field
                                                        className="border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                        label="Visits"
                                                        name={`visits`}
                                                        id={`visits`}
                                                        placeholder="Enter"
                                                        value={values?.visits}
                                                        onChange={(e: any) =>
                                                            handleNumber(
                                                                e,
                                                                handleChange
                                                            )
                                                        }
                                                        component={Input}
                                                        disabled={modeView}
                                                    />
                                                    <Field
                                                        className={`border-zinc-400 rounded-sm ${values?.isVisitOverBillingAllowed ? '' : 'bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                        type="checkbox"
                                                        name={`isVisitOverBillingAllowed`}
                                                        id={`isVisitOverBillingAllowed`}
                                                        checked={
                                                            values?.isVisitOverBillingAllowed
                                                        }
                                                        onChange={handleChange}
                                                        disabled={modeView}
                                                    />
                                                    <label
                                                        htmlFor=""
                                                        className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                    >
                                                        Allow Overbilling
                                                    </label>
                                                </div>
                                            </div>
                                            {values?.frequency ===
                                            'Once' ? null : (
                                                <div className="totalAmount w-[25rem] bg-zinc-100 border border-zinc-400 rounded-md my-6 ml-10">
                                                    <h1 className="font-[lato]  font-bold mt-2 mx-3">
                                                        Total Group Amount
                                                    </h1>
                                                    <div className=" mx-3 bg-gradient-to-r from-zinc-400 from-0% to-transparent h-[0.1rem]"></div>
                                                    <div className="flex mx-4 my-3">
                                                        <Field
                                                            className="border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                            component={Input}
                                                            label={`Total Amount`}
                                                            name={`totalAmount`}
                                                            id={`totalAmount`}
                                                            placeholder="Enter"
                                                            value={
                                                                values?.totalAmount
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                handleNumber(
                                                                    e,
                                                                    handleChange
                                                                )
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <Field
                                                            className={`border-zinc-400 rounded-sm ${values?.isTotalAmountOverBillingAllowed ? '' : 'bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                            type="checkbox"
                                                            name={`isTotalAmountOverBillingAllowed`}
                                                            id={`isTotalAmountOverBillingAllowed`}
                                                            checked={
                                                                values?.isTotalAmountOverBillingAllowed
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <label
                                                            htmlFor=""
                                                            className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                        >
                                                            Allow Overbilling
                                                        </label>
                                                    </div>
                                                    <div className="flex mx-4 my-3">
                                                        <Field
                                                            className="border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                            component={Input}
                                                            label={`Total Hours`}
                                                            name={`totalHours`}
                                                            id={`totalHours`}
                                                            placeholder="Enter"
                                                            value={
                                                                values?.totalHours
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                handleNumber(
                                                                    e,
                                                                    handleChange
                                                                )
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <Field
                                                            className={`border-zinc-400 rounded- ${values?.isTotalHourOverBillingAllowed ? '' : 'bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                            type="checkbox"
                                                            name={`isTotalHourOverBillingAllowed`}
                                                            id={`isTotalHourOverBillingAllowed`}
                                                            checked={
                                                                values?.isTotalHourOverBillingAllowed
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <label
                                                            htmlFor=""
                                                            className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                        >
                                                            Allow Overbilling
                                                        </label>
                                                    </div>
                                                    <div className="flex mx-4 my-3">
                                                        <Field
                                                            className="border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                            component={Input}
                                                            label={`Total Units`}
                                                            name={`totalUnits`}
                                                            id={`totalUnits`}
                                                            placeholder="Enter"
                                                            value={
                                                                values?.totalUnits
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                handleNumber(
                                                                    e,
                                                                    handleChange
                                                                )
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <Field
                                                            className={`border-zinc-400 rounded-sm ${values?.isTotalUnitOverBillingAllowed ? '' : ' bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                            type="checkbox"
                                                            name={`isTotalUnitOverBillingAllowed`}
                                                            id={`isTotalUnitOverBillingAllowed`}
                                                            checked={
                                                                values?.isTotalUnitOverBillingAllowed
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <label
                                                            htmlFor=""
                                                            className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                        >
                                                            Allow Overbilling
                                                        </label>
                                                    </div>
                                                    <div className="flex mx-4 my-3">
                                                        <Field
                                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 bg-zinc-100 rounded-none focus:ring-transparent mb-4 px-0"
                                                            component={Input}
                                                            label={`Total Visits`}
                                                            name={`totalVisits`}
                                                            id={`totalVisits`}
                                                            placeholder="Enter"
                                                            value={
                                                                values?.totalVisits
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                handleNumber(
                                                                    e,
                                                                    handleChange
                                                                )
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <Field
                                                            className={`border-zinc-400 rounded-sm ${values?.isTotalVisitOverBillingAllowed ? '' : ' bg-zinc-100'}  focus:ring-transparent mt-7 ml-6`}
                                                            type="checkbox"
                                                            name={`isTotalVisitOverBillingAllowed`}
                                                            id={`isTotalVisitOverBillingAllowed`}
                                                            checked={
                                                                values?.isTotalVisitOverBillingAllowed
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            disabled={modeView}
                                                        />
                                                        <label
                                                            htmlFor=""
                                                            className="text-sm text-zinc-500 font-[lato] mt-7 ml-2"
                                                        >
                                                            Allow Overbilling
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {values?.frequency === 'Once' ? null : (
                                            <h1
                                                onClick={() =>
                                                    calculateGroupTotals(
                                                        values,
                                                        setFieldValue
                                                    )
                                                }
                                                className=" float-right text-sm text-[#48ABCA] font-semibold font-[lato] mr-28 cursor-pointer"
                                            >
                                                Calculate Group Amount Totals
                                            </h1>
                                        )}
                                        <h1 className="font-[lato]  font-bold mt-6">
                                            Contacts
                                        </h1>
                                        <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                        <div className="flex">
                                            <div className="PrimaryContact w-[25rem] my-5">
                                                <h1 className="font-[lato]  font-bold mt-2 ">
                                                    Primary Contacts
                                                </h1>
                                                <div className="bg-gradient-to-r from-zinc-400 from-0% to-transparent h-[0.1rem]"></div>
                                                <div className="flex flex-col space-x-1 mt-6">
                                                    <Field
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                        placeholder="select"
                                                        label={
                                                            'Provider/Supplier'
                                                        }
                                                        id="primaryProvider"
                                                        name="primaryProvider"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        isSearchable={true}
                                                        component={Select1}
                                                        value={
                                                            values?.primaryProvider
                                                        }
                                                        options={employeeData()}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            setFieldValue(
                                                                'primaryProvider',
                                                                selectedOption
                                                            );
                                                        }}
                                                        isDisabled={modeView}
                                                    ></Field>
                                                </div>
                                                <div className="flex flex-col space-x-1 mt-6">
                                                    <Field
                                                        placeholder="select"
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                        label={'Billing'}
                                                        id="primaryBilling"
                                                        name="primaryBilling"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        isSearchable={true}
                                                        component={Select1}
                                                        value={
                                                            values?.primaryBilling
                                                        }
                                                        options={employeeData()}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            setFieldValue(
                                                                'primaryBilling',
                                                                selectedOption
                                                            );
                                                        }}
                                                        isDisabled={modeView}
                                                    ></Field>
                                                </div>
                                                <div className="flex flex-col space-x-1 mt-6">
                                                    <Field
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                        label={' Facility'}
                                                        placeholder="select"
                                                        id="primaryFacility"
                                                        name="primaryFacility"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        isSearchable={true}
                                                        component={Select1}
                                                        value={
                                                            values?.primaryFacility
                                                        }
                                                        options={employeeData()}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            setFieldValue(
                                                                'primaryFacility',
                                                                selectedOption
                                                            );
                                                        }}
                                                        isDisabled={modeView}
                                                    ></Field>
                                                </div>
                                            </div>
                                            <div className="PrimaryContact w-[25rem] ml-14 my-5">
                                                <h1 className="font-[lato]  font-bold mt-2">
                                                    Secondary Contacts
                                                </h1>
                                                <div className=" bg-gradient-to-r from-zinc-400 from-0% to-transparent h-[0.1rem]"></div>
                                                <div className="flex flex-col space-x-1 mt-6">
                                                    <Field
                                                        placeholder="select"
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                        label={
                                                            'Provider/Supplier'
                                                        }
                                                        id="secondaryProvider"
                                                        name="secondaryProvider"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        isSearchable={true}
                                                        component={Select1}
                                                        value={
                                                            values?.secondaryProvider
                                                        }
                                                        options={employeeData()}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            setFieldValue(
                                                                'secondaryProvider',
                                                                selectedOption
                                                            );
                                                        }}
                                                        isDisabled={modeView}
                                                    ></Field>
                                                </div>
                                                <div className="flex flex-col space-x-1 mt-6">
                                                    <Field
                                                        placeholder="select"
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                        label={'Billing'}
                                                        id="secondaryBilling"
                                                        name="secondaryBilling"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        isSearchable={true}
                                                        component={Select1}
                                                        value={
                                                            values?.secondaryBilling
                                                        }
                                                        options={employeeData()}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            setFieldValue(
                                                                'secondaryBilling',
                                                                selectedOption
                                                            );
                                                        }}
                                                        isDisabled={modeView}
                                                    ></Field>
                                                </div>
                                                <div className="flex flex-col space-x-1 mt-6">
                                                    <Field
                                                        placeholder="select"
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                        label={'Facility'}
                                                        id="secondaryFacility"
                                                        name="secondaryFacility"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        isSearchable={true}
                                                        component={Select1}
                                                        value={
                                                            values?.secondaryFacility
                                                        }
                                                        options={employeeData()}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            setFieldValue(
                                                                'secondaryFacility',
                                                                selectedOption
                                                            );
                                                        }}
                                                        isDisabled={modeView}
                                                    ></Field>
                                                </div>
                                            </div>
                                        </div>
                                        <AddAuthorizationActionFooter
                                            onClose={() => {
                                                onClose();
                                                dispatch(
                                                    savingAuthorizationData([])
                                                );
                                            }}
                                            handleSubmit={handleSubmit}
                                            isDisabled={
                                                handleDisabled(values) ||
                                                modeView
                                            }
                                        />
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </ModalBody>
            </Modal>
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Document'}
                    title={'Are you sure you want to delete this document?'}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={deleteAuthorizationData}
                />
            )}
            {isDeleted && (
                <Notifications
                    open={true}
                    title={'Document deleted successfully.'}
                    success={true}
                    onClose={closeNotification}
                />
            )}
        </>
    );
}
