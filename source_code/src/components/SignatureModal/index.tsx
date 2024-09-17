import React, { useRef } from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    SignatureFooter,
} from '../Generics/Modal';
import { Field, Formik, FormikHelpers } from 'formik';
import Input from '../Generics/Inputs/Input';
import * as Yup from 'yup';
import SignatureCanvas from 'react-signature-canvas';
import { useDispatch, useSelector } from 'react-redux'; // Adjust the import based on your actual store location
import { signData, signDataName } from '../../redux/slice/Signature/Signature'; // Ensure this matches your actual action
import { utc } from 'moment';
interface Values {
    name: string;
    Signature: string;
    termAndCondition: boolean;
}
interface SignatureModalProps {
    onClose: () => void;
    first?: any;
    codeAfterEdit?: any;
}
const SignatureModal: React.FC<SignatureModalProps> = ({
    onClose,
    first,
    codeAfterEdit,
}) => {
    const signatureRef = useRef<any>(null);
    const dispatch = useDispatch();
    const appointment = useSelector((state: any) => state.appointment.value);
    const clearSignature = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        if (signatureRef.current) {
            signatureRef.current.clear();
            e.preventDefault();
        }
    };
    const initialValues: Values = {
        name: '',
        Signature: '',
        termAndCondition: false,
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
        if (signatureRef.current) {
            const data = signatureRef.current.toDataURL('image/png');
            dispatch(signData(data));
            dispatch(signDataName(values?.name));
        }
        onClose();
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        Signature: Yup.string().required('Required'),
        termAndCondition: Yup.boolean()
            .oneOf([true], 'Required')
            .required('Required'),
    });
    const formatTime = (timeString: string): string => {
        return utc(timeString).local().format('h:mm A');
    };
    return (
        <Modal open={first} id="add-Client-Doc-modal" expandModal={false}>
            <ModalHeader
                title="Provider Signature"
                icon={false}
                onExpand={undefined}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                validateOnChange
            >
                {(formikProps: any) => (
                    <form
                        onSubmit={formikProps.handleSubmit}
                        className="w-auto h-auto"
                        data-testid="signature-modal"
                    >
                        <ModalBody expandModal={false}>
                            <div className="w-[70rem] h-[32rem]">
                                <div className="ml-3">
                                    <h1 className="text-sm font-semibold">
                                        Provider Name
                                    </h1>
                                    <Field
                                        className="py-3 px-1 block w-full border-gray-200 rounded-lg outline-none text-xsm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        name="name"
                                        component={Input}
                                        placeholder="Type your name here"
                                    />
                                </div>
                                <div className="ml-3 mt-5">
                                    <h1 className="text-sm font-semibold">
                                        Signature
                                    </h1>
                                    <Field
                                        name="Signature"
                                        id="Signature"
                                        required={true}
                                    >
                                        {({ form }: { form: any }) => (
                                            <div className="border-2">
                                                <SignatureCanvas
                                                    ref={signatureRef}
                                                    penColor="green"
                                                    canvasProps={{
                                                        width: 1110,
                                                        height: 280,
                                                        className:
                                                            'signature-canvas',
                                                    }}
                                                    onEnd={() => {
                                                        form.setFieldValue(
                                                            'Signature',
                                                            signatureRef.current.toDataURL()
                                                        );
                                                    }}
                                                />
                                                {form.errors.Signature &&
                                                    form.touched.Signature && (
                                                        <div>
                                                            {
                                                                form.errors
                                                                    .Signature
                                                            }
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <div className="signature flex justify-end text-[#086886]">
                                    <button
                                        className="text-blue"
                                        onClick={clearSignature}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="ml-3 flex text-sm">
                                    <h1 className="text-sm font-semibold mr-4">
                                        Services Rendered:
                                    </h1>
                                    <div className="detail flex flex-col">
                                        <span>{`${appointment?.startTime?.split('T')[0]} From  ${formatTime(appointment?.startTime)} to ${formatTime(appointment?.endTime)}`}</span>
                                        <span>{`${codeAfterEdit?.code ? codeAfterEdit?.code : appointment?.authorizationCodes?.[0]?.authorizationCode?.code ? appointment?.authorizationCodes?.[0]?.authorizationCode?.code : ''} ${codeAfterEdit?.description ? codeAfterEdit?.description : appointment?.title}`}</span>
                                        <span>{`Provider: ${appointment?.primaryProvider?.firstName} ${appointment?.primaryProvider?.lastName}`}</span>
                                    </div>
                                </div>
                                <div className="teamAndCondition flex justify-center ">
                                    <Field
                                        required={true}
                                        type="checkbox"
                                        name="termAndCondition"
                                        id="termAndCondition"
                                        checked={
                                            formikProps.values.termAndCondition
                                        }
                                        onChange={formikProps.handleChange}
                                    />
                                    <span className="ml-2 text-base font-semibold  text-[#086886]">
                                        I hereby attest that I have individually
                                        reviewed the list items and confirm they
                                        are true and correct
                                    </span>
                                </div>
                            </div>
                        </ModalBody>
                        <SignatureFooter
                            onClose={onClose}
                            handleSubmit={formikProps.handleSubmit}
                            // This disables the button initially and enables it when the form becomes valid
                            isValid={
                                formikProps.values.name !== '' &&
                                formikProps.values.Signature !== '' &&
                                formikProps.values.termAndCondition
                            }
                        />
                    </form>
                )}
            </Formik>
        </Modal>
    );
};
export default SignatureModal;
