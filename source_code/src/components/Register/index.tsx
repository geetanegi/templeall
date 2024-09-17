/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import loginBackground from '../../assets/img/loginBackground.svg';
import { Field, Formik, FormikHelpers } from 'formik';
import Select from '../Generics/Select';
import { Gender } from '../../constants/userOnboarding';
import Datepicker from 'react-tailwindcss-datepicker';
import Button from '../Generics/Button';
import CopyRightFooter from '../Log-in/copyRightFooter';
import getOrganizationViaIntakeApi from '../../api/services/Register/getorganization.service';
import registerClientApi from '../../api/services/Register/registerClient.service';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import checkGreen from '../../assets/img/Login/validationGreen.svg';
import crossRed from '../../assets/img/Login/validationRed.svg';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import { ParentInfo, Values } from '../../types/Register.type';
import { validationSchema } from './Validation';
// import RegistrationForm from './RegisterNew';
export default function Register(): React.JSX.Element {
    const params = useParams();
    const navigate = useNavigate();
    const [intakeResponse, setIntakeResponse] = useState<ParentInfo | null>(
        null
    );
    const location = useLocation();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = {
                    uniqueId: params?.id || 'default-unique-id',
                };
                const res =
                    await getOrganizationViaIntakeApi.getOrganizationViaIntake(
                        payload
                    );
                setIntakeResponse(res?.data?.data);
            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        };
        fetchData();
    }, [params?.id]);
    useEffect(() => {
        const decodeurl = (search: string): void => {
            try {
                const paramsData = new URLSearchParams(search);
                const encodedUrl = paramsData.get('id') || '';
                const decodedUrl = atob(encodedUrl); // Decode the Base64 encoded token
                console.log('Decoded URL Value:', decodedUrl);
            } catch (error) {}
        };
        decodeurl(location.search);
    }, [location.search]);
    // Initial form values based on intakeResponse
    const initialValues: Values = {
        parentFirstName: intakeResponse?.parentFirstname || '',
        parentLastName: intakeResponse?.parentLastname || '',
        cellPhone: intakeResponse?.phoneNumber || '',
        homePhone: intakeResponse?.homePhone || '',
        workEmail: intakeResponse?.email || '',
        gender: intakeResponse?.gender || 'select',
        dateOfBirth: {
            startDate: '',
            endDate: '',
        },
        password: '',
        confirmPassword: '',
        policy: intakeResponse?.policy || false,
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<void> => {
        try {
            const payload = {
                data: {
                    uniqueId: params?.id || 'default-unique-id',
                    username: '', // If applicable
                    organizationId: '', // If applicable
                    email: values.workEmail,
                    firstName: values.parentFirstName,
                    lastName: values.parentLastName,
                    password: values.password,
                    gender: values.gender,
                    cellPhone: values.cellPhone,
                    dateOfBirth: values.dateOfBirth.startDate,
                    policy: values.policy,
                },
            };
            const res = await registerClientApi.saveRegisterClient(payload);
            // alert('Registration successful!');
            console.log(res);
            navigate('/login'); // Navigate to login page
        } catch (error) {
            console.error('Error submitting form:', error);
            // Display error message within the UI
        } finally {
            setSubmitting(false);
        }
    };
    const validatePassword = (
        password: string
    ): {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        digit: boolean;
        specialChar: boolean;
    } => {
        return {
            length: password.length >= 10,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            digit: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
    };
    return (
        <div
            className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                display: 'flex',
                justifyContent: 'center',
            }}
            data-testid="register-index"
        >
            <div
                className="flex items-center my-10 absolute"
                data-testid="login-page"
            >
                <div className="flex items-center my-10 w-full max-w-4xl px-4 md:px-8 lg:px-12">
                    <div className="my-8 mx-8">
                        <div className="flex flex-col space-y-6 w-[70rem]">
                            <h1 className="font-['Lato'] leading-tight text-3xl font-semibold">
                                Register
                            </h1>
                        </div>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmitForm}
                            validateOnBlur={true}
                            validateOnChange={false} // Only validate on blur or submit
                        >
                            {({
                                values,
                                handleSubmit,
                                setFieldValue,
                                isSubmitting,
                                isValid,
                                dirty,
                            }) => {
                                const validation = validatePassword(
                                    values.password
                                );
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col space-y-8 my-5">
                                            <div className="flex space-x-5 w-full">
                                                <div className="w-1/2">
                                                    <FormInput
                                                        id="parentFirstName"
                                                        name="parentFirstName"
                                                        placeholder="Parent's First Name"
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <FormInput
                                                        id="parentLastName"
                                                        name="parentLastName"
                                                        placeholder="Parent's Last Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex space-x-5 w-full">
                                                <div className="w-1/2">
                                                    <FormInput
                                                        id="cellPhone"
                                                        name="cellPhone"
                                                        placeholder="Cell Phone"
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <FormInput
                                                        id="homePhone"
                                                        name="homePhone"
                                                        placeholder="Home Phone"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex space-x-5 w-full">
                                                <div className="w-1/2">
                                                    <FormInput
                                                        id="workEmail"
                                                        name="workEmail"
                                                        placeholder="Work Email"
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <Field
                                                        label={''}
                                                        id="gender"
                                                        name="gender"
                                                        autoComplete="off"
                                                        isSearchable={true}
                                                        component={Select}
                                                        inputClassName="bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent"
                                                        options={Gender.map(
                                                            (data) => ({
                                                                label: data.gender,
                                                                value: data.gender,
                                                            })
                                                        )}
                                                        onChange={(
                                                            selectedOption: {
                                                                value: string;
                                                            } | null
                                                        ) => {
                                                            setFieldValue(
                                                                'gender',
                                                                selectedOption?.value
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-1/2">
                                                <Field
                                                    name="dateOfBirth"
                                                    autoComplete="off"
                                                    id="dateOfBirth"
                                                >
                                                    {({
                                                        field,
                                                        form,
                                                    }: {
                                                        field: any;
                                                        form: any;
                                                    }) => (
                                                        <Datepicker
                                                            data-testid="datepicker-onChange"
                                                            id="dateOfBirth"
                                                            {...field}
                                                            selected={
                                                                field.value
                                                            }
                                                            useRange={false}
                                                            asSingle={true}
                                                            inputClassName="bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-sm w-full rounded-md px-3 py-4"
                                                            popoverDirection="down"
                                                            onChange={(
                                                                date
                                                            ) => {
                                                                if (
                                                                    date &&
                                                                    date.startDate
                                                                ) {
                                                                    const startDate =
                                                                        date.startDate instanceof
                                                                        Date
                                                                            ? date.startDate
                                                                            : new Date(
                                                                                  date.startDate
                                                                              );
                                                                    const endDate =
                                                                        date.endDate instanceof
                                                                        Date
                                                                            ? date.endDate
                                                                            : new Date(
                                                                                  date.endDate ??
                                                                                      ''
                                                                              );
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        {
                                                                            startDate:
                                                                                startDate
                                                                                    .toISOString()
                                                                                    .split(
                                                                                        'T'
                                                                                    )[0],
                                                                            endDate:
                                                                                endDate
                                                                                    .toISOString()
                                                                                    .split(
                                                                                        'T'
                                                                                    )[0],
                                                                        }
                                                                    );
                                                                } else {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        {
                                                                            startDate:
                                                                                '',
                                                                            endDate:
                                                                                '',
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            <div>
                                                <label className="font-['Lato'] text-lg font-semibold">
                                                    Create Password
                                                </label>
                                            </div>
                                            <div className="flex space-x-5 w-full">
                                                <div className="w-full">
                                                    <PasswordInput
                                                        id="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        showPassword={
                                                            showNewPassword
                                                        }
                                                        setShowPassword={
                                                            setShowNewPassword
                                                        }
                                                    />
                                                    <div className="flex flex-col space-y-1 mt-4">
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={
                                                                    validation.length
                                                                        ? checkGreen
                                                                        : crossRed
                                                                }
                                                                alt="length"
                                                            />
                                                            <span
                                                                className={
                                                                    validation.length
                                                                        ? 'text-green-600 text-sm'
                                                                        : values.password
                                                                          ? 'text-red-600 text-sm'
                                                                          : 'text-black text-sm'
                                                                }
                                                            >
                                                                Password must be
                                                                at least 10
                                                                characters long
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={
                                                                    validation.uppercase
                                                                        ? checkGreen
                                                                        : crossRed
                                                                }
                                                                alt="uppercase"
                                                            />
                                                            <span
                                                                className={
                                                                    validation.uppercase
                                                                        ? 'text-green-600 text-sm'
                                                                        : values.password
                                                                          ? 'text-red-600 text-sm'
                                                                          : 'text-black text-sm'
                                                                }
                                                            >
                                                                Password must
                                                                contain at least
                                                                one uppercase
                                                                letter
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={
                                                                    validation.lowercase
                                                                        ? checkGreen
                                                                        : crossRed
                                                                }
                                                                alt="lowercase"
                                                            />
                                                            <span
                                                                className={
                                                                    validation.lowercase
                                                                        ? 'text-green-600 text-sm'
                                                                        : values.password
                                                                          ? 'text-red-600 text-sm'
                                                                          : 'text-black text-sm'
                                                                }
                                                            >
                                                                Password must
                                                                contain at least
                                                                one lowercase
                                                                letter
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={
                                                                    validation.digit
                                                                        ? checkGreen
                                                                        : crossRed
                                                                }
                                                                alt="digit"
                                                            />
                                                            <span
                                                                className={
                                                                    validation.digit
                                                                        ? 'text-green-600 text-sm'
                                                                        : values.password
                                                                          ? 'text-red-600 text-sm'
                                                                          : 'text-black text-sm'
                                                                }
                                                            >
                                                                Password must
                                                                contain at least
                                                                one digit
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={
                                                                    validation.specialChar
                                                                        ? checkGreen
                                                                        : crossRed
                                                                }
                                                                alt="specialChar"
                                                            />
                                                            <span
                                                                className={
                                                                    validation.specialChar
                                                                        ? 'text-green-600 text-sm'
                                                                        : values.password
                                                                          ? 'text-red-600 text-sm'
                                                                          : 'text-black text-sm'
                                                                }
                                                            >
                                                                Password must
                                                                contain at least
                                                                one special
                                                                character
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <PasswordInput
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        placeholder="Confirm Password"
                                                        showPassword={
                                                            showConfirmPassword
                                                        }
                                                        setShowPassword={
                                                            setShowConfirmPassword
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Field
                                                    className="border-1 border-black focus:border-none cursor-pointer rounded-sm shadow-[0_2px_7px_rgb(0,0,0,0.2)] focus:ring-transparent"
                                                    type="checkbox"
                                                    name="policy"
                                                    id="policy"
                                                />
                                                <label
                                                    htmlFor="policy"
                                                    className="text-sm font-[lato]"
                                                >
                                                    {`I acknowledge receipt of the IrisInsights privacy policy and terms of use.`}
                                                </label>
                                            </div>
                                            <div className="flex justify-center mt-6">
                                                <Button
                                                    onClick={() => {
                                                        handleSubmit();
                                                    }}
                                                    data-testid="btn-submit"
                                                    type="primary"
                                                    disabled={
                                                        isSubmitting ||
                                                        !isValid ||
                                                        !dirty
                                                    }
                                                    className="submitButton my-3 py-2 w-1/3 text-2xl justify-center text-center font-semibold rounded-md border
                                                            border-transparent bg-[#45D2F5] text-white hover:bg-transparent hover:border hover:border-[#45D2F5] hover:text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500 disabled:opacity-50
                                                            disabled:bg-secondary-200 disabled:pointer-events-none"
                                                >
                                                    Register
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
            <CopyRightFooter />
        </div>
    );
}
