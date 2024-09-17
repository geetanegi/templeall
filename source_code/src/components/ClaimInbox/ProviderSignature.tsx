import React, { useState } from 'react';
import Input from '../Generics/Inputs/Input';
import Select from '../Generics/Select';
import { Formik, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import editClaimProviderSupplierAPI from '../../api/services/MergeClaims/editClaimProviderSupplier.service';
import Button from '../Generics/Button';
import edit from '../../assets/img/GridIcons/edit.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import EditModal from './EditModal';
interface Values {
    providerID: string;
    idType: string;
    signature: string;
    providerName: string;
}
export default function ProviderSignature(): React.JSX.Element {
    const dropdownData = useSelector(({ mergeClaims }: any) => mergeClaims);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const [editModal, setEditModal] = useState(false);
    const getProvidersName = (): string => {
        return dropdownData?.organizationEmployee
            ?.filter((item: any) => item?.type === 'EMPLOYEE')
            ?.map((item: any) => ({
                label: `${item?.firstName} ${item.lastName}`,
                value: item?.id,
            }));
    };
    const getIdTypeData = (): string => {
        return dropdownData?.ClaimByIdType?.map((item: any) => ({
            label: `${item?.name}`,
            value: item?.id,
        }));
    };
    const getAllValues = (): any => {
        return {
            providerName: '',
            idType: '',
            signature: '',
            providerID: '',
        };
    };
    const handleSubmitSave = async (values: Values): Promise<any> => {
        const payload = {
            id: dropdownData?.claimById?.id,
            provider: values?.providerName,
            providerId: values?.providerID,
            claimIdType: values?.idType,
            userId: userPermission?.userId,
            isProviderSignature: values?.signature,
        };
        const res =
            await editClaimProviderSupplierAPI.editClaimProviderSupplier(
                payload
            );
        if (!res?.data?.error) {
            // dispatch(
            //     openNotification({
            //         success: true,
            //         title: res?.data?.data?.message,
            //         description: '',
            //     })
            // );
        } else {
            return res;
        }
    };
    const handleDisable = (values: Values): boolean => {
        return (
            !values?.providerID ||
            !values?.idType ||
            !values?.signature ||
            !values?.providerName
        );
    };
    const validationSchema = Yup.object({
        idType: Yup.string().required('ID Type is required'),
        providerName: Yup.string()
            .required('Provider name is required')
            .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
            .max(
                50,
                'Input cannot exceed the maximum length of 50 characters.'
            ),
        signature: Yup.string().required('Provider Signature is required'),
        providerID: Yup.string()
            .required('Provider Id is required')
            .matches(/^\d{1,10}$/, 'Input must be a numeric value.'),
    });
    return (
        <>
            <Formik
                initialValues={getAllValues()}
                onSubmit={handleSubmitSave}
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
                                id="provider"
                                className="flex flex-col space-y-20 bg-white p-4 rounded-2xl shadow-lg  drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]"
                            >
                                <div className="flex flex-col space-y-6">
                                    <div className="">
                                        <h2 className="text-xl font-semibold  text-gray-700">
                                            Provider Signature
                                        </h2>
                                        <div className="bg-gradient-to-r from-[#48ABCA] to-transparent h-[0.2rem] mt-2"></div>
                                    </div>
                                    <div className="w-2/3">
                                        <Field
                                            inputClassName={
                                                'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            placeholder="Select"
                                            label="Provider's Name"
                                            options={getProvidersName()}
                                            onChange={(
                                                selectedOption: string
                                            ) => {
                                                setFieldValue(
                                                    'providerName',
                                                    selectedOption
                                                );
                                            }}
                                            autoComplete="off"
                                            showSearch={true}
                                            isRequired={true}
                                            id="providerName"
                                            name="providerName"
                                            component={Select}
                                            value={values.providerName}
                                        />
                                    </div>
                                    <div className="w-2/3">
                                        <Field
                                            inputClassName={
                                                'border-0 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            placeholder="Select"
                                            label="Signature"
                                            options={[
                                                { label: 'Yes', value: 'Yes' },
                                                { label: 'No', value: 'No' },
                                            ]}
                                            onChange={(
                                                selectedOption: string
                                            ) => {
                                                setFieldValue(
                                                    'signature',
                                                    selectedOption
                                                );
                                            }}
                                            autoComplete="off"
                                            showSearch={true}
                                            isRequired={true}
                                            id="signature"
                                            name="signature"
                                            component={Select}
                                            value={values.signature}
                                        />
                                    </div>
                                    <div className="w-2/3">
                                        <Field
                                            label="Provider ID"
                                            isRequired={false}
                                            // autoFocus={true}
                                            id="providerID"
                                            name="providerID"
                                            component={Input}
                                            value={values.providerID}
                                            onChange={(e: string) => {
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
                                </div>
                                {/* Secondary Qualifiers Section */}
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
                                                                // onClick={() => {
                                                                //     handleEdit();
                                                                // }}
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
                                </div>
                                {/* Submit Button */}
                                <div className="flex justify-end mt-5">
                                    <button
                                        type="button"
                                        disabled={handleDisable(values)}
                                        className="py-2 px-9 inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                                        onClick={() => handleSubmit()}
                                    >
                                        Save
                                    </button>
                                </div>
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
