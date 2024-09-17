import React, { useRef, useState, useEffect } from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    SetAvailabilityModalFooter,
} from '../../../Generics/Modal';
import moment from 'moment';
import cancel from '../../../../assets/img/crossBadge.svg';
import { Field, Formik } from 'formik';
import Datepicker from 'react-tailwindcss-datepicker';
import Input from '../../../Generics/Inputs/Input';
import { daysOfWeek, Hours } from '../../../../constants/HoursCal';
import Select from 'react-tailwindcss-select';
import addAvailabilityAPI from '../../../../api/services/UserDashboard/addAvailability.service';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUnapprovedAvailabilityRequestCall,
    technicianAvailabilityDaysCall,
} from '../../../../redux/slice/UserDashboardData/userDashboard';
import { AppDispatch } from '../../../../redux/store';
import { useParams } from 'react-router-dom';
interface Values {
    validFrom: { startDate: string };
    validTo: { startDate: string };
    time: {
        length: number;
        value: string;
    };
    fromAmPm: {
        length: number;
        value: string;
    };
    to: {
        length: number;
        value: string;
    };
    toAmPm: {
        length: number;
        value: string;
    };
}
interface Slot {
    from: string;
    to: string;
}
interface Data1 {
    [day: string]: Slot[];
}
export default function SetAvailabilityModal({
    open,
    onClose,
    data,
}: {
    open: boolean;
    onClose: any;
    data: any;
}): React.JSX.Element {
    const formikRef: any = useRef<HTMLFormElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [clientSessionData, setClientSessionData] = useState(data);
    const [isOpenFromTime, setIsOpenFromTime] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const dropdownRefFromTime = useRef<HTMLDivElement>(null);
    const [isOpenToTime, setIsOpenToTime] = useState<boolean>(false);
    const dropdownRefToTime = useRef<HTMLDivElement>(null);
    const [onClickDay, setOnClickDay] = useState<string[]>([]);
    const requestAvailability = useSelector(
        ({ userDashboard }: any) => userDashboard?.UnapprovedAvailabilityRequest
    );
    const params = useParams();
    const isNavigatedUser = params.userId && params.orgId;
    const userPermission = useSelector((state: any) =>
        isNavigatedUser ? state.userDetails : state?.getUserPermission
    );
    const getValuesAMPM = [
        {
            value: 'am',
            label: 'am',
        },
        {
            value: 'pm',
            label: 'pm',
        },
    ];
    const formatTime = (time: string): any => {
        return moment(time, 'HH:mm:ss').format('hh:mm A');
    };
    const handleOnClickDay = (day: string): void => {
        if (onClickDay.includes(day)) {
            setOnClickDay(
                onClickDay.filter((selectedDay: string) => selectedDay !== day)
            );
        } else {
            setOnClickDay([...onClickDay, day]);
        }
    };
    const convertDataFormat = (data1: Data1): any => {
        const slotList = daysOfWeek.map((day) => {
            return {
                [day]: data1[day]
                    ? data1[day].map((slot: Slot) => ({
                          from: slot.from,
                          to: slot.to,
                      }))
                    : [],
            };
        });
        return { slotList };
    };
    const handleSubmitSave = async (values: Values): Promise<any> => {
        const convertedData = convertDataFormat(clientSessionData?.slotsData);
        const payload = {
            fromDate: moment(values?.validFrom?.startDate).format('YYYY-MM-DD'),
            toDate: moment(values?.validTo?.startDate).format('YYYY-MM-DD'),
            slotList: convertedData?.slotList,
            technicianAvailabilityRequestId: requestAvailability?.id
                ? requestAvailability?.id
                : '',
            profileUserId: isNavigatedUser
                ? params?.userId
                : userPermission?.value?.data?.userId || userPermission?.userId,
            profileOrgId: isNavigatedUser
                ? params?.orgId
                : userPermission?.value?.data?.orgId || userPermission?.orgId,
        };
        const res = await addAvailabilityAPI.addAvailability(payload);
        if (!res?.data?.error) {
            const payloadData = {
                profileUserId: isNavigatedUser
                    ? params?.userId
                    : userPermission?.value?.data?.userId ||
                      userPermission?.userId,
                profileOrgId: isNavigatedUser
                    ? params?.orgId
                    : userPermission?.value?.data?.orgId ||
                      userPermission?.orgId,
            };
            dispatch(technicianAvailabilityDaysCall(payloadData));
            dispatch(getUnapprovedAvailabilityRequestCall(payloadData));
            setTimeout(() => {
                onClose();
            }, 1000);
        } else {
            return res;
        }
    };
    const getAllValues = (): any => {
        return {
            validFrom: {
                startDate: requestAvailability?.fromDate
                    ? moment(requestAvailability?.fromDate).format('YYYY-MM-DD')
                    : clientSessionData?.fromDate
                      ? moment(clientSessionData?.fromDate).format('YYYY-MM-DD')
                      : '',
                endDate: requestAvailability?.fromDate
                    ? moment(requestAvailability?.fromDate).format('YYYY-MM-DD')
                    : clientSessionData?.fromDate
                      ? moment(clientSessionData?.fromDate).format('YYYY-MM-DD')
                      : '',
            },
            validTo: {
                startDate: requestAvailability?.toDate
                    ? moment(requestAvailability?.toDate).format('YYYY-MM-DD')
                    : clientSessionData?.toDate
                      ? moment(clientSessionData?.toDate).format('YYYY-MM-DD')
                      : '',
                endDate: requestAvailability?.toDate
                    ? moment(requestAvailability?.toDate).format('YYYY-MM-DD')
                    : clientSessionData?.toDate
                      ? moment(clientSessionData?.toDate).format('YYYY-MM-DD')
                      : '',
            },
            time: '',
            fromAmPm: '',
            to: '',
            toAmPm: '',
        };
    };
    const handleCancelClick = (day: string, index: number): void => {
        setClientSessionData((prevData: any) => {
            const updatedSlotsData = { ...prevData?.slotsData };
            updatedSlotsData[day] = updatedSlotsData[day]?.filter(
                (_: any, i: number) => i !== index
            );
            return { ...prevData, slotsData: updatedSlotsData };
        });
    };
    const handleAdd = async (values: Values): Promise<void> => {
        if (onClickDay.length > 0) {
            setIsError(false);
            const timeString1 = `${values.time} ${values.fromAmPm.value}`;
            const parsedTime1 = moment(timeString1, 'h:mm a');
            const timeString2 = `${values.to} ${values.toAmPm.value}`;
            const parsedTime2 = moment(timeString2, 'h:mm a');
            const newTimeEntry = {
                from: parsedTime1.format('HH:mm:ss'),
                to: parsedTime2.format('HH:mm:ss'),
            };
            setClientSessionData((prevData: any) => {
                const updatedSlotsData = { ...prevData?.slotsData };
                onClickDay?.forEach((day: string) => {
                    if (!updatedSlotsData[day]) {
                        updatedSlotsData[day] = [];
                    }
                    updatedSlotsData[day] = [
                        ...updatedSlotsData[day],
                        newTimeEntry,
                    ];
                });
                return { ...prevData, slotsData: updatedSlotsData };
            });
            formikRef?.current?.setFieldValue('time', '');
            formikRef?.current?.setFieldValue('fromAmPm', '');
            formikRef?.current?.setFieldValue('to', '');
            formikRef?.current?.setFieldValue('toAmPm', '');
        } else {
            setIsError(true);
        }
    };
    const handleDisable = (values: Values): boolean => {
        if (
            values?.time?.length > 0 &&
            values?.to?.length > 0 &&
            values?.fromAmPm?.value?.length > 0 &&
            values?.toAmPm?.value?.length > 0
        ) {
            return false;
        } else {
            return true;
        }
    };
    const handleFromTimeChange = (
        selectedOption: { target: { value: number } },
        values: any
    ): void => {
        formikRef?.current?.setFieldValue(
            'time',
            selectedOption?.target?.value
        );
        if (selectedOption?.target?.value !== 0) {
            if (values?.fromAmPm?.value) {
                formikRef?.current?.setFieldValue('fromAmPm', values?.fromAmPm);
            } else {
                formikRef?.current?.setFieldValue('fromAmPm', {
                    value: 'am',
                    label: 'am',
                });
            }
        } else {
            formikRef?.current?.setFieldValue('fromAmPm', '');
        }
        setIsOpenFromTime(true);
    };
    const handleToTimeChange = (
        selectedOption: { target: { value: { length: number } } },
        values: any
    ): void => {
        if (selectedOption?.target?.value?.length !== 0) {
            if (values?.toAmPm?.value) {
                formikRef?.current?.setFieldValue('toAmPm', values?.toAmPm);
            } else {
                formikRef?.current?.setFieldValue('toAmPm', {
                    value: 'am',
                    label: 'am',
                });
            }
        } else {
            formikRef?.current?.setFieldValue('toAmPm', '');
        }
        formikRef?.current?.setFieldValue('to', selectedOption?.target?.value);
    };
    const renderFromTimeDropdown = (values: any): JSX.Element => {
        return (
            <div
                ref={dropdownRefFromTime}
                className="flex flex-col mt-1 border shadow-md bg-white z-50 absolute h-auto max-h-[20rem] overflow-y-auto"
            >
                {Hours?.map((data1: { standard_format: string }) => (
                    <label
                        key={data1.standard_format}
                        onClick={() => {
                            if (!values?.fromAmPm?.value) {
                                formikRef?.current?.setFieldValue('fromAmPm', {
                                    value: 'am',
                                    label: 'am',
                                });
                            } else {
                                formikRef?.current?.setFieldValue(
                                    'fromAmPm',
                                    values?.fromAmPm
                                );
                            }
                            formikRef?.current?.setFieldValue(
                                'time',
                                data1.standard_format
                            );
                            setIsOpenFromTime(false);
                        }}
                        className="w-[10rem] text-sm font-md cursor-pointer px-3 py-2 hover:bg-[#5ab3cf] hover:text-white"
                    >
                        {data1.standard_format}
                    </label>
                ))}
            </div>
        );
    };
    const renderToTimeDropdown = (values: any): JSX.Element => {
        return (
            <div
                ref={dropdownRefToTime}
                className="w-[10rem] flex flex-col mt-1 border shadow-md bg-white z-50 absolute h-auto max-h-[20rem] overflow-y-auto"
            >
                {Hours?.map((data2: { standard_format: string }) => (
                    <label
                        key={data2.standard_format}
                        onClick={() => {
                            formikRef?.current?.setFieldValue(
                                'to',
                                data2.standard_format
                            );
                            if (values?.toAmPm?.value) {
                                formikRef?.current?.setFieldValue(
                                    'toAmPm',
                                    values?.toAmPm
                                );
                            } else {
                                formikRef?.current?.setFieldValue('toAmPm', {
                                    value: 'am',
                                    label: 'am',
                                });
                            }
                            setIsOpenToTime(false);
                        }}
                        className="cursor-pointer hover:bg-[#5ab3cf] hover:text-white text-sm font-md px-3 py-2"
                    >
                        {data2.standard_format}
                    </label>
                ))}
            </div>
        );
    };
    const renderDayButton = (day: string): JSX.Element => (
        <button
            onClick={(e) => {
                e.preventDefault();
                handleOnClickDay(day);
            }}
            className={`${
                onClickDay?.includes(day)
                    ? 'bg-primary-700 text-white'
                    : 'bg-secondary-100 text-black'
            } cursor-pointer w-[8rem] rounded-lg font-[lato] text-sm py-5`}
        >
            {day}
        </button>
    );
    const renderInterval = (
        interval: { from: string; to: string },
        day: string,
        index: number
    ): JSX.Element => (
        <div key={index} className="flex space-x-2">
            <span className={`inline-block font-[lato] text-[11px] font-light`}>
                {`${formatTime(interval.from)} - ${formatTime(interval.to)}`}
            </span>
            <img
                src={cancel}
                onClick={() => handleCancelClick(day, index)}
                className="hover:bg-secondary-100 hover:text-white rounded-full px-1 cursor-pointer"
                alt="cancel"
            />
        </div>
    );
    const renderAddToCalendarButton = (values: any): JSX.Element => (
        <div className="flex flex-col space-y-2 items-baseline">
            <button
                onClick={(e) => {
                    handleAdd(values);
                    e.preventDefault();
                }}
                disabled={handleDisable(values)}
                className="px-16 rounded-md text-sm py-2 bg-primary-700 cursor-pointer text-white ml-10 disabled:pointer-events-none disabled:bg-secondary-100"
            >
                Add to Calendar
            </button>
            {isError && (
                <label className="text-sm font-[lato] text-red-700">
                    Please select any day first
                </label>
            )}
        </div>
    );
    useEffect(() => {
        const daysWithDates = data?.slotsData
            ? Object.keys(data?.slotsData).filter(
                  (day) => data?.slotsData[day].length > 0
              )
            : [];
        if (
            !requestAvailability?.fromDate?.length &&
            !requestAvailability?.toDate?.length
        ) {
            setOnClickDay(daysWithDates);
        }
    }, []);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): void => {
            if (
                dropdownRefFromTime.current &&
                !dropdownRefFromTime.current.contains(event.target as Node)
            ) {
                setIsOpenFromTime(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): void => {
            if (
                dropdownRefToTime.current &&
                !dropdownRefToTime.current.contains(event.target as Node)
            ) {
                setIsOpenToTime(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <Modal open={open} id={'set-availability-modal'} expandModal={false}>
            <ModalHeader
                title={'Set Availability'}
                onClose={onClose}
                closeIcon={false}
            />
            <ModalBody expandModal={false}>
                <div className="md:px-2 w-[70rem]">
                    <Formik
                        initialValues={getAllValues()}
                        onSubmit={handleSubmitSave}
                        enableReinitialize={true}
                        innerRef={formikRef}
                    >
                        {(props) => {
                            const { values, handleChange, handleSubmit } =
                                props;
                            return (
                                <form
                                    onSubmit={() => {
                                        handleSubmit();
                                    }}
                                >
                                    {!requestAvailability?.requestApproved && (
                                        <div className="text-end">
                                            <label className="text-base font-medium text-zinc-700">
                                                {`Kindly update availability from ${moment(requestAvailability?.fromDate).format('MM/DD/YYYY')} - ${moment(requestAvailability?.toDate).format('MM/DD/YYYY')}`}
                                            </label>
                                        </div>
                                    )}
                                    <div className="flex flex-col space-y-12 mb-32">
                                        <div className="flex flex-col">
                                            <div>
                                                <label className="text-sm font-bold text-zinc-700 font-[lato]">
                                                    Select Date
                                                </label>
                                            </div>
                                            <div className="flex space-x-4 mt-2 items-center">
                                                <div className="flex flex-col space-y-1 mr-4">
                                                    <Field
                                                        name="validFrom"
                                                        autoComplete="off"
                                                        isRequired={true}
                                                        value={{
                                                            startDate:
                                                                values?.validFrom,
                                                        }}
                                                        onChange={(
                                                            e: string
                                                        ) => {
                                                            handleChange(e);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Datepicker
                                                                id="validFrom"
                                                                {...field}
                                                                selected={
                                                                    field?.value
                                                                }
                                                                disabled={
                                                                    requestAvailability
                                                                        ?.fromDate
                                                                        ?.length
                                                                        ? true
                                                                        : false
                                                                }
                                                                useRange={false}
                                                                asSingle={true}
                                                                inputClassName="py-[0.5rem] px-3 w-[15rem] border-1 border-[#E5E5E5]-800 rounded-md text-sm "
                                                                onChange={(
                                                                    date: string
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        date
                                                                    );
                                                                }}
                                                                popoverDirection="down"
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <label className="text-sm font-[lato]">
                                                    To
                                                </label>
                                                <div className="flex flex-col space-y-1">
                                                    <Field
                                                        name="validTo"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={{
                                                            startDate:
                                                                values?.validTo,
                                                        }}
                                                        onChange={(
                                                            e: string
                                                        ) => {
                                                            handleChange(e);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Datepicker
                                                                id="validTo"
                                                                {...field}
                                                                selected={
                                                                    field.value
                                                                }
                                                                useRange={false}
                                                                disabled={
                                                                    requestAvailability
                                                                        ?.fromDate
                                                                        ?.length
                                                                        ? true
                                                                        : false
                                                                }
                                                                asSingle={true}
                                                                inputClassName="py-[0.5rem] px-3 w-[15rem] border-1 border-[#E5E5E5]-800 rounded-md text-sm "
                                                                onChange={(
                                                                    date: string
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        date
                                                                    );
                                                                }}
                                                                popoverDirection="down"
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-7">
                                            {daysOfWeek?.map((day) => (
                                                <div
                                                    key={day}
                                                    className="flex flex-col space-y-4"
                                                >
                                                    {renderDayButton(day)}
                                                    <div className="flex flex-wrap space-y-2">
                                                        {clientSessionData
                                                            ?.slotsData?.[
                                                            day
                                                        ] &&
                                                            Array.isArray(
                                                                clientSessionData
                                                                    .slotsData[
                                                                    day
                                                                ]
                                                            ) &&
                                                            clientSessionData?.slotsData[
                                                                day
                                                            ]?.map(
                                                                (
                                                                    interval: any,
                                                                    index: any
                                                                ) =>
                                                                    renderInterval(
                                                                        interval,
                                                                        day,
                                                                        index
                                                                    )
                                                            )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-sm font-bold text-zinc-700 font-[lato]">
                                                Time
                                            </label>
                                            <div className="flex items-baseline space-x-4">
                                                <div className="w-[10rem]">
                                                    <Field
                                                        name="time"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        component={Input}
                                                        value={values?.time}
                                                        openDropdownList={() => {
                                                            setIsOpenFromTime(
                                                                !isOpenFromTime
                                                            );
                                                        }}
                                                        placeholder="Select/Type..."
                                                        isDropdown={true}
                                                        onChange={(selectedOption: {
                                                            target: {
                                                                value: number;
                                                            };
                                                        }) => {
                                                            handleFromTimeChange(
                                                                selectedOption,
                                                                values
                                                            );
                                                        }}
                                                    />
                                                    {isOpenFromTime &&
                                                        renderFromTimeDropdown(
                                                            values
                                                        )}
                                                </div>
                                                <div className="space-x-1">
                                                    <Field
                                                        name="fromAmPm"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                value={
                                                                    field.value
                                                                }
                                                                primaryColor={
                                                                    'indigo'
                                                                }
                                                                onChange={(
                                                                    selectedOption
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        selectedOption
                                                                    );
                                                                }}
                                                                options={
                                                                    getValuesAMPM
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <p className="text-sm font-medium">
                                                    To
                                                </p>
                                                <div className="w-[10rem]">
                                                    <Field
                                                        name="to"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        component={Input}
                                                        value={values?.to}
                                                        isDropdown={true}
                                                        openDropdownList={() => {
                                                            setIsOpenToTime(
                                                                !isOpenToTime
                                                            );
                                                        }}
                                                        placeholder="Select/Type..."
                                                        onChange={(selectedOption: {
                                                            target: {
                                                                value: {
                                                                    length: number;
                                                                };
                                                            };
                                                        }) => {
                                                            handleToTimeChange(
                                                                selectedOption,
                                                                values
                                                            );
                                                        }}
                                                    />
                                                    {isOpenToTime &&
                                                        renderToTimeDropdown(
                                                            values
                                                        )}
                                                </div>
                                                <div className="space-x-1">
                                                    <Field
                                                        name="toAmPm"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                value={
                                                                    field.value
                                                                }
                                                                primaryColor={
                                                                    'indigo'
                                                                }
                                                                onChange={(
                                                                    selectedOption
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        selectedOption
                                                                    );
                                                                }}
                                                                options={
                                                                    getValuesAMPM
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                {renderAddToCalendarButton(
                                                    values
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <SetAvailabilityModalFooter
                                        onClose={onClose}
                                        isDisabled={false}
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
