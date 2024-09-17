/* eslint-disable max-len */
import React, { useState } from 'react';
import Modal, {
    ModalBody,
    CancelAppointmentModalFooter,
} from '../Generics/Modal';
import { utc } from 'moment';
import { Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import cancelAppointmentAPI from '../../api/services/Scheduling/cancelAppointment.service';
import { ROUTES } from '../../constants';
import { deleteSingleEvent } from '../../redux/slice/Scheduling/getServices';
interface ConfirmationModalInterface {
    data: any;
    open: boolean;
    onClose: () => void;
    header?: string;
    name?: string;
}
export default function CancelAppointmentModal({
    data,
    open,
    onClose,
    header,
    name,
}: ConfirmationModalInterface): React.JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const [reason, setReason] = useState('');
    const profileData = useSelector(
        ({ userProfileData }: any) => userProfileData?.value?.data
    );
    const formatStartDate = utc(data?.startDate).local().format('MM/DD/YYYY');
    const formattedStartTime = utc(data?.startTime).local().format('hh:mm A');
    const formattedEndTime = utc(data?.endTime).local().format('hh:mm A');
    const handleSave = async (): Promise<any> => {
        const payloadData = {
            eventId: data?.id,
            appointmentWith: data?.appointmentWith?.id,
            primaryProvider: data?.primaryProvider?.id,
            cancellingUser: userPermission?.userId || profileData?.userId?.id,
            cancellingReason: reason,
        };
        const res = await cancelAppointmentAPI.cancelAppointment(payloadData);
        if (!res?.data?.error) {
            dispatch(deleteSingleEvent(data?.id));
            setTimeout(() => {
                navigate(ROUTES.scheduling);
            }, 1000);
            return res?.data;
        } else {
            return '';
        }
    };
    return (
        <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
            <ModalBody expandModal={false}>
                <div className="space-y-5 px-10 pb-5 h-full w-[40rem] text-stone-800 flex flex-col justify-evenly">
                    <div className="my-3 text-center">
                        <label className="text-lg font-semibold ">
                            {header}
                        </label>
                        <h1>{name}</h1>
                        <label className="font-medium text-sm">
                            {data?.title}
                        </label>
                        <label className="font-light text-sm">
                            {`: ${formatStartDate} | ${formattedStartTime} - ${formattedEndTime}`}
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <label>Reason for cancellation</label>
                        <Field
                            as="textarea"
                            isRequired={false}
                            id="reason"
                            name="reason"
                            rows={4}
                            className="py-2 mt-1 ps-4 rounded-md w-full border-2 border-gray-300 shadow-md outline-none"
                            value={reason}
                            onChange={(e: any) => {
                                setReason(e?.target?.value);
                            }}
                            placeholder="Please enter the reason for cancellation"
                        />
                    </div>
                    <div className="footer">
                        <CancelAppointmentModalFooter
                            onClose={onClose}
                            handleSubmit={handleSave}
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
