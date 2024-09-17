// import React from 'react';

type ClientIdType = {
    childId: number;
    firstName: string | null;
    lastName: string | null;
};

export default function useFullName({
    clientId,
}: {
    clientId: ClientIdType;
}): any {
    const fullName = `${clientId.firstName} ${clientId.lastName}`;
    return fullName;
}
