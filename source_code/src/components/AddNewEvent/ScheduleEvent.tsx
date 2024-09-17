/* eslint-disable max-lines */
import { Field, FormikErrors, useFormikContext } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import Input from '../Generics/Inputs/Input';
import Datepicker from 'react-tailwindcss-datepicker';
import Select from 'react-tailwindcss-select';
import SelectComponent from '../Generics/Select';
import AdditionalParticipant from './AdditionalParticipant';
import { useSelector, useDispatch } from 'react-redux';
import { Hours } from '../../constants/HoursCal';
import TimeZone from './TimeZone';
import AuthorizationAndBilling from './AuthorizationAndBilling';
import CustomRecurrence from '../CustomRecurrence';
import moment, { utc } from 'moment';
import CancelAppointmentModal from '../CancelAppointmentModal';
import {
    getAuthorizationAndNonBillable,
    setClickedProvider,
    setFromTime,
    setTimezone,
    setToTime,
    setUnitOfService,
} from '../../redux/slice/SchedulingRedux/Scheduling';
interface Validity {
    title?: string;
}
const repeatOption = ['Repeats', 'Does not repeats'];
export const timeDifference = (time1: string, time2: string): any => {
    function parseTime(time: any): any {
        const h = time.match(/\d+/g)?.map(Number);
        if (time.includes('pm') && h[0] !== 12) h[0] += 12;
        if (time.includes('am') && h[0] === 12) h[0] = 0;
        return h[0] * 60 + h[1];
    }
    const time1Minutes = parseTime(time1);
    const time2Minutes = parseTime(time2);
    let diff = Math.abs(time1Minutes - time2Minutes);
    if (time1Minutes > time2Minutes) {
        diff = 24 * 60 - time1Minutes + time2Minutes;
    }
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { hours, minutes };
};
export const getTimeDifference = (time1: any, time2: any): any => {
    const timeFormat = 'h:mm a';
    const timeA = moment(time1, timeFormat);
    const timeB = moment(time2, timeFormat);
    if (timeB.isBefore(timeA)) {
        timeB.add(1, 'day');
    }
    const durationMinutes = timeB.diff(timeA, 'minutes');
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours} hours ${minutes} mins`;
};
export default function ScheduleEvent({
    setPrimaryProId,
    setAppointmentTime,
    mode,
    primryProId,
    appointmentTime,
    formRef,
    setRepeatConfig,
    repeatConfig,
    meetingFrom,
    setMeetingFrom,
    meetingTo,
    setMeetingTo,
    timeChangeInput,
    setTimeChangeInput,
    setClientId,
    clientId,
    activeTab,
    isEditable,
    setIsEditable,
    handleUseEffect,
    setHandleUseEffect,
    setEmployee,
    setIsEditAuthorization,
    isEditAuthorization,
    setActiveTab,
    setShowError,
}: {
    setPrimaryProId: any;
    setAppointmentTime: any;
    appointmentTime: any;
    primryProId: any;
    mode?: string;
    formRef: any;
    setRepeatConfig?: any;
    repeatConfig?: any;
    meetingFrom?: any;
    setMeetingFrom?: any;
    meetingTo?: any;
    setMeetingTo?: any;
    timeChangeInput?: any;
    setTimeChangeInput?: any;
    setClientId?: any;
    clientId?: any;
    activeTab?: any;
    isEditable?: any;
    setIsEditable?: any;
    handleUseEffect: any;
    setHandleUseEffect: any;
    setEmployee?: any;
    setIsEditAuthorization?: any;
    isEditAuthorization?: any;
    setActiveTab?: any;
    setShowError?: (arg0: boolean) => void;
}): React.JSX.Element {
    const providerList = useSelector(
        (state: any) => state.scheduling.getPrimaryProvider
    );
    const dateAndTime = useSelector((state: any) => state.scheduling);
    const provider = useSelector((state: any) => state.scheduling?.provider);
    const appointmentWithList = useSelector(
        (state: any) => state.getServices.getAllEmployeesAndChild
    );
    const userSearch = useSelector(
        ({ getServices }: any) => getServices?.searchedUsers
    );
    const dispatch = useDispatch<any>();
    const appointment: any = useSelector(
        (state: any) => state.appointment.value
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const [showRepeatModal, setShowRepeatModal] = useState(false);
    const [assignToMe, setAssignToMe] = useState(false);
    const [openCancelAppointmentModal, setOpenCancelAppointmentModal] =
        useState(false);
    const [showTimeZoneModal, setShowTimeZoneModal] = useState(false);
    const [timeZoneData, setTimeZoneData] = useState('');
    const [repeatOrNot, setReapeatOrNot] = useState('');
    const profileData = useSelector(
        ({ userProfileData }: any) => userProfileData?.value?.data
    );
    const [isOpenFromTime, setIsOpenFromTime] = useState(false);
    const dropdownRefFromTime = useRef<any>(null);
    const eightAMRef = useRef<any>(null);
    const [isOpenToTime, setIsOpenToTime] = useState(false);
    const dropdownRefToTime = useRef<any>(null);
    const {
        values,
        handleChange,
        // handleBlur,
        handleSubmit,
        submitForm,
        setFieldTouched,
        setFieldValue,
        errors,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        submitForm: any;
        setFieldTouched: any;
        setFieldValue: any;
        errors: any;
    } = useFormikContext();
    function hasErrors(errorVal: FormikErrors<Validity>): boolean {
        return Object.values(errorVal).some(
            (error) => typeof error === 'string' && error.length > 0
        );
    }
    const shouldDisable = hasErrors(errors);
    useEffect(() => {
        if (setShowError) {
            if (shouldDisable) {
                setShowError(true);
            } else {
                setShowError(false);
            }
        }
    }, [errors]);
    const getWeekDay = (day: number): string => {
        const weekConfig = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return weekConfig[day];
    };
    const getRepeatText = (): string => {
        const {
            frequency,
            frequencyType,
            frequencyDays,
            endsOn,
            endsAfter,
            endType,
            monthDay,
        } = repeatConfig;
        const onString =
            frequencyType?.value === 'weeks'
                ? `on ${frequencyDays?.map((item: string) => getWeekDay(parseInt(item))).join(',')}`
                : frequencyType?.value === 'months'
                  ? `on day ${monthDay?.value}`
                  : '';
        const endString =
            endType === 'on'
                ? `& ends on ${endsOn?.startDate}`
                : endType === 'after'
                  ? `& ends after ${endsAfter} occurences`
                  : '';
        const stringText = `repeats every ${frequency} ${frequencyType?.value} ${onString} ${endString}`;
        return stringText;
    };
    const setTimeZone = (data: any): void => {
        setTimeZoneData(data.title);
        setShowTimeZoneModal(false);
        dispatch(setTimezone(data.title));
    };
    const getUsers = (usersArr: any): any => {
        return usersArr?.map((item: any) => ({
            label: `${item.firstName} ${item.lastName}`,
            value: `${item.id}_${item.type}`,
            type: item?.type,
        }));
    };
    const setId = (id: string): any => {
        // Split the id string
        if (id) {
            const [numericId, type] = id ? id.split('_') : ['', ''];
            // Convert numericId to a number
            const parsedId = parseInt(numericId, 10);
            // Find the item in the appointmentWithList
            const employeeType = appointmentWithList.find(
                (item: any) => item.id === parsedId && item.type === type
            );
            // Set employee type if found
            if (employeeType) {
                setEmployee(employeeType.type);
                setClientId(employeeType?.id);
            } else {
            }
        }
    };
    const getproviderData = (providerArr: any): any => {
        return providerArr?.map((item: any) => ({
            label: `${item.firstName} ${item.lastName}`,
            value: item.id,
        }));
    };
    useEffect(() => {
        const input = getTimeDifference(meetingFrom, meetingTo);
        const regex = /(\d+)\s*hours?\s*(\d+)\s*mins?/;
        const matches = input.match(regex);
        if (matches) {
            const hours = parseInt(matches[1]);
            const min = parseInt(matches[2]);
            setAppointmentTime({ hours, min });
        }
    }, [meetingFrom, meetingTo]);
    useEffect(() => {
        if (appointment && appointment.id) {
            const onEditStartDate = utc(appointment?.startTime)
                .local()
                .format('YYYY-MM-DD hh:mm a');
            const onEditEndDate = utc(appointment?.endTime)
                .local()
                .format('YYYY-MM-DD hh:mm a');
            const newMeetingFrom = `${onEditStartDate?.split(' ')[1]} ${onEditStartDate?.split(' ')[2]}`;
            const newMeetingTo = `${onEditEndDate?.split(' ')[1]} ${onEditEndDate?.split(' ')[2]}`;
            setMeetingFrom(newMeetingFrom);
            setMeetingTo(newMeetingTo);
        }
    }, [appointment]);
    const isBillable = appointment?.authorizationCodes?.find(
        (item: any) =>
            item?.authorizationCode?.codeType?.name === 'Billable' &&
            item?.authorizationCode?.minutesPerUnit !== null
    );
    useEffect(() => {
        if (meetingFrom && meetingTo && appointment?.id && mode) {
            const { hours, minutes } = timeDifference(meetingFrom, meetingTo);
            const totalEventMinutes = hours * 60 + minutes;
            const billableEvent = appointment?.authorizationCodes?.find(
                (item: any) =>
                    item?.authorizationCode?.codeType?.name === 'Billable' &&
                    item?.authorizationCode?.minutesPerUnit !== null
            );
            const minutesPerUnit =
                billableEvent?.authorizationCode?.minutesPerUnit;
            if (totalEventMinutes && minutesPerUnit) {
                const unitsOfService: any = totalEventMinutes / minutesPerUnit;
                const roundedUnitsOfService: any =
                    unitsOfService >= 0.5
                        ? Math.ceil(unitsOfService)
                        : Math.floor(unitsOfService);
                setFieldValue('unitOfService', roundedUnitsOfService);
                dispatch(setUnitOfService(roundedUnitsOfService));
            }
        }
    }, [appointment?.authorizationCodes, meetingFrom, meetingTo]);
    const apiCall = (): void => {
        const data = {
            codeType: activeTab === 1 ? 'Billable' : 'Non-Billable',
            clientId: clientId,
            serviceProviderId: primryProId,
        };
        dispatch(getAuthorizationAndNonBillable(data));
    };
    useEffect(() => {
        if (timeChangeInput) {
            const timeValue = meetingTo?.split(' ')[0];
            const ampmValue = meetingTo?.split(' ')[1];
            setFieldValue('to', timeValue);
            setFieldValue('toAmPm', { value: ampmValue, label: ampmValue });
            setTimeChangeInput(false);
            dispatch(setToTime(meetingTo));
            submitForm();
        }
    }, [meetingFrom, meetingTo]);
    useEffect(() => {
        document.body.style.cursor = 'auto';
    }, []);
    useEffect(() => {
        if (values?.primaryProvider) {
            if (
                values?.primaryProvider !==
                (parseInt(userPermission?.userId) ||
                    parseInt(profileData?.userId?.id))
            ) {
                setAssignToMe(false);
            }
        }
    }, [values?.primaryProvider]);
    useEffect(() => {
        if (!mode) {
            userSearch?.forEach((item: any) => {
                if (item.id === provider) {
                    setFieldValue('primaryProvider', parseInt(item.id));
                } else if (item.childId === provider) {
                    setFieldValue('appointmentWith', `${item.childId}_CHILD`);
                    setEmployee('CHILD');
                }
            });
            const dateValue = dateAndTime?.startTime?.split(' ')[0];
            const fromTimeValue = dateAndTime?.startTime?.split(' ')[1];
            const fromampmValue = dateAndTime?.startTime?.split(' ')[2];
            const toTimeValue = dateAndTime?.endTime?.split(' ')[1];
            const toampmValue = dateAndTime?.endTime?.split(' ')[2];
            setFieldValue('date', {
                startDate: dateValue,
                endDate: dateValue,
            });
            setFieldValue('time', fromTimeValue);
            setFieldValue('fromAmPm', {
                value: fromampmValue,
                label: fromampmValue,
            });
            setFieldValue('to', toTimeValue);
            setFieldValue('toAmPm', {
                value: toampmValue,
                label: toampmValue,
            });
            setMeetingFrom(`${fromTimeValue} ${fromampmValue}`);
            setMeetingTo(`${toTimeValue} ${toampmValue}`);
        }
    }, [dateAndTime?.startTime, dateAndTime?.endTime]);
    const renderDynamicTime = (time: any): void => {
        const timeRegex = /^(?:(0?[0-9]|1[0-2])(:[0-5][0-9])?\s*(am|pm))$/i;
        const timeString = meetingFrom;
        const match = timeRegex.exec(timeString);
        if (match) {
            let hours: any = Number(match[1]);
            let minutes: any = Number(match[2].split(':')[1]) || 0;
            let meridian = match[3];
            // Ensure time.hours and time.minutes are numbers
            const additionalHours =
                typeof time.hours === 'number'
                    ? time.hours
                    : parseInt(time.hours, 10);
            const additionalMinutes =
                typeof time.minutes === 'number'
                    ? time.minutes
                    : parseInt(time.minutes, 10);
            // Adjust hours and minutes based on the provided time
            hours += additionalHours;
            let totalMinutes = minutes + additionalMinutes;
            // Adjust hours if total minutes overflow
            if (totalMinutes >= 60) {
                hours += Math.floor(totalMinutes / 60);
                totalMinutes %= 60;
            }
            // Adjust meridian if hours overflow 12
            if (hours >= 12) {
                if (hours === 12) {
                    meridian = meridian === 'pm' ? 'am' : 'pm';
                } else {
                    meridian = 'pm';
                    hours -= 12;
                }
            }
            hours = (hours < 10 ? '0' + hours : hours).toString();
            minutes = (
                totalMinutes < 10 ? '0' + totalMinutes : totalMinutes
            ).toString();
            // Set the meeting time
            setMeetingTo(hours + ':' + minutes + ' ' + meridian);
            setTimeChangeInput(true);
        } else {
        }
    };
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
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent): any => {
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
        const handleOutsideClick = (event: MouseEvent): any => {
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
    useEffect(() => {
        if ((isOpenFromTime || isOpenToTime) && eightAMRef.current) {
            eightAMRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isOpenFromTime, isOpenToTime]);
    return (
        <div className={`${mode === 'view' ? 'pointer-events-none' : ''}`}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                ref={formRef}
            >
                <div className="flex justify-between items-center pb-3">
                    <span className="text-base font-semibold">
                        {mode ? appointment.title : 'Schedule Event'}
                    </span>
                    {mode &&
                    (parseInt(userPermission?.userId) ||
                        parseInt(profileData?.userId?.id)) ===
                        (parseInt(appointment?.providerId?.id) ||
                            parseInt(appointment?.createdBy?.id)) ? (
                        <button
                            type="button"
                            className={`bg-theme-lightBlue1 h-[2.2rem] shadow-md text-white bg-[#48ABCA] rounded-md text-[13.5px] px-7`}
                            id="fill-and-justify-item-1"
                            data-hs-tab="#fill-and-justify-1"
                            aria-controls="fill-and-justify-1"
                            role="tab"
                            onClick={() => {
                                setOpenCancelAppointmentModal(true);
                            }}
                        >
                            {'Cancel Appointment'}
                        </button>
                    ) : (
                        ''
                    )}
                </div>
                <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                <div className="flex w-full justify-between">
                    <div
                        className={`${mode ? 'w-full mt-3' : 'w-2/3 mt-7'} leftspace-y-5 `}
                    >
                        {mode ? (
                            <div className="flex mt-4 justify-between">
                                <div>
                                    {/* <span>Service Provider:&nbsp;</span> */}
                                    <label className="text-sm font-medium">
                                        Service Provider:
                                    </label>
                                    {/* <span>{`${appointment.primaryProvider.firstName} ${appointment.primaryProvider.lastName}`}</span> */}
                                    <Field
                                        name="primaryProvider"
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
                                            <SelectComponent
                                                label=""
                                                value={field.value}
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        selectedOption?.[0]
                                                    );
                                                    setPrimaryProId(
                                                        selectedOption?.[0]
                                                    );
                                                    dispatch(
                                                        setClickedProvider(
                                                            selectedOption?.[0]
                                                        )
                                                    );
                                                    apiCall();
                                                    submitForm();
                                                }}
                                                options={
                                                    providerList?.length
                                                        ? getproviderData(
                                                              providerList
                                                          )
                                                        : []
                                                }
                                                showSearch={true}
                                                placeholder={'Service Provider'}
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div>
                                    <span>Modifiers:&nbsp;</span>
                                    <span>Show Modifiers</span>
                                </div>
                            </div>
                        ) : (
                            <Field
                                label="Title"
                                autoComplete="off"
                                isRequired={true}
                                id="title"
                                name="title"
                                className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none "
                                component={Input}
                                autoFocus={true}
                                value={values.title}
                                onChange={(e: any) => {
                                    handleChange(e);
                                    submitForm();
                                    setFieldTouched('title', true, false);
                                }}
                                data-testid="field-title"
                                placeholder="Meeting Title"
                            />
                        )}
                        <div className="w-full mt-4 realtive">
                            <div className="flex items-center">
                                <div className="mr-14">
                                    <p className="text-sm font-medium">
                                        Select Date
                                        <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                            *
                                        </label>
                                    </p>
                                    <Field
                                        name="date"
                                        autoComplete="off"
                                        isRequired={true}
                                        value={{
                                            startDate: values?.date,
                                        }}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                            submitForm();
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
                                                id="date"
                                                {...field}
                                                selected={field.value}
                                                useRange={false}
                                                asSingle={true}
                                                inputClassName="py-[0.5rem] px-3 w-[15rem] border-2 border-[#E5E5E5]-800 rounded-md text-sm "
                                                onChange={(date) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        date
                                                    );
                                                    submitForm();
                                                }}
                                                popoverDirection="down"
                                                disabled={mode ? true : false}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="h-[3.8rem] border-l border-gray-300 mr-14"></div>
                                <div className="">
                                    <div className="">
                                        <span className="text-sm font-medium">
                                            Time
                                        </span>
                                        <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                            *
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-4">
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
                                                data-testid="field-time"
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    setFieldValue(
                                                        'time',
                                                        selectedOption?.target
                                                            ?.value
                                                    );
                                                    if (
                                                        selectedOption?.target
                                                            ?.value !== 0
                                                    ) {
                                                        if (
                                                            values?.fromAmPm
                                                                ?.value
                                                        ) {
                                                            setFieldValue(
                                                                'fromAmPm',
                                                                values?.fromAmPm
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                'fromAmPm',
                                                                {
                                                                    value: 'am',
                                                                    label: 'am',
                                                                }
                                                            );
                                                        }
                                                    } else {
                                                        setFieldValue(
                                                            'fromAmPm',
                                                            ''
                                                        );
                                                    }
                                                    setHandleUseEffect(true);
                                                    mode === 'edit' &&
                                                        setIsEditable(true);
                                                    submitForm();
                                                    setIsOpenFromTime(true);
                                                    setMeetingFrom(
                                                        `${selectedOption?.target?.value} ${values?.fromAmPm?.value}`
                                                    );
                                                    dispatch(
                                                        setFromTime(
                                                            `${selectedOption?.target?.value} ${values?.fromAmPm?.value}`
                                                        )
                                                    );
                                                }}
                                            />
                                            {isOpenFromTime && (
                                                <div
                                                    ref={dropdownRefFromTime}
                                                    className="flex flex-col mt-1 border shadow-md bg-white z-50 absolute h-auto max-h-[20rem] overflow-y-auto"
                                                >
                                                    {Hours?.map((data: any) => {
                                                        const isEightAM =
                                                            data.standard_format ===
                                                            '08:00';
                                                        return (
                                                            <label
                                                                ref={
                                                                    isEightAM
                                                                        ? eightAMRef
                                                                        : null
                                                                }
                                                                key={`${data.standard_format}`}
                                                                onClick={() => {
                                                                    if (
                                                                        !values
                                                                            ?.fromAmPm
                                                                            ?.value
                                                                    ) {
                                                                        setFieldValue(
                                                                            'fromAmPm',
                                                                            {
                                                                                value: 'am',
                                                                                label: 'am',
                                                                            }
                                                                        );
                                                                    } else {
                                                                        setFieldValue(
                                                                            'fromAmPm',
                                                                            values?.fromAmPm
                                                                        );
                                                                    }
                                                                    setFieldValue(
                                                                        'time',
                                                                        `${data?.standard_format}`
                                                                    );
                                                                    setIsOpenFromTime(
                                                                        false
                                                                    );
                                                                    setHandleUseEffect(
                                                                        true
                                                                    );
                                                                    mode ===
                                                                        'edit' &&
                                                                        setIsEditable(
                                                                            true
                                                                        );
                                                                    submitForm();
                                                                    dispatch(
                                                                        setFromTime(
                                                                            `${data?.standard_format} ${values?.fromAmPm?.value ? values?.fromAmPm?.value : 'am'}`
                                                                        )
                                                                    );
                                                                    setMeetingFrom(
                                                                        `${data?.standard_format} ${values?.fromAmPm?.value ? values?.fromAmPm?.value : 'am'}`
                                                                    );
                                                                }}
                                                                className="w-[10rem] text-sm font-md cursor-pointer px-3 py-2 hover:bg-[#5ab3cf] hover:text-white"
                                                            >
                                                                {`${data.standard_format}`}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
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
                                                        value={field.value}
                                                        primaryColor={'indigo'}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                selectedOption
                                                            );
                                                            setMeetingFrom(
                                                                `${values?.time} ${selectedOption?.value}`
                                                            );
                                                            dispatch(
                                                                setFromTime(
                                                                    `${values?.time} ${selectedOption?.value}`
                                                                )
                                                            );
                                                        }}
                                                        options={getValuesAMPM}
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
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    if (
                                                        selectedOption?.target
                                                            ?.value?.length !==
                                                        0
                                                    ) {
                                                        if (
                                                            values?.toAmPm
                                                                ?.value
                                                        ) {
                                                            setFieldValue(
                                                                'toAmPm',
                                                                values?.toAmPm
                                                            );
                                                        } else {
                                                            setFieldValue(
                                                                'toAmPm',
                                                                {
                                                                    value: 'am',
                                                                    label: 'am',
                                                                }
                                                            );
                                                        }
                                                    } else {
                                                        setFieldValue(
                                                            'toAmPm',
                                                            ''
                                                        );
                                                    }
                                                    setFieldValue(
                                                        'to',
                                                        selectedOption?.target
                                                            ?.value
                                                    );
                                                    setHandleUseEffect(true);
                                                    mode === 'edit' &&
                                                        setIsEditable(true);
                                                    submitForm();
                                                    setIsOpenToTime(true);
                                                    setMeetingTo(
                                                        `${selectedOption?.target?.value} ${values?.toAmPm?.value}`
                                                    );
                                                    dispatch(
                                                        setToTime(
                                                            `${selectedOption?.target?.value} ${values?.toAmPm?.value}`
                                                        )
                                                    );
                                                }}
                                            />
                                            {isOpenToTime && (
                                                <div
                                                    ref={dropdownRefToTime}
                                                    className="w-[10rem] flex flex-col mt-1 border shadow-md bg-white z-50 absolute h-auto max-h-[20rem] overflow-y-auto"
                                                >
                                                    {Hours?.map((data: any) => {
                                                        const isEightAM =
                                                            data.standard_format ===
                                                            '08:00';
                                                        return (
                                                            <label
                                                                ref={
                                                                    isEightAM
                                                                        ? eightAMRef
                                                                        : null
                                                                }
                                                                key={`${data.standard_format}`}
                                                                onClick={() => {
                                                                    setFieldValue(
                                                                        'to',
                                                                        `${data?.standard_format}`
                                                                    );
                                                                    if (
                                                                        values
                                                                            ?.toAmPm
                                                                            ?.value
                                                                    ) {
                                                                        setFieldValue(
                                                                            'toAmPm',
                                                                            values?.toAmPm
                                                                        );
                                                                    } else {
                                                                        setFieldValue(
                                                                            'toAmPm',
                                                                            {
                                                                                value: 'am',
                                                                                label: 'am',
                                                                            }
                                                                        );
                                                                    }
                                                                    setIsOpenToTime(
                                                                        false
                                                                    );
                                                                    setHandleUseEffect(
                                                                        true
                                                                    );
                                                                    submitForm();
                                                                    mode ===
                                                                        'edit' &&
                                                                        setIsEditable(
                                                                            true
                                                                        );
                                                                    setMeetingTo(
                                                                        `${data?.standard_format} ${values?.toAmPm?.value ? values?.toAmPm?.value : 'am'}`
                                                                    );
                                                                    dispatch(
                                                                        setToTime(
                                                                            `${data?.standard_format} ${values?.toAmPm?.value ? values?.toAmPm?.value : 'am'}`
                                                                        )
                                                                    );
                                                                }}
                                                                className={`cursor-pointer hover:bg-[#5ab3cf] hover:text-white text-sm font-md px-3 py-2 `}
                                                            >
                                                                {`${data.standard_format}`}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
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
                                                        value={field.value}
                                                        primaryColor={'indigo'}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                selectedOption
                                                            );
                                                            setMeetingTo(
                                                                `${values?.to} ${selectedOption?.value}`
                                                            );
                                                            dispatch(
                                                                setToTime(
                                                                    `${values?.to} ${selectedOption?.value}`
                                                                )
                                                            );
                                                            setHandleUseEffect(
                                                                false
                                                            );
                                                            setTimeChangeInput(
                                                                false
                                                            );
                                                        }}
                                                        options={getValuesAMPM}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex  items-center">
                                            {(timeZoneData.length > 0 ||
                                                appointment?.timezone?.length >
                                                    0) && (
                                                <span className="flex-grow  w-[11rem] break-words overflow-hidden ">
                                                    {timeZoneData?.length > 0
                                                        ? timeZoneData
                                                        : appointment?.timezone}
                                                </span>
                                            )}
                                            <label
                                                className="text-sm font-medium text-theme-lightBlue1 cursor-pointer hover:underline"
                                                onClick={() =>
                                                    setShowTimeZoneModal(true)
                                                }
                                                data-testid="timezone-modal"
                                            >
                                                TimeZone
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {mode && isBillable ? (
                                    <>
                                        <div className="h-[3.8rem] border-l border-gray-300 mx-14"></div>
                                        <div className="w-1/3 relative">
                                            <Field
                                                label="Unit of Service"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="unitOfService"
                                                name="unitOfService"
                                                className="border-b-2 bg-white border-[#A0A0A0] rounded-none border-x-0 border-t-0 pb-1 outline-none "
                                                component={Input}
                                                value={values.unitOfService}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    submitForm();
                                                }}
                                                placeholder="Unit of Service"
                                                disabled={mode ? true : false}
                                            />
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                        {showTimeZoneModal && (
                            <TimeZone
                                open={showTimeZoneModal}
                                onClose={() => setShowTimeZoneModal(false)}
                                handleStop={() => setShowTimeZoneModal(false)}
                                setTimeZone={setTimeZone}
                            />
                        )}
                        {!mode ? (
                            <div className="flex items-end space-x-12 mt-4">
                                <div className="w-[15rem] ">
                                    <Field
                                        name="repeatOption"
                                        autoComplete="off"
                                        isRequired={false}
                                    >
                                        {({
                                            field,
                                        }: {
                                            field: any;
                                            form: any;
                                        }) => (
                                            <Select
                                                value={field.value}
                                                primaryColor={'indigo'}
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    setFieldValue(
                                                        field.name,
                                                        selectedOption
                                                    );
                                                    submitForm();
                                                    setReapeatOrNot(
                                                        selectedOption.value
                                                    );
                                                    if (
                                                        selectedOption.value ===
                                                        'Repeats'
                                                    ) {
                                                        setShowRepeatModal(
                                                            true
                                                        );
                                                    } else {
                                                        setShowRepeatModal(
                                                            false
                                                        );
                                                    }
                                                }}
                                                options={repeatOption?.map(
                                                    (data: any) => ({
                                                        label: data,
                                                        value: data,
                                                    })
                                                )}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="w-8/12 ml-20">
                                    {meetingFrom?.length > 0 &&
                                        meetingTo?.length > 0 &&
                                        repeatOrNot?.length > 0 && (
                                            <p className="flex text-gray-500 font-light whitespace-nowrap">
                                                {`This appointment is for
                                            ${getTimeDifference(
                                                meetingFrom,
                                                meetingTo
                                            )}
                                            and ${repeatOrNot === 'Repeats' ? getRepeatText() : repeatOrNot}`}
                                            </p>
                                        )}
                                </div>
                            </div>
                        ) : null}
                        {mode &&
                        appointment?.appointmentWith?.type !== 'EMPLOYEE' ? (
                            <AuthorizationAndBilling
                                primryProId={primryProId}
                                appointmentTime={appointmentTime}
                                mode={'edit'}
                                meetingTo={meetingTo}
                                meetingFrom={meetingFrom}
                                setMeetingTo={setMeetingTo}
                                renderDynamicTime={renderDynamicTime}
                                isEditable={isEditable}
                                handleUseEffect={handleUseEffect}
                                setHandleUseEffect={setHandleUseEffect}
                                setIsEditAuthorization={setIsEditAuthorization}
                                isEditAuthorization={isEditAuthorization}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        ) : null}
                        <div className="my-4">
                            <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                        </div>
                        {!mode ? (
                            <>
                                <div className="">
                                    <label className="text-sm font-medium">
                                        Service Provider
                                    </label>
                                    <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                        *
                                    </label>
                                    <div className="flex w-[60rem] justify-between items-end">
                                        <div className=" w-[50rem] ">
                                            <Field
                                                name="primaryProvider"
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
                                                    <SelectComponent
                                                        value={field.value}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                selectedOption?.[0]
                                                            );
                                                            form.setFieldValue(
                                                                'assignToMe',
                                                                false
                                                            );
                                                            setPrimaryProId(
                                                                selectedOption?.[0]
                                                            );
                                                            submitForm();
                                                        }}
                                                        isDisabled={
                                                            mode ? true : false
                                                        }
                                                        options={
                                                            providerList?.length
                                                                ? getproviderData(
                                                                      providerList
                                                                  )
                                                                : []
                                                        }
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                        showSearch={true}
                                                        multi={false}
                                                        placeholder={
                                                            'Service Provider'
                                                        }
                                                        label={''}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <Field
                                                type="checkbox"
                                                name="assignToMe"
                                                id="assignToMe"
                                                className="cursor-pointer"
                                                checked={assignToMe}
                                                onChange={(e: any) => {
                                                    // handleChange(e);
                                                    if (e?.target?.checked) {
                                                        setAssignToMe(true);
                                                        setPrimaryProId(
                                                            parseInt(
                                                                userPermission?.userId
                                                            ) ||
                                                                parseInt(
                                                                    profileData
                                                                        ?.userId
                                                                        ?.id
                                                                )
                                                        );
                                                        setFieldValue(
                                                            'primaryProvider',
                                                            parseInt(
                                                                userPermission?.userId
                                                            ) ||
                                                                parseInt(
                                                                    profileData
                                                                        ?.userId
                                                                        ?.id
                                                                )
                                                        );
                                                    } else {
                                                        setAssignToMe(false);
                                                        setFieldValue(
                                                            'primaryProvider',
                                                            ''
                                                        );
                                                        setPrimaryProId('');
                                                    }
                                                }}
                                            />
                                            <label className="text-sm font-medium ml-2">
                                                Assign to me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <label className="text-sm font-medium">
                                        Appointment With
                                    </label>
                                    <label className="text-red-700 text-lg font-normal font-['Lato'] ml-[0.25rem]">
                                        *
                                    </label>
                                    <div className="flex w-[56rem] justify-between items-end">
                                        <div className="w-[50rem]">
                                            <Field
                                                name="appointmentWith"
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
                                                    <SelectComponent
                                                        label={''}
                                                        value={field.value}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                selectedOption?.[0]
                                                            );
                                                            setId(
                                                                selectedOption?.[0]
                                                            );
                                                            apiCall();
                                                            submitForm();
                                                        }}
                                                        isDisabled={
                                                            mode ? true : false
                                                        }
                                                        options={
                                                            appointmentWithList?.length
                                                                ? getUsers(
                                                                      appointmentWithList
                                                                  )
                                                                : []
                                                        }
                                                        showSearch={true}
                                                        multi={false}
                                                        placeholder={
                                                            'Appointment With'
                                                        }
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                        {mode ? (
                            <div>
                                <div className="my-4">
                                    <span>Appointment With: &nbsp;</span>
                                    <span>
                                        {`${appointment.appointmentWith?.firstName} ${appointment?.appointmentWith?.lastName}
                                        `}
                                    </span>
                                </div>
                                <div className="my-2">
                                    <span>Additional Participants: &nbsp;</span>
                                    <span className="text-theme-lightBlue1 font-light">
                                        {values.additionParticipant?.join(
                                            ', '
                                        ) || '-'}
                                    </span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    {mode ? null : <AdditionalParticipant />}
                </div>
            </form>
            {showRepeatModal ? (
                <CustomRecurrence
                    first={showRepeatModal}
                    onClose={() => {
                        setShowRepeatModal(false);
                        setFieldValue('repeatOption', {
                            label: 'Does not repeats',
                            value: 'Does not repeats',
                        });
                        setRepeatConfig({});
                        setReapeatOrNot('does not repeats');
                    }}
                    customSubmit={(e: any) => {
                        setRepeatConfig(e);
                        setShowRepeatModal(false);
                    }}
                />
            ) : null}
            {openCancelAppointmentModal && (
                <CancelAppointmentModal
                    header={'Cancel Appointment'}
                    name={'Are you sure you want to cancel this appointment?'}
                    data={appointment}
                    open={openCancelAppointmentModal}
                    onClose={() => setOpenCancelAppointmentModal(false)}
                />
            )}
        </div>
    );
}
