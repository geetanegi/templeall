/* eslint-disable max-lines */
/* eslint-disable max-len */
import * as React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import Input from '../../Generics/Inputs/Input';
import { Field, FieldProps, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Datepicker from 'react-tailwindcss-datepicker';
import defaultRateApi from '../../../api/services/Rate/addDefaultRate.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import {
    getActiveAsync,
    savingTabData,
} from '../../../redux/slice/MineSlice/getMine';
import { clearData } from '../../../redux/slice/DefaultRate/getDefaultRateById';
import { useLocation } from 'react-router-dom';
import edit from '../../../assets/img/edit.svg';
import Select from '../../Generics/Select';

interface AddDefaultRateProps {
    open: boolean;
    onClose: () => void;
}
export default function AddDefaultRate({
    open,
    onClose,
}: AddDefaultRateProps): React.JSX.Element {
    const location = useLocation();
    const dispatch = useDispatch<any>();
    const authData = useSelector(
        ({ editAuthorizationCode }: any) => editAuthorizationCode?.value
    );
    const feeScheduleData = useSelector(
        ({ feeSchedule }: any) => feeSchedule?.value?.data
    );
    const servicePlacesData = useSelector(
        ({ servicePlacesSlice }: any) => servicePlacesSlice?.location
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const defaultRate = useSelector(
        ({ EditDefaultRate }: any) => EditDefaultRate?.defaultRate
    );
    const titleDescription =
        location?.state?.description || authData?.description;
    interface Values {
        feeSchedule: string;
        billedRate: string;
        agreedRate: string;
        startDate: string;
        endDate: string;
        modifier1: string;
        modifier2: string;
        modifier3: string;
        modifier4: string;
        modifierName: string;
        location: any;
    }
    const startDateObj = defaultRate?.id
        ? {
              startDate: defaultRate?.startDate,
              endDate: defaultRate?.startDate,
          }
        : '';
    const endDateObj = defaultRate?.id
        ? {
              startDate: defaultRate?.endDate,
              endDate: defaultRate?.endDate,
          }
        : '';
    const locationObj = defaultRate?.id
        ? {
              label: defaultRate?.location?.service,
              value: defaultRate?.location?.id,
          }
        : '';
    const initialValues: any = {
        feeSchedule: defaultRate?.feeSchedule?.id || '',
        billedRate: defaultRate?.billedRate || '',
        agreedRate: defaultRate?.agreedRate || '',
        startDate: startDateObj,
        endDate: endDateObj,
        modifier1: defaultRate?.modifier1 || '',
        modifier2: defaultRate?.modifier2 || '',
        modifier3: defaultRate?.modifier3 || '',
        modifier4: defaultRate?.modifier4 || '',
        modifierName: defaultRate?.modifierName || '',
        location: locationObj,
    };
    const handleRateChange = (e: any, handleChange: any): void => {
        const value = e.target.value;
        const regex = /^[0-9]*\.?[0-9]*$/;

        if (regex.test(value)) {
            handleChange(e);
        }
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        const payload = {
            ...values,
            startDate: (values?.startDate as any).startDate,
            endDate: (values?.endDate as any).endDate,
            certification: '',
            id: defaultRate?.id || '',
            authorizationCodeId:
                location?.state?.code.toString() || authData?.id?.toString(),
            location: values?.location,
        };
        const data = {
            heading: '',
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'AUTHORIZED_CODE',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        const data1 = {
            heading: '',
            authorizationCodeId: location?.state?.id,
            roleId: userPermission?.userRoles?.data?.roleId,
            type: 'Default Rate',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            appointmentWith: '1',
            publishStatus: 'Published',
        };
        const res = await defaultRateApi.saveDefaultRate(payload);
        if (!res?.data?.error) {
            if (defaultRate?.id) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Default rate details edited successfully.',
                        description: '',
                    })
                );
                dispatch(clearData());
                dispatch(getActiveAsync(data1));
            } else {
                dispatch(
                    openNotification({
                        success: true,
                        title: res?.data?.data,
                        description: '',
                    })
                );
                dispatch(getActiveAsync(data));
                dispatch(savingTabData({ tab: 'AUTHORIZED_CODE' }));
            }
            onClose();
        } else {
            dispatch(
                openNotification({
                    success: false,
                    title: res?.data?.description,
                    description: '',
                })
            );
            onClose();
        }
    };
    const isDisabled = (values: any): boolean => {
        return !values?.billedRate || !values?.feeSchedule;
    };

    return (
        <Modal open={open} id={'add-default-rate'} expandModal={false}>
            <ModalHeader
                title={
                    <span>
                        {defaultRate?.id && (
                            <img
                                src={edit}
                                alt="edit icon"
                                className="inline mr-2"
                            />
                        )}
                        {defaultRate?.id
                            ? 'Edit - Default Rate'
                            : 'Default Rate'}{' '}
                        - {authData?.code || location?.state?.code}{' '}
                        {titleDescription || ''}
                    </span>
                }
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <div className="w-[52rem] my-1">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validateOnChange
                        enableReinitialize={true}
                    >
                        {(props: any) => {
                            const {
                                values,
                                handleSubmit,
                                handleChange,
                                setFieldValue,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="flex Client">
                                        <div className="w-[20rem] mx-2">
                                            <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                Fee Schedule
                                            </label>
                                            <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                *
                                            </label>
                                            <div className=" my-1 ">
                                                {feeScheduleData?.map(
                                                    (data: any, index: any) => (
                                                        <div key={index}>
                                                            <Field
                                                                className="focus:ring-transparent"
                                                                type="radio"
                                                                id={`feeSchedule-${data.id}`}
                                                                name="feeSchedule"
                                                                value={data?.id}
                                                                checked={
                                                                    values.feeSchedule ===
                                                                    data.id
                                                                }
                                                                onChange={() =>
                                                                    setFieldValue(
                                                                        'feeSchedule',
                                                                        data?.id
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                className="text-sm  text-zinc-600 font-['lato'] m-2"
                                                                htmlFor={`feeSchedule-${data.name}`}
                                                            >
                                                                {data?.name}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-[13rem] ml-16">
                                            <div className="my-2">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    label="Modifier Name"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="modifierName"
                                                    name="modifierName"
                                                    component={Input}
                                                    value={values.modifierName}
                                                    onChange={handleChange}
                                                    placeholder="Enter name"
                                                />
                                            </div>
                                            <label
                                                htmlFor="Modifier"
                                                className="font-[lato] text-sm font-semibold text-zinc-600"
                                            >
                                                Modifiers
                                            </label>
                                            <div className="flex mb-2">
                                                <div className="w-[6rem] mr-1 ">
                                                    <Field
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent p-1"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="modifier1"
                                                        name="modifier1"
                                                        component={Input}
                                                        value={values.modifier1}
                                                        onChange={handleChange}
                                                        disabled={
                                                            !values?.modifierName
                                                        }
                                                    />
                                                </div>
                                                <div className="w-[6rem] mx-1">
                                                    <Field
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent p-1"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="modifier2"
                                                        name="modifier2"
                                                        component={Input}
                                                        value={values.modifier2}
                                                        onChange={handleChange}
                                                        disabled={
                                                            !values?.modifierName
                                                        }
                                                    />
                                                </div>
                                                <div className="w-[6rem] mx-1">
                                                    <Field
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent p-1"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="modifier3"
                                                        name="modifier3"
                                                        component={Input}
                                                        value={values.modifier3}
                                                        onChange={handleChange}
                                                        disabled={
                                                            !values?.modifierName
                                                        }
                                                    />
                                                </div>
                                                <div className="w-[6rem] mx-1">
                                                    <Field
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent p-1"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="modifier4"
                                                        name="modifier4"
                                                        component={Input}
                                                        value={values.modifier4}
                                                        onChange={handleChange}
                                                        disabled={
                                                            !values?.modifierName
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="location my-5">
                                                <Field
                                                    placeholder="Select..."
                                                    onChange={(e: any) => {
                                                        handleChange(e);
                                                    }}
                                                    label="Location"
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    id="location"
                                                    name="location"
                                                    className="border-b-2 border-gray-200 w-full bg-white  rounded-none border-x-0 border-t-0 pb-1 outline-none"
                                                    as="select"
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: FieldProps) => (
                                                        <Select
                                                            label={'Location'}
                                                            options={servicePlacesData?.map(
                                                                (
                                                                    data: any
                                                                ) => ({
                                                                    label: data?.service,
                                                                    value: data?.id,
                                                                })
                                                            )}
                                                            onChange={(
                                                                selectedOption: any
                                                            ) => {
                                                                form.setFieldValue(
                                                                    'location',
                                                                    selectedOption?.[0]
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        form.setFieldError(
                                                                            'location',
                                                                            ''
                                                                        );
                                                                    },
                                                                    0
                                                                );
                                                            }}
                                                            value={field.value}
                                                            showSearch={true}
                                                            multi={false}
                                                            placeholder={
                                                                'Select'
                                                            }
                                                            inputClassName={
                                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="Billed Rate $"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="billedRate"
                                                name="billedRate"
                                                component={Input}
                                                value={values.billedRate}
                                                placeholder="Enter rate"
                                                onChange={(e: any) =>
                                                    handleRateChange(
                                                        e,
                                                        handleChange
                                                    )
                                                }
                                            />
                                            <div className="my-3">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    label="Agreed Rate $"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="agreedRate"
                                                    name="agreedRate"
                                                    component={Input}
                                                    value={values.agreedRate}
                                                    placeholder="Enter rate"
                                                    onChange={(e: any) =>
                                                        handleRateChange(
                                                            e,
                                                            handleChange
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="flex">
                                                <div className="startDate w-[15rem] py-3 mt-2">
                                                    <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Start Date
                                                    </label>
                                                    <Field
                                                        className="border "
                                                        label="Dob"
                                                        name="startDate"
                                                        id="startDate"
                                                        isRequired={false}
                                                        onChange={handleChange}
                                                    >
                                                        {() => (
                                                            <Datepicker
                                                                toggleClassName="absolute rounded-r-lg text-blue-500
                                                        left-0 h-full px-3 focus:outline-none
                                                         disabled:opacity-40 disabled:cursor-not-allowed "
                                                                inputClassName="outline-none py-[0.5rem] px-[2rem] w-[13rem] px-3 border-2 h-8 border-neutral-300 rounded-md text-sm"
                                                                value={
                                                                    values?.startDate
                                                                }
                                                                placeholder="  dd/mm/yyyy"
                                                                onChange={(
                                                                    date
                                                                ) => {
                                                                    const newValues =
                                                                        {
                                                                            ...values,
                                                                            startDate:
                                                                                date,
                                                                        };

                                                                    props.setValues(
                                                                        newValues
                                                                    );
                                                                }}
                                                                popoverDirection="up"
                                                                useRange={false}
                                                                asSingle={true}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className="endDate w-[15rem] py-3 mt-2 ml-3">
                                                    <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        End Date
                                                    </label>
                                                    <Field
                                                        className="border "
                                                        label="Dob"
                                                        name="endDate"
                                                        id="endDate"
                                                        isRequired={false}
                                                        onChange={handleChange}
                                                    >
                                                        {() => (
                                                            <Datepicker
                                                                toggleClassName="absolute rounded-r-lg text-blue-500
                                                        left-0 h-full px-3 focus:outline-none
                                                         disabled:opacity-40 disabled:cursor-not-allowed "
                                                                inputClassName="outline-none py-[0.5rem] px-[2rem] w-[13rem] px-3 border-2 h-8 border-neutral-300 rounded-md text-sm"
                                                                value={
                                                                    values?.endDate
                                                                }
                                                                placeholder="  dd/mm/yyyy"
                                                                onChange={(
                                                                    date
                                                                ) => {
                                                                    const newValues =
                                                                        {
                                                                            ...values,
                                                                            endDate:
                                                                                date,
                                                                        };

                                                                    props.setValues(
                                                                        newValues
                                                                    );
                                                                }}
                                                                popoverDirection="up"
                                                                minDate={
                                                                    values
                                                                        ?.startDate
                                                                        ?.startDate
                                                                }
                                                                useRange={false}
                                                                asSingle={true}
                                                                disabled={
                                                                    !values
                                                                        ?.startDate
                                                                        ?.startDate
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <CreateClientModalActions
                                        onClose={() => {
                                            onClose();
                                            dispatch(clearData());
                                        }}
                                        isDisabled={isDisabled(values)}
                                        handleSubmit={handleSubmit}
                                    />
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </ModalBody>
        </Modal>
    );
}
