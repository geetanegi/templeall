

export const computeTableHeaders = (userType: string) =>{
    if (userType === 'player') {
         return [
            { id: 1, key: "firstName", field: "Name", isSort: true },
            { id: 2, key: "username", field: "Username", isSort: true },
            { id: 3, key: "email", field: "Email Address", isSort: true },
            { id: 4, key: "status", field: "Status", isSort: false },
        ]
    } else if (userType === 'courseAdmin' || userType === 'superAdmin') {
        return [
            { id: 1, key:"firstName", field: "Name", isSort: true},
            { id: 2, key: "username", field: "Username", isSort: true },
            { id: 3, key: "email", field: "Email Address", isSort: true },
            { id: 4, key: "Action", field: "Action", isSort: false },
        ]
    }    
    else {
        return []
    }
}




