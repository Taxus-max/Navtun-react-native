import axiosService from "./axiosService";

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
            console.log(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data.ErrorMessage));

            if (response.data.ErrorMessage == null) {
                return true
                //Alright,save credentails and then data into db
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