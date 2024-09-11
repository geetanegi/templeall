

export const computeTableHeaders = (userType: string) =>{
    if (userType === 'player') {
         return [
            { id: 1, field: "Name" },
            { id: 2, key: "userName", field: "Username" },
            { id: 3, key: "email", field: "Email Address" },
            { id: 4, key: "status", field: "Status" },
        ]
    } else if (userType === 'courseAdmin' || userType === 'superAdmin') {
        return [
            { id: 1, field: "Name" },
            { id: 2, key: "userName", field: "Username" },
            { id: 3, key: "email", field: "Email Address" },
            { id: 4, key: "Action", field: "Action" },
        ]
    }else {
        return []
    }
}




