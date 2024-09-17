/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import add from '../../assets/img/addLocation.svg';
import removeIcon from '../../assets/img/removeIcon.svg';
import Select from '../Generics/Select';
import { useSelector, useDispatch } from 'react-redux';
import { InsuranceDetail } from '../../types/SentForInfo.types';
import DesiredServicesForm from './desiredService';
import FileUploadField from './FileUploadField';
import { useNavigate, useParams } from 'react-router-dom';
import { clientIntakeDetailsById } from '../../redux/slice/ClientIntakeDetails/clientIntakeDetails';
import {
    getClientInsuranceCall,
    getClientServicesCall,
} from '../../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
import { State } from 'country-state-city';
import { FormValues } from '../../types/intakeInterface';
import ISO6391 from 'iso-639-1';
import { InputField } from './InputField';
import { validationSchema } from './Validation';
import SentForMoreInforSaveApi from '../../api/services/ClientIntake/SentForMoreInforSaveApi.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { ROUTES, URLS } from '../../constants';
import { savingTabData } from '../../redux/slice/MineSlice/getMine';
import apiClient from '../../api/client';
import OpModal from './OpModal';
import Button from '../Generics/Button';
import Circle from './Circle';
interface FileObject {
    name: string;
    file: File | null;
}
const IntakeForm = (): JSX.Element => {
    const dispatch = useDispatch<any>();
    const params = useParams<{ id: string }>();
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});
    const [filesArr, setFilesArr] = useState<FileObject[]>([]);
    const [fileErrors, setFileErrors] = useState<boolean[]>([]);
    const allState: any = State?.getStatesOfCountry('US');
    const [services, setServices] = useState<string[]>([]);
    const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitBtn, setSubmitBtn] = useState(false);
    const Language = ISO6391.getAllNames();
    const isSpecificViewPresent = window.location.href.includes('view');
    console.log(isSpecificViewPresent, 'isSpecificViewPresent');
    const clientInsuranceDetails = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall?.value?.data
    );
    const intakeDataById = useSelector(
        (state: any) => state.clientIntakeDetails.clientIntakeDetailsById
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    useEffect(() => {
        const newFiles: { [key: string]: File | null } = {};
        const newFilesArr: { name: string; file: File }[] = [];

        intakeDataById?.intakeFiles?.forEach((item: any) => {
            // Create a dummy file object for the example
            const dummyFile = new File([item.displayName], item.displayName, {
                type: 'application/pdf',
            });

            newFiles[item.name] = dummyFile;

            newFilesArr.push({ name: item.name, file: dummyFile });
        });

        setFiles(newFiles);
        setFilesArr(newFilesArr);
    }, [intakeDataById?.intakeFiles]);
    let parsedData: Array<any> = [];
    if (intakeDataById?.userChildren) {
        try {
            parsedData = JSON.parse(intakeDataById.userChildren);
        } catch (error) {}
    }
    parsedData = Array.isArray(parsedData) ? parsedData : [];
    const minimumChildren = parsedData.length; // Adjust as needed
    const additionalChildrenCount = Math.max(
        0,
        minimumChildren - parsedData.length
    );
    const navigate = useNavigate();
    const defaultChildren = Array.from(
        { length: additionalChildrenCount },
        () => ({
            name: '',
            dateOfBirth: '',
            asdDiagnosis: '',
            dateOfASDDiagnosis: '',
            currentChallenges: '',
            gender: '',
            diagnosisGivenBy: '',
            otherDiagnosis: '',
            locationOfPriorABATherapy: '',
            dateOfLastEvaluation: '',
            locationOfPriorSpeechTherapy: '',
            SpeechTherapydateOfLastEvaluation: '',
            locationOfPriorOccupationalTherapy: '',
            OccupationalTherapydateOfLastEvaluation: '',
            schoolHours: '',
            availabilityForEvaluation: '',
            primaryInsuranceProvider: '',
            secondaryInsuranceProvider: [],
            subscriberName: '',
            subscriberDateofBirth: '',
            subscriberID: '',
            groupNumber: '',
        })
    );
    const userChildren = parsedData.map((child: any) => ({
        name: child?.name,
        dateOfBirth: child.dateOfBirth || '',
        desiredServices: child?.desiredServices || [],
        asdDiagnosis: child.asdDiagnosis || '',
        diagnosisGivenBy: child?.diagnosisGivenBy || '',
        dateOfASDDiagnosis: child.dateOfASDDiagnosis || '',
        currentChallenges: child.currentChallenges || '',
        gender: child.gender || '',
        locationOfPriorABATherapy: child.locationOfPriorABATherapy || '',
        otherDiagnosis: child.otherDiagnosis || '',
        dateOfLastEvaluation: child.dateOfLastEvaluation || '',
        locationOfPriorSpeechTherapy: child.locationOfPriorSpeechTherapy || '',
        SpeechTherapydateOfLastEvaluation:
            child.SpeechTherapydateOfLastEvaluation || '',
        locationOfPriorOccupationalTherapy:
            child.locationOfPriorOccupationalTherapy || '',
        OccupationalTherapydateOfLastEvaluation:
            child.OccupationalTherapydateOfLastEvaluation || '',
        schoolHours: child.schoolHours || '',
        availabilityForEvaluation: child.availabilityForEvaluation || '',
        primaryInsuranceProvider: child.primaryInsuranceProvider || '',
        secondaryInsuranceProvider: child.secondaryInsuranceProvider || '',
        subscriberName: child.subscriberName || '',
        subscriberDateofBirth: child.subscriberDateofBirth || '',
        subscriberID: child.subscriberID || '',
        groupNumber: child.groupNumber || '',
        ABAdateOfLastEvaluation: child.ABAdateOfLastEvaluation || '',
        PhysicalTherapydateOfLastEvaluation:
            child.PhysicalTherapydateOfLastEvaluation || '',
        CounsellingOfPriorTherapy: child.CounsellingOfPriorTherapy || '',
        CounsellingdateOfLastEvaluation:
            child.CounsellingdateOfLastEvaluation || '',
    }));

    const allChildren: any = [...userChildren, ...defaultChildren];
    const initialValues: FormValues = {
        parentFullname: intakeDataById?.parentFullname || '',
        email: intakeDataById?.email || '',
        cellPhone: intakeDataById?.phoneNumber || '+1',
        homePhone: intakeDataById?.homePhone || '+1',
        primaryLanguage: intakeDataById?.primaryLanguage || '',
        relationWithChild: intakeDataById?.relationWithChild || null,
        dateOfBirth: intakeDataById?.dateOfBirth || '',
        addressLine1: intakeDataById?.addressLine1 || '',
        addressLine2: intakeDataById?.addressLine2 || '',
        city: intakeDataById?.city || '',
        state: intakeDataById?.state || '',
        zipCode: intakeDataById?.zipCode || '',
        userChildren: allChildren,
    };
    const fd = new FormData();
    const saveFile = async () => {
        // Function to upload a single file
        const uploadSingleFile = async (fileObj: {
            name: string;
            file: File | null;
        }) => {
            // Create a new FormData object for each file
            const fd1 = new FormData();
            fd1.append('createdBy', userPermission?.value?.data?.userId || '2');
            fd1.append(
                'organizationId',
                userPermission?.value?.data?.orgId || '1'
            );
            fd1.append('intakeId', params?.id || '1');
            fd1.append('type', fileObj.name); // Use name as type
            if (fileObj.file) {
                fd1.append('file', fileObj.file); // Append the file
            } else {
                fd1.append('file', ''); // Handle cases where file might be null
            }

            try {
                await apiClient.post(URLS.saveFile, fd1, {
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            console.log(
                                `Uploading ${fileObj.name}: ${Math.round(
                                    (progressEvent.loaded /
                                        progressEvent.total) *
                                        100
                                )}%`
                            );
                        }
                    },
                });
            } catch (error) {
                setLoading(false);
                console.error(`Failed to upload ${fileObj.name}:`, error);
                throw error; // Propagate the error to halt further processing
            }
        };

        try {
            for (const fileObj of filesArr) {
                if (fileObj.file) {
                    // Ensure there is a file to upload
                    await uploadSingleFile(fileObj); // Await the API call before moving to the next file
                }
            }

            // Notify success after all files have been uploaded
            dispatch(
                openNotification({
                    success: true,
                    title: submitBtn
                        ? 'Intake form submitted successfully.'
                        : 'Intake details saved successfully.',
                    description: '',
                })
            );
            navigate(ROUTES.ClientIntakeDetailsPage);
            dispatch(savingTabData({ tab: 'Sent for Information' }));
            setSubmitBtn(false);
        } catch (error) {
            // Handle any error that occurred during file uploads
            setLoading(false);
            console.error('Error uploading files:', error);
            dispatch(
                openNotification({
                    success: false,
                    title: 'Error',
                    description: 'There was an error uploading the files.',
                })
            );
        }
    };

    const handleSaveProgress = async (values: FormValues): Promise<void> => {
        setLoading(true);
        fd.append('createdBy', userPermission?.value?.data?.userId || '2');
        fd.append('organizationId', userPermission?.value?.data?.orgId || '1');
        fd.append('intakeId', params?.id || '1');
        fd.append('type', params?.id || '1');
        fd.append('file', '');
        const payload = {
            data: { ...values, intakeId: params?.id, filesToDelete },
        };
        try {
            const res = await SentForMoreInforSaveApi.SavesentForMoreInfor(
                payload
            ).then(() => {
                saveFile();
            });
            console.log(res);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        // alert('Intake details saved successfully.');
    };
    useEffect(() => {
        console.log(filesArr, '---------Updated filesArr');
    }, [filesArr]);

    const handleFilesChange = (name: string, file: File | null) => {
        setFiles({
            ...files,
            [name]: file,
        });

        setFilesArr((prevFilesArr: any) => {
            const filteredArr = prevFilesArr.filter(
                (item: any) => item.name !== name
            );

            const updatedArr = file
                ? [...filteredArr, { name, file }]
                : filteredArr;
            return updatedArr;
        });
    };

    const handleFileError = (index: number, error: boolean): void => {
        const newFileErrors = [...fileErrors];
        newFileErrors[index] = error;
        setFileErrors(newFileErrors);
    };
    useEffect(() => {
        if (params?.id) {
            dispatch(clientIntakeDetailsById({ id: params.id }));
        }
        dispatch(getClientInsuranceCall({ type: 'MASTER_DATA' }));
        dispatch(getClientServicesCall({ type: 'MASTER_DATA' }));
    }, [dispatch, params.id]);
    const handleCancel = (): void => {
        navigate(ROUTES.ClientIntakeDetailsPage);
        dispatch(savingTabData({ tab: 'Sent for Information' }));
    };
    return (
        <>
            <h1 className="p-4">Inatake Form</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    handleSaveProgress(values);
                    setSubmitBtn(true);
                }}
            >
                {({
                    values,
                    isSubmitting,
                    setFieldValue,
                    handleChange,
                    setFieldTouched,
                }) => (
                    <Form
                        data-pr-disabled
                        className="grid grid-cols-3  md:grid-cols-3 gap-4 p-4"
                    >
                        <div className="col-span-1">
                            <InputField
                                isRequired={true}
                                name="parentFullname"
                                label="Parent/Guardian's Name"
                                placeholder="Enter Parent Name"
                                onChange={handleChange}
                                value={values.parentFullname}
                            />

                            <InputField
                                name="email"
                                label="Email Address"
                                placeholder="Enter Email"
                                onChange={handleChange}
                                value={values.email}
                            />
                            <InputField
                                name="cellPhone"
                                label="Cell Phone"
                                placeholder="Enter Cell Phone"
                                onChange={handleChange}
                                value={values.cellPhone}
                            />
                        </div>
                        <div className="col-span-1">
                            <Field
                                inputClassName={
                                    'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0 mb-4'
                                }
                                placeholder="Select"
                                onChange={(selectedOption: any) => {
                                    if (
                                        Array.isArray(selectedOption) &&
                                        selectedOption?.length
                                    ) {
                                        setFieldValue(
                                            'relationWithChild',
                                            selectedOption?.[0]
                                        );
                                        setFieldTouched(
                                            'relationWithChild',
                                            true,
                                            false
                                        );
                                    }
                                }}
                                options={[
                                    {
                                        label: 'Father',
                                        value: 'father',
                                    },
                                    {
                                        label: 'Mother',
                                        value: 'mother',
                                    },
                                    {
                                        label: 'Sibling',
                                        value: 'sibling',
                                    },
                                    {
                                        label: 'Other',
                                        value: 'other',
                                    },
                                ]}
                                label="Relationship To Children"
                                component={Select}
                                isDisabled={isSpecificViewPresent}
                                autoComplete="off"
                                isRequired={true}
                                showSearch={true}
                                id="relationWithChild"
                                name="relationWithChild"
                                value={values?.relationWithChild}
                            />

                            <Field
                                inputClassName={
                                    'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0 mb-4'
                                }
                                placeholder="Select"
                                onChange={(selectedOption: any) => {
                                    if (
                                        Array.isArray(selectedOption) &&
                                        selectedOption?.length
                                    ) {
                                        setFieldValue(
                                            'primaryLanguage',
                                            selectedOption?.[0]
                                        );
                                        setFieldTouched(
                                            'primaryLanguage',
                                            true,
                                            false
                                        );
                                    }
                                }}
                                options={
                                    Language.map((data: any) => ({
                                        label: data,
                                        value: data,
                                    })) ?? []
                                }
                                label="Primary Language"
                                component={Select}
                                isDisabled={isSpecificViewPresent}
                                autoComplete="off"
                                isRequired={true}
                                showSearch={true}
                                id="primaryLanguage"
                                name="primaryLanguage"
                                value={values?.primaryLanguage}
                            />

                            <InputField
                                name="homePhone"
                                label="Home Phone"
                                placeholder="Enter Home Phone"
                                onChange={handleChange}
                                value={values.homePhone}
                            />
                        </div>
                        <div className="col-span-1 w-1/2">
                            <InputField
                                name="dateOfBirth"
                                label="Date of Birth"
                                type="date"
                                placeholder="Select Date of Birth"
                                onChange={handleChange}
                                value={values.dateOfBirth}
                            />
                        </div>
                        <div className="col-span-1">
                            <InputField
                                isRequired={true}
                                name="addressLine1"
                                label="Address Line 1"
                                placeholder="Enter Address Line 1"
                                onChange={handleChange}
                                value={values.addressLine1}
                            />

                            <InputField
                                isRequired={true}
                                name="city"
                                label="City"
                                placeholder="Enter City"
                                onChange={handleChange}
                                value={values.city}
                            />

                            <InputField
                                isRequired={true}
                                name="zipCode"
                                label="ZIP Code"
                                placeholder="Enter ZIP Code"
                                onChange={handleChange}
                                value={values.zipCode}
                            />
                        </div>
                        <div className="col-span-1">
                            <InputField
                                name="addressLine2"
                                label="Address Line 2"
                                placeholder="Enter Address Line 2"
                                onChange={handleChange}
                                value={values.addressLine2}
                            />
                            <Field
                                inputClassName={
                                    'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0'
                                }
                                placeholder="Select"
                                onChange={(selectedOption: any) => {
                                    if (
                                        Array.isArray(selectedOption) &&
                                        selectedOption?.length
                                    ) {
                                        setFieldValue(
                                            'state',
                                            selectedOption?.[0]
                                        );
                                        setFieldTouched('state', true, false);
                                    }
                                }}
                                options={
                                    allState.map((data: InsuranceDetail) => ({
                                        label: data?.name,
                                        value: data?.name,
                                    })) ?? []
                                }
                                label="State"
                                component={Select}
                                isDisabled={isSpecificViewPresent}
                                autoComplete="off"
                                isRequired={true}
                                showSearch={true}
                                id="state"
                                name="state"
                                value={values?.state}
                            />
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1">
                            <FileUploadField
                                setFilesToDelete={setFilesToDelete}
                                isRequired={true}
                                name="license"
                                label="Identification"
                                files={files}
                                onFilesChange={handleFilesChange}
                                onError={() => handleFileError(0, false)} // Adjust as needed
                                filesToDelete={filesToDelete}
                            />
                            <FileUploadField
                                setFilesToDelete={setFilesToDelete}
                                isRequired={false}
                                name="understandingYourInsurance"
                                label="Understanding Your Insurance"
                                files={files}
                                onFilesChange={handleFilesChange}
                                onError={() => handleFileError(0, false)} // Adjust as needed
                                filesToDelete={filesToDelete}
                            />
                        </div>
                        <div className="col-span-1">
                            <FileUploadField
                                setFilesToDelete={setFilesToDelete}
                                isRequired={true}
                                name="insuranceCard"
                                label="Insurance Card"
                                files={files}
                                onFilesChange={handleFilesChange}
                                onError={() => handleFileError(0, false)} // Adjust as needed
                                filesToDelete={filesToDelete}
                            />
                        </div>
                        <FieldArray name="userChildren">
                            {({ push, remove }) => (
                                <div className="col-span-2">
                                    <h3 className="text-lg font-medium mb-4">
                                        Children's Information
                                        <div className="mb-6 w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]" />
                                    </h3>
                                    {values.userChildren.map((child, index) => (
                                        <div
                                            key={index}
                                            className="relative border p-4 mb-4 rounded-lg"
                                        >
                                            <div className="absolute top-[-10px] left-[-10px]">
                                                <Circle number={index + 1} />
                                            </div>

                                            <div className="text-md font-semibold mb-2 w-full flex justify-end">
                                                <button
                                                    disabled={
                                                        isSpecificViewPresent
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    className={`text-red-500 flex items-center ${isSpecificViewPresent ? 'opacity-45' : ''}`}
                                                >
                                                    <img
                                                        className="mr-2"
                                                        src={removeIcon}
                                                        alt="removeIcon"
                                                    />
                                                    <span>Remove Child</span>
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 space-x-3">
                                                <InputField
                                                    isRequired={true}
                                                    name={`userChildren.${index}.name`}
                                                    label="Name"
                                                    placeholder="Enter Child's Name"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.name
                                                    }
                                                />
                                                <InputField
                                                    isRequired={true}
                                                    name={`userChildren.${index}.dateOfBirth`}
                                                    label="Date of Birth"
                                                    type="date"
                                                    placeholder="Select Date of Birth"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.dateOfBirth
                                                    }
                                                />
                                            </div>
                                            <div className="mt-4 mb-4">
                                                <Field
                                                    name={`userChildren.${index}.desiredServices`}
                                                >
                                                    {({ field }: any) => (
                                                        <DesiredServicesForm
                                                            selectedServices={
                                                                field.value ||
                                                                services
                                                            }
                                                            setServices={(
                                                                updatedServices: string[]
                                                            ) => {
                                                                setFieldValue(
                                                                    `userChildren.${index}.desiredServices`,
                                                                    updatedServices
                                                                );
                                                            }}
                                                            setFullServices={
                                                                setServices
                                                            }
                                                            fieldName={`userChildren.${index}.desiredServices`}
                                                        />
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="grid grid-cols-2 space-x-3 mb-4">
                                                <Field
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0 mb-2'
                                                    }
                                                    placeholder="Select"
                                                    onChange={(
                                                        selectedOption: any
                                                    ) => {
                                                        if (
                                                            Array.isArray(
                                                                selectedOption
                                                            ) &&
                                                            selectedOption?.length
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.asdDiagnosis`,
                                                                selectedOption?.[0]
                                                            );
                                                            setFieldTouched(
                                                                `userChildren.${index}.asdDiagnosis`,
                                                                true,
                                                                false
                                                            );
                                                        }
                                                    }}
                                                    options={[
                                                        {
                                                            label: 'Yes',
                                                            value: 'Yes',
                                                        },
                                                        {
                                                            label: 'No',
                                                            value: 'No',
                                                        },
                                                    ]}
                                                    label="ASD Diagnosis"
                                                    component={Select}
                                                    isDisabled={
                                                        isSpecificViewPresent
                                                    }
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    showSearch={true}
                                                    id={`userChildren.${index}.asdDiagnosis`}
                                                    name={`userChildren.${index}.asdDiagnosis`}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.asdDiagnosis
                                                    }
                                                />
                                                {values.userChildren[index]
                                                    .asdDiagnosis === 'Yes' && (
                                                    <InputField
                                                        name={`userChildren.${index}.dateOfASDDiagnosis`}
                                                        label="Date of ASD Diagnosis"
                                                        type="date"
                                                        placeholder="Select Date"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.dateOfASDDiagnosis
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 space-x-3">
                                                <InputField
                                                    name={`userChildren.${index}.currentChallenges`}
                                                    label="Current Challenges"
                                                    placeholder="Enter Current Challenges"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.currentChallenges
                                                    }
                                                />
                                                <Field
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0'
                                                    }
                                                    placeholder="Select"
                                                    onChange={(
                                                        selectedOption: any
                                                    ) => {
                                                        if (
                                                            Array.isArray(
                                                                selectedOption
                                                            ) &&
                                                            selectedOption?.length
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.gender`,
                                                                selectedOption?.[0]
                                                            );
                                                            setFieldTouched(
                                                                `userChildren.${index}.gender`,
                                                                true,
                                                                false
                                                            );
                                                        }
                                                    }}
                                                    options={[
                                                        {
                                                            label: 'Select Location',
                                                            value: '',
                                                        },
                                                        {
                                                            label: 'Male',
                                                            value: 'Male',
                                                        },
                                                        {
                                                            label: 'Female',
                                                            value: 'Female',
                                                        },
                                                        {
                                                            label: 'Other',
                                                            value: 'Other',
                                                        },
                                                    ]}
                                                    label="Gender"
                                                    component={Select}
                                                    isDisabled={
                                                        isSpecificViewPresent
                                                    }
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    showSearch={true}
                                                    id={`userChildren.${index}.gender`}
                                                    name={`userChildren.${index}.gender`}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.gender
                                                    }
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 space-x-3 mb-4">
                                                <Field
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0 mb-2'
                                                    }
                                                    placeholder="Select"
                                                    onChange={(
                                                        selectedOption: any
                                                    ) => {
                                                        if (
                                                            Array.isArray(
                                                                selectedOption
                                                            ) &&
                                                            selectedOption?.length
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.otherDiagnosis`,
                                                                selectedOption?.[0]
                                                            );
                                                            setFieldTouched(
                                                                `userChildren.${index}.otherDiagnosis`,
                                                                true,
                                                                false
                                                            );
                                                        }
                                                    }}
                                                    options={[
                                                        {
                                                            label: 'Yes',
                                                            value: 'Yes',
                                                        },
                                                        {
                                                            label: 'No',
                                                            value: 'No',
                                                        },
                                                    ]}
                                                    label="Other Diagnosis"
                                                    component={Select}
                                                    isDisabled={
                                                        isSpecificViewPresent
                                                    }
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    showSearch={true}
                                                    id={`userChildren.${index}.otherDiagnosis`}
                                                    name={`userChildren.${index}.otherDiagnosis`}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.otherDiagnosis
                                                    }
                                                />
                                                <InputField
                                                    name={`userChildren.${index}.diagnosisGivenBy`}
                                                    label="Diagnosis Given By"
                                                    placeholder="Enter Diagnosis Given By"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.diagnosisGivenBy
                                                    }
                                                />
                                            </div>
                                            {child?.desiredServices?.includes(
                                                'Speech Therapy'
                                            ) && (
                                                <div className="grid grid-cols-2 space-x-3">
                                                    <InputField
                                                        name={`userChildren.${index}.locationOfPriorSpeechTherapy`}
                                                        label="Location of Prior Speech Therapy"
                                                        placeholder="Enter Speech Therapy"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.locationOfPriorSpeechTherapy
                                                        }
                                                    />
                                                    <InputField
                                                        type="date"
                                                        name={`userChildren.${index}.SpeechTherapydateOfLastEvaluation`}
                                                        label="Date of Last Evaluation"
                                                        placeholder="Enter Date"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.SpeechTherapydateOfLastEvaluation
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {child?.desiredServices?.includes(
                                                'Applied Behavior Therapy'
                                            ) && (
                                                <div className="grid grid-cols-2 space-x-3">
                                                    <InputField
                                                        name={`userChildren.${index}.locationOfPriorABATherapy`}
                                                        label="Location of Prior location Of Prior ABA Therapy"
                                                        placeholder="Enter location Of Prior ABA Therapy"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.locationOfPriorABATherapy
                                                        }
                                                    />
                                                    <InputField
                                                        type="date"
                                                        name={`userChildren.${index}.ABAdateOfLastEvaluation`}
                                                        label="Date of Last Evaluation"
                                                        placeholder="Enter Date"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.ABAdateOfLastEvaluation
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {child?.desiredServices?.includes(
                                                'Occupational Therapy'
                                            ) && (
                                                <div className="grid grid-cols-2 space-x-3">
                                                    <InputField
                                                        name={`userChildren.${index}.locationOfPriorOccupationalTherapy`}
                                                        label="Location of Prior Occupational Therapy"
                                                        placeholder="Enter Occupational Therapy"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.locationOfPriorOccupationalTherapy
                                                        }
                                                    />
                                                    <InputField
                                                        type="date"
                                                        name={`userChildren.${index}.OccupationalTherapydateOfLastEvaluation`}
                                                        label="Date of Last Evaluation"
                                                        placeholder="Enter Date"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.OccupationalTherapydateOfLastEvaluation
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {child?.desiredServices?.includes(
                                                'Physical Therapy'
                                            ) && (
                                                <div className="grid grid-cols-2 space-x-3">
                                                    <InputField
                                                        name={`userChildren.${index}.locationOfPriorPhysicalTherapy`}
                                                        label="Location of Prior Physical Therapy"
                                                        placeholder="Enter  Physical Therapy"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.locationOfPriorSpeechTherapy
                                                        }
                                                    />
                                                    <InputField
                                                        type="date"
                                                        name={`userChildren.${index}.PhysicalTherapydateOfLastEvaluation`}
                                                        label="Date of Last Evaluation"
                                                        placeholder="Enter Date"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.PhysicalTherapydateOfLastEvaluation
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {child?.desiredServices?.includes(
                                                'Counselling'
                                            ) && (
                                                <div className="grid grid-cols-2 space-x-3">
                                                    <InputField
                                                        name={`userChildren.${index}.CounsellingOfPriorTherapy`}
                                                        label="Location of Counselling Of Prior Therapy"
                                                        placeholder="Enter  Counselling Of Prior Therapy"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.CounsellingOfPriorTherapy
                                                        }
                                                    />
                                                    <InputField
                                                        type="date"
                                                        name={`userChildren.${index}.CounsellingdateOfLastEvaluation`}
                                                        label="Date of Last Evaluation"
                                                        placeholder="Enter Date"
                                                        onChange={handleChange}
                                                        value={
                                                            values
                                                                ?.userChildren?.[
                                                                index
                                                            ]
                                                                ?.CounsellingdateOfLastEvaluation
                                                        }
                                                    />
                                                </div>
                                            )}
                                            <div className="grid grid-cols-2 space-x-3">
                                                <InputField
                                                    name={`userChildren.${index}.schoolHours`}
                                                    label="School Hours (If applicable)"
                                                    placeholder="Enter School Hours"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.schoolHours
                                                    }
                                                />
                                                <InputField
                                                    isRequired={true}
                                                    name={`userChildren.${index}.availabilityForEvaluation`}
                                                    label="Availability for Evaluation"
                                                    placeholder="Enter Availability"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]
                                                            ?.availabilityForEvaluation
                                                    }
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 space-x-3 mb-4">
                                                <Field
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0'
                                                    }
                                                    placeholder="Select"
                                                    onChange={(
                                                        selectedOption: any
                                                    ) => {
                                                        if (
                                                            selectedOption?.length
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.primaryInsuranceProvider`,
                                                                selectedOption
                                                            );
                                                        }
                                                    }}
                                                    options={
                                                        clientInsuranceDetails?.map(
                                                            (
                                                                data: InsuranceDetail
                                                            ) => ({
                                                                label: data?.name,
                                                                value: data?.name,
                                                            })
                                                        ) || []
                                                    }
                                                    label="Primary Insurance Provider"
                                                    component={Select}
                                                    isDisabled={
                                                        isSpecificViewPresent
                                                    }
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    showSearch={true}
                                                    id={`userChildren.${index}.primaryInsuranceProvider`}
                                                    name={`userChildren.${index}.primaryInsuranceProvider`}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]
                                                            ?.primaryInsuranceProvider
                                                    }
                                                />
                                                <Field
                                                    multi="true"
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0'
                                                    }
                                                    placeholder="Select"
                                                    onChange={(
                                                        selectedOption: any
                                                    ) => {
                                                        if (
                                                            selectedOption?.length
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.secondaryInsuranceProvider`,
                                                                selectedOption
                                                            );
                                                        }
                                                    }}
                                                    options={
                                                        clientInsuranceDetails?.map(
                                                            (
                                                                data: InsuranceDetail
                                                            ) => ({
                                                                label: data?.name,
                                                                value: data?.name,
                                                            })
                                                        ) || []
                                                    }
                                                    label="Secondary Insurance Provider"
                                                    component={Select}
                                                    isDisabled={
                                                        isSpecificViewPresent
                                                    }
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    showSearch={true}
                                                    id={`userChildren.${index}.secondaryInsuranceProvider`}
                                                    name={`userChildren.${index}.secondaryInsuranceProvider`}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]
                                                            ?.secondaryInsuranceProvider
                                                    }
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 space-x-3">
                                                <InputField
                                                    isRequired={true}
                                                    name={`userChildren.${index}.subscriberName`}
                                                    label="Subscriber Name"
                                                    placeholder="Enter Subscriber Name"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.subscriberName
                                                    }
                                                />
                                                <InputField
                                                    name={`userChildren.${index}.subscriberDateofBirth`}
                                                    label="Subscriber DOB"
                                                    type="date"
                                                    placeholder="Select Date of Birth"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.subscriberDateofBirth
                                                    }
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 space-x-3">
                                                <InputField
                                                    name={`userChildren.${index}.subscriberID`}
                                                    label="Subscriber ID"
                                                    placeholder="Enter Subscriber ID"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.subscriberID
                                                    }
                                                />
                                                <InputField
                                                    name={`userChildren.${index}.groupNumber`}
                                                    label="Group Number"
                                                    placeholder="Enter Group Number"
                                                    onChange={handleChange}
                                                    value={
                                                        values?.userChildren?.[
                                                            index
                                                        ]?.groupNumber
                                                    }
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 space-x-3">
                                                <FileUploadField
                                                    setFilesToDelete={
                                                        setFilesToDelete
                                                    }
                                                    isRequired={true}
                                                    name={`userChildren${index}diagnosisPaperwork`}
                                                    label="Diagnosis Paperwork"
                                                    files={files}
                                                    onFilesChange={
                                                        handleFilesChange
                                                    }
                                                    onError={() =>
                                                        handleFileError(
                                                            0,
                                                            false
                                                        )
                                                    } // Adjust as needed
                                                />
                                                <FileUploadField
                                                    setFilesToDelete={
                                                        setFilesToDelete
                                                    }
                                                    isRequired={false}
                                                    name={`userChildren${index}dischargeNote`}
                                                    label="Discharge Note"
                                                    files={files}
                                                    onFilesChange={
                                                        handleFilesChange
                                                    }
                                                    onError={() =>
                                                        handleFileError(
                                                            0,
                                                            false
                                                        )
                                                    } // Adjust as needed
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        disabled={isSpecificViewPresent}
                                        type="button"
                                        onClick={() =>
                                            push({
                                                name: '',
                                                dob: '',
                                                gender: '',
                                                currentChallenges: '',
                                                location: '',
                                                desiredServices: [],
                                                asdDiagnosis: '',
                                                dateOfAsdDiagnosis: '',
                                                availabilityForEvaluation: '',
                                                primaryInsuranceProvider: '',
                                                secondaryInsuranceProvider: [],
                                                subscriberName: '',
                                                subscriberDob: '',
                                                subscriberId: '',
                                                groupNumber: '',
                                                otherDiagnosis: '',
                                                locationOfPriorSpeechTherapy:
                                                    '',
                                                SpeechTherapydateOfLastEvaluation:
                                                    '',
                                                locationOfPriorOccupationalTherapy:
                                                    '',
                                                OccupationalTherapydateOfLastEvaluation:
                                                    '',
                                                locationOfPriorABATherapy: '',
                                                ABAdateOfLastEvaluation: '',
                                                locationOfPriorPhysicalTherapy:
                                                    '',
                                                PhysicalTherapydateOfLastEvaluation:
                                                    '',
                                                CounsellingOfPriorTherapy: '',
                                                CounsellingdateOfLastEvaluation:
                                                    '',
                                                diagnosisGivenBy: '',
                                            })
                                        }
                                        className={`flex ${isSpecificViewPresent ? 'opacity-45' : ''}`}
                                    >
                                        <img
                                            src={add}
                                            alt=""
                                            className="h-[1.5rem] w-[1.5rem]"
                                        />
                                        <h1 className="text-md ml-2 text-[#08627E]">
                                            Add Child
                                        </h1>
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <Button
                                className={''}
                                type={'secondary'}
                                onClick={() => {
                                    handleCancel();
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={isSpecificViewPresent}
                                type="primary"
                                onClick={() => handleSaveProgress(values)}
                                className={''}
                            >
                                Save Progress
                            </Button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isSpecificViewPresent}
                                className={`${isSpecificViewPresent ? 'opacity-50 pointer-events-none cursor-no-drop' : ''} py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent bg-primary-700 text-white hover:bg-primary-800 `}
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {loading && <OpModal open={loading} id={''} />}
        </>
    );
};

export default IntakeForm;
