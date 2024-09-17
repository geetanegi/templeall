import * as Yup from 'yup';
import { emailRegex } from '../../constants/ValidationMessages';
export const validationSchema = Yup.object({
    parentName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Only alphabets are allowed')
        .max(50, 'Input cannot exceed the maximum length of 50 characters.'),
    email: Yup.string().matches(emailRegex, {
        message:
            'Invalid email format. Ensure it follows the format: username@domain.com',
    }),
    cellPhone: Yup.string().matches(
        /^\+1[0-9-]{1,13}$/,
        'Invalid phone number format'
    ),
    homePhone: Yup.string().matches(
        /^\+1[0-9-]{1,13}$/,
        'Invalid phone number format'
    ),
    primaryLanguage: Yup.string().required('Primary Language is required'),
    relationWithChild: Yup.string().required('Relationship is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    addressLine1: Yup.string().max(
        50,
        'Input cannot exceed the maximum length of 50 characters.'
    ),
    addressLine2: Yup.string().max(
        50,
        'Input cannot exceed the maximum length of 50 characters.'
    ),
    city: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Only alphabets are allowed')
        .max(20, 'Input cannot exceed the maximum length of 20 characters.'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
        .matches(/^\d{1,10}$/, 'Invalid characters')
        .max(10, 'Input cannot exceed the maximum length of 10 characters'),
    children: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Child's Name is required"),
            dateOfBirth: Yup.date().required('Date of Birth is required'),
            gender: Yup.string().required('Gender is required'),
            desiredServices: Yup.array()
                .of(Yup.string())
                .required('Services are required'),
            asdDiagnosis: Yup.string().required('ASD Diagnosis is required'),
            dateOfAsdDiagnosis: Yup.date().when(
                'asdDiagnosis',
                (asdDiagnosis, schema) => {
                    if (Array.isArray(asdDiagnosis)) {
                        return asdDiagnosis.includes('Yes')
                            ? schema.required(
                                  'Date of ASD Diagnosis is required'
                              )
                            : schema;
                    }
                    return schema;
                }
            ),
            availabilityForEvaluation: Yup.string().required(
                'Availability is required'
            ),
            primaryInsuranceProvider: Yup.string().required(
                'Primary Insurance Provider is required'
            ),
            subscriberName: Yup.string().required(
                'Subscriber Name is required'
            ),
            subscriberDob: Yup.date().required('Subscriber DOB is required'),
            subscriberId: Yup.string().required('Subscriber ID is required'),
            groupNumber: Yup.string().required('Group Number is required'),
            diagnosisPaperwork: Yup.mixed().required(
                'Diagnosis Paperwork is required'
            ),
        })
    ),
});
