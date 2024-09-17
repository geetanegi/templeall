import React, { useState } from 'react';
import Input from '../Generics/Inputs/Input';
import { Field, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Button from '../Generics/Button';
import forgotPassWord from '../../api/services/ForgotPassword/sendEmail.service';
import * as Yup from 'yup';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { useDispatch } from 'react-redux';
export default function SendEmail(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [showError, setShowError] = useState('');
    const [disabled, setDisabled] = useState(false);
    const initialValues: any = {
        username: '',
    };
    interface Values {
        username: string;
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('Invalid email address'),
    });
    const isSubmitDisabled = (values: Values): boolean => {
        return !values?.username?.trim() || disabled;
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        const payload = {
            ...values,
        };
        const res = await forgotPassWord.SendEmail(payload);
        if (!res?.data?.error) {
            setShowError('');
            dispatch(
                openNotification({
                    success: true,
                    title: 'Link to reset password has been sent to your email Id.',
                    description: '',
                })
            );
        } else {
            setShowError(res?.data?.description);
        }
    };
    return (
        <div
            className={`w-1/3 flex items-center justify-center`}
            data-testid="send-email-forgot-password-page"
        >
            <div className="bg-[#FAFAFA] mr-8 rounded-[2rem] w-full shadow-2xl border-2 border-[#45D2F5] md:mr-20 lg:mr-40">
                <div className="my-8 mx-4 md:mx-8">
                    <div className="flex flex-col space-y-6 w-full md:w-[30rem]">
                        <h1 className="font-['Lato'] leading-tight text-3xl font-semibold">
                            Reset Your Password!
                        </h1>
                        <span className="font-['Lato'] leading-tight text-medium font-medium">
                            Enter your email address to receive a link to
                            confirm your account
                        </span>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validationSchema={validationSchema}
                    >
                        {(props: any) => {
                            const { values, handleSubmit, handleChange } =
                                props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="my-14">
                                        <Field
                                            className="email bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent "
                                            autoComplete="off"
                                            isRequired={false}
                                            id="username"
                                            name="username"
                                            component={Input}
                                            value={values.username}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setDisabled(false);
                                                setShowError('');
                                            }}
                                            data-testid="username-input"
                                            placeholder="Email Address"
                                            label="Email"
                                            hideLabel={true}
                                        />
                                        {showError?.length ? (
                                            <div className="errorMsg text-red-700 text-xs  my-1 font-[lato]">
                                                {showError}.
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className=" flex justify-center">
                                        <Button
                                            data-testid="send-mail-password-button"
                                            type="button"
                                            onClick={() => {
                                                handleSubmit();
                                                setDisabled(true);
                                            }}
                                            className="submitButton  my-3 py-2  w-3/4 text-sm font-normal rounded-md border
                                                border-transparent bg-[#45D2F5] text-white hover:bg-transparent hover:border hover:border-[#45D2F5] hover:text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500 disabled:opacity-50
                                                disabled:bg-secondary-200 disabled:pointer-events-none"
                                            disabled={isSubmitDisabled(values)}
                                        >
                                            Send link
                                        </Button>
                                    </div>
                                    <div className="flex flex-col text-center  mb-7 mt-3 space-y-3">
                                        <Link
                                            to={ROUTES.LoginPage}
                                            className="text-[#45D2F5] font-semibold text-md hover:-translate-y-1 hover:transition hover:duration-500"
                                        >
                                            Return to login
                                        </Link>
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
