/* eslint-disable max-len */
import React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    VoidPaymentModalActions,
} from '../../Generics/Modal';
import { Field, Formik } from 'formik';
import Input from '../../Generics/Inputs/Input';
import paymentGridAPI from '../../../api/services/PaymentGrid/paymentGrid.service';
interface ConfirmationModalInterface {
    data?: any;
    open?: boolean;
    currentRecord?: any;
    onClose?: any;
    fetchRecord?: any;
}
interface Values {
    reason: string;
}
export default function VoidPaymentModal({
    data,
    open,
    onClose,
    currentRecord,
    fetchRecord,
}: ConfirmationModalInterface): React.JSX.Element {
    const initialValues: Values = {
        reason: '',
    };
    const handleSubmitForm = async (values: Values): Promise<void> => {
        const payload = {
            billingId: currentRecord?.id,
            billingAmountId: data,
            paymentVoidReason: values.reason,
        };
        try {
            const res = await paymentGridAPI.voidPayment(payload);
            if (!res?.data?.error) {
                onClose();
                fetchRecord(currentRecord?.id);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal open={open} id={'void-payment-modal'} expandModal={false}>
            <ModalHeader
                title={'Void Payment'}
                onClose={onClose}
                closeIcon={false}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    validateOnChange
                    enableReinitialize
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} data-testid="void-modal">
                            <div className="md:px-2 w-[50rem]">
                                <Field
                                    className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0  pb-1 outline-none"
                                    label="Reason for voiding the payment"
                                    isRequired={true}
                                    id="reason"
                                    name="reason"
                                    component={Input}
                                    value={values.reason}
                                    data-testid="reason-on-change"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleChange(e);
                                    }}
                                    placeholder="Enter"
                                />
                            </div>
                            <VoidPaymentModalActions
                                onClose={onClose}
                                isDisabled={false}
                                handleSubmit={handleSubmit}
                            />
                        </form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
}
