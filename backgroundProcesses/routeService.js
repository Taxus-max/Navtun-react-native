let openrouteservice = require("openrouteservice-js");
let Directions = new openrouteservice.Directions({ api_key: "5b3ce3597851110001cf62483a5368980037414ea31d528316f74770"});

const routeService = () =>{
    Directions.calculate({
        coordinates: [[0,0],[0,0]], //coords [[xx.x,yy.yy],[xx.x,yy.yy]]
        profile: 'foot-walking',
        format: 'json'
    }).then((json) => {
        console.log(JSON.stringify(json));
    }).catch((err) => {
            console.error(err);
    });
}

export default routeService