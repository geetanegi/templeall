/* eslint-disable no-template-curly-in-string */
export const providerParameter = [
    {
        key: 'Basics',
        value: 'Basics',
        child: [
            {
                key: 'First Name',
                value: 'providerData.firstName',
            },
            {
                key: ' Last Name',
                value: 'providerData.lastName',
            },
            {
                key: 'Full Name',
                value: 'providerData.fullName',
            },
            {
                key: 'Birth Date',
                value: 'providerData.dateOfBirth',
            },
            {
                key: 'Gender',
                value: 'providerData.gender',
            },
            {
                key: ' NPI Number',
                value: 'providerData.npiNumber',
            },
            {
                key: 'Credentials',
                value: 'providerData.credentials',
            },
        ],
    },
    {
        key: 'Contact',
        value: 'Contact',
        child: [
            {
                key: 'Email',
                value: 'providerData.username',
            },
            {
                key: 'Home Phone',
                value: 'providerData.homePhone',
            },
            {
                key: 'Cell Phone',
                value: 'providerData.cellPhone',
            },
            {
                key: ' Work Phone',
                value: 'providerData.workPhone',
            },
            {
                key: 'Address',
                value: 'providerData.mailingAddress',
            },
        ],
    },
];

/* eslint-disable no-template-curly-in-string */
export const clientParameters = [
    {
        key: 'Basics',
        value: 'Basics',
        child: [
            {
                key: 'First Name',
                value: 'clientData.firstName',
            },
            {
                key: ' Last Name',
                value: 'clientData.lastName',
            },
            {
                key: 'Full Name',
                value: 'clientData.fullName',
            },

            {
                key: 'Date of Birth',
                value: 'clientData.dateOfBirth',
            },

            {
                key: 'Age',
                value: 'clientData.age',
            },

            {
                key: 'Gender',
                value: 'clientData.gender',
            },
        ],
    },
    {
        key: 'Contact',
        value: 'Contact',
        child: [
            {
                key: 'Parent/Guardian First Name',
                value: 'clientData.parentFirstName',
            },
            {
                key: ' Parent/Guardian Last Name',
                value: 'clientData.parentLastName',
            },
            {
                key: 'Parent/Guardian Full Name',
                value: 'clientData.parentFullName',
            },
            {
                key: 'Email',
                value: 'clientData.username',
            },
            {
                key: 'Home Phone',
                value: 'clientData.homePhone',
            },
            {
                key: 'Cell Phone',
                value: 'providerData.cellPhone',
            },
            {
                key: ' Work Phone',
                value: 'clientData.workPhone',
            },
            {
                key: 'Address',
                value: 'clientData.primaryAddress',
            },
        ],
    },
    {
        key: 'Claims',
        value: 'Claims',
        child: [
            { key: 'Insurance Id', value: 'clientData.insuranceId' },
            { key: ' Insurance Name', value: 'clientData.insuranceName' },
            {
                key: ' Referring Provider Name',
                value: 'clientData.referringProviderName',
            },
            {
                key: ' Referring Providing Fax Number',
                value: 'clientData.referringProvidingFaxNumber',
            },
            {
                key: ' Referring Provider Phone Number',
                value: 'clientData.referringProviderPhoneNumber',
            },
        ],
    },
];

export const serviceParameter = [
    {
        key: 'Service',
        value: 'Service',
        child: [
            {
                key: 'Code',
                value: 'serviceData.code',
            },
            {
                key: 'Code Description',
                value: 'serviceData.description',
            },
        ],
    },
];

export const appointmentParameter = [
    {
        key: 'Basics',
        value: 'Basics',
        child: [
            {
                key: 'Date',
                value: 'appointmentData.date',
            },
            {
                key: 'Start Time',
                value: 'appointmentData.startTime',
            },
            {
                key: 'End Time',
                value: 'appointmentData.endTime',
            },
            {
                key: 'Duration',
                value: 'appointmentData.duration',
            },
            {
                key: 'Location',
                value: 'appointmentData.location',
            },
        ],
    },
    {
        key: 'Session',
        value: 'Session',
        child: [
            {
                key: 'Total Session Count',
                value: 'appointmentData.totalSessionCount',
            },
        ],
    },
];
export const directServiceProviderParameter = [
    {
        key: 'Direct Service Provider',
        value: 'Service',
        child: [
            {
                key: 'Technician Full Name',
                value: 'directServiceProviderData.technicianFullName',
            },
        ],
    },
];
export const Diagnosis = [
    {
        key: 'Diagnosis',
        value: 'Diagnosis',
        child: [
            {
                key: 'Primary Diagnosis',
                value: 'diagnosis.primaryDiagnosis',
            },
            {
                key: 'Secondary Diagnosis',
                value: 'diagnosis.secondaryDiagnosis',
            },
        ],
    },
];

export const parameterData = [
    {
        name: 'Client',
        value: clientParameters,
    },
    {
        name: 'Provider',
        value: providerParameter,
    },
    {
        name: 'Service',
        value: serviceParameter,
    },
    {
        name: 'Appointment',
        value: appointmentParameter,
    },
    {
        name: 'Direct Service Provider',
        value: directServiceProviderParameter,
    },
    {
        name: 'Diagnosis',
        value: Diagnosis,
    },
];
export const disChargeReason = [
    {
        label: 'Met all goals',
        value: 'Met all goals',
    },
    {
        label: 'Aging Out',
        value: 'Aging Out',
    },
    {
        label: 'Transitioning to School',
        value: 'Transitioning to School',
    },
    {
        label: 'Parent Initiated Discharge',
        value: 'Parent Initiated Discharge',
    },
    {
        label: 'Insurance Change',
        value: 'Insurance Change',
    },
    {
        label: 'Other',
        value: 'Other',
    },
];
