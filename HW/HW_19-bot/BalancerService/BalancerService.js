var http = require('http'); 
var static = require('node-static');  
const fetch = require('node-fetch');
let port = 6226;   

http.createServer(function(req, res){

    if(req.url === '/weather/forecast/24p'){
        APILayer.sendRequestOnForecastWeather()
        .then(() => {
            res.write('Request to BalanserService is delivered');
            res.end();
        })
        .catch(() => {
            res.statusCode = 400;
            res.write(`statusCode: ${res.statusCode}`);
            res.end();
        })
        return
    }

    if(req.url === '/weather/current'){
        APILayer.sendRequestOnCurrentWeather()
        .then(() => {
            res.write('Request to BalanserService is delivered');
            res.end();
        })
        .catch(() => {
            res.statusCode = 400;
            res.write(`statusCode: ${res.statusCode}`);
            res.end();
        })
        return
    }

    res.write('It is BalancerService');
    res.end();
}).listen(port);

console.log(`Server running on port ${port}`);

class Configurations{
   static webServer = 'http://localhost:7227';
}

class APILayer{
    static sendRequestOnForecastWeather(){
        return fetch(`${Configurations.webServer}/weather/forecast/24p`)
        .then(resp => resp.text())
    }   
    static sendRequestOnCurrentWeather(){
        return fetch(`${Configurations.webServer}/weather/current`)
        .then(resp => resp.text())
    }   
}




