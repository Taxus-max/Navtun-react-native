import axiosService from "./axiosService";
import dbhandler from "./dbhandler";

const getSchedule = (credentials) => {
    var startDate = new Date().getTime();
    var endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 5);
    endDate = endDate.getTime();

    //Debug section//
    console.log(credentials)
    console.log(startDate);
    console.log(endDate);
    //==//

    var id = credentials.id.toUpperCase()

    var data = JSON.stringify({
        "needAllDaylong": false,
        "Time": true,
        "Exam": true,
        "Task": true,
        "Apointment": true,
        "RegisterList": true,
        "Consultation": true,
        "startDate": `/Date(${startDate})/`,
        "endDate": `/Date(${endDate})/`,
        "UserLogin": id,
        "Password": credentials.password
    });

    let result = axiosService.getCalendar(data)
        .then(function (response) {
            if (response.data.ErrorMessage == null) {
                dbhandler.createTable();
                for(var i =0;i<response.data.calendarData.length;i++){
                    var data = response.data.calendarData[i]
                    dbhandler.insertTable(data.title.split("-")[0].slice(6), data.location.split(" ")[0], data.title.split("-")[1].split("(")[1].slice(0,-2), String(new Date(parseInt(data.start.split("(")[1].slice(0,-2)))), String(new Date(parseInt(data.end.split("(")[1].slice(0,-2)))) )
                }
                //dbhandler.getCalendar().then(response => console.log(response))
                return true
                //save credentails 
            } else {
                return false
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    return result
}

export default getSchedule