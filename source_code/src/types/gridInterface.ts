export interface GuidelineTemplate {
    id: number;
    organizationId: {
        id: number;
        name: string;
        code: string;
        organizationType: string;
        key: string;
    };
    name: string;
    description: string;
    type: string;
    isSystemGenerated: boolean;
    createdBy: {
        firstName: string;
        lastName: string;
        id: number;
        organizationId: {
            id: number;
            name: string;
            code: string;
            organizationType: string;
            key: string;
        };
        username: string;
        userTypeId: {
            id: number;
            name: string;
            type: string;
        };
    };
    createdDate: string;
    modifiedBy: {
        id: number;
        organizationId: {
            id: number;
            name: string;
            code: string;
            organizationType: string;
            key: string;
        };
        username: string;
        userTypeId: {
            id: number;
            name: string;
            type: string;
        };
    };
    modifiedDate: string;
    publishedBy: {
        id: number;
        firstName: string;
        lastName: string;
        organizationId: {
            id: number;
            name: string;
            code: string;
            organizationType: string;
            key: string;
        };
        username: string;
        userTypeId: {
            id: number;
            name: string;
            type: string;
        };
    };
    publishedOn: string;
    status: {
        id: number;
        name: string;
        type: string;
    };
}
