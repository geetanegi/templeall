/* eslint-disable no-template-curly-in-string */
export const userParameters = [
    {
        child: [
            {
                key: `User's First Name`,
                value: `UserFirstName`,
            },
            {
                key: `User's Last Name`,
                value: `UserLastName`,
            },
            {
                key: `User's Full Name`,
                value: `UserFullName`,
            },
        ],
    },
];
export const userParameter = [
    {
        child: [
            {
                key: `User's First Name`,
                value: `UserFirstName`,
            },
            {
                key: `User's Last Name`,
                value: `UserLastName`,
            },
            {
                key: `User's Full Name`,
                value: `UserFullName`,
            },
            {
                key: `User's Email`,
                value: 'UserEmail',
            },
        ],
    },
];

export const adminParamter = [
    {
        child: [
            {
                key: `Admin's First Name`,
                value: `AdminFirstName`,
            },
            {
                key: `Admin's Last Name`,
                value: `AdminLastName`,
            },
            {
                key: `Admin's Full Name`,
                value: `AdminFullName`,
            },
        ],
    },
];
export const credentialsParamter = [
    {
        child: [
            { key: 'Link', value: 'Link' },
            { key: '  Password', value: 'Password' },
        ],
    },
];

export const organizationParameter = [
    {
        child: [{ key: 'Organization Name', value: 'OrganizationName' }],
    },
];
export const credentialParamter = [
    {
        child: [{ key: 'Link', value: 'Link' }],
    },
];

export const participantParameter = [
    {
        child: [
            {
                key: `Service Provider's First Name`,
                value: `ServiceProviderFirstName`,
            },
            {
                key: `Service Provider's Last Name`,
                value: `ServiceProviderLastName`,
            },
            {
                key: `Service Provider's Full Name`,
                value: `ServiceProviderFullName`,
            },
            {
                key: `Appointment With First Name`,
                value: `AppointmentWithFirstName`,
            },
            {
                key: `Appointment With Last Name`,
                value: `AppointmentWithLastName`,
            },
            {
                key: `Appointment With Full Name`,
                value: `AppointmentWithFullName`,
            },
        ],
    },
];
export const schedulerParamter = [
    {
        child: [{ key: 'Scheduler Full Name', value: 'SchedulerFullName' }],
    },
];
export const appointmentParamter = [
    {
        child: [
            { key: 'Appointment Time', value: 'AppointmentTime' },
            { key: 'Appointment Date', value: 'AppointmentDate' },
            { key: 'Appointment Title', value: 'AppointmentTitle' },
        ],
    },
];
export const otpParamter = [
    {
        child: [{ key: 'OTP', value: 'OTP' }],
    },
];
export const editAppointment = [
    {
        child: [
            { key: 'Appointment From Time', value: 'AppointmentFromTime' },
            { key: 'Appointment From Date', value: 'AppointmentFromDate' },
            { key: 'Appointment To Time', value: 'AppointmentToTime' },
            { key: 'Appointment To Date', value: 'AppointmentToDate' },
            { key: 'Appointment Title', value: 'AppointmentTitle' },
        ],
    },
];

export const addDynamicVariable = [
    {
        name: 'User',
        value: userParameters,
    },
    {
        name: 'User ',
        value: userParameter,
    },

    {
        name: 'Admin',
        value: adminParamter,
    },
    {
        name: 'Credentials',
        value: credentialsParamter,
    },

    {
        name: 'Credential',
        value: credentialParamter,
    },
    {
        name: 'Credential  ',
        value: otpParamter,
    },
    {
        name: 'Organization',
        value: organizationParameter,
    },
    {
        name: 'Participant',
        value: participantParameter,
    },
    {
        name: 'Scheduler',
        value: schedulerParamter,
    },
    {
        name: 'Appointment',
        value: editAppointment,
    },
    {
        name: 'Appointment  ',
        value: appointmentParamter,
    },
];
