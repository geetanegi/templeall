import * as React from 'react';
import deleteIcon from '../../assets/img/deleteLocation.svg';
import { Field, FieldProps, FieldArray } from 'formik';
import { useSelector } from 'react-redux';
import Input from '../Generics/Inputs/Input';
import SelectComponent from '../Generics/Inputs/Select';
import { Gender } from '../../constants/userOnboarding';
import Datepicker from 'react-tailwindcss-datepicker';
import AddChildButton from './addChildButton';
import Select from '../Generics/Select';
export default function AddUserChild({
    handleNumber,
    values,
    touched,
    errors,
    setFieldTouched,
    handleChange,
    setFieldValue,
    employeeData,
    handleSubmit,
    handleKeyPress,
    setSubmitting,
    isDisabled,
}: {
    handleNumber: any;
    values: any;
    touched: any;
    errors: any;
    setFieldTouched: any;
    handleChange: any;
    setFieldValue: any;
    employeeData: any;
    handleSubmit: any;
    handleKeyPress: any;
    setSubmitting: any;
    isDisabled?: any;
}): React.JSX.Element {
    const [focus, setFocus] = React.useState(false);
    const clientTherapy = useSelector(
        ({ users }: any) => users?.clientTherapies
    );
    const referringProvider = useSelector(
        ({ scheduling }: any) => scheduling?.getPrimaryProvider
    );
    return (
        <form onSubmit={handleSubmit}>
            <div className="forClient">
                <h1 className="font-[lato] font-semibold mt-4">
                    Child Information
                </h1>
                <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                <FieldArray name="userChildren">
                    {({ push, remove }: { push: any; remove: any }) => (
                        <div>
                            {values?.userChildren?.map(
                                (children: any, index: any) => (
                                    <div key={index} className="children mb-4">
                                        {index > 0 && (
                                            <div className="w-[70rem]">
                                                <p className="w-full bg-gradient-to-r from-zinc-400 from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                                <div
                                                    className="flex float-right mt-2 "
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    <img
                                                        src={deleteIcon}
                                                        alt="delete"
                                                        className="h-[1.2rem] w-[1.2rem]"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="ml-1 text-[#08627E] text-sm,"
                                                    >
                                                        Delete Child
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        <div className="ChildFirstName w-[45rem] mt-5">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="First Name"
                                                autoComplete="off"
                                                autoFocus={focus}
                                                isRequired={true}
                                                id={`userChildren.${index}.childFirstName`}
                                                name={`userChildren.${index}.childFirstName`}
                                                component={Input}
                                                value={children?.childFirstName}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    if (
                                                        employeeData?.userChildren
                                                    ) {
                                                        setFieldValue(
                                                            `userChildren.${index}.edited`,
                                                            true
                                                        );
                                                    }
                                                }}
                                                onKeyDown={(e: any) => {
                                                    handleKeyPress(
                                                        e,
                                                        values,
                                                        setSubmitting
                                                    );
                                                }}
                                                placeholder="First Name"
                                                disabled={isDisabled}
                                                isExtracted={`userChildren.${index}.childFirstName`}
                                            />
                                        </div>
                                        <div className="ChildLastName w-[45rem] my-5">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="Last Name"
                                                autoComplete="off"
                                                isRequired={true}
                                                id={`userChildren.${index}.childLastName`}
                                                name={`userChildren.${index}.childLastName`}
                                                component={Input}
                                                value={children?.childLastName}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    if (
                                                        employeeData?.userChildren
                                                    ) {
                                                        setFieldValue(
                                                            `userChildren.${index}.edited`,
                                                            true
                                                        );
                                                    }
                                                }}
                                                onKeyDown={(e: any) => {
                                                    handleKeyPress(
                                                        e,
                                                        values,
                                                        setSubmitting
                                                    );
                                                }}
                                                placeholder="Last Name"
                                                disabled={isDisabled}
                                                isExtracted={`userChildren.${index}.childLastName`}
                                            />
                                        </div>
                                        <div className="flex">
                                            <div className="childGender  w-[45rem] my-1 mt-3">
                                                <Field
                                                    label="Gender"
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    id={`userChildren.${index}.childGender`}
                                                    name={`userChildren.${index}.childGender`}
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                    }
                                                    component={Select}
                                                    isDisabled={isDisabled}
                                                    value={
                                                        values?.userChildren[
                                                            index
                                                        ]?.childGender
                                                    }
                                                    options={Gender?.map(
                                                        (data: any) => ({
                                                            label: data?.gender,
                                                            value: data?.gender,
                                                        })
                                                    )}
                                                    onChange={(
                                                        selectedGender: any
                                                    ) => {
                                                        if (
                                                            selectedGender?.length
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.childGender`,
                                                                selectedGender
                                                            );
                                                            if (
                                                                employeeData?.userChildren
                                                            ) {
                                                                setFieldValue(
                                                                    `userChildren.${index}.edited`,
                                                                    true
                                                                );
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="childDOB w-[18rem] ml-9">
                                                <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                    Date of Birth
                                                </label>
                                                <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                    *
                                                </label>
                                                <Field
                                                    className="border "
                                                    label="Date of Birth"
                                                    name={`userChildren.${index}.childDateOfBirth`}
                                                    id={`userChildren.${index}.childDateOfBirth`}
                                                    isRequired={false}
                                                    disabled={isDisabled}
                                                    onChange={(e: any) =>
                                                        handleChange(e)
                                                    }
                                                >
                                                    {({
                                                        form,
                                                        field,
                                                    }: {
                                                        form: any;
                                                        field: any;
                                                    }) => (
                                                        <Datepicker
                                                            disabled={
                                                                isDisabled
                                                            }
                                                            toggleClassName="absolute rounded-r-lg text-blue-500 left-0 h-full px-3 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed "
                                                            inputClassName="outline-none py-[0.5rem] px-[2rem]  w-[18rem] px-3 border-2 h-10 border-neutral-300 rounded-md text-sm"
                                                            value={field?.value}
                                                            placeholder="  yyyy/mm/dd"
                                                            onChange={(
                                                                date
                                                            ) => {
                                                                form.setFieldValue(
                                                                    `userChildren.${index}.childDateOfBirth`,
                                                                    date
                                                                );
                                                                if (
                                                                    employeeData?.userChildren
                                                                ) {
                                                                    setFieldValue(
                                                                        `userChildren.${index}.edited`,
                                                                        true
                                                                    );
                                                                }
                                                            }}
                                                            popoverDirection="down"
                                                            useRange={false}
                                                            asSingle={true}
                                                            maxDate={new Date()}
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="therapyData select w-[45rem] py-2 mt-4">
                                            <Field
                                                disabled={isDisabled}
                                                placeholder="Select..."
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                }}
                                                label="Desired Services"
                                                autoComplete="off"
                                                isRequired={true}
                                                id={`userChildren.${index}.therapyData`}
                                                name={`userChildren.${index}.therapyData`}
                                                className="border-b-2 border-gray-200 w-full bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                as="select"
                                            >
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <SelectComponent
                                                        isMultiple={true}
                                                        isRequired={true}
                                                        isSearchable={false}
                                                        label={
                                                            'Desired Services'
                                                        }
                                                        form={{
                                                            touched,
                                                            errors,
                                                        }}
                                                        options={clientTherapy?.map(
                                                            (data: any) => ({
                                                                label: data?.name,
                                                                value: data?.id,
                                                            })
                                                        )}
                                                        isDisabled={isDisabled}
                                                        field={{
                                                            value: field.value,
                                                            name: field.name,
                                                            onChange: (
                                                                value
                                                            ) => {
                                                                form.setFieldValue(
                                                                    `userChildren.${index}.therapyData`,
                                                                    value
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        form.setFieldError(
                                                                            `userChildren.${index}.therapyData`,
                                                                            ''
                                                                        );
                                                                    },
                                                                    0
                                                                );
                                                                if (
                                                                    employeeData?.userChildren
                                                                ) {
                                                                    setFieldValue(
                                                                        `userChildren.${index}.edited`,
                                                                        true
                                                                    );
                                                                }
                                                            },
                                                        }}
                                                        handleBlur={
                                                            setFieldTouched
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className=" referringInfo flex my-3">
                                            <div className="refer select w-[20rem] mt-3">
                                                <Field
                                                    placeholder="Select..."
                                                    onChange={(e: any) => {
                                                        {
                                                            handleChange(e);
                                                            if (
                                                                employeeData?.userChildren
                                                            ) {
                                                                setFieldValue(
                                                                    `userChildren.${index}.edited`,
                                                                    true
                                                                );
                                                            }
                                                        }
                                                    }}
                                                    label="Referring Provider"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id={`userChildren.${index}.referringProvider`}
                                                    name={`userChildren.${index}.referringProvider`}
                                                    className="border-b-2 border-gray-200 w-full bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                    as="select"
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <SelectComponent
                                                            isDisabled={
                                                                isDisabled
                                                            }
                                                            isMultiple={false}
                                                            isRequired={false}
                                                            isSearchable={false}
                                                            label={
                                                                'Referring Provider'
                                                            }
                                                            form={{
                                                                touched,
                                                                errors,
                                                            }}
                                                            options={referringProvider?.map(
                                                                (
                                                                    data: any
                                                                ) => ({
                                                                    label: `${data?.firstName} ${data?.lastName}`,
                                                                    value: data?.id,
                                                                })
                                                            )}
                                                            field={{
                                                                value: field.value,
                                                                name: field.name,
                                                                onChange: (
                                                                    value
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        `userChildren.${index}.referringProvider`,
                                                                        value
                                                                    );
                                                                    setTimeout(
                                                                        () => {
                                                                            form.setFieldError(
                                                                                `userChildren.${index}.referringProvider`,
                                                                                ''
                                                                            );
                                                                        },
                                                                        0
                                                                    );
                                                                    if (
                                                                        employeeData?.userChildren
                                                                    ) {
                                                                        setFieldValue(
                                                                            `userChildren.${index}.edited`,
                                                                            true
                                                                        );
                                                                    }
                                                                },
                                                            }}
                                                            handleBlur={
                                                                setFieldTouched
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="cellPhone w-[20rem] mx-12 mt-3">
                                                <Field
                                                    disabled={isDisabled}
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-7 rounded-none focus:ring-transparent"
                                                    label="Referring Provider Cell Phone"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id={`userChildren.${index}.referringProviderCellPhone`}
                                                    name={`userChildren.${index}.referringProviderCellPhone`}
                                                    component={Input}
                                                    value={
                                                        children?.referringProviderCellPhone
                                                    }
                                                    onChange={(e: any) => {
                                                        handleNumber(
                                                            e,
                                                            handleChange
                                                        );
                                                        if (
                                                            employeeData?.userChildren
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.edited`,
                                                                true
                                                            );
                                                        }
                                                    }}
                                                    onKeyDown={(e: any) => {
                                                        handleKeyPress(
                                                            e,
                                                            values,
                                                            setSubmitting
                                                        );
                                                    }}
                                                    placeholder="Enter number"
                                                />
                                            </div>
                                            <div className="fexNumber w-[20rem] mt-3">
                                                <Field
                                                    disabled={isDisabled}
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-7 rounded-none focus:ring-transparent"
                                                    label="Referring Provider Fax Number"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id={`userChildren.${index}.referringProviderFaxNumber`}
                                                    name={`userChildren.${index}.referringProviderFaxNumber`}
                                                    component={Input}
                                                    value={
                                                        children?.referringProviderFaxNumber
                                                    }
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                        if (
                                                            employeeData?.userChildren
                                                        ) {
                                                            setFieldValue(
                                                                `userChildren.${index}.edited`,
                                                                true
                                                            );
                                                        }
                                                    }}
                                                    onKeyDown={(e: any) => {
                                                        handleKeyPress(
                                                            e,
                                                            values,
                                                            setSubmitting
                                                        );
                                                    }}
                                                    placeholder="Enter number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            <AddChildButton
                                values={values}
                                push={push}
                                handleSubmit={handleSubmit}
                                setFocus={() => setFocus(true)}
                            />
                        </div>
                    )}
                </FieldArray>
            </div>
        </form>
    );
}
