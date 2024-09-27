

export const computeMediaHeaders = (tab:number) =>{
    if(tab === 1){
        return  [
            { id: 1, key:"contestName", field: "Contest Name" },
            { id: 2, key: "club", field: "Club" },
            { id: 3, key: "course", field: "Course" },
            { id: 4, key: "hole", field: "Hole" },
            { id: 5, key: "tee", field: "Tee" },
            { id: 6, key: "playerUsername", field: "Player Username" },
            { id: 7, key: "date", field: "Date" },
            { id: 8, key: "time", field: "Time" },
            { id: 9, key: "uploade", field: "Upload" },
        ]
    }else if(tab === 2){
        return  [
            { id: 1, key:"playerUsername", field: "Player Username" },
            { id: 2, key:"requestDate", field: "Request Date" },
            { id: 3, key: "contestName", field: "Contest Name" },
            { id: 4, key: "club", field: "Club" },
            { id: 5, key: "course", field: "Course" },
            { id: 6, key: "hole", field: "Hole" },
            { id: 7, key: "tee", field: "Tee" },
            { id: 8, key: "date", field: "Date" },
            { id: 9, key: "time", field: "Time" },
            { id: 10, key: "status", field: "Status" },
            { id: 11, key: "uploade", field: "Upload" },
        ]
    }else if (tab === 3){
        return  [
            { id: 1, key:"contestName", field: "Contest Name" },
            { id: 2, key: "club", field: "Club" },
            { id: 3, key: "course", field: "Course" },
            { id: 4, key: "hole", field: "Hole" },
            { id: 5, key: "tee", field: "Tee" },
            { id: 6, key: "playerUsername", field: "Player Username" },
            { id: 7, key: "date", field: "Date" },
            { id: 8, key: "time", field: "Time" },
            { id: 9, key: "actions", field: "Actions" },
        ]
    }else{
        return []
    }
   
}