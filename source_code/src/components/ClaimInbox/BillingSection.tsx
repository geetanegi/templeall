import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, FormikProps } from 'formik';
import Input from '../Generics/Inputs/Input';
import Select from '../Generics/Select';
import {
    getAllClaimByIdTypeCall,
    getOrganizationEmployeeCall,
} from '../../redux/slice/MergeClaims/mergeClaims';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import Button from '../Generics/Button';
import edit from '../../assets/img/GridIcons/edit.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import EditModal from './EditModal';
interface Values {
    billerName: any;
    providerID: any;
    idType: any;
    addressLine1: any;
    addressLine2: any;
    city: any;
    state: any;
    zipPostalCode: any;
    providerEmail: any;
    contact: any;
    phone: any;
    ext: any;
    fax: any;
}
export default function BillingFormSection(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const dropdownData = useSelector(({ mergeClaims }: any) => mergeClaims);
    const [editModal, setEditModal] = useState(false);
    const getIdTypeData = (): string => {
        return dropdownData?.ClaimByIdType?.map((item: any) => ({
            label: `${item?.name}`,
            value: item?.id,
        }));
    };
    const getBillerNames = (): string => {
        return dropdownData?.organizationEmployee?.map((item: any) => ({
            label: `${item?.firstName} ${item.lastName}`,
            value: item?.id,
        }));
    };
    const getAllValues = (): any => {
        return {
            billerName: '',
            providerID: '',
            idType: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipPostalCode: '',
            providerEmail: '',
            contact: '',
            phone: '',
            ext: '',
            fax: '',
        };
    };
    const validationSchema = Yup.object({
        idType: Yup.string().required('ID Type is required'),
        addressLine1: Yup.string()
            .max(50, 'Input cannot exceed the maximum length of 50 characters.')
            .required('Address Line 1 is required'),
        addressLine2: Yup.string().max(
            50,
            'Input cannot exceed the maximum length of 50 characters.'
        ),
        city: Yup.string()
            .required('City is required')
            .matches(/^[a-zA-Z\s]*$/, 'Only alphabets are allowed')
            .max(
                20,
                'Input cannot exceed the maximum length of 20 characters.'
            ),
        state: Yup.string()
            .required('State is required')
            .matches(/^[a-zA-Z\s]*$/, 'Only alphabets are allowed')
            .max(
                20,
                'Input cannot exceed the maximum length of 20 characters.'
            ),
        zipPostalCode: Yup.string()
            .required('Zip/Postal Code is required')
            .matches(
                /^\d{1,10}$/,
                'Input must be a numeric value with a maximum length of 10 digits.'
            ),
        providerEmail: Yup.string()
            .email('Invalid email address')
            .required('Provider Email Address is required'),
        contact: Yup.string().matches(/^\+1[\d\-]{1,12}$/, {
            message:
                'Phone number must start with +1 and contain up to 13 characters including digits and -',
        }),
        phone: Yup.string().matches(/^\+1[\d\-]{1,12}$/, {
            message:
                'Phone number must start with +1 and contain up to 13 characters including digits and -',
        }),
        providerID: Yup.string().required('Provider Id is required'),
        ext: Yup.string(),
        fax: Yup.string(),
    });
    React.useEffect(() => {
        dispatch(getAllClaimByIdTypeCall());
        dispatch(getOrganizationEmployeeCall());
    }, []);

    const handleEdit = (): void => {
        setEditModal(true);
    };
    return (
        <>
            <Formik
                initialValues={getAllValues()}
                onSubmit={() => {}}
                enableReinitialize={true}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {(props: FormikProps<Values>) => {
                    const {
                        values,
                        setFieldValue,
                        handleChange,
                        handleSubmit,
                        setFieldTouched,
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <div
                                id="billing"
                                className="flex flex-col space-y-20 bg-white p-4 rounded-2xl shadow-lg  drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]"
                            >
                                <div className="flex flex-col space-y-6">
                                    {/* Billing Header */}
                                    <div className="w-full">
                                        <h2 className="text-xl font-semibold  text-gray-700">
                                            Billing
                                        </h2>
                                        <div className="bg-gradient-to-r from-[#48ABCA] to-transparent h-[0.2rem] mt-2"></div>
                                    </div>
                                    <div className="w-2/3">
                                        <Field
                                            label={'Biller Name'}
                                            id="billerName"
                                            name="billerName"
                                            autoComplete="off"
                                            isRequired={true}
                                            isSearchable={true}
                                            value={values?.billerName}
                                            component={Select}
                                            inputClassName={
                                                'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            options={getBillerNames()}
                                            onChange={(
                                                selectedOption: string
                                            ) => {
                                                setFieldValue(
                                                    'billerName',
                                                    selectedOption?.[0]
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="w-2/3">
                                        <Field
                                            label="Provider ID"
                                            isRequired={true}
                                            autoFocus={true}
                                            id="providerID"
                                            name="providerID"
                                            component={Input}
                                            value={values.providerID}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'providerID',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter"
                                            className=" border-gray-300 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                        />
                                    </div>
                                    <div className="w-2/3">
                                        <Field
                                            label="ID Type"
                                            isRequired={true}
                                            id="idType"
                                            name="idType"
                                            autoComplete="off"
                                            isSearchable={true}
                                            value={values?.idType}
                                            component={Select}
                                            inputClassName={
                                                'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            options={getIdTypeData()}
                                            onChange={(
                                                selectedOption: string
                                            ) => {
                                                setFieldValue(
                                                    'idType',
                                                    selectedOption?.[0]
                                                );
                                            }}
                                            placeholder="Select"
                                        />
                                    </div>
                                    {/* Address Fields */}
                                    {[
                                        {
                                            name: 'addressLine1',
                                            label: 'Address Line 1',
                                            required: true,
                                            placeHolder:
                                                'Please enter complete address here',
                                        },
                                        {
                                            name: 'addressLine2',
                                            label: 'Address Line 2',
                                            placeHolder:
                                                'Please enter complete address here',
                                        },
                                        {
                                            name: 'city',
                                            label: 'City',
                                            required: true,
                                            placeHolder: 'Name of the city',
                                        },
                                        {
                                            name: 'state',
                                            label: 'State',
                                            required: true,
                                            placeHolder: 'Name of the state',
                                        },
                                        {
                                            name: 'zipPostalCode',
                                            label: 'Zip/Postal Code',
                                            required: true,
                                            placeHolder: 'Enter',
                                        },
                                        {
                                            name: 'providerEmail',
                                            label: 'Provider Email Address',
                                            required: true,
                                            placeHolder: 'Enter',
                                        },
                                    ].map((field) => (
                                        <div key={field.name} className="w-2/3">
                                            <Field
                                                label={field.label}
                                                isRequired={field.required}
                                                id={field.name}
                                                name={field.name}
                                                component={Input}
                                                value={
                                                    values[
                                                        field.name as keyof Values
                                                    ]
                                                }
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        field.name,
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder={field.placeHolder}
                                                className=" border-gray-300 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                            />
                                        </div>
                                    ))}
                                    {/* Contact Fields */}
                                    <div className="grid grid-cols-4 gap-4">
                                        {['contact', 'phone', 'ext', 'fax'].map(
                                            (field) => (
                                                <div key={field}>
                                                    <Field
                                                        data-testid={`${field}Input`}
                                                        className=" border-gray-300 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                        label={
                                                            field
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            field.slice(1)
                                                        }
                                                        id={field}
                                                        name={field}
                                                        component={Input}
                                                        value={
                                                            values[
                                                                field as keyof Values
                                                            ]
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                            setFieldTouched(
                                                                field,
                                                                true,
                                                                false
                                                            );
                                                        }}
                                                        placeholder={`Enter`}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {/* Secondary Qualifiers Section */}
                                </div>
                                <div className="mt-20  bg-white p-6 rounded-xl shadow-lg  drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
                                    <div className="flex justify-between items-center w-full mb-5">
                                        <h3 className="text-lg font-semibold w-3/4">
                                            Add Secondary Qualifiers
                                            <div className="bg-gradient-to-r from-[#48ABCA] to-transparent h-[0.2rem] mt-2"></div>
                                        </h3>
                                        <button className="bg-primary-700 text-white px-10 py-2 rounded-md">
                                            + Add New
                                        </button>
                                    </div>
                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full rounded-lg">
                                            <thead>
                                                <tr className="bg-primary-300 text-base font-light text-left">
                                                    <th className="p-2">
                                                        Secondary ID Qualifier
                                                    </th>
                                                    <th className="p-2 ">
                                                        Qualifier ID
                                                    </th>
                                                    <th className="p-2 ">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="space-y-3 py-2">
                                                {[
                                                    {
                                                        id: '57894541265',
                                                        description:
                                                            'Lorem ipsum dolor sit amet consectetur.',
                                                    },
                                                    {
                                                        id: '55458876213',
                                                        description:
                                                            'Lorem ipsum dolor sit amet consectetur.',
                                                    },
                                                ].map((qualifier, index) => (
                                                    <tr
                                                        key={index}
                                                        className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                                    >
                                                        <td className="p-2">
                                                            {
                                                                qualifier.description
                                                            }
                                                        </td>
                                                        <td className="p-2">
                                                            {qualifier.id}
                                                        </td>
                                                        <td className={`p-2`}>
                                                            <Button
                                                                className={''}
                                                                type=""
                                                                onClick={() => {
                                                                    handleEdit();
                                                                }}
                                                            >
                                                                <img
                                                                    src={edit}
                                                                    alt="Edit"
                                                                    className=""
                                                                />
                                                            </Button>
                                                            <Button
                                                                type=""
                                                                loading={false}
                                                                // onClick={() => {
                                                                //     handleDelete();
                                                                // }}
                                                                className=""
                                                            >
                                                                <img
                                                                    className=" mt-1 ml-4 "
                                                                    src={
                                                                        deleteIcon
                                                                    }
                                                                    alt="View"
                                                                />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>{' '}
                                {/* Submit Button */}
                                {/* <div className="mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Submit
                                </button>
                            </div> */}
                            </div>
                        </form>
                    );
                }}
            </Formik>
            {editModal && (
                <EditModal
                    open={editModal}
                    onClose={() => setEditModal(false)}
                />
            )}
        </>
    );
}
