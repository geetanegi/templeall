import React, { useEffect, useRef, useState } from 'react';
import ScheduleEvent from './ScheduleEvent';
import LocationDetails from './LocationDetails';
import AuthorizationAndBilling from './AuthorizationAndBilling';
import { Formik, FormikValues } from 'formik';
import { CreateClientModalActions } from '../Generics/Modal';
import {
    getLocation,
    getPrimaryProvider,
    resetAuthCode,
} from '../../redux/slice/SchedulingRedux/Scheduling';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/slice/users/usersSlice';
import { getClientLocationCall } from '../../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants';
import scheduleEventAPI from '../../api/services/Scheduling/scheduleEvent.service';
import ConfirmationModal from '../Generics/ConfirmationModal';
import moment from 'moment-timezone';
import * as Yup from 'yup';
import {
    getAllEmployeesAndChildCall,
    getScheduleEventProvidersCall,
} from '../../redux/slice/Scheduling/getServices';
const initialValues = {
    title: '',
    date: '',
    time: '',
    to: '',
    repeatOption: '',
    primaryProvider: '',
    appointmentWith: '',
    additionParticipant: '',
    placeOfService: '',
    locationAddress: '',
    unitOfService: '',
    assignToMe: false,
    fromAmPm: '',
    toAmPm: '',
};
export default function AddNewEvent(): React.JSX.Element {
    const formRef: any = useRef<HTMLDivElement>(null);
    const formData = useSelector(({ scheduling }: any) => scheduling);
    const appointment = useSelector((state: any) => state.appointment.value);
    const selectedUsers = useSelector(({ getServices }: any) => getServices);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [repeatConfig, setRepeatConfig] = useState({});
    const dispatch = useDispatch<any>();
    const [scheduleEventsValues, setScheduleEventsValues] = useState<any>(null);
    const navigate = useNavigate();
    const [primryProId, setPrimaryProId] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [employee, setEmployee] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(1);
    const [handleUseEffect, setHandleUseEffect] = useState(false);
    const [showError, setShowError] = useState(false);
    const [appointmentTime, setAppointmentTime] = useState({
        hours: 0,
        min: 0,
    });
    const onEditStartDate = moment(
        appointment?.startTime,
        'YYYY-MM-DDTHH:mm:ss'
    ).format('YYYY-MM-DD hh:mm a');
    const onEditEndDate = moment(
        appointment?.endTime,
        'YYYY-MM-DDTHH:mm:ss'
    ).format('YYYY-MM-DD hh:mm a');
    const [meetingFrom, setMeetingFrom] = useState(
        appointment?.startTime?.length
            ? `${onEditStartDate?.split(' ')[1]} ${onEditStartDate?.split(' ')[2]}`
            : '00:00 am'
    );
    const [meetingTo, setMeetingTo] = useState(
        appointment?.endTime?.length
            ? `${onEditEndDate?.split(' ')[1]} ${onEditEndDate?.split(' ')[2]}`
            : '00:00 am'
    );
    const [timeChangeInput, setTimeChangeInput] = useState(false);
    const onCancel = (): any => {
        setOpenConfirmationModal(true);
        dispatch(resetAuthCode());
    };
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const handleSubmitDisable = (): boolean => {
        if (
            scheduleEventsValues?.title?.length &&
            scheduleEventsValues?.date?.startDate &&
            scheduleEventsValues?.primaryProvider &&
            scheduleEventsValues?.appointmentWith &&
            scheduleEventsValues?.time?.length &&
            scheduleEventsValues?.to?.length &&
            scheduleEventsValues?.fromAmPm?.value?.length &&
            scheduleEventsValues?.toAmPm?.value?.length &&
            employee === 'EMPLOYEE'
        ) {
            return false;
        } else if (
            scheduleEventsValues?.title?.length &&
            scheduleEventsValues?.date?.startDate &&
            scheduleEventsValues?.primaryProvider &&
            scheduleEventsValues?.appointmentWith &&
            scheduleEventsValues?.time?.length &&
            scheduleEventsValues?.to?.length &&
            scheduleEventsValues?.placeOfService &&
            scheduleEventsValues?.locationAddress &&
            scheduleEventsValues?.fromAmPm?.value?.length &&
            scheduleEventsValues?.toAmPm?.value?.length &&
            employee !== 'EMPLOYEE'
        ) {
            return false;
        } else {
            return true;
        }
    };
    const handleSubmitSave = async (): Promise<any> => {
        const codes = [];
        for (let i = 0; i < formData?.billableCodes.length; i++) {
            codes.push({
                code: formData?.billableCodes[i]?.id,
                hours: formData?.hours[i]?.value || 0,
                minutes: formData?.mins[i]?.value || 0,
            });
        }
        const timeFormat = 'h:mm a';
        const timeA = moment(
            `${scheduleEventsValues?.time} ${scheduleEventsValues?.fromAmPm?.value}`,
            timeFormat
        );
        const timeB = moment(
            `${scheduleEventsValues?.to} ${scheduleEventsValues?.toAmPm?.value}`,
            timeFormat
        );
        const durationMinutes = timeB.diff(timeA, 'minutes');
        const minutes = durationMinutes;
        const [appointmentWithId] =
            scheduleEventsValues?.appointmentWith?.split('_') || [];
        const startDateTime = moment(
            `${moment(scheduleEventsValues?.date?.startDate).format('YYYY-MM-DD')} ${scheduleEventsValues?.time} ${scheduleEventsValues?.fromAmPm?.value}`,
            'YYYY-MM-DD hh:mm a'
        ).format('YYYY-MM-DDTHH:mm:ss');
        const endDateTime = moment(
            `${moment(scheduleEventsValues?.date?.endDate).format('YYYY-MM-DD')} ${scheduleEventsValues?.to} ${scheduleEventsValues?.toAmPm?.value}`,
            'YYYY-MM-DD hh:mm a'
        ).format('YYYY-MM-DDTHH:mm:ss');
        const data = {
            title: scheduleEventsValues?.title,
            startTime: formData?.timezone?.length
                ? moment
                      .tz(startDateTime, moment.tz.guess())
                      .tz(formData?.timezone)
                      .utc()
                      .format('YYYY-MM-DDTHH:mm:ss')
                : moment(startDateTime).utc().format('YYYY-MM-DDTHH:mm:ss'),
            duration: minutes,
            endTime: formData?.timezone?.length
                ? moment
                      .tz(endDateTime, moment.tz.guess())
                      .tz(formData?.timezone)
                      .utc()
                      .format('YYYY-MM-DDTHH:mm:ss')
                : moment(endDateTime).utc().format('YYYY-MM-DDTHH:mm:ss'),
            timezone: formData?.timezone,
            isRepeat:
                scheduleEventsValues?.repeatOption === 'Does not repeats'
                    ? false
                    : true,
            primaryProviderId: scheduleEventsValues?.primaryProvider,
            appointmentWith: appointmentWithId
                ? parseInt(appointmentWithId, 10)
                : '',
            appointmentWithType:
                employee || scheduleEventsValues?.appointmentWith?.type,
            placeOfService: scheduleEventsValues?.placeOfService,
            locationAddress: scheduleEventsValues?.locationAddress,
            createdBy: userPermission?.value?.data?.userId || 1,
            repeatConfiguration: repeatConfig,
            additionalParticipants: formData?.participants,
            authorizationCodes: codes,
        };
        const res = await scheduleEventAPI.scheduleEvent(data);
        const userIds = selectedUsers?.searchedUsers
            ?.map((item: any) => {
                if (item.id !== undefined) {
                    return {
                        id: item.id,
                        type: 'EMPLOYEE',
                    };
                } else if (item.childId !== undefined) {
                    return {
                        id: item.childId,
                        type: 'CHILD',
                    };
                }
                return null; // In case of any unexpected data format
            })
            .filter((item: any) => item !== null); // Filter out any null values
        if (!res?.data?.error) {
            dispatch(getScheduleEventProvidersCall({ userIds: userIds }));
            setTimeout(() => {
                navigate(ROUTES.scheduling);
            }, 1000);
        } else {
            return res;
        }
    };
    const handleSubmitForm = async (values: FormikValues): Promise<any> => {
        setScheduleEventsValues(values);
    };
    useEffect(() => {
        dispatch(getPrimaryProvider());
        dispatch(getLocation());
        dispatch(getAllUsers());
        dispatch(getClientLocationCall());
        dispatch(getAllEmployeesAndChildCall({ organizationId: '' }));
    }, []);
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
        }
    };
    const validationSchema = Yup.object({
        title: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,50}$/,
            'Input cannot exceed the maximum length of 50 characters.'
        ),
    });
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                enableReinitialize={true}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div
                        className={`${formData?.completeScheduleEvent ? 'pointer-events-none' : ''} pl-9 pr-9 pb-9 pt-5 h-[102vh] items-center border mt-[1.9375rem] mx-[2rem] rounded-lg shadow-lg overflow-scroll `}
                        data-testid="add-new-event-page"
                    >
                        <ScheduleEvent
                            setPrimaryProId={setPrimaryProId}
                            setAppointmentTime={setAppointmentTime}
                            primryProId={primryProId}
                            appointmentTime={appointmentTime}
                            formRef={formRef}
                            setRepeatConfig={setRepeatConfig}
                            repeatConfig={repeatConfig}
                            meetingFrom={meetingFrom}
                            setMeetingFrom={setMeetingFrom}
                            meetingTo={meetingTo}
                            setMeetingTo={setMeetingTo}
                            timeChangeInput={timeChangeInput}
                            setTimeChangeInput={setTimeChangeInput}
                            setClientId={setClientId}
                            clientId={clientId}
                            activeTab={activeTab}
                            handleUseEffect={handleUseEffect}
                            setHandleUseEffect={setHandleUseEffect}
                            setEmployee={setEmployee}
                            setShowError={setShowError}
                        />
                        {employee !== 'EMPLOYEE' ? (
                            <LocationDetails formRef={formRef} />
                        ) : null}
                        {employee !== 'EMPLOYEE' ? (
                            <AuthorizationAndBilling
                                primryProId={primryProId}
                                appointmentTime={appointmentTime}
                                renderDynamicTime={renderDynamicTime}
                                clientId={clientId}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleUseEffect={handleUseEffect}
                                setHandleUseEffect={setHandleUseEffect}
                                employee={employee}
                                // formRef={formRef}
                            />
                        ) : null}
                        {/* <Codes /> */}
                    </div>
                </form>
            </Formik>
            <div className="relative right-[22px]">
                <CreateClientModalActions
                    onClose={onCancel}
                    handleSubmit={handleSubmitSave}
                    isDisabled={handleSubmitDisable() || showError}
                />
            </div>
            {openConfirmationModal && (
                <ConfirmationModal
                    header={''}
                    name={''}
                    title={'Are you sure you want to discard this event?'}
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={() => {
                        navigate(ROUTES.scheduling);
                    }}
                />
            )}
        </>
    );
}
