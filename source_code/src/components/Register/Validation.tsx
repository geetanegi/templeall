import * as Yup from 'yup';
import { nameValidation } from '../../constants/ValidationMessages';
const regexForName = /^[a-zA-Z\s\-]+$/;
export const validationSchema = Yup.object({
    parentFirstName: Yup.string()
        .required('Parent’s First Name is required')
        .matches(
            regexForName,
            'Only alphabets including spaces and - are allowed'
        )
        .max(50, nameValidation),
    parentLastName: Yup.string()
        .required('Parent’s Last Name is required')
        .matches(
            regexForName,
            'Only alphabets including spaces and - are allowed'
        )
        .max(50, nameValidation),

    cellPhone: Yup.string()
        .required('Cell Phone is required')
        .matches(/^\+?\d[\d\s-]{8,14}\d$/, 'Invalid cell phone number'),
    homePhone: Yup.string()
        .required('Home Phone is required')
        .matches(/^\+?\d[\d\s-]{8,14}\d$/, 'Invalid home phone number'),

    workEmail: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),

    dateOfBirth: Yup.object().required('Date of Birth is required'),
    password: Yup.string()
        .min(10, 'Password must be at least 10 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one digit')
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            'Password must contain at least one special character'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),

    policy: Yup.bool().oneOf(
        [true],
        'You must accept the terms and conditions'
    ),
});
