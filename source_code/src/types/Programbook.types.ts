interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    roleName: string;
    organizationId: number;
}

interface Status {
    id: number;
    value: string;
}

interface UserChild {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Content {
    id: number;
    createdBy: User;
    createdDate: string;
    name: string;
    dischargeDate: string;
    dischargeReason: string;
    assignedTo: User;
    assignedOn: string;
    modifiedBy: User;
    modifiedDate: string;
    domainCount: number;
    domainCountAchieved: number;
    programCount: number;
    programCountAchieved: number;
    targetCount: number;
    targetCountAchieved: number;
    status: Status;
    isTemplate: boolean;
    userChildId: UserChild;
    programBookUUID: string;
}
