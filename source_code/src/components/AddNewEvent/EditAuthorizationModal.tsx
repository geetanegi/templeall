/* eslint-disable max-len */
import React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    ProgramBookModalFooter,
} from '../Generics/Modal';
import checkedGreen from '../../assets/img/checkedGreen.svg';
import { Field, useFormikContext } from 'formik';
import Input from '../Generics/Inputs/Input';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import Codes from './Codes/Codes';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearHours,
    deleteAuthCodes,
    deleteHours,
    getAuthorizationAndNonBillable,
    resetAuthCode,
    savingAuthCodes,
    savingBillableCodes,
} from '../../redux/slice/SchedulingRedux/Scheduling';
import ConfirmationModal from '../Generics/ConfirmationModal';
interface EditAuthorizationModal {
    open?: boolean;
    handleSaveCodes?: any;
    onClose?: () => void;
    isUsedCode?: boolean;
    authCodes?: any;
    saveTime?: any;
    setHandleUseEffect?: any;
    primryProId?: any;
    activeTab?: any;
    setActiveTab?: any;
    triger?: any;
    setTriger?: any;
    appointmentTime?: any;
    setUsedCodes?: any;
    meetingTo?: any;
    meetingFrom?: any;
    afterEdit?: any;
    setAfterEdit?: any;
}
export default function EditAuthorizationModal({
    open,
    handleSaveCodes,
    onClose,
    isUsedCode,
    authCodes,
    saveTime,
    primryProId,
    activeTab,
    setActiveTab,
    triger,
    setTriger,
    appointmentTime,
    setUsedCodes,
    meetingTo,
    meetingFrom,
    afterEdit,
    setAfterEdit,
}: EditAuthorizationModal): React.JSX.Element {
    const [showConfirmDel, setShowConfirmDel] = React.useState({
        isModalOpen: false,
        key: null,
    });
    const appointment = useSelector((state: any) => state.appointment.value);
    const { setFieldValue, handleChange } = useFormikContext();
    const dispatch = useDispatch<any>();
    const formData = useSelector(({ scheduling }: any) => scheduling);
    const [codes, setCodes] = React.useState<Array<any>>([]);
    const [, setBillableCodeClickCount] = React.useState(0);
    const [fieldsHoursAfterEdit, setFieldHoursAfterEdit] = React.useState<any>(
        {}
    );
    const [fieldsminAfterEdit, setFieldminAfterEdit] = React.useState<any>({});
    const [, setTypeOfCodeTime] = React.useState({
        bill: { hours: '', min: '' },
        auth: { hours: '', min: '' },
    });
    const [handleEffect, setHandleEffect] = React.useState(false);
    const [deleteKeyCodes, setDeleteCodes] = React.useState(false);
    const [done, setDone] = React.useState(true);
    const [disableUseCode, setDisableUseCode] = React.useState(true);
    React.useEffect(() => {
        if (authCodes.length && done) {
            setUsedCodes(true);
            setCodes(authCodes);
            setFieldHoursAfterEdit((prev: any) => {
                authCodes.forEach(
                    (item: any, key: any) =>
                        (prev[`hours -${key}`] = parseInt(item.hours))
                );
                return prev;
            });
            setFieldminAfterEdit((prev: any) => {
                authCodes.forEach(
                    (item: any, key: any) =>
                        (prev[`minutes -${key}`] = parseInt(item.minutes))
                );
                return prev;
            });
            setDone(false);
        }
    }, [authCodes]);
    React.useEffect(() => {
        const payload = {
            codeType: 'Billable',
            clientId: appointment?.appointmentWith?.id,
            serviceProviderId: primryProId,
        };
        dispatch(getAuthorizationAndNonBillable(payload));
        setCodes(authCodes);
    }, [authCodes]);
    const useCodeForEdit = (item: any): any => {
        setHandleEffect(true);
        const nonBillLength = codes.filter((code) => {
            if (typeof code.codeType === 'object') {
                return code.codeType.name === 'Billable';
            } else if (typeof code.codeType === 'string') {
                return code.codeType === 'Billable';
            }
            return false;
        }).length;
        const nonBill = codes.filter((code) => {
            if (typeof code.codeType === 'object') {
                return code.codeType.name === 'Non-Billable';
            } else if (typeof code.codeType === 'string') {
                return code.codeType === 'Non-Billable';
            }
            return false;
        }).length;
        const data: any = {
            ...item,
            key: formData?.billableCodes.length,
        };
        dispatch(savingBillableCodes(data));
        setUsedCodes(true);
        // setTriger(!triger);
        if (item.codeType === 'Billable') {
            setBillableCodeClickCount((prevCount) => prevCount + 1);
            // clickCount = billableCodeClickCount + 1;
        }
        // Retrieve the total appointment time from hours and minutes
        const appointmentHours = appointmentTime?.hours || 0;
        const appointmentMinutes = appointmentTime?.min || 0;
        // Convert the total appointment time to total minutes
        const totalAppointmentMinutes =
            appointmentHours * 60 + appointmentMinutes - nonBill * 30;
        const dividedTotalMinutes = totalAppointmentMinutes / nonBillLength;
        const dividedHours = Math.floor(dividedTotalMinutes / 60);
        const dividedMinutes = Math.floor(dividedTotalMinutes % 60);
        const updatedTime = codes.map((oldItem: any) => {
            if (oldItem.codeType === 'Billable') {
                return {
                    ...oldItem,
                    hours: dividedHours >= 0 ? dividedHours : 0,
                    minutes: dividedMinutes >= 0 ? dividedMinutes : 0,
                };
            } else return { ...oldItem };
        });
        // Check if the code type is 'Billable'
        if (item.codeType === 'Billable') {
            setCodes([]);
            updatedTime.push({
                ...item,
                hours: dividedHours >= 0 ? dividedHours : 0,
                minutes: dividedMinutes >= 0 ? dividedMinutes : 0,
            });
            updatedTime.forEach((i: any, key: any) => {
                setFieldHoursAfterEdit((prev: Record<string, any>) => {
                    // Return a new state object with updated value for the current key
                    return {
                        ...prev,
                        [`hours -${key}`]: i.hours,
                    };
                });
                setFieldminAfterEdit((prev: any) => {
                    return {
                        ...prev,
                        [`minutes -${key}`]: i.minutes,
                    };
                });
                saveTime(i.hours, 'hours', item?.id, item, key);
                saveTime(i.minutes, 'minutes', item?.id, item, key);
            });
            setCodes(updatedTime);
            // Update the state with the divided time
            setTypeOfCodeTime((prev: any) => ({
                ...prev,
                bill: {
                    hours: dividedHours >= 0 ? dividedHours : 0,
                    minutes: dividedMinutes >= 0 ? dividedMinutes : 0,
                },
            }));
        } else {
            updatedTime.push({
                ...item,
                hours: 0,
                minutes: 30,
            });
            updatedTime.forEach((i: any, key: any) => {
                setFieldHoursAfterEdit((prev: Record<string, any>) => {
                    // Return a new state object with updated value for the current key
                    return {
                        ...prev,
                        [`hours -${key}`]: i.hours,
                    };
                });
                setFieldminAfterEdit((prev: any) => {
                    return {
                        ...prev,
                        [`minutes -${key}`]: i.minutes,
                    };
                });
                saveTime(i.hours, 'hours', item?.id, item, key);
                saveTime(i.minutes, 'minutes', item?.id, item, key);
            });
            setCodes(updatedTime);
            setTypeOfCodeTime((prev: any) => {
                return { ...prev, auth: prev.auth + 30 };
            });
        }
    };
    const handleSave = (): any => {
        handleSaveCodes(codes, fieldsHoursAfterEdit, fieldsminAfterEdit);
    };
    React.useEffect(() => {
        if (afterEdit || handleEffect || (handleEffect && appointment?.id)) {
            const nonBillLength = codes.filter((code) => {
                if (typeof code.codeType === 'object') {
                    return code.codeType.name === 'Billable';
                } else if (typeof code.codeType === 'string') {
                    return code.codeType === 'Billable';
                }
                return false;
            }).length;
            const nonBill = codes.filter((code) => {
                if (typeof code.codeType === 'object') {
                    return code.codeType.name === 'Non-Billable';
                } else if (typeof code.codeType === 'string') {
                    return code.codeType === 'Non-Billable';
                }
                return false;
            }).length;
            const appointmentHours = appointmentTime?.hours || 0;
            const appointmentMinutes = appointmentTime?.min || 0;
            // Convert the total appointment time to total minutes
            const totalAppointmentMinutes =
                appointmentHours * 60 + appointmentMinutes - nonBill * 30;
            const dividedTotalMinutes = totalAppointmentMinutes / nonBillLength;
            const dividedHours = Math.floor(dividedTotalMinutes / 60);
            const dividedMinutes = Math.floor(dividedTotalMinutes % 60);
            if (deleteKeyCodes) {
                const updatedTime = codes.map((oldItem: any) => {
                    if (oldItem.codeType === 'Billable') {
                        return {
                            ...oldItem,
                            hours: dividedHours >= 0 ? dividedHours : 0,
                            minutes: dividedMinutes >= 0 ? dividedMinutes : 0,
                        };
                    } else if (oldItem.codeType?.name === 'Billable') {
                        return {
                            ...oldItem,
                            hours: dividedHours >= 0 ? dividedHours : 0,
                            minutes: dividedMinutes >= 0 ? dividedMinutes : 0,
                        };
                    }
                    return { ...oldItem, hours: 0, minutes: 30 };
                });
                updatedTime.forEach((i: any, key: any) => {
                    setFieldHoursAfterEdit((prev: Record<string, any>) => {
                        // Return a new state object with updated value for the current key
                        return {
                            ...prev,
                            [`hours -${key}`]: i.hours,
                        };
                    });
                    setFieldminAfterEdit((prev: any) => {
                        return {
                            ...prev,
                            [`minutes -${key}`]: i.minutes,
                        };
                    });
                    saveTime(i.hours, 'hours', i?.id, i, key);
                    saveTime(i.minutes, 'minutes', i?.id, i, key);
                });
                if (updatedTime?.length) {
                    setAfterEdit(false);
                    setCodes(updatedTime);
                }
                setHandleEffect(false);
            }
        }
    }, [codes, meetingFrom, meetingTo, appointmentTime, handleEffect]);
    React.useEffect(() => {
        if (disableUseCode) {
            const setElement = codes?.filter(
                (item: any) => item?.codeType?.name === 'Billable'
            );
            if (setElement?.length) {
                dispatch(savingAuthCodes(setElement[0]));
            }
        }
    }, [codes, disableUseCode]);
    const deleteElement = (): void => {
        const filterArr = codes.filter((item: any, index: any) => {
            if (index == showConfirmDel.key) {
                const newHours = { ...fieldsHoursAfterEdit };
                const newMinutes = { ...fieldsminAfterEdit };
                delete newHours[`hours -${showConfirmDel.key}`];
                delete newMinutes[`minutes -${showConfirmDel.key}`];
                const hoursNewData: any = {};
                Object.values(newHours).forEach((hrs, key) => {
                    hoursNewData[`hours -${key}`] = hrs;
                });
                const minNewData: any = {};
                Object.values(newMinutes).forEach((hrs, key) => {
                    minNewData[`minutes -${key}`] = hrs;
                });
                setFieldHoursAfterEdit(hoursNewData);
                setFieldminAfterEdit(minNewData);
                dispatch(deleteHours(index));
                dispatch(deleteAuthCodes(item?.id));
                setDeleteCodes(true);
                setHandleEffect(true);
                dispatch(clearHours());
            }
            return index != showConfirmDel.key;
        });
        setCodes(filterArr);
        setShowConfirmDel((prev: any) => {
            return { ...prev, isModalOpen: false };
        });
        setTriger(!triger);
        setDisableUseCode(false);
        const nonBillLength = filterArr.filter((code) => {
            if (typeof code.codeType === 'object') {
                return code.codeType.name === 'Billable';
            } else if (typeof code.codeType === 'string') {
                return code.codeType === 'Billable';
            }
            return false;
        }).length;
        if (!nonBillLength) dispatch(resetAuthCode());
    };
    React.useEffect(() => {
        setActiveTab(1);
    }, []);
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalHeader
                title={'Edit - Authorization'}
                icon={false}
                onExpand={undefined}
                onClose={onClose}
            />
            <ModalBody expandModal={false}>
                <div
                    className="mt-5 w-[70rem]"
                    data-testid="open-edit-auth-modal"
                >
                    {' '}
                    {isUsedCode &&
                        codes?.map((item: any, key: any) => {
                            return (
                                <>
                                    <div
                                        key={key}
                                        className="line cursor-pointer items-center flex space-y-1 space-x-2"
                                    >
                                        <img
                                            src={checkedGreen}
                                            alt="check icon"
                                        />
                                        <p className="w-auto">
                                            {item.code} {item.description}
                                        </p>
                                        <Field
                                            autoComplete="off"
                                            isRequired={false}
                                            id="hours"
                                            name={`hours -${key}`}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setFieldHoursAfterEdit(
                                                    (prev: any) => {
                                                        return {
                                                            ...prev,
                                                            [`hours -${key}`]:
                                                                e.target.value,
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
                                                setHandleEffect(false);
                                            }}
                                            value={
                                                fieldsHoursAfterEdit[
                                                    `hours -${key}`
                                                ]
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
                                                fieldsminAfterEdit[
                                                    `minutes -${key}`
                                                ]
                                            }
                                            id="hours"
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setFieldminAfterEdit(
                                                    (prev: any) => {
                                                        return {
                                                            ...prev,
                                                            [`minutes -${key}`]:
                                                                e.target.value,
                                                        };
                                                    }
                                                );
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
                                                setHandleEffect(false);
                                            }}
                                            name={`minutes -${key}`}
                                            className="border-solid h-[2rem] border-2 text-center "
                                            type="number"
                                            component={Input}
                                        />
                                        <div>Mins</div>
                                        <img
                                            src={deleteIcon}
                                            alt="delete icon"
                                            onClick={() =>
                                                setShowConfirmDel(
                                                    (prev: any) => {
                                                        return {
                                                            ...prev,
                                                            isModalOpen: true,
                                                            key: key,
                                                        };
                                                    }
                                                )
                                            }
                                        />
                                    </div>
                                </>
                            );
                        })}
                    <Codes
                        setAuthCode={useCodeForEdit}
                        setDelete={setDeleteCodes}
                        clientId={appointment?.appointmentWith?.id || ''}
                        primryProId={primryProId}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        setDisableUseCode={setDisableUseCode}
                    />
                </div>
            </ModalBody>
            <ProgramBookModalFooter
                onClose={onClose}
                handleSubmit={handleSave}
            />
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
        </Modal>
    );
}
