/* eslint-disable max-lines */
import React, { useEffect } from 'react';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import editIcon from '../../assets/img/GridIcons/edit.svg';
import { Field, useFormikContext } from 'formik';
import Input from '../Generics/Inputs/Input';
import plus from '../../assets/img/plus.svg';
import Codes from './Codes/Codes';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAuthorizationAndNonBillable,
    savingBillableCodes,
    savingHours,
    savingMins,
    resetAuthCode,
    deleteHours,
    setIsValidDuration,
    deleteAuthCodes,
    codeAfterEdit,
    setCodes,
    isAuthorizationCodesEdited,
} from '../../redux/slice/SchedulingRedux/Scheduling';
import ConfirmationModal from '../Generics/ConfirmationModal';
import checkedGreen from '../../assets/img/checkedGreen.svg';
import moment from 'moment';
import EditAuthorizationModal from './EditAuthorizationModal';
import { getNameOfNote } from '../../redux/slice/template/templateSlice';
import schedulingApis from '../../api/services/scheduling.service';
interface AppointmentTimeData {
    hours?: number;
    min?: number;
}
interface DividedTime {
    hours: number;
    minutes: number;
}
interface UpdatedTime {
    hours: number;
    min: number;
}
interface Item {
    id?: string;
}
interface OldItem {
    codeType: 'Billable' | 'Non-Billable';
    hours: number;
    min: number;
}
type AuthCode = {
    codeType: string | { name: string };
    hours?: number;
    min?: number;
    minutes?: number;
    id?: string;
};
export default function AuthorizationAndBilling({
    primryProId,
    appointmentTime,
    mode,
    meetingTo,
    meetingFrom,
    renderDynamicTime,
    clientId,
    activeTab,
    setActiveTab,
    isEditable,
    handleUseEffect,
    setHandleUseEffect,
    employee,
    setIsEditAuthorization,
    isEditAuthorization,
}: {
    primryProId?: any;
    appointmentTime?: any;
    mode?: any;
    meetingTo?: string;
    meetingFrom?: string;
    setMeetingTo?: any;
    renderDynamicTime?: any;
    clientId?: any;
    activeTab?: any;
    setActiveTab?: any;
    isEditable?: any;
    handleUseEffect?: any;
    setHandleUseEffect?: any;
    employee?: any;
    setIsEditAuthorization?: any;
    isEditAuthorization?: any;
}): React.JSX.Element {
    const appointment = useSelector((state: any) => state.appointment.value);
    const authorizationTime = useSelector((state: any) => state.scheduling);
    const saveNoteId = useSelector(
        (state: any) => state?.scheduling?.saveNoteId
    );
    const [showCodes, setShowCodes] = React.useState(false);
    const [showAddnew, setShowAddnew] = React.useState(false);
    const [typeOfCodeTime, setTypeOfCodeTime] = React.useState({
        bill: { hours: '', min: '' },
        auth: { hours: '', min: '' },
    });
    const [, setBillableCodeClickCount] = React.useState(0);
    const [time, setTime] = React.useState({
        hours: 0,
        min: 0,
    });
    const [isFirstEffectDone, setIsFirstEffectDone] = React.useState(false);
    const [showConfirmDel, setShowConfirmDel] = React.useState({
        isModalOpen: false,
        key: null,
    });
    const [authCodes, setAuthCodes] = React.useState<Array<any>>([]);
    const [isUsedCode, setUsedCodes] = React.useState(false);
    const [triger, setTriger] = React.useState(false);
    const [isError, setIsError] = React.useState({
        status: false,
        message: '',
    });
    const [deleteKey, setDelete] = React.useState(false);
    const [afterEdit, setAfterEdit] = React.useState(false);
    const [fieldsHours, setFieldHours] = React.useState<any>({});
    const [fieldsmin, setFieldmin] = React.useState<any>({});
    const dragItem = React.useRef<any>(null);
    const dragOverItem = React.useRef<any>(null);
    const dispatch = useDispatch<any>();
    const formData = useSelector(({ scheduling }: any) => scheduling);
    const noteName = useSelector((state: any) => state?.template?.name?.data);
    const finalDispatchSavingHours = (data: any, name: any): any => {
        if (name === 'hours') {
            dispatch(savingHours(data));
        } else {
            dispatch(savingMins(data));
        }
    };
    const saveTime = (
        value: any,
        name: any,
        id: any,
        item: any,
        key: any
    ): any => {
        const data: any = {
            value: value,
            id: id,
            code: item?.code,
            key: key,
        };
        if (value !== '') {
            finalDispatchSavingHours(data, name);
        }
    };
    const handleSort = (): any => {
        //duplicate items
        const sortedData = [...authCodes];
        //remove and save the dragged item content
        const draggedItemContent = sortedData.splice(dragItem.current, 1)[0];
        //switch the position
        sortedData.splice(dragOverItem.current, 0, draggedItemContent);
        //reset the position ref
        dragItem.current = null;
        dragOverItem.current = null;
        //update the actual array
        setAuthCodes(sortedData);
        sortedData.forEach((i: any, key: any) => {
            setFieldHours((prev: Record<string, any>) => {
                // Return a new state object with updated value for the current key
                return {
                    ...prev,
                    [`hours -${key}`]: i.hours,
                };
            });
            setFieldmin((prev: any) => {
                return {
                    ...prev,
                    [`minutes -${key}`]: i.min,
                };
            });
            saveTime(i.hours, 'hours', i?.id, i, key);
            saveTime(i.min, 'minutes', i?.id, i, key);
            const data: any = {
                ...i,
                key: key,
            };
            dispatch(savingBillableCodes(data));
        });
    };
    const authCodebutton = useSelector(
        (state: any) => state?.scheduling?.authCodeButton
    );
    const {
        setFieldValue,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        submitForm: any;
        setFieldTouched: any;
        setFieldValue: any;
    } = useFormikContext();
    useEffect(() => {
        if (appointment?.authorizationCodes?.length) {
            setUsedCodes(true);
            const codes = appointment.authorizationCodes.map((item: any) => {
                return {
                    ...item.authorizationCode,
                    hours: item.hours,
                    minutes: item.minutes,
                };
            });
            setAuthCodes(codes);
            setFieldHours((prev: any) => {
                codes.forEach(
                    (item: any, key: any) =>
                        (prev[`hours -${key}`] = parseInt(item.hours))
                );
                return prev;
            });
            setFieldmin((prev: any) => {
                codes.forEach(
                    (item: any, key: any) =>
                        (prev[`minutes -${key}`] = parseInt(item.minutes))
                );
                return prev;
            });
        }
    }, [appointment, appointment?.authorizationCodes]);
    React.useEffect(() => {
        let hours = 0;
        let min = 0;
        for (const i of Object.values(fieldsHours)) {
            hours += Number(i);
        }
        for (const i of Object.values(fieldsmin)) {
            min += Number(i);
        }
        setTime({
            hours,
            min,
        });
        setIsFirstEffectDone(true);
    }, [fieldsHours, fieldsmin, appointment?.authorizationCodes]);
    const visibleAuthCode = (): void => {
        const data = {
            codeType: 'Billable',
            clientId: clientId,
            serviceProviderId: primryProId,
        };
        setShowCodes(!showCodes);
        setShowAddnew(true);
        dispatch(getAuthorizationAndNonBillable(data));
    };
    const calculateDividedTime = (
        appointmentTimeData: AppointmentTimeData,
        nonBill: number,
        nonBillLength: number
    ): DividedTime => {
        const totalMinutes =
            (appointmentTimeData?.hours ?? 0) * 60 +
            (appointmentTimeData?.min ?? 0) -
            nonBill * 30;
        const dividedTotalMinutes = totalMinutes / nonBillLength;
        return {
            hours: Math.floor(dividedTotalMinutes / 60),
            minutes: Math.floor(dividedTotalMinutes % 60),
        };
    };
    const updateTimeForCode = (
        oldItem: OldItem,
        dividedTime: DividedTime
    ): OldItem => {
        if (oldItem.codeType === 'Billable') {
            return {
                ...oldItem,
                hours: dividedTime.hours >= 0 ? dividedTime.hours : 0,
                min: dividedTime.minutes >= 0 ? dividedTime.minutes : 0,
            };
        } else {
            return { ...oldItem };
        }
    };
    const saveUpdatedTime = (updatedTime: UpdatedTime[], item: Item): void => {
        updatedTime.forEach((i, key) => {
            setFieldHours((prev: Record<string, number>) => ({
                ...prev,
                [`hours-${key}`]: i.hours,
            }));
            setFieldmin((prev: Record<string, number>) => ({
                ...prev,
                [`minutes-${key}`]: i.min,
            }));
            saveTime(i.hours, 'hours', item.id, item, key);
            saveTime(i.min, 'minutes', item.id, item, key);
        });
    };
    const handleBillableCode = (
        updatedTime: UpdatedTime[],
        item: Item,
        dividedTime: DividedTime
    ): void => {
        updatedTime.push({
            ...item,
            hours: dividedTime.hours >= 0 ? dividedTime.hours : 0,
            min: dividedTime.minutes >= 0 ? dividedTime.minutes : 0,
        });
        saveUpdatedTime(updatedTime, item);
        setAuthCodes(updatedTime);
        setTypeOfCodeTime((prev: any) => ({
            ...prev,
            bill: dividedTime,
        }));
    };
    const handleNonBillableCode = (
        updatedTime: UpdatedTime[],
        item: any
    ): void => {
        updatedTime.push({
            ...item,
            hours: 0,
            min: 30,
        });
        saveUpdatedTime(updatedTime, item);
        setAuthCodes(updatedTime);
        setTypeOfCodeTime((prev: any) => ({
            ...prev,
            auth: prev.auth + 30,
        }));
    };
    const useCode = (item: any): any => {
        setHandleUseEffect(true);
        const nonBillableCodes = authCodes.filter(
            (code) => code.codeType === 'Non-Billable'
        );
        const nonBillLength = authCodes.length - nonBillableCodes.length;
        const nonBill = nonBillableCodes.length;
        const data = { ...item, key: formData?.billableCodes.length };
        dispatch(savingBillableCodes(data));
        setUsedCodes(true);
        setTriger(!triger);
        if (item.codeType === 'Billable') {
            setBillableCodeClickCount((prevCount) => prevCount + 1);
        }
        const dividedTime = calculateDividedTime(
            appointmentTime,
            nonBill,
            nonBillLength
        );
        const updatedTime = authCodes.map((oldItem) => {
            return updateTimeForCode(oldItem, dividedTime);
        });
        if (item.codeType === 'Billable') {
            handleBillableCode(updatedTime, item, dividedTime);
        } else {
            handleNonBillableCode(updatedTime, item);
        }
    };
    const calculateCodeLength = (type: string, isEditMode: boolean): number => {
        if (isEditMode && type === 'Non-Billable') {
            return authCodes.filter(
                (code) => code.codeType?.name === 'Non-Billable'
            ).length;
        }
        return authCodes.filter((code) => {
            if (typeof code.codeType === 'object') {
                return code.codeType.name === type;
            }
            if (typeof code.codeType === 'string') {
                return code.codeType === type;
            }
            return false;
        }).length;
    };
    const calculateTimeDivision = (
        nonBill: number,
        nonBillLength: number
    ): { dividedHours: number; dividedMinutes: number } => {
        const appointmentHours = appointmentTime?.hours || 0;
        const appointmentMinutes = appointmentTime?.min || 0;
        const totalAppointmentMinutes =
            appointmentHours * 60 + appointmentMinutes - nonBill * 30;
        const dividedTotalMinutes = totalAppointmentMinutes / nonBillLength;
        const dividedHours = Math.floor(dividedTotalMinutes / 60);
        const dividedMinutes = Math.floor(dividedTotalMinutes % 60);
        return { dividedHours, dividedMinutes };
    };
    const updateFieldHoursAndMinutes = (item: AuthCode, key: number): void => {
        setFieldHours((prev: Record<string, number>) => ({
            ...prev,
            [`hours -${key}`]: item.hours,
        }));
        setFieldmin((prev: Record<string, number>) => ({
            ...prev,
            [`minutes -${key}`]: item.min,
        }));
    };
    const updateTimesAndDispatch = (
        dividedHours: number,
        dividedMinutes: number
    ): any => {
        const updatedTime = authCodes.map((oldItem: AuthCode) => {
            if (
                oldItem.codeType === 'Billable' ||
                (typeof oldItem.codeType === 'object' &&
                    oldItem.codeType?.name === 'Billable')
            ) {
                return {
                    ...oldItem,
                    hours: dividedHours >= 0 ? dividedHours : 0,
                    min: dividedMinutes >= 0 ? dividedMinutes : 0,
                };
            }
            return { ...oldItem, hours: 0, min: 30 };
        });
        updatedTime.forEach((item, key) => {
            updateFieldHoursAndMinutes(item, key);
            saveTime(item.hours || 0, 'hours', item?.id || '', item, key);
            saveTime(item.min || 0, 'minutes', item?.id || '', item, key);
        });
        if (updatedTime.length > 0) {
            setAuthCodes(updatedTime);
            const newUpdatedTime: any = updatedTime.map((item) => ({
                ...item,
                minutes: item.min,
            }));
            // Correct usage of dispatch
            dispatch(setCodes(newUpdatedTime)); // Ensuring dispatch receives a valid action
        }
    };
    useEffect(() => {
        if (handleUseEffect || (handleUseEffect && appointment?.id)) {
            const nonBillLength = calculateCodeLength(
                'Billable',
                mode === 'edit'
            );
            const nonBill = calculateCodeLength(
                'Non-Billable',
                mode === 'edit'
            );
            const { dividedHours, dividedMinutes } = calculateTimeDivision(
                nonBill,
                nonBillLength
            );
            if (deleteKey || (isEditable && mode === 'edit')) {
                updateTimesAndDispatch(dividedHours, dividedMinutes);
            }
        }
    }, [triger, meetingFrom, meetingTo, appointmentTime, handleUseEffect]);
    const deleteElement = (): void => {
        const filterArr = authCodes.filter((item, index) => {
            if (index == showConfirmDel.key) {
                const newHours = { ...fieldsHours };
                const newMinutes = { ...fieldsmin };
                delete newHours[`hours -${showConfirmDel.key}`];
                delete newMinutes[`minutes -${showConfirmDel.key}`];
                setFieldHours(newHours);
                setFieldmin(newMinutes);
                dispatch(deleteHours(index));
                dispatch(deleteAuthCodes(item?.id));
                setDelete(true);
                setHandleUseEffect(true);
            }
            return index != showConfirmDel.key;
        });
        setAuthCodes(filterArr);
        setShowConfirmDel((prev: any) => {
            return { ...prev, isModalOpen: false };
        });
        setTriger(!triger);
    };
    const getDuration = (time1: any, time2: any): any => {
        const timeFormat = 'h:mm a';
        const timeA = moment(time1, timeFormat);
        const timeB = moment(time2, timeFormat);
        const durationMinutes = timeB.diff(timeA, 'minutes');
        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;
        return hours * 60 + minutes;
    };
    useEffect(() => {
        let found = false;
        for (const item of authCodes) {
            if (item.code === authCodebutton?.code) found = true;
        }
        if (!found) {
            dispatch(resetAuthCode());
        }
    }, [authCodes]);
    React.useEffect(() => {
        if (isFirstEffectDone && !handleUseEffect) {
            const from =
                mode === 'edit' ? meetingFrom : authorizationTime?.fromTime;
            const to = mode === 'edit' ? meetingTo : authorizationTime?.toTime;
            const totalMins = authorizationTime?.mins.reduce(
                (sum: any, item: any) => sum + parseInt(item.value),
                0
            );
            const totalHoursInMins = authorizationTime?.hours.reduce(
                (sum: any, item: any) => sum + parseInt(item.value) * 60,
                0
            );
            if (
                totalHoursInMins + totalMins >= getDuration(from, to) &&
                authCodes?.length
            ) {
                const totalHours: any = Object.values(fieldsHours).reduce(
                    (ac: any, value: any) => ac + Number(value),
                    0
                );
                let totalMin: any = Object.values(fieldsmin).reduce(
                    (ac: any, value: any) => ac + Number(value),
                    0
                );
                totalMin += totalHours * 60;
                const convertMinutesToHoursAndMinutes = (minutes: any): any => {
                    if (minutes <= 0 || isNaN(minutes)) {
                        throw new Error(
                            'Invalid input. Please enter a positive number of minutes.'
                        );
                    }
                    const hours = Math.floor(minutes / 60);
                    const remainingMinutes = minutes % 60;
                    return { hours, minutes: remainingMinutes };
                };
                const data = convertMinutesToHoursAndMinutes(totalMin);
                if (appointment?.id) {
                    const newhrs = Object.keys(fieldsHours)
                        .sort((a, b) => {
                            const numA = parseInt(a.split('-')[1]);
                            const numB = parseInt(b.split('-')[1]);
                            return numA - numB;
                        })
                        .map((key) => fieldsHours[key]);
                    const newmin = Object.keys(fieldsmin)
                        .sort((a, b) => {
                            const numA = parseInt(a.split('-')[1]);
                            const numB = parseInt(b.split('-')[1]);
                            return numA - numB;
                        })
                        .map((key) => fieldsmin[key]);
                    const newCode: any = [];
                    for (let i = 0; i < authCodes.length; i++) {
                        newCode.push({
                            ...authCodes[i],
                            hours: newhrs[i],
                            minutes: newmin[i],
                        });
                    }
                    setAuthCodes(newCode);
                    dispatch(setCodes(newCode));
                }
                renderDynamicTime(data);
            } else {
                setIsError({
                    status: false,
                    message: '',
                });
                dispatch(setIsValidDuration(false));
            }
        }
    }, [
        time,
        meetingFrom,
        fieldsHours,
        fieldsmin,
        meetingTo,
        typeOfCodeTime,
        appointmentTime,
        isFirstEffectDone,
    ]);
    const handleSaveCodes = async (
        codes: any,
        hours: any,
        min: any
    ): Promise<any> => {
        const newhrs = Object.keys(hours)
            .sort((a, b) => {
                const numA = parseInt(a.split('-')[1]);
                const numB = parseInt(b.split('-')[1]);
                return numA - numB;
            })
            .map((key) => hours[key]);
        const newmin = Object.keys(min)
            .sort((a, b) => {
                const numA = parseInt(a.split('-')[1]);
                const numB = parseInt(b.split('-')[1]);
                return numA - numB;
            })
            .map((key) => min[key]);
        const newCode: any = [];
        setFieldHours(hours);
        setFieldmin(min);
        for (let i = 0; i < codes.length; i++) {
            newCode.push({
                ...codes[i],
                hours: newhrs[i],
                minutes: newmin[i],
            });
        }
        setAuthCodes(newCode);
        const codeEdit: any = newCode.filter(
            (item: any) =>
                item?.codeType === 'Billable' ||
                item?.codeType?.name === 'Billable'
        );
        dispatch(codeAfterEdit(codeEdit[0]));
        const data = {
            appointmentId: appointment?.id,
            sessionNoteDataId: noteName?.id || '',
            billingCode: codeEdit[0]?.id,
        };
        await schedulingApis.checkSessionNoteExists(data);
        //call this api only to show name else not
        dispatch(
            getNameOfNote({
                authorizationCode:
                    codeEdit[0]?.id ||
                    appointment?.authorizationCodes[0]?.authorizationCode?.id,
                appointmentId: appointment.id,
                sessionNotesDataId:
                    saveNoteId || appointment?.sessionNotesDataId || '',
            })
        );
        const isEdit: any = true;
        dispatch(isAuthorizationCodesEdited(isEdit));
        setAfterEdit(true);
        setFieldHours(hours);
        setFieldmin(min);
        setIsFirstEffectDone(true);
        setIsEditAuthorization(false);
        dispatch(setCodes(newCode));
    };
    const { handleChange } = useFormikContext();
    return (
        <>
            <div className="mt-9 ">
                <span className="text-base font-semibold flex">
                    {!mode ? 'Authorization & Billing' : 'Authorization'}
                    {mode ? (
                        <img
                            src={editIcon}
                            alt="edit icon"
                            className="ml-2 cursor-pointer"
                            onClick={() => {
                                const isEdit: any = true;
                                dispatch(isAuthorizationCodesEdited(isEdit));
                                setIsEditAuthorization(true);
                            }}
                        />
                    ) : null}
                </span>
                {!mode ? (
                    <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                ) : null}
                <div className="w-8/2 mt-4 flex">
                    <div className="space-y-8 flex-grow">
                        {!mode ? (
                            <p className="color-gray font-light mt-2">
                                Choose a single or add multiple Billing codes
                            </p>
                        ) : null}
                        <div className="mt-5">
                            {' '}
                            {isUsedCode &&
                                authCodes?.map((item: any, key) => {
                                    const uniqueKey = item.id;
                                    return (
                                        <div
                                            key={uniqueKey}
                                            draggable
                                            onDragStart={() =>
                                                (dragItem.current = key)
                                            }
                                            onDragEnter={() =>
                                                (dragOverItem.current = key)
                                            }
                                            onDragEnd={handleSort}
                                            onDragOver={(e: any) =>
                                                e.preventDefault()
                                            }
                                            className="line cursor-pointer items-center flex space-y-1 space-x-2"
                                        >
                                            {!mode ? (
                                                <img
                                                    src={deleteIcon}
                                                    alt="delete icon"
                                                    onClick={() =>
                                                        setShowConfirmDel(
                                                            (prev: any) => {
                                                                return {
                                                                    ...prev,
                                                                    isModalOpen:
                                                                        true,
                                                                    key: key,
                                                                };
                                                            }
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    src={checkedGreen}
                                                    alt="check icon"
                                                />
                                            )}
                                            <p className="w-auto">
                                                {item.code} :
                                                <span className="ml-2">
                                                    {item.description}
                                                </span>
                                            </p>
                                            <Field
                                                autoComplete="off"
                                                isRequired={false}
                                                id="hours"
                                                name={`hours -${key}`}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldHours(
                                                        (prev: any) => {
                                                            return {
                                                                ...prev,
                                                                [`hours -${key}`]:
                                                                    e.target
                                                                        .value,
                                                            };
                                                        }
                                                    );
                                                    saveTime(
                                                        e.target.value,
                                                        'hours',
                                                        key,
                                                        item,
                                                        key
                                                    );
                                                    setFieldValue(
                                                        `hours -${key}`,
                                                        e.target.value
                                                    );
                                                    setHandleUseEffect(false);
                                                }}
                                                value={
                                                    fieldsHours[`hours -${key}`]
                                                }
                                                className="border-solid h-[2rem] border-2 text-center "
                                                type="number"
                                                component={Input}
                                            />
                                            <div>Hour</div>
                                            <Field
                                                autoComplete="off"
                                                isRequired={false}
                                                value={
                                                    fieldsmin[`minutes -${key}`]
                                                }
                                                id="hours"
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldmin((prev: any) => {
                                                        return {
                                                            ...prev,
                                                            [`minutes -${key}`]:
                                                                e.target.value,
                                                        };
                                                    });
                                                    setFieldValue(
                                                        `minutes -${key}`,
                                                        e.target.value
                                                    );
                                                    saveTime(
                                                        e.target.value,
                                                        'minutes',
                                                        key,
                                                        item,
                                                        key
                                                    );
                                                    setHandleUseEffect(false);
                                                }}
                                                name={`minutes -${key}`}
                                                className="border-solid h-[2rem] border-2 text-center "
                                                type="number"
                                                component={Input}
                                            />
                                            <div>Mins</div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="text-xs text-red-600 font-normal ">
                            {isError.status && isError.message}
                        </div>
                    </div>
                    {!mode ? (
                        <button
                            type="button"
                            onClick={visibleAuthCode}
                            className=" relative h-[2.5rem] w-32   flex justify-evenly items-center font-normal text-sm rounded border border-transparent bg-[#47AAC9] text-white hover:bg-[#47AAC9] disabled:opacity-50 disabled:pointer-events-none"
                            disabled={
                                !(primryProId && clientId) ||
                                showAddnew ||
                                !(employee !== 'EMPLOYEE')
                            }
                        >
                            <img src={plus} alt="plus" />
                            Add New
                        </button>
                    ) : null}
                </div>
            </div>
            {showCodes && (
                <Codes
                    setAuthCode={useCode}
                    setDelete={setDelete}
                    clientId={clientId}
                    primryProId={primryProId}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            )}
            {showConfirmDel?.isModalOpen && (
                <ConfirmationModal
                    header={''}
                    name={''}
                    title={
                        'Are you sure you want to discard this authorized code ?'
                    }
                    open={showConfirmDel?.isModalOpen}
                    onClose={() =>
                        setShowConfirmDel((prev: any) => {
                            return { ...prev, isModalOpen: false };
                        })
                    }
                    handleStop={deleteElement}
                />
            )}
            {isEditAuthorization && (
                <EditAuthorizationModal
                    open={isEditAuthorization}
                    onClose={() => setIsEditAuthorization(false)}
                    handleSaveCodes={handleSaveCodes}
                    isUsedCode={isUsedCode}
                    authCodes={authCodes}
                    saveTime={saveTime}
                    setHandleUseEffect={setHandleUseEffect}
                    primryProId={primryProId}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    triger={triger}
                    setTriger={setTriger}
                    appointmentTime={appointmentTime}
                    setUsedCodes={setUsedCodes}
                    meetingTo={meetingTo}
                    meetingFrom={meetingFrom}
                    afterEdit={afterEdit}
                    setAfterEdit={setAfterEdit}
                />
            )}
        </>
    );
}
