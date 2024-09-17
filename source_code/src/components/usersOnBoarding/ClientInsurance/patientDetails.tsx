import { Field } from 'formik';
import * as React from 'react';
import Input from '../../Generics/Inputs/Input';
import { Gender, Relation } from '../../../constants/userOnboarding';
import Datepicker from 'react-tailwindcss-datepicker';
import { savingChildInfo } from '../../../redux/slice/ClientInsurance/ClientInsurance';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../Generics/Select';
export default function PatientDetails({
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
    isDisabled?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const childInfo = useSelector(
        ({ clientInsurance }: any) => clientInsurance?.child
    );
    const handleChildInfo = (child: any): void => {
        const childData = childInfo?.find((item: any) => item?.id === child);
        dispatch(savingChildInfo(childData));
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
            <h1 className="flex font-[lato] font-bold mt-4">Patient Details</h1>
            <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
            <div className="SelectPatient  w-[50rem] my-3">
                <Field
                    placeholder="Select patient"
                    label={'Select Patient'}
                    autoComplete="off"
                    isRequired={true}
                    showSearch={true}
                    id="userChildId"
                    name="userChildId"
                    value={values?.userChildId}
                    component={Select}
                    inputClassName={
                        'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                    }
                    options={childInfo?.map((data: any) => ({
                        label: `${data?.firstName} ${data?.lastName}`,
                        value: data?.id,
                    }))}
                    onChange={(selectedChild: any) => {
                        setFieldValue('userChildId', selectedChild);
                        handleChildInfo(selectedChild[0]);
                    }}
                    disabled={isDisabled}
                ></Field>
            </div>
            <div className="patientName flex my-4">
                <div className="firstName w-[27rem]">
                    <Field
                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent w-[20rem]"
                        label=" First Name"
                        autoComplete="off"
                        isRequired={true}
                        id="childFirstName"
                        name="childFirstName"
                        component={Input}
                        value={values.childFirstName}
                        onChange={handleChange}
                        placeholder="Enter name"
                        disabled={true}
                    />
                </div>
                <div className="lastNam w-[27rem] ml-7">
                    <Field
                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                        label="Last Name"
                        autoComplete="off"
                        isRequired={true}
                        id="childLastName"
                        name="childLastName"
                        component={Input}
                        value={values.childLastName}
                        onChange={handleChange}
                        placeholder="Enter name"
                        disabled={true}
                    />
                </div>
            </div>
            <div className="patientGender patientDob flex my-3">
                <div className="w-[37rem]">
                    <Field
                        placeholder="Select"
                        label={'Gender'}
                        autoComplete="off"
                        isRequired={true}
                        isDisabled={true}
                        id="childGender"
                        name="childGender"
                        value={values?.childGender}
                        component={Select}
                        inputClassName={
                            'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                        }
                        options={Gender?.map((data: any) => ({
                            label: data?.gender,
                            value: data?.gender,
                        }))}
                        onChange={(selectedGender: any) => {
                            setFieldValue('childGender', selectedGender[0]);
                        }}
                    ></Field>
                </div>
                <div className="subscriberDob  ml-10">
                    <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                        Date of Birth
                    </label>
                    <label className="text-red-700 text-lg font-normal font-['Lato']">
                        *
                    </label>
                    <Field
                        className="border "
                        label="Date of Birth"
                        name="ChildDob"
                        id="ChildDob"
                        isRequired={true}
                        onChange={handleChange}
                        disabled={true}
                    >
                        {() => (
                            <Datepicker
                                disabled={true}
                                toggleClassName="absolute rounded-r-lg text-blue-500
                                                        left-0 h-full px-3 focus:outline-none
                                                         disabled:opacity-40 disabled:cursor-not-allowed "
                                inputClassName="outline-none py-[0.5rem] px-[2rem] w-[17rem] px-3 border-2 h-8 border-neutral-300 rounded-md text-sm"
                                value={values?.ChildDob}
                                placeholder="  dd/mm/yyyy"
                                onChange={(date) => {
                                    const newValues = {
                                        ...values,
                                        ChildDob: date,
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
            <div className="relationWithSubscriber  w-[50rem] my-3">
                <Field
                    placeholder="Select..."
                    label={'Relationship with Subscriber'}
                    autoComplete="off"
                    isRequired={true}
                    id="relationWithSubscriber"
                    name="relationWithSubscriber"
                    value={values?.relationWithSubscriber}
                    component={Select}
                    inputClassName={
                        'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                    }
                    options={Relation?.map((data: any) => ({
                        label: data?.name,
                        value: data?.name,
                    }))}
                    onChange={(selectedOption: any) => {
                        setFieldValue(
                            'relationWithSubscriber',
                            selectedOption[0]
                        );
                    }}
                    isDisabled={isDisabled}
                ></Field>
            </div>
            <div className="w-[50rem] my-4">
                <Field
                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent "
                    label="Insured ID"
                    autoComplete="off"
                    isRequired={false}
                    id="insuredId"
                    name="insuredId"
                    component={Input}
                    value={values.insuredId}
                    onChange={(e: any) => handleRateChange(e)}
                    placeholder="Enter ID"
                    disabled={isDisabled}
                />
            </div>
        </form>
    );
}
