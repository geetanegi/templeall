export interface Values {
    parentFirstName: string;
    parentLastName: string;
    cellPhone: string;
    homePhone: string;
    workEmail: string;
    gender: string;
    dateOfBirth: { startDate: string; endDate: string };
    password: string;
    confirmPassword: string;
    policy: boolean;
}

export interface ParentInfo {
    parentFullname: string;
    id: string;
    createdDate: string; // ISO 8601 format date-time string
    modifiedDate: string; // ISO 8601 format date-time string
    parentFirstname: string;
    parentLastname: string;
    phoneNumber: string;
    workPhone: string | null;
    homePhone: string;
    dateOfBirth: string; // ISO 8601 format date
    email: string;
    gender: string;
    policy: boolean;
}
