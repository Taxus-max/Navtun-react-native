var axios = require('axios');

export default axios.create({
    baseURL: 'https:///neptun-ws01.uni-pannon.hu/hallgato/MobileService.svc',
    headers: { 
        'Content-Type': 'application/json'
      },
})