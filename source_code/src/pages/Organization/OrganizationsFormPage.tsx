/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Field, FieldArray, FieldProps, Formik } from 'formik';
import withLayout from '../../containers/MasterLayoutContainer';
import { OrganizationsFormFooter } from '../../components/Generics/Modal';
import Input from '../../components/Generics/Inputs/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
    getClientInsuranceCall,
    getClientLocationCall,
    getClientServicesCall,
    getOrganizationLinkCall,
} from '../../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
import SaveOrganizationsApi from '../../api/services/OrganizationsApi/SaveOrganizationsApi.service';
import GenericFileUpload from '../../components/Organizations/GenericFileUpload';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
    clearOrgById,
    deleteValueByLogoName,
} from '../../redux/slice/organizations/organizationByIdSlice';
import EditOrganizationsApi from '../../api/services/OrganizationsApi/EditOrganizationsApi.service';
import { State } from 'country-state-city';
import * as Yup from 'yup';
import Tooltip from '../../components/Generics/Tooltip';
import LoaderComponent from '../../components/LoaderComponent';
import { getAllServicePlacesCall } from '../../redux/slice/ServicePlaces/getAllServicePlaces';
import Select from '../../components/Generics/Select';
import { AppDispatch } from '../../redux/store';
import copy from '../../assets/img/copy.svg';
import link from '../../assets/img/linkDoc.svg';
import add from '../../assets/img/addLocation.svg';
import deleteLocation from '../../assets/img/deleteLocation.svg';
import deleteIcon from '../../assets/img/delete.svg';
interface FormValues {
    organizationName: string;
    organizationEmailAddress: string;
    insuranceSupported: string[];
    servicesSupported: string[];
    placeOfService: string[];
    firstName: string;
    lastName: string;
    adminEmail: string;
    cellPhone: string;
    workPhone: string;
    logo: string;
    logoName: string;
    locations: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        zipCode: string;
        edited: boolean;
        defaultLocation: boolean;
    }[];
}
const locationSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Address Line 1 is required'),
    addressLine2: Yup.string().optional(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip/Postal Code is required'),
});
const validationSchema = Yup.object().shape({
    organizationName: Yup.string().required('Organization name is required'),
    organizationEmailAddress: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    insuranceSupported: Yup.array()
        .min(1, 'At least one insurance must be supported')
        .required('This field is required'),
    servicesSupported: Yup.array()
        .min(1, 'At least one service must be supported')
        .required('This field is required'),
    placeOfService: Yup.array()
        .min(1, 'At least one place must be supported')
        .required('This field is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    adminEmail: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    cellPhone: Yup.string().required('Cell phone number is required'),
    workPhone: Yup.string().required('Work phone number is required'),
    locations: Yup.array().of(locationSchema),
});
interface RootState {
    organizationByIdSlice: {
        value: {
            data: {
                id: string;
                name: string;
                organizationEmail: string;
                orgInsurances: string[];
                orgService: string[];
                servicePlaces: string[];
                locations: string[];
                firstName: string;
                lastName: string;
                userEmail: string;
                cellPhone: string;
                workPhone: string;
                logoName: string;
                orgLogo: string;
            };
        };
    };
    getUserPermission: {
        userRoles: {
            data: {
                roleName: string;
            };
        };
    };
    servicePlacesSlice: {
        location: string[];
    };
}
function OrganizationsFormPage(): React.JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isFormValid, setIsFormValid] = useState(false);
    const [fileSaveBtn, setFileSaveBtn] = useState(false);
    const [base64String, setBase64String] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [locations, setLocations] = useState([
        {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            edited: false,
            defaultLocation: true,
        },
    ]);
    const [isError, setError] = useState<any>({});
    const organizationDataById = useSelector(
        ({ organizationByIdSlice }: RootState) =>
            organizationByIdSlice?.value?.data
    );
    const organizationDataByIdLoad = useSelector(
        ({ organizationByIdSlice }: any) => organizationByIdSlice?.loading
    );
    const clientDetails = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall
    );
    const servicePlacesData = useSelector(
        ({ servicePlacesSlice }: RootState) => servicePlacesSlice?.location
    );
    const permission = useSelector(
        ({ getUserPermission }: RootState) =>
            getUserPermission?.userRoles?.data?.roleName
    );
    useEffect(() => {
        dispatch(getClientInsuranceCall({ type: 'ORGANIZATION_DATA' }));
        dispatch(getClientLocationCall());
        dispatch(getClientServicesCall({ type: 'ORGANIZATION_DATA' }));
        dispatch(getAllServicePlacesCall());
        dispatch(getOrganizationLinkCall());
    }, [dispatch]);
    const allState: any = State?.getStatesOfCountry('US');
    const insuranceOptions = organizationDataById?.orgInsurances
        ? organizationDataById.orgInsurances.map((item: any) => item?.name)
        : [];
    const serviceOptions =
        organizationDataById?.orgService?.map((item: any) => item?.name) ||
        null;
    const servicePlacesObj =
        organizationDataById?.servicePlaces?.map(
            (item: any) => item?.service
        ) || null;
    const locationsData = organizationDataById?.locations?.map(
        (location: any) => ({
            ...location,
            state: location?.state,
            edited: false,
        })
    );
    const initialValues: FormValues = {
        organizationName: organizationDataById?.name || '',
        organizationEmailAddress: organizationDataById?.organizationEmail || '',
        insuranceSupported: insuranceOptions,
        servicesSupported: serviceOptions,
        placeOfService: servicePlacesObj,
        firstName: organizationDataById?.firstName || '',
        lastName: organizationDataById?.lastName || '',
        adminEmail: organizationDataById?.userEmail || '',
        cellPhone: organizationDataById?.cellPhone || '',
        workPhone: organizationDataById?.workPhone || '',
        logo: organizationDataById?.orgLogo || '',
        logoName: organizationDataById?.logoName || '',
        locations: locationsData || locations,
    };
    const onCancel = (): any => {
        dispatch(clearOrgById());
        if (permission === 'Admin') {
            setTimeout(() => {
                navigate(ROUTES.LandingPage);
            }, 1000);
        } else {
            setTimeout(() => {
                navigate(ROUTES.organizationsGrid);
            }, 1000);
        }
    };
    const handleFileChange = (file: File): any => {
        setSelectedFile(file);
        setFileSaveBtn(true);
    };
    const handleBase64Complete = (base64: string): any => {
        setBase64String(base64);
    };
    const insuranceData = (data: any, name: any): any => {
        const insurance = data?.filter((item: any) =>
            name.includes(item?.name)
        );
        return insurance.map((item: any) => item.id);
    };
    const serviceData = (data: any, name: any): any => {
        const service = data?.filter((item: any) => name.includes(item?.name));
        return service.map((item: any) => item.id);
    };
    const servicePlaceData = (data: any, name: any): any => {
        const servicePlace = data?.filter((item: any) =>
            name.includes(item?.service)
        );
        return servicePlace.map((item: any) => item.code);
    };
    const handleSubmitForm = async (values: any): Promise<any> => {
        const updatedValues = {
            ...values,
            logo: base64String,
            logoName: selectedFile?.name,
            insuranceSupported: insuranceData(
                clientDetails?.value?.data,
                values?.insuranceSupported
            ),
            servicesSupported: serviceData(
                clientDetails?.services?.data,
                values?.servicesSupported
            ),
            id: organizationDataById?.id,
            placeOfService: servicePlaceData(
                servicePlacesData,
                values?.placeOfService
            ),
            locations: values?.locations?.map((location: any) => ({
                ...location,
                state: location?.state,
                defaultLocation: location?.defaultLocation,
                edited: location.defaultLocation || location.edited,
            })),
        };
        if (organizationDataById?.id) {
            EditOrganizationsApi.EditOrganizations(updatedValues)
                .then((res) => {
                    if (res?.data?.error) {
                        dispatch(
                            openNotification({
                                success: false,
                                title: res?.data?.description,
                                description: '',
                            })
                        );
                    } else {
                        dispatch(
                            openNotification({
                                success: true,
                                title: 'Organization data edited successfully.',
                                description: '',
                            })
                        );
                        if (permission === 'Admin') {
                            navigate(ROUTES.LandingPage);
                        } else {
                            setTimeout(() => {
                                navigate(ROUTES.organizationsGrid);
                            }, 1000);
                        }
                    }
                })
                .catch(() => {});
        } else {
            SaveOrganizationsApi.SaveOrganizations(updatedValues)
                .then((res) => {
                    if (!res?.data?.error && !res?.data?.data?.fieldName) {
                        dispatch(
                            openNotification({
                                success: true,
                                title: 'Organization data uploaded successfully.',
                                description: '',
                            })
                        );
                        setTimeout(() => {
                            navigate(ROUTES.organizationsGrid);
                        }, 1000);
                    } else {
                        setError(res?.data?.data);
                    }
                })
                .catch(() => {});
        }
    };
    const handleDelete = () => {
        dispatch(deleteValueByLogoName());
        setFileSaveBtn(true);
    };
    const handleDelete1 = () => {
        dispatch(deleteValueByLogoName());
        setBase64String('');
        setSelectedFile(null);
        setFileSaveBtn(true);
    };
    useEffect(() => {
        if (organizationDataById?.locations) {
            setLocations(
                organizationDataById?.locations?.map((loc: any) => ({
                    ...loc,
                    edited: loc?.defaultLocation || loc?.edited,
                }))
            );
        }
    }, [organizationDataById]);
    const clientInquiryFormLink = clientDetails?.link?.data?.split('?')[0];
    const query = clientDetails?.link?.data?.split('?')[1];
    const params = new URLSearchParams(query);
    const code = params.get('code');
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${clientInquiryFormLink}/${code}`);
    };

    return (
        <div className="h-screen" data-testid="organization-form-page">
            {!organizationDataByIdLoad ? (
                <Formik
                    onSubmit={handleSubmitForm}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validate={(values) => {
                        validationSchema
                            .validate(values)
                            .then(() => {
                                setIsFormValid(true);
                            })
                            .catch(() => {
                                setIsFormValid(false);
                            });
                    }}
                >
                    {(props: any) => {
                        const {
                            handleSubmit,
                            values,
                            setFieldValue,
                            handleChange,
                        } = props;
                        return (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <div className="pl-9 pr-9 pb-9 pt-5 h-[36rem] items-center w-80rem border mt-[1.9375rem] mx-[2rem] rounded-lg shadow-lg overflow-scroll">
                                    <div className="head flex justify-between">
                                        <h1>Organization Onboarding Form</h1>
                                        <div className="flex ">
                                            <div className=" h-8 border-x border-gray-500">
                                                <div className=" mx-5 flex w-auto text-[#08627E] text-sm border rounded-md border-gray-400">
                                                    <img
                                                        className="m-1"
                                                        onClick={handleCopyLink}
                                                        src={link}
                                                        alt=""
                                                    />
                                                    <a
                                                        href={`${clientInquiryFormLink}/${code}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="m-1"
                                                    >
                                                        Inquiry Form Link
                                                    </a>
                                                    <img
                                                        className=" m-1 border-l px-1 border-l-gray-500"
                                                        onClick={handleCopyLink}
                                                        src={copy}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <GenericFileUpload
                                                accept=".jpg, .jpeg .png .img"
                                                onFileChange={handleFileChange}
                                                onBase64Complete={
                                                    handleBase64Complete
                                                }
                                                label="Upload Organization Logo"
                                            />
                                            {organizationDataById?.logoName ? (
                                                <div className="flex">
                                                    <p>
                                                        Selected File:
                                                        <span className="text-ellipsis">
                                                            {
                                                                organizationDataById?.logoName
                                                            }
                                                        </span>
                                                    </p>
                                                    <Tooltip title="Delete">
                                                        <img
                                                            onClick={() =>
                                                                handleDelete()
                                                            }
                                                            src={deleteIcon}
                                                            alt="delete"
                                                        />
                                                    </Tooltip>
                                                </div>
                                            ) : (
                                                selectedFile && (
                                                    <div className="flex">
                                                        <p>
                                                            Selected File:
                                                            <span className="text-ellipsis">
                                                                {
                                                                    selectedFile.name
                                                                }
                                                            </span>
                                                        </p>
                                                        <Tooltip title="Delete">
                                                            <img
                                                                onClick={() =>
                                                                    handleDelete1()
                                                                }
                                                                src={deleteIcon}
                                                                alt="delete"
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <p className="w-3/4 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                    <div className="org mt-5 w-[40rem]">
                                        <div className="name mt-5">
                                            <Field
                                                label="Organization Name"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="organizationName"
                                                name="organizationName"
                                                className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                component={Input}
                                                value={values?.organizationName}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                autoFocus={true}
                                                placeholder="Enter here"
                                            />
                                            {isError?.fieldName ===
                                                'organizationName' && (
                                                <h1 className="text-xs text-red-600 font-[lato]">
                                                    {isError?.errorMessage}
                                                </h1>
                                            )}
                                        </div>
                                        <div className="name mt-5">
                                            <Field
                                                label="Email Address"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="organizationEmailAddress"
                                                name="organizationEmailAddress"
                                                className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent "
                                                component={Input}
                                                placeholder="Enter here"
                                                value={
                                                    values?.organizationEmailAddress
                                                }
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                            />
                                            {isError?.fieldName ===
                                                'OrganizationEmail' && (
                                                <h1 className="text-xs text-red-600 font-[lato]">
                                                    {isError?.errorMessage}
                                                </h1>
                                            )}
                                        </div>
                                    </div>
                                    <div className="org mt-5 w-[40rem]">
                                        <h2>Location & Address Details</h2>
                                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                        <FieldArray name="locations">
                                            {({
                                                push,
                                                remove,
                                            }: {
                                                push: any;
                                                remove: any;
                                            }) => (
                                                <div>
                                                    {values.locations.map(
                                                        (
                                                            location: any,
                                                            index: any
                                                        ) => (
                                                            <div
                                                                key={index}
                                                                className="location mb-4"
                                                            >
                                                                {index > 0 && (
                                                                    <div>
                                                                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                                                        <div
                                                                            className="flex float-right mt-2 "
                                                                            onClick={() =>
                                                                                remove(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    deleteLocation
                                                                                }
                                                                                alt="delete"
                                                                                className="h-[1.2rem] w-[1.2rem]"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="ml-1 text-[#08627E] text-sm,"
                                                                            >
                                                                                Delete
                                                                                this
                                                                                location
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="py-1 mt-3">
                                                                    <Field
                                                                        label="Address Line 1"
                                                                        autoComplete="off"
                                                                        isRequired={
                                                                            true
                                                                        }
                                                                        id={`locations.${index}.addressLine1`}
                                                                        name={`locations.${index}.addressLine1`}
                                                                        className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                                        component={
                                                                            Input
                                                                        }
                                                                        placeholder="Enter here"
                                                                        value={
                                                                            location.addressLine1
                                                                        }
                                                                        onChange={(
                                                                            e: any
                                                                        ) => {
                                                                            handleChange(
                                                                                e
                                                                            );
                                                                            if (
                                                                                organizationDataById?.locations
                                                                            ) {
                                                                                setFieldValue(
                                                                                    `locations.${index}.edited`,
                                                                                    true
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="py-1 mt-3">
                                                                    <Field
                                                                        label="Address Line 2"
                                                                        autoComplete="off"
                                                                        isRequired={
                                                                            false
                                                                        }
                                                                        id={`locations.${index}.addressLine2`}
                                                                        name={`locations.${index}.addressLine2`}
                                                                        className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                                        component={
                                                                            Input
                                                                        }
                                                                        placeholder="Enter here"
                                                                        value={
                                                                            location.addressLine2
                                                                        }
                                                                        onChange={(
                                                                            e: any
                                                                        ) => {
                                                                            handleChange(
                                                                                e
                                                                            );
                                                                            if (
                                                                                organizationDataById?.locations
                                                                            ) {
                                                                                setFieldValue(
                                                                                    `locations.${index}.edited`,
                                                                                    true
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="city  py-1 mt-3">
                                                                    <Field
                                                                        label="City"
                                                                        autoComplete="off"
                                                                        isRequired={
                                                                            true
                                                                        }
                                                                        id={`locations.${index}.city`}
                                                                        name={`locations.${index}.city`}
                                                                        className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                                        component={
                                                                            Input
                                                                        }
                                                                        placeholder="Enter here"
                                                                        value={
                                                                            location.city
                                                                        }
                                                                        onChange={(
                                                                            e: any
                                                                        ) => {
                                                                            handleChange(
                                                                                e
                                                                            );
                                                                            if (
                                                                                organizationDataById?.locations
                                                                            ) {
                                                                                setFieldValue(
                                                                                    `locations.${index}.edited`,
                                                                                    true
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="state  py-2 mt-3">
                                                                    <Field
                                                                        label="State"
                                                                        placeholder="Select"
                                                                        inputClassName={
                                                                            'border-0 border-b rounded-none border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                        }
                                                                        id={`locations.${index}.state`}
                                                                        name={`locations.${index}.state`}
                                                                        autoComplete="off"
                                                                        isRequired={
                                                                            true
                                                                        }
                                                                        showSearch={
                                                                            true
                                                                        }
                                                                        value={
                                                                            values
                                                                                ?.locations[
                                                                                index
                                                                            ]
                                                                                ?.state
                                                                        }
                                                                        component={
                                                                            Select
                                                                        }
                                                                        onChange={(
                                                                            selectedStateValue: any
                                                                        ) => {
                                                                            setFieldValue(
                                                                                `locations.${index}.state`,
                                                                                selectedStateValue[0]
                                                                            );
                                                                            if (
                                                                                organizationDataById?.locations
                                                                            ) {
                                                                                setFieldValue(
                                                                                    `locations.${index}.edited`,
                                                                                    true
                                                                                );
                                                                            }
                                                                        }}
                                                                        options={allState?.map(
                                                                            (
                                                                                data: any
                                                                            ) => ({
                                                                                label: data?.name,
                                                                                value: data?.name,
                                                                            })
                                                                        )}
                                                                    ></Field>
                                                                </div>
                                                                <div className="name mt-5">
                                                                    <Field
                                                                        type="number"
                                                                        label="Zip/Postal Code"
                                                                        autoComplete="off"
                                                                        isRequired={
                                                                            true
                                                                        }
                                                                        id={`locations.${index}.zipCode`}
                                                                        name={`locations.${index}.zipCode`}
                                                                        className="WorkPhone border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                                        component={
                                                                            Input
                                                                        }
                                                                        placeholder="Enter here"
                                                                        value={
                                                                            location.zipCode
                                                                        }
                                                                        onChange={(
                                                                            e: any
                                                                        ) => {
                                                                            handleChange(
                                                                                e
                                                                            );
                                                                            if (
                                                                                organizationDataById?.locations
                                                                            ) {
                                                                                setFieldValue(
                                                                                    `locations.${index}.edited`,
                                                                                    true
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="flex my-4 ">
                                                                    <Field
                                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] focus:ring-transparent"
                                                                        type="checkbox"
                                                                        name={`locations.${index}.defaultLocation`}
                                                                        id={`defaultLocation-${index}`}
                                                                        checked={
                                                                            location.defaultLocation
                                                                        }
                                                                        onChange={(
                                                                            e: any
                                                                        ) => {
                                                                            if (
                                                                                e
                                                                                    .target
                                                                                    .checked
                                                                            ) {
                                                                                values.locations.forEach(
                                                                                    (
                                                                                        loc: any,
                                                                                        idx: any
                                                                                    ) => {
                                                                                        if (
                                                                                            idx !==
                                                                                            index
                                                                                        ) {
                                                                                            if (
                                                                                                loc?.defaultLocation
                                                                                            ) {
                                                                                                setFieldValue(
                                                                                                    `locations.${idx}.edited`,
                                                                                                    true
                                                                                                );
                                                                                            }
                                                                                            setFieldValue(
                                                                                                `locations.${idx}.defaultLocation`,
                                                                                                false
                                                                                            );
                                                                                        }
                                                                                    }
                                                                                );
                                                                            }
                                                                            if (
                                                                                organizationDataById?.locations
                                                                            ) {
                                                                                setFieldValue(
                                                                                    `locations.${index}.edited`,
                                                                                    true
                                                                                );
                                                                            }
                                                                            handleChange(
                                                                                e
                                                                            );
                                                                        }}
                                                                    />
                                                                    <label
                                                                        htmlFor={`defaultLocation-${index}`}
                                                                        className="text-sm text-zinc-600 font-[lato] mx-2"
                                                                    >
                                                                        Default
                                                                        Location
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                    <div
                                                        className="addLocation flex my-7"
                                                        onClick={() => {
                                                            push({
                                                                addressLine1:
                                                                    '',
                                                                addressLine2:
                                                                    '',
                                                                city: '',
                                                                state: '',
                                                                zipCode: '',
                                                                defaultLocation:
                                                                    false,
                                                                edited: false,
                                                            });
                                                            setLocations(
                                                                values.locations
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src={add}
                                                            alt=""
                                                            className="h-[1.5rem] w-[1.5rem]"
                                                        />
                                                        <button className="text-md ml-2 text-[#08627E]">
                                                            Add More Locations
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>
                                    <div className="org mt-5 w-[40rem]">
                                        <h2>Insurance & Services</h2>
                                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                        <div className="name mt-5">
                                            <label className="Name text-sm font-medium flex">
                                                Insurance Supported
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>
                                            <Field
                                                placeholder="Select..."
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                label="Insurance Supported"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="insuranceSupported"
                                                name="insuranceSupported"
                                                className="border-b-2 border-gray-200 w-full bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                value={values}
                                            >
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <Select
                                                        label={''}
                                                        options={clientDetails?.value?.data?.map(
                                                            (data: any) => ({
                                                                label: data?.name,
                                                                value: data?.name,
                                                            })
                                                        )}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            form.setFieldValue(
                                                                'insuranceSupported',
                                                                selectedOption
                                                            );
                                                            setTimeout(() => {
                                                                form.setFieldError(
                                                                    'insuranceSupported',
                                                                    ''
                                                                );
                                                            }, 0);
                                                        }}
                                                        value={field.value}
                                                        showSearch={false}
                                                        multi={true}
                                                        placeholder={'Select'}
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="name mt-5">
                                            <label className="Name text-sm font-medium flex">
                                                Services Supported
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>
                                            <Field
                                                placeholder="Select..."
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                label="Services Supported"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="servicesSupported"
                                                name="servicesSupported"
                                                className="border-b-2 border-gray-200 w-full bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                value={values}
                                            >
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <Select
                                                        label={''}
                                                        options={clientDetails?.services?.data?.map(
                                                            (data: any) => ({
                                                                label: data?.name,
                                                                value: data.name,
                                                            })
                                                        )}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            form.setFieldValue(
                                                                'servicesSupported',
                                                                selectedOption
                                                            );
                                                            setTimeout(() => {
                                                                form.setFieldError(
                                                                    'servicesSupported',
                                                                    ''
                                                                );
                                                            }, 0);
                                                        }}
                                                        value={field.value}
                                                        showSearch={false}
                                                        multi={true}
                                                        placeholder={'Select'}
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="servicePlaces mt-5">
                                            <label className="Name text-sm font-medium flex">
                                                Place of Service
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>
                                            <Field
                                                placeholder="Select..."
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                label="Place of Service"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="placeOfService"
                                                name="placeOfService"
                                                className="border-b-2 border-gray-200 w-full bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                as="select"
                                            >
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <Select
                                                        label={''}
                                                        options={servicePlacesData?.map(
                                                            (data: any) => ({
                                                                label: data?.service,
                                                                value: data?.service,
                                                            })
                                                        )}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            form.setFieldValue(
                                                                'placeOfService',
                                                                selectedOption
                                                            );
                                                            setTimeout(() => {
                                                                form.setFieldError(
                                                                    'placeOfService',
                                                                    ''
                                                                );
                                                            }, 0);
                                                        }}
                                                        value={field.value}
                                                        showSearch={false}
                                                        multi={true}
                                                        placeholder={'Select'}
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="org mt-5 w-[40rem]">
                                        <h2>Admin Details</h2>
                                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                        <div className="name mt-5">
                                            <Field
                                                label="First Name"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="firstName"
                                                name="firstName"
                                                className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent "
                                                component={Input}
                                                placeholder="Enter here"
                                                value={values.firstName}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                            />
                                        </div>
                                        <div className="name mt-5">
                                            <Field
                                                label="Last Name"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="lastName"
                                                name="lastName"
                                                value={values.lastName}
                                                className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                component={Input}
                                                placeholder="Enter here"
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                            />
                                        </div>
                                        <div className="name mt-5">
                                            <Field
                                                label="Email Address"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="adminEmail"
                                                name="adminEmail"
                                                value={values.adminEmail}
                                                className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                component={Input}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                placeholder="Enter here"
                                            />
                                            <h1 className="text-right font-[lato]  text-zinc-400 text-xs font-light">
                                                Login-information will be sent
                                                on this email
                                            </h1>
                                            {isError?.fieldName ===
                                                'AdminUsername' && (
                                                <h1 className="text-xs text-red-600 font-[lato]">
                                                    {isError?.errorMessage}
                                                </h1>
                                            )}
                                        </div>
                                        <div className="name mt-5 flex">
                                            <div className="number w-full">
                                                <Field
                                                    type="text"
                                                    label="Cell Phone"
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    id="cellPhone"
                                                    name="cellPhone"
                                                    className="CellPhone WorkPhone border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 focus:ring-transparent outline-none "
                                                    component={Input}
                                                    value={values.cellPhone}
                                                    onChange={(e: any) => {
                                                        const regex =
                                                            /^[0-9+]*$/;
                                                        if (
                                                            regex.test(
                                                                e.target.value
                                                            )
                                                        ) {
                                                            handleChange(e);
                                                        }
                                                    }}
                                                    pattern="[+0-9]*"
                                                    placeholder="Enter here"
                                                    maxLength={13}
                                                />
                                            </div>
                                            <div className="number ml-5 w-full">
                                                <Field
                                                    type="text"
                                                    label="Work Phone"
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    id="workPhone"
                                                    name="workPhone"
                                                    className="WorkPhone border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none focus:ring-transparent"
                                                    component={Input}
                                                    value={values.workPhone}
                                                    onChange={(e: any) => {
                                                        const regex =
                                                            /^[0-9+]*$/;
                                                        if (
                                                            regex.test(
                                                                e.target.value
                                                            )
                                                        ) {
                                                            handleChange(e);
                                                        }
                                                    }}
                                                    pattern="[+0-9]*"
                                                    placeholder="Enter here"
                                                    maxLength={13}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <OrganizationsFormFooter
                                    isDisabled={isFormValid || fileSaveBtn}
                                    onClose={onCancel}
                                    handleSubmit={handleSubmit}
                                />
                            </form>
                        );
                    }}
                </Formik>
            ) : (
                <LoaderComponent />
            )}
        </div>
    );
}
export default withLayout(OrganizationsFormPage);
