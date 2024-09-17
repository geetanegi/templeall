/* eslint-disable no-template-curly-in-string */
export const providerParameter = [
    {
        key: 'Parent',
        value: 'Parent',
        child: [
            {
                key: `Parent's First Name`,
                value: 'providerData.firstName',
            },
            {
                key: ` Parent's Last Name`,
                value: 'providerData.lastName',
            },
            {
                key: `Parent's Full Name`,
                value: 'providerData.fullName',
            },
            {
                key: `Cell Phone`,
                value: 'providerData.dateOfBirth',
            },
            {
                key: `Home Phone`,
                value: 'providerData.gender',
            },
            {
                key: 'Work Phone',
                value: 'providerData.npiNumber',
            },
            {
                key: 'Email Address',
                value: 'providerData.credentials',
            },
        ],
    },
];

/* eslint-disable no-template-curly-in-string */
export const clientParameters = [
    {
        key: 'Child',
        value: 'Child',
        child: [
            {
                key: `Child's First Name`,
                value: 'clientData.firstName',
            },
            {
                key: `Child's Last Name`,
                value: 'clientData.lastName',
            },
            {
                key: `Child's Full Name`,
                value: 'clientData.fullName',
            },

            {
                key: 'DOB',
                value: 'clientData.dateOfBirth',
            },

            {
                key: 'Gender',
                value: 'clientData.gender',
            },
        ],
    },
];

export const parameterData = [
    {
        name: 'Parent',
        value: providerParameter,
    },
    {
        name: 'Child',
        value: clientParameters,
    },
];
