/* eslint-disable max-lines */
import React, { useEffect, useRef, useState } from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import ScheduleEvent, {
    getTimeDifference,
} from '../components/AddNewEvent/ScheduleEvent';
import LocationDetails from '../components/AddNewEvent/LocationDetails';
import { Formik, FormikValues } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointment } from '../redux/slice/appointment/appointmentSlice';
import LoaderComponent from '../components/LoaderComponent';
import {
    getLocation,
    getPrimaryProvider,
    savingHours,
    savingMins,
    setClickedProvider,
} from '../redux/slice/SchedulingRedux/Scheduling';
import { getAllUsers } from '../redux/slice/users/usersSlice';
import { getClientLocationCall } from '../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
import NoteAndSignature from '../components/AddNewEvent/NoteAndSignature';
import { AppointmentDetailsFooter } from '../components/Generics/Modal';
import { ROUTES } from '../constants/index';
import schedulingApis from '../api/services/scheduling.service';
import { getNameOfNote } from '../redux/slice/template/templateSlice';
import { signData, signDataName } from '../redux/slice/Signature/Signature';
import sessionApis from '../api/services/session.service';
import { openNotification } from '../redux/slice/Notification/notifications';
import RunSessionModal from '../components/RunSessionModal';
import moment from 'moment-timezone';
import { getScheduleEventProvidersCall } from '../redux/slice/Scheduling/getServices';
function AppointmentDetails(): React.JSX.Element {
    const params = useParams();
    const formRef: any = useRef<HTMLDivElement>(null);
    const ref = useRef<any>(null);
    const dispatch = useDispatch<any>();
    const [sessionDetails, setSessionDetails] = useState({
        loading: false,
        error: false,
        data: [],
    });
    const [showSessionsModal, setShowSessionsModal] = useState(false);
    const appointment = useSelector((state: any) => state.appointment.value);
    const selectedUsers = useSelector(({ getServices }: any) => getServices);
    const unitOfService = useSelector(
        (state: any) => state.scheduling?.unitOfService
    );
    const isAuthorizationCodesEdited = useSelector(
        (state: any) => state.scheduling?.isAuthorizationCodesEdited
    );
    const completeScheduleEvent = useSelector(
        (state: any) => state.scheduling?.completeScheduleEvent
    );
    const codeAfterEdit = useSelector(
        (state: any) => state?.scheduling?.codeAfterEdit
    );
    const saveNoteId = useSelector(
        (state: any) => state?.scheduling?.saveNoteId
    );
    const [primryProId, setPrimaryProId] = useState(null);
    const [scheduleEventsValues, setScheduleEventsValues] = useState<any>(null);
    const [appointmentTime, setAppointmentTime] = useState({
        hours: 0,
        min: 0,
    });
    const [activeTab, setActiveTab] = useState(1);
    const [handleUseEffect, setHandleUseEffect] = useState(false);
    const [timeChangeInput, setTimeChangeInput] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const onEditStartDate = moment
        .utc(appointment?.startTime)
        .local()
        .format('YYYY-MM-DD hh:mm a');
    const onEditEndDate = moment
        .utc(appointment?.endTime)
        .local()
        .format('YYYY-MM-DD hh:mm a');
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
    const [isEditAuthorization, setIsEditAuthorization] = useState(false);
    const navigate = useNavigate();
    const getInitialValues = (): any => {
        const editStartDate = moment
            .utc(appointment?.startTime)
            .local()
            .format('YYYY-MM-DD hh:mm a');
        const editEndDate = moment
            .utc(appointment?.endTime)
            .local()
            .format('YYYY-MM-DD hh:mm a');
        const data: any = {
            title: appointment.title,
            time: editStartDate?.split(' ')[1],
            to: editEndDate?.split(' ')[1],
            fromAmPm: {
                label: editStartDate?.split(' ')[2],
                value: editStartDate?.split(' ')[2],
            },
            toAmPm: {
                label: editEndDate?.split(' ')[2],
                value: editEndDate?.split(' ')[2],
            },
            repeatOption: appointment?.repeat,
            primaryProvider: [appointment?.primaryProvider?.id],
            appointmentWith: {
                label: `${appointment.appointmentWith?.firstName} ${appointment?.appointmentWith?.lastName}`,
                value: appointment?.appointmentWith?.id,
            },
            additionParticipant: JSON?.parse(
                appointment?.additionalParticipants
            ),
            placeOfService: {
                label: `${appointment?.placeOfServices?.service}`,
                value: appointment?.placeOfServices?.id,
            },
            locationAddress: {
                label: `${appointment?.locationAddress?.city}, ${appointment?.locationAddress?.zipCode} - ${appointment?.locationAddress?.state}`,
                value: appointment?.placeOfServices?.id,
            },
            date: {
                startDate: editStartDate?.split(' ')?.[0],
                endDate: editEndDate?.split(' ')?.[0],
            },
        };
        appointment.authorizationCodes?.forEach((item: any, key: any) => {
            data[`hours -${key}`] = item.hours;
            data[`minutes -${key}`] = item.minutes;
        });
        return data;
    };
    useEffect(() => {
        if (params.id) {
            dispatch(
                getAppointment({
                    id: params.id,
                })
            );
            dispatch(setClickedProvider(appointment?.primaryProvider?.id));
        }
    }, [params.id]);
    const saveCodes = (): any => {
        appointment?.authorizationCodes?.forEach((item: any, index: any) => {
            const dataHours: any = {
                key: index,
                value: item?.hours === 'null' ? 0 : item?.hours,
                codes:
                    item?.authorizationCode?.code?.length >= 1
                        ? item?.authorizationCode?.code
                        : item?.authorizationCode?.name,
            };
            const dataMins: any = {
                key: index,
                value: item?.minutes === 'null' ? 0 : item?.minutes,
                codes:
                    item?.authorizationCode?.code?.length >= 1
                        ? item?.authorizationCode?.code
                        : item?.authorizationCode?.name,
            };
            dispatch(savingHours(dataHours));
            dispatch(savingMins(dataMins));
        });
    };
    useEffect(() => {
        if (appointment.id) {
            dispatch(
                getNameOfNote({
                    authorizationCode:
                        codeAfterEdit?.id ||
                        appointment?.authorizationCodes?.[0]?.authorizationCode
                            ?.id,
                    appointmentId: appointment?.id,
                    sessionNotesDataId:
                        saveNoteId || appointment?.sessionNotesDataId || '',
                })
            );
        }
    }, [appointment?.id]);
    useEffect(() => {
        if (appointment?.id) {
            setPrimaryProId(appointment?.primaryProvider?.id);
            setAppointmentTime(appointment?.primaryProvider?.id);
            const input = getTimeDifference(
                `${onEditStartDate?.split(' ')[1]} ${onEditStartDate?.split(' ')[2]}`,
                `${onEditEndDate?.split(' ')[1]} ${onEditEndDate?.split(' ')[2]}`
            );
            const regex = /(\d+)\s*hours?\s*(\d+)\s*mins?/;
            const matches = input.match(regex);
            if (matches) {
                const hours = parseInt(matches[1]);
                const min = parseInt(matches[2]);
                setAppointmentTime({ hours, min });
            }
        }
        saveCodes();
        dispatch(signData(appointment?.signature));
        dispatch(signDataName(appointment?.providersNameSignature));
    }, [appointment]);
    useEffect(() => {
        dispatch(getPrimaryProvider());
        dispatch(getLocation());
        dispatch(getAllUsers());
        dispatch(getClientLocationCall());
    }, []);
    const onCancel = (): void => {
        navigate(ROUTES.scheduling);
    };
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const signatureData = useSelector(
        ({ SignatureRedex }: any) => SignatureRedex
    );
    const formData = useSelector(({ scheduling }: any) => scheduling);
    const handleSubmitSave = async (): Promise<any> => {
        const codes: any = [];
        for (let i = 0; i < formData?.setCodes?.length; i++) {
            codes.push({
                authorizationCodes: formData?.setCodes?.[i],
                id: formData?.setCodes[i]?.id,
                hours: formData?.setCodes[i]?.hours || 0,
                minutes: formData?.setCodes[i]?.minutes || 0,
            });
        }
        const timeFormat = 'h:mm a';
        const timeA = scheduleEventsValues?.time
            ? moment(
                  `${scheduleEventsValues?.time} ${scheduleEventsValues?.fromAmPm?.value}`,
                  timeFormat
              )
            : moment(appointment?.startTime, timeFormat);
        const timeB = scheduleEventsValues?.to
            ? moment(
                  `${scheduleEventsValues?.to} ${scheduleEventsValues?.toAmPm?.value}`,
                  timeFormat
              )
            : moment(appointment?.endTime, timeFormat);
        const durationMinutes = timeB.diff(timeA, 'minutes');
        const minutes = durationMinutes;
        const startDateTime = moment(
            `${scheduleEventsValues?.date?.startDate} ${scheduleEventsValues?.time} ${scheduleEventsValues?.fromAmPm?.value}`,
            'YYYY-MM-DD hh:mm a'
        ).format('YYYY-MM-DDTHH:mm:ss');
        const endDateTime = moment(
            `${scheduleEventsValues?.date?.endDate} ${scheduleEventsValues?.to} ${scheduleEventsValues?.toAmPm?.value}`,
            'YYYY-MM-DD hh:mm a'
        ).format('YYYY-MM-DDTHH:mm:ss');
        const data = {
            eventId: params.id || '',
            signature: signatureData?.Sign || '',
            providersNameSignature: signatureData?.nameOfSignature || '',
            termsAndConditions: '',
            startTime:
                appointment?.timezone?.length || formData?.timezone?.length
                    ? moment
                          .tz(startDateTime, moment.tz.guess())
                          .tz(
                              formData?.timezone?.length
                                  ? formData?.timezone
                                  : appointment?.timezone
                          )
                          .utc()
                          .format('YYYY-MM-DDTHH:mm:ss')
                    : moment(startDateTime).utc().format('YYYY-MM-DDTHH:mm:ss'),
            endTime:
                appointment?.timezone?.length || formData?.timezone?.length
                    ? moment
                          .tz(endDateTime, moment.tz.guess())
                          .tz(
                              formData?.timezone?.length
                                  ? formData?.timezone
                                  : appointment?.timezone
                          )
                          .utc()
                          .format('YYYY-MM-DDTHH:mm:ss')
                    : moment(endDateTime).utc().format('YYYY-MM-DDTHH:mm:ss'),
            modifiedBy: userPermission?.value?.data?.userId || '1',
            authorizationCodes: codes,
            primaryProviderId: scheduleEventsValues?.primaryProvider
                ? scheduleEventsValues?.primaryProvider
                : appointment?.primaryProvider?.id,
            unitOfService: unitOfService || '',
            duration: minutes,
            timezone: formData?.timezone,
            isAuthorizationCodesEdited: isAuthorizationCodesEdited ?? false,
        };
        const res = await schedulingApis.editScheduleEvent(data);
        if (!res?.data?.error) {
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
                    return null;
                })
                .filter((item: any) => item !== null);
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
    const handleRunSession = (): void => {
        (async () => {
            setSessionDetails((prev) => ({ ...prev, loading: true }));
            try {
                const response = await sessionApis.fetchSessionsByClientId({
                    clientId: appointment.appointmentWith.id,
                });
                if (response.data.data.length === 0) {
                    dispatch(
                        openNotification({
                            success: false,
                            title: 'No sessions found!',
                            description: '',
                        })
                    );
                    setSessionDetails((prev) => ({
                        ...prev,
                        loading: false,
                        error: false,
                        data: [],
                    }));
                } else if (response.data.data.length === 1) {
                    navigate(
                        `${ROUTES.runSession}/${response.data.data?.[0].id}`
                    );
                } else {
                    setSessionDetails((prev) => ({
                        ...prev,
                        loading: false,
                        error: false,
                        data: response.data.data,
                    }));
                    setShowSessionsModal(true);
                }
            } catch (err) {
                setSessionDetails((prev) => ({
                    ...prev,
                    error: true,
                    loading: false,
                    data: [],
                }));
            }
        })();
    };
    useEffect(() => {
        if (appointment.id) {
            ref?.current?.setFieldValue(
                'locationAddress',
                appointment?.locationAddress?.id
            );
            ref?.current?.setFieldValue(
                'placeOfService',
                appointment?.placeOfServices?.id
            );
        }
    }, [appointment]);
    return (
        <div className="h-screen" data-testid="appointment-details-page">
            {appointment?.id ? (
                <>
                    <Formik
                        initialValues={getInitialValues()}
                        onSubmit={handleSubmitForm}
                        validateOnChange
                        enableReinitialize={true}
                        innerRef={ref}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div className="pl-9 pr-9 pb-9 pt-5 h-[102vh] items-center w-80rem border mt-[1.9375rem] mx-[2rem] rounded-lg shadow-lg overflow-scroll">
                                <div
                                    className={`${appointment?.sessionNoteBilling || completeScheduleEvent ? 'pointer-events-none' : ''}`}
                                >
                                    <ScheduleEvent
                                        setPrimaryProId={setPrimaryProId}
                                        setAppointmentTime={setAppointmentTime}
                                        mode={
                                            appointment?.sessionNoteBilling ||
                                            completeScheduleEvent
                                                ? 'view'
                                                : 'edit'
                                        }
                                        primryProId={primryProId}
                                        appointmentTime={appointmentTime}
                                        formRef={formRef}
                                        meetingFrom={meetingFrom}
                                        setMeetingFrom={setMeetingFrom}
                                        meetingTo={meetingTo}
                                        setMeetingTo={setMeetingTo}
                                        timeChangeInput={timeChangeInput}
                                        setTimeChangeInput={setTimeChangeInput}
                                        isEditable={isEditable}
                                        setIsEditable={setIsEditable}
                                        handleUseEffect={handleUseEffect}
                                        setHandleUseEffect={setHandleUseEffect}
                                        setIsEditAuthorization={
                                            setIsEditAuthorization
                                        }
                                        isEditAuthorization={
                                            isEditAuthorization
                                        }
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                    {appointment?.appointmentWith?.type !==
                                    'EMPLOYEE' ? (
                                        <LocationDetails
                                            mode={
                                                appointment?.sessionNoteBilling ||
                                                completeScheduleEvent
                                                    ? 'view'
                                                    : 'edit'
                                            }
                                            formRef={formRef}
                                        />
                                    ) : null}
                                </div>
                                <div>
                                    <NoteAndSignature
                                        isViewMode={
                                            appointment?.sessionNoteBilling ||
                                            completeScheduleEvent
                                                ? 'view'
                                                : 'edit'
                                        }
                                    />
                                </div>
                                {/* <Codes /> */}
                            </div>
                        </form>
                    </Formik>
                    <div className="relative right-[22px]">
                        <AppointmentDetailsFooter
                            onClose={onCancel}
                            handleSubmit={handleSubmitSave}
                            handleRun={handleRunSession}
                            runLoading={sessionDetails.loading}
                        />
                    </div>
                    {showSessionsModal ? (
                        <RunSessionModal
                            appointmentWith={appointment.appointmentWith}
                            sessionDetails={sessionDetails.data}
                            setShowSessionsModal={setShowSessionsModal}
                        />
                    ) : null}
                </>
            ) : (
                <LoaderComponent />
            )}
        </div>
    );
}
export default withLayout(AppointmentDetails);
