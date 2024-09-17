import { Field } from 'formik';
import * as React from 'react';
import Input from '../../Generics/Inputs/Input';
import { Gender } from '../../../constants/userOnboarding';
import Datepicker from 'react-tailwindcss-datepicker';
import { State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearData,
    fetchParentInfoCall,
} from '../../../redux/slice/ClientInsurance/ClientInsurance';
import { useState } from 'react';
import Select from '../../Generics/Select';
export default function SubscriberDetails({
    values,
    handleChange,
    props,
    handleSubmit,
    setFieldValue,
    isDisabled,
}: {
    values: any;
    handleChange: any;
    props: any;
    handleSubmit: any;
    setFieldValue: any;
    isDisabled: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const allState: any = State?.getStatesOfCountry('US');
    const userId = useSelector(
        ({ getEmployeeById }: any) => getEmployeeById?.value?.userId
    );
    const insuranceDetail = useSelector(({ insurance }: any) => insurance);
    const [isCheck, setIsCheck] = useState(false);
    const handleCheckboxChange = (e: any): void => {
        setIsCheck(e.target.checked);
        handleChange(e);
        if (e.target.checked) {
            dispatch(
                fetchParentInfoCall({
                    parentId: userId || insuranceDetail?.clientId,
                })
            );
        } else {
            dispatch(clearData());
        }
    };
    const handleRateChange = (e: any): void => {
        const value = e.target.value;
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(value)) {
            handleChange(e);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="flex font-[lato] font-bold mt-4">
                Subscriber Details
            </h1>
            <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
            <div className="flex mx-6 my-12 float-right ">
                <Field
                    className="border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] focus:ring-transparent"
                    type="checkbox"
                    name="useParentDetails"
                    id="useParentDetails"
                    checked={values?.useParentDetails}
                    onChange={(e: any) => handleCheckboxChange(e)}
                    disabled={isDisabled}
                />
                <label
                    htmlFor="useParentDetails"
                    className="text-sm ms-2 font-[lato]"
                >
                    {`  Use parent's information`}
                </label>
            </div>
            <div className="subscriberName flex my-6">
                <div className="firstName w-[27rem]">
                    <Field
                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent w-[20rem]"
                        label=" First Name"
                        autoComplete="off"
                        isRequired={true}
                        id="subscriberFirstName"
                        name="subscriberFirstName"
                        component={Input}
                        value={values.subscriberFirstName}
                        onChange={handleChange}
                        placeholder="Enter name"
                        disabled={isCheck || isDisabled}
                    />
                </div>
                <div className="lastNam w-[27rem] ml-7">
                    <Field
                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                        label="Last Name"
                        autoComplete="off"
                        isRequired={true}
                        id="subscriberLastName"
                        name="subscriberLastName"
                        component={Input}
                        value={values.subscriberLastName}
                        onChange={handleChange}
                        placeholder="Enter name"
                        disabled={isCheck || isDisabled}
                    />
                </div>
            </div>
            <div className="subscriberGender subscriberDob flex my-3">
                <div className="w-[37rem]">
                    <Field
                        label={'Gender'}
                        autoComplete="off"
                        isRequired={true}
                        isDisabled={isCheck || isDisabled}
                        id="subscriberGender"
                        name="subscriberGender"
                        value={values?.subscriberGender}
                        component={Select}
                        inputClassName={
                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                        }
                        options={Gender?.map((data: any) => ({
                            label: data?.gender,
                            value: data?.gender,
                        }))}
                        onChange={(selectedGender: any) => {
                            setFieldValue(
                                'subscriberGender',
                                selectedGender[0]
                            );
                        }}
                    ></Field>
                </div>
                <div className="subscriberDob  ml-10">
                    <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                        Date of Birth
                    </label>
                    <Field
                        className="border "
                        label="Date of Birth"
                        name="subscriberDob"
                        id="subscriberDob"
                        isRequired={false}
                        onChange={handleChange}
                        disabled={isCheck || isDisabled}
                    >
                        {() => (
                            <Datepicker
                                disabled={isCheck || isDisabled}
                                toggleClassName="absolute rounded-r-lg text-blue-500
                        left-0 h-full px-3 focus:outline-none
                         disabled:opacity-40 disabled:cursor-not-allowed "
                                inputClassName="outline-none py-[0.5rem] px-[2rem] w-[17rem] px-3 border-2 h-8 border-neutral-300 rounded-md text-sm"
                                value={values?.subscriberDob}
                                placeholder="  dd/mm/yyyy"
                                onChange={(date) => {
                                    const newValues = {
                                        ...values,
                                        subscriberDob: date,
                                    };
                                    props.setValues(newValues);
                                }}
                                popoverDirection="down"
                                maxDate={new Date()}
                                useRange={false}
                                asSingle={true}
                            />
                        )}
                    </Field>
                </div>
            </div>
            <div className="w-[50rem]">
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                    label="Policy/Group/FECA Number"
                    autoComplete="off"
                    isRequired={false}
                    id="policyGroupFeca"
                    name="policyGroupFeca"
                    component={Input}
                    value={values.policyGroupFeca}
                    onChange={(e: any) => handleRateChange(e)}
                    placeholder="Enter number"
                    disabled={isDisabled}
                />
                <div className="groupName  w-[50rem] my-3">
                    <Field
                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                        label="Group Name"
                        autoComplete="off"
                        isRequired={false}
                        id="groupName"
                        name="groupName"
                        component={Input}
                        value={values.groupName}
                        onChange={handleChange}
                        placeholder="Enter group name"
                        disabled={isDisabled}
                    />
                </div>
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                    label="Insured ID"
                    autoComplete="off"
                    isRequired={false}
                    id="subscriberInsuredId"
                    name="subscriberInsuredId"
                    component={Input}
                    value={values.subscriberInsuredId}
                    onChange={(e: any) => handleRateChange(e)}
                    placeholder="Enter ID"
                    disabled={isDisabled}
                />
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                    label="Address Line 1"
                    autoComplete="off"
                    isRequired={true}
                    id="subscriberAddressLine1"
                    name="subscriberAddressLine1"
                    component={Input}
                    value={values.subscriberAddressLine1}
                    onChange={handleChange}
                    placeholder="Enter address"
                    disabled={isCheck || isDisabled}
                />
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                    label="Address Line 2"
                    autoComplete="off"
                    isRequired={false}
                    id="subscriberAddressLine2"
                    name="subscriberAddressLine2"
                    component={Input}
                    value={values.subscriberAddressLine2}
                    onChange={handleChange}
                    placeholder="Enter address"
                    disabled={isCheck || isDisabled}
                />
            </div>
            <div className=" location flex my-3 w-[70rem]">
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-7 rounded-none focus:ring-transparent mb-6"
                    label="City"
                    autoComplete="off"
                    isRequired={true}
                    id="subscriberCity"
                    name="subscriberCity"
                    component={Input}
                    value={values.subscriberCity}
                    onChange={handleChange}
                    placeholder="Enter city"
                    disabled={isCheck || isDisabled}
                />
                <div className="w-[17rem] mx-8">
                    <Field
                        label={'State'}
                        autoComplete="off"
                        placeholder="Select state"
                        isRequired={true}
                        showSearch={true}
                        isDisabled={isCheck || isDisabled}
                        id="subscriberState"
                        name="subscriberState"
                        component={Select}
                        inputClassName={
                            'border-0 border-b border-gray-400 h-7 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                        }
                        value={values?.subscriberState}
                        options={allState?.map((data: any) => ({
                            label: data?.name,
                            value: data?.name,
                        }))}
                        onChange={(selectedStateValue: any) => {
                            setFieldValue(
                                'subscriberState',
                                selectedStateValue[0]
                            );
                        }}
                    ></Field>
                </div>
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-7 rounded-none focus:ring-transparent mb-6"
                    label="Zip/Postal Code"
                    autoComplete="off"
                    isRequired={true}
                    id="subscriberPostalCode"
                    name="subscriberPostalCode"
                    component={Input}
                    value={values.subscriberPostalCode}
                    onChange={(e: any) => handleRateChange(e)}
                    placeholder="Enter zip code"
                    disabled={isCheck || isDisabled}
                />
            </div>
        </form>
    );
}
