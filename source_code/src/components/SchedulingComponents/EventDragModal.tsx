import * as React from 'react';
import Modal, {
    DragEventModalFooter,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Field, Formik } from 'formik';
import Input from '../Generics/Inputs/Input';
import dragEventAPI from '../../api/services/Scheduling/dragEvent.service';
import { getScheduleEventCall } from '../../redux/slice/Scheduling/getServices';
interface Values {
    reason: any;
}
export default function EventDragModal({
    open,
    onClose,
    data,
}: {
    open?: boolean;
    onClose?: any;
    data?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const initialValues: any = {
        reason: '',
    };
    const dateBeforeDrag = new Date(data?.event?.start);
    const endDateBeforeDrag = new Date(data?.event?.end);
    const dateAfterDrag = new Date(data?.start);
    const formattedDateBeforeDrag = moment(dateBeforeDrag).format('MM/DD/YYYY');
    const formattedDateAfterDrag = moment(dateAfterDrag).format('MM/DD/YYYY');
    const formattedTimeBeforeDrag = moment(dateBeforeDrag).format('hh:mm A');
    const formattedEndTimeBeforeDrag =
        moment(endDateBeforeDrag).format('hh:mm A');
    const getTimeFrom = (): any => {
        const startTime = new Date(data?.start);
        let hours = startTime?.getHours();
        const minutes = startTime?.getMinutes().toString().padStart(2, '0');
        const AMPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours.toString().padStart(2, '0')}:${minutes} ${AMPM}`;
    };
    const getTimeTo = (): any => {
        const startTime = new Date(data?.end);
        let hours = startTime?.getHours();
        const minutes = startTime?.getMinutes().toString().padStart(2, '0');
        const AMPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours.toString().padStart(2, '0')}:${minutes} ${AMPM}`;
    };
    const handleSubmitSave = async (values: Values): Promise<any> => {
        const timeFormat = 'h:mm a';
        const timeA = moment(getTimeFrom(), timeFormat);
        const timeB = moment(getTimeTo(), timeFormat);
        const durationMinutes = timeB.diff(timeA, 'minutes');
        const duration = durationMinutes;
        const dateStart = moment(dateAfterDrag).format('YYYY-MM-DD');
        const dateEnd = moment(dateAfterDrag).format('YYYY-MM-DD');
        const startDateTime = moment(
            `${dateStart} ${getTimeFrom()}`,
            'YYYY-MM-DD hh:mm a'
        ).format('YYYY-MM-DDTHH:mm:ss');
        const endDateTime = moment(
            `${dateEnd} ${getTimeTo()}`,
            'YYYY-MM-DD hh:mm a'
        ).format('YYYY-MM-DDTHH:mm:ss');
        const payloadData = {
            id: data?.event?.id,
            startTime: startDateTime,
            endTime: endDateTime,
            reason: values?.reason,
            duration: duration,
        };
        const res = await dragEventAPI.dragEvent(payloadData);
        if (!res?.data?.error) {
            const scheduleData: any = {
                providerId: data?.event?.providerId,
            };
            dispatch(getScheduleEventCall(scheduleData));
            onClose();
            return res?.data;
        } else {
            return '';
        }
    };
    const handleDisabled = (values: any): any => {
        return !values?.reason;
    };
    return (
        <Modal open={open} id={'drag-events-modal'} expandModal={false}>
            <ModalHeader
                title={`Moving ${data?.event?.title} to ${formattedDateAfterDrag}, ${getTimeFrom()} - ${getTimeTo()}`}
                onClose={onClose}
                closeIcon={false}
            />
            <ModalBody expandModal={false}>
                <div
                    className="md:px-2 w-[50rem] flex flex-col"
                    data-testid="drag-event-modal"
                >
                    <label className="font-semibold text-zinc-700 font-[lato] text-medium border-b-2 border-gray-500 w-1/3">
                        Appointment Summary
                    </label>
                    <div className="flex flex-col my-3 space-y-4">
                        <label className="text-sm font-light">
                            {data?.event?.title}
                        </label>
                        <div className="flex space-x-7">
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium">
                                    From:
                                </label>
                                <label className="text-sm font-light">
                                    {`${formattedDateBeforeDrag}, ${formattedTimeBeforeDrag} - ${formattedEndTimeBeforeDrag}`}
                                </label>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium">
                                    To:
                                </label>
                                <label className="text-sm font-light">
                                    {`${formattedDateAfterDrag}, ${getTimeFrom()} - ${getTimeTo()}`}
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <label className="text-sm font-light">
                                {data?.event?.authorizationData
                                    ?.map(
                                        (item: any) =>
                                            `${item?.code}: ${item?.description === null ? '' : item?.description}`
                                    )
                                    .join(', ')}
                            </label>
                        </div>
                        <label className="text-sm font-light">{`Provider: ${data?.event?.providerName}`}</label>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitSave}
                    >
                        {(props: any) => {
                            const { values, handleChange, handleSubmit } =
                                props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="w-full flex flex-col my-3">
                                        <Field
                                            component={Input}
                                            label={'Reason for Change'}
                                            name={'reason'}
                                            id={'reason'}
                                            placeholder={'Reason for change'}
                                            value={values?.reason}
                                            isRequired={true}
                                            className={`outline-none ps-2 border-x-0 border-t-0 rounded-none`}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                            }}
                                            data-testid="reason-change"
                                        />
                                    </div>
                                    <DragEventModalFooter
                                        onClose={onClose}
                                        handleSubmit={handleSubmit}
                                        isDisable={handleDisabled(values)}
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
