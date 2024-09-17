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
    name: string;
    type: string;
}

export interface Template {
    id: number;
    name: string;
    description: string;
    type: string;
    isSystemGenerated: boolean;
    isSynchronized: boolean;
    createdBy: User;
    createdDate: string; // Alternatively, you could use Date if you parse it
    publishedBy: User;
    publishedOn: string; // Alternatively, you could use Date if you parse it
    status: Status;
    activeStatus: string;
}
