import { Field, FieldProps, Formik } from 'formik';
import React, { useRef } from 'react';
import { parameterData } from '../../constants/AddParameter';
import SelectComponent from '../Generics/Inputs/Select';
import Input from '../Generics/Inputs/Input';

interface Values {
    organizationName: string;
    emailAddress: string;
    state: string;
    city: string;
    Zip: string;
    completeAddress: string;
    insuranceSupported: string;
    servicesSupported: string;
    firstName: string;
    LastName: string;
    adminEmailAddress: string;
    cellPhone: string;
    workPhone: string;
}

export default function OrganizationsForm(): React.JSX.Element {
    const initialValues: Values = {
        organizationName: '',
        emailAddress: '',
        state: '',
        city: '',
        Zip: '',
        completeAddress: '',
        insuranceSupported: '',
        servicesSupported: '',
        firstName: '',
        LastName: '',
        adminEmailAddress: '',
        cellPhone: '',
        workPhone: '',
    };
    const ref = useRef<any>(null);
    const handleSubmitForm = (): void => {};
    return (
        <div>
            <div>
                <h6>Organization Onboarding Form</h6>
            </div>
            <Formik
                initialValues={initialValues}
                innerRef={ref}
                onSubmit={handleSubmitForm}
                validateOnChange
            >
                {(props: any) => {
                    const {
                        handleSubmit,
                        handleChange,
                        setFieldTouched,
                        touched,
                        errors,
                        Values,
                    } = props;
                    return (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="flex">
                                    <div className="px-2 w-52 ml-5">
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="status"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <SelectComponent
                                                    isRequired={false}
                                                    isSearchable={false}
                                                    label={'Current Phase :'}
                                                    options={parameterData}
                                                    form={{
                                                        touched,
                                                        errors,
                                                    }}
                                                    field={{
                                                        value: field.value,
                                                        name: field.name,
                                                        onChange: (value) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                value
                                                            );
                                                            handleSubmitForm();
                                                        },
                                                    }}
                                                    handleBlur={setFieldTouched}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div>
                                        <Field
                                            label={'organization Name'}
                                            isRequired={false}
                                            id="organizationName"
                                            name="organizationName"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.organizationName}
                                            placeholder="organizationName"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'email Address'}
                                            isRequired={false}
                                            id="emailAddress"
                                            name="emailAddress"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.emailAddress}
                                            placeholder="emailAddress"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'state'}
                                            isRequired={false}
                                            id="state"
                                            name="state"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.state}
                                            placeholder="state"
                                        />
                                    </div>

                                    <div>
                                        <Field
                                            label={'City'}
                                            isRequired={false}
                                            id="city"
                                            name="city"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.city}
                                            placeholder="city"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'ZIP'}
                                            isRequired={false}
                                            id="Zip"
                                            name="Zip"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.Zip}
                                            placeholder="Zip"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'complete Address'}
                                            isRequired={false}
                                            id="completeAddress"
                                            name="completeAddress"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.completeAddress}
                                            placeholder="completeAddress"
                                        />
                                    </div>
                                    <div className="px-2 w-52 ml-5">
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="status"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <SelectComponent
                                                    isRequired={false}
                                                    isSearchable={false}
                                                    label={
                                                        'insuranceSupported :'
                                                    }
                                                    options={parameterData}
                                                    form={{
                                                        touched,
                                                        errors,
                                                    }}
                                                    field={{
                                                        value: field.value,
                                                        name: field.name,
                                                        onChange: (value) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                value
                                                            );
                                                            handleSubmitForm();
                                                        },
                                                    }}
                                                    handleBlur={setFieldTouched}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className="px-2 w-52 ml-5">
                                        <Field
                                            autoComplete="off"
                                            isRequired={true}
                                            name="status"
                                        >
                                            {({ field, form }: FieldProps) => (
                                                <SelectComponent
                                                    isRequired={false}
                                                    isSearchable={false}
                                                    label={
                                                        'Services Supported:'
                                                    }
                                                    options={parameterData}
                                                    form={{
                                                        touched,
                                                        errors,
                                                    }}
                                                    field={{
                                                        value: field.value,
                                                        name: field.name,
                                                        onChange: (value) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                value
                                                            );
                                                            handleSubmitForm();
                                                        },
                                                    }}
                                                    handleBlur={setFieldTouched}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div>
                                        <Field
                                            label={'First Name '}
                                            isRequired={false}
                                            id="firstName"
                                            name="firstName"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.firstName}
                                            placeholder="firstName"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'Last Name '}
                                            isRequired={false}
                                            id="lastName"
                                            name="lastName"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.lastName}
                                            placeholder="lastName"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'EmailAaddress'}
                                            isRequired={false}
                                            id="adminEmailAddress"
                                            name="adminEmailAddress"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.adminEmailAddress}
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'=Cell Phone'}
                                            isRequired={false}
                                            id="cellPhone"
                                            name="cellPhone"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.cellPhone}
                                            placeholder="cellPhone"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            label={'Work Phone'}
                                            isRequired={false}
                                            id="workPhone"
                                            name="workPhone"
                                            className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                            component={Input}
                                            onChange={handleChange}
                                            value={Values?.workPhone}
                                            placeholder="workPhone"
                                        />
                                    </div>
                                </div>
                            </form>
                        </>
                    );
                }}
            </Formik>
        </div>
    );
}
