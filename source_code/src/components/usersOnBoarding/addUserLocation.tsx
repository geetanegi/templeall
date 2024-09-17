import { Field } from 'formik';
import * as React from 'react';
import Input from '../Generics/Inputs/Input';
import { State } from 'country-state-city';
import Select from '../Generics/Select';
export default function AddUserLocation({
    values,
    handleChange,
    handleKeyPress,
    setSubmitting,
    setFieldTouched,
    isDisabled,
    setFieldValue,
}: {
    values: any;
    handleChange: any;
    handleKeyPress: any;
    setSubmitting: any;
    setFieldTouched: any;
    isDisabled: boolean;
    setFieldValue: any;
}): React.JSX.Element {
    const allState: any = State?.getStatesOfCountry('US');
    return (
        <div>
            <h1 className="font-[lato] font-semibold mt-4">Location Details</h1>
            <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
            <div className="lastName w-[45rem] py-2 mt-3">
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label="Address Line 1"
                    autoComplete="off"
                    isRequired={true}
                    id="primaryAddress1"
                    name="primaryAddress1"
                    data-testid="primaryAddress1-input"
                    component={Input}
                    value={values.primaryAddress1}
                    onChange={handleChange}
                    onKeyDown={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleKeyPress(e, values, setSubmitting);
                        setFieldTouched('primaryAddress1', true, false);
                    }}
                    placeholder="Enter address"
                    disabled={isDisabled}
                />
            </div>
            <div className="lastName w-[45rem] py-2 mt-3">
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label="Address Line 2"
                    autoComplete="off"
                    isRequired={false}
                    id="primaryAddress2"
                    name="primaryAddress2"
                    data-testid="primaryAddress2-input"
                    component={Input}
                    value={values.primaryAddress2}
                    onChange={handleChange}
                    onKeyDown={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleKeyPress(e, values, setSubmitting);
                        setFieldTouched('primaryAddress2', true, false);
                    }}
                    placeholder="Enter address"
                    disabled={isDisabled}
                />
            </div>
            <div className="city w-[45rem] py-1 mt-3">
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label="City"
                    autoComplete="off"
                    isRequired={true}
                    id="personalCity"
                    name="personalCity"
                    data-testid="personalCity-input"
                    component={Input}
                    value={values.personalCity}
                    onChange={handleChange}
                    onKeyDown={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleKeyPress(e, values, setSubmitting);
                        setFieldTouched('personalCity', true, false);
                    }}
                    placeholder="Enter city"
                    disabled={isDisabled}
                />
            </div>
            <div className="state w-[45rem] py-2 mt-3">
                <Field
                    label="State"
                    inputClassName={
                        'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                    }
                    placeholder={'Select'}
                    name="personalState"
                    autoComplete="off"
                    isRequired={true}
                    showSearch={true}
                    component={Select}
                    value={values?.personalState}
                    options={allState.map((data: any) => ({
                        label: data?.name,
                        value: data?.name,
                    }))}
                    onChange={(selectedOption: any) => {
                        if (selectedOption?.length) {
                            setFieldValue('personalState', selectedOption?.[0]);
                        }
                    }}
                    isDisabled={isDisabled}
                />
            </div>
            <div className="zipCode  w-[45rem] py-2 mt-3">
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label="Zip/Postal Code"
                    autoComplete="off"
                    isRequired={true}
                    id="personalPostalCode"
                    name="personalPostalCode"
                    data-testid="personalPostalCode-input"
                    component={Input}
                    value={values.personalPostalCode}
                    onChange={handleChange}
                    onKeyDown={(e: any) => {
                        handleKeyPress(e, values, setSubmitting);
                        setFieldTouched('personalPostalCode', true, false);
                    }}
                    placeholder="Enter postal code"
                    disabled={isDisabled}
                />
            </div>
            <h1 className="font-[lato] font-semibold mt-6">
                Work Location Details
            </h1>
            <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
            <div className="lastName w-[45rem] py-2 mt-3">
                <Field
                    disabled={isDisabled}
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label="Address Line 1"
                    autoComplete="off"
                    isRequired={true}
                    id="mailingAddress1"
                    name="mailingAddress1"
                    data-testid="mailingAddress1-input"
                    component={Input}
                    value={values.mailingAddress1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setFieldTouched('mailingAddress1', true, false);
                    }}
                    onKeyDown={(e: any) => {
                        handleKeyPress(e, values, setSubmitting);
                    }}
                    placeholder="Enter address"
                />
            </div>
            <div className="lastName w-[45rem] py-2 mt-3">
                <Field
                    disabled={isDisabled}
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label="Address Line 2"
                    autoComplete="off"
                    isRequired={false}
                    id="mailingAddress2"
                    name="mailingAddress2"
                    data-testid="mailingAddress2-input"
                    component={Input}
                    value={values.mailingAddress2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        setFieldTouched('mailingAddress2', true, false);
                    }}
                    onKeyDown={(e: any) => {
                        handleKeyPress(e, values, setSubmitting);
                    }}
                    placeholder="Enter address"
                />
            </div>
            <div className="city w-[45rem] my-1 mt-4">
                <Field
                    disabled={isDisabled}
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label="City"
                    autoComplete="off"
                    isRequired={true}
                    id="workCity"
                    name="workCity"
                    data-testid="workCity-input"
                    component={Input}
                    value={values.workCity}
                    onChange={(e: any) => {
                        handleChange(e);
                        setFieldTouched('workCity', true, false);
                    }}
                    onKeyDown={(e: any) => {
                        handleKeyPress(e, values, setSubmitting);
                    }}
                    placeholder="Enter city"
                />
            </div>
            <div className="state w-[45rem] my-2 mt-4">
                <Field
                    disabled={isDisabled}
                    label="State"
                    placeholder={'Select'}
                    inputClassName={
                        'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                    }
                    name="workState"
                    autoComplete="off"
                    isRequired={true}
                    showSearch={true}
                    component={Select}
                    value={values?.workState}
                    options={allState.map((data: any) => ({
                        label: data?.name,
                        value: data?.name,
                    }))}
                    onChange={(selectedOption: any) => {
                        if (selectedOption?.length) {
                            setFieldValue('workState', selectedOption?.[0]);
                        }
                    }}
                />
            </div>
            <div className="workPostalCode lastName w-[45rem] my-2 mt-4">
                <Field
                    disabled={isDisabled}
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                    label=" Zip/Postal Code"
                    autoComplete="off"
                    isRequired={true}
                    id="workPostalCode"
                    name="workPostalCode"
                    data-testid="workPostalCode-input"
                    component={Input}
                    value={values.workPostalCode}
                    onChange={handleChange}
                    onKeyDown={(e: any) => {
                        handleKeyPress(e, values, setSubmitting);
                        setFieldTouched('workPostalCode', true, false);
                    }}
                    placeholder="Enter postal code"
                />
            </div>
        </div>
    );
}
