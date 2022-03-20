var axios = require('axios');

const getSchedule = (credentials) => {
    //Debug section
    console.log(credentials)
    ////
    var currentDate = new Date()

    console.log(currentDate)
    var id = credentials.id.toUpperCase()
    var data = JSON.stringify({
        "needAllDaylong": false,
        "Time": true,
        "Exam": true,
        "Task": true,
        "Apointment": true,
        "RegisterList": true,
        "Consultation": true,
        "startDate": "/Date(1647789762000)/",
        "endDate": "/Date(1648048962000)/",
        "UserLogin": id,
        "Password": credentials.password
    });

    var config = {
        method: 'post',
        url: 'https://neptun11.uni-pannon.hu/hallgato/MobileService.svc/GetCalendarData',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });



    return true
}

export default getSchedule