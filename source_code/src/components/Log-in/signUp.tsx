import React, { useState } from 'react';
import Input from '../Generics/Inputs/Input';
import { Field, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import view from '../../assets/img/GridIcons/view.svg';
import hide from '../../assets/img/crossEye.svg';
export default function SignUp(): React.JSX.Element {
    interface Values {
        email: string;
        password: string;
    }
    const initialValues: Values = {
        email: '',
        password: '',
    };
    const handleSubmitForm = async (): Promise<any> => {};
    const [visiblePassword, setVisiblePassword] = useState(false);
    return (
        <div
            className={`w-1/3 flex items-center justify-center`}
            data-testid="signup-page"
        >
            <div className="bg-[#FAFAFA] mr-8 rounded-[2rem] w-full shadow-2xl border-2 border-[#45D2F5] md:mr-20 lg:mr-40">
                <div className="p-4 mx-4 md:mx-8">
                    <div className="flex flex-col space-y-6 w-full md:w-[30rem]">
                        <h1 className="font-['Lato'] leading-tight text-3xl font-semibold">
                            Sign up
                        </h1>
                        <label className="font-['Lato'] leading-tight text-medium font-medium">
                            Enter your email address to receive a link to
                            confirm your account.
                        </label>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                    >
                        {() => {
                            return (
                                <form action="">
                                    <div className="my-8 2xl:my-20 space-y-5">
                                        <Field
                                            className="email bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent"
                                            autoComplete="off"
                                            isRequired={false}
                                            id="email"
                                            name="email"
                                            component={Input}
                                            placeholder="Enter Email"
                                        />
                                        <div className="flex relative items-center border border-black rounded-md">
                                            <Field
                                                className="password bg-[#FAFAFA] border-none font-['Lato'] text-md p-3 py-4 focus:ring-transparent"
                                                autoComplete="off"
                                                isRequired={false}
                                                id="password"
                                                name="password"
                                                component={Input}
                                                type={
                                                    visiblePassword
                                                        ? 'text'
                                                        : 'Password'
                                                }
                                                placeholder="Password"
                                            />
                                            <img
                                                className="absolute end-2 cursor-pointer"
                                                onClick={() =>
                                                    setVisiblePassword(
                                                        !visiblePassword
                                                    )
                                                }
                                                src={
                                                    visiblePassword
                                                        ? hide
                                                        : view
                                                }
                                                alt="view"
                                                data-testid="confirm-password-img"
                                            />
                                        </div>
                                    </div>
                                    <div className=" flex justify-center">
                                        <button
                                            data-testid="sign-up-button"
                                            className="submitButton  my-3 py-2 px-9 w-[15rem] text-md font-semibold  rounded-md border
                                                            border-transparent bg-[#45D2F5] text-white  hover:bg-transparent hover:border hover:border-[#45D2F5] hover:text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500 disabled:opacity-50
                                                            disabled:bg-secondary-200 disabled:cursor-not-allowed"
                                        >
                                            Send Link
                                        </button>
                                    </div>
                                    <div className="text-center font-semibold text-md my-2 text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500">
                                        <Link to={ROUTES.LoginPage}>
                                            Return to log-in
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
