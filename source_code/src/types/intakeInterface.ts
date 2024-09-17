export interface UserDataIntake {
    id: number; // Unique identifier for the user
    createdDate: string; // ISO 8601 date-time string for when the record was created
    modifiedDate: string | null; // ISO 8601 date-time string or null if not modified
    parentFirstname: string; // First name of the parent
    parentLastname: string; // Last name of the parent
    phoneNumber: string; // Phone number in international format
    workPhone: string; // Encrypted or encoded work phone number
    homePhone: string; // Encrypted or encoded home phone number
    userChildren: string; // Encrypted or encoded list of user children
    dateOfBirth: string; // Date of birth in ISO 8601 format (YYYY-MM-DD)
    email: string; // Email address
    addressLine1: string; // Primary address line
    addressLine2: string; // Secondary address line (can be empty)
    city: string; // City
    state: string; // State or region
    zipCode: string; // Postal or ZIP code
    primaryLanguage: string; // Primary language spoken
}
export interface ChildInfo {
    name: string;
    dateOfBirth: string;
    desiredServices: string[];
    asdDiagnosis: string;
    diagnosisGivenBy: string;
    dateOfASDDiagnosis: string;
    currentChallenges: string;
    gender: string;
    locationOfPriorABATherapy: string;
    otherDiagnosis: string;
    dateOfLastEvaluation: string;
    locationOfPriorSpeechTherapy: string;
    SpeechTherapydateOfLastEvaluation: string;
    locationOfPriorOccupationalTherapy: string;
    OccupationalTherapydateOfLastEvaluation: string;
    schoolHours: string;
    availabilityForEvaluation: string;
    primaryInsuranceProvider: string;
    secondaryInsuranceProvider: string;
    subscriberName: string;
    subscriberDateofBirth: string;
    subscriberID: string;
    groupNumber: string;
    ABAdateOfLastEvaluation: string;
    PhysicalTherapydateOfLastEvaluation: string;
    CounsellingOfPriorTherapy: string;
    CounsellingdateOfLastEvaluation: string;
}

interface ChildData {
    name: string;
    dateOfBirth: string;
    desiredServices?: string[]; // Optional
    asdDiagnosis: string;
    diagnosisGivenBy?: string; // Optional
    dateOfASDDiagnosis?: string; // Optional
    currentChallenges?: string; // Optional
    gender: string;
    locationOfPriorABATherapy?: string; // Optional
    otherDiagnosis?: string; // Optional
    dateOfLastEvaluation?: string; // Optional
    locationOfPriorSpeechTherapy?: string; // Optional
    SpeechTherapydateOfLastEvaluation?: string; // Optional
    locationOfPriorOccupationalTherapy?: string; // Optional
    OccupationalTherapydateOfLastEvaluation?: string; // Optional
    schoolHours?: string; // Optional
    availabilityForEvaluation?: string; // Optional
    primaryInsuranceProvider?: string; // Optional
    secondaryInsuranceProvider?: string; // Optional
    subscriberName?: string; // Optional
    subscriberDateofBirth?: string; // Optional
    subscriberID?: string; // Optional
    groupNumber?: string; // Optional
    ABAdateOfLastEvaluation?: string; // Optional
    PhysicalTherapydateOfLastEvaluation?: string; // Optional
    CounsellingOfPriorTherapy?: string; // Optional
    CounsellingdateOfLastEvaluation?: string; // Optional
}

export interface FormValues {
    parentFullname: string;
    email: string;
    cellPhone: string;
    primaryLanguage: string;
    relationWithChild: string;
    dateOfBirth: string;
    homePhone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    userChildren: ChildData[];
}

export interface FormData1 {
    data: FormValues;
}
