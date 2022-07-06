var http = require('http'); 
const fs = require('fs');
var static = require('node-static');  
const fetch = require('node-fetch');
var file = new static.Server('./client');   
let port = 6226;   

http.createServer(function(req, res){


    if(req.url === '/weather/forecast/24p'){
        onForecastWeatherRequest()
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
        onCurrentWeatherRequest()
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

    if(req.url === '/data/get'){
        onFileDataRequest()
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
    res.end()
}).listen(port);

console.log(`Server running on port ${port}`);

class Configurations{
   static webServer = 'http://localhost:7227';
   static resourceForForecastWeather = 'weather/forecast/24p';
   static resourceForCurrentWeather = 'weather/current';
   static resourceForFileData = 'data/get';
   static directory = '../data/';
}

class APILayer{
    static sendRequestOnForecastWeather(){
        return fetch(`${Configurations.webServer}/${Configurations.resourceForForecastWeather}`)
        .then(resp => resp.text())
    }   
    static sendRequestOnCurrentWeather(){
        return fetch(`${Configurations.webServer}/${Configurations.resourceForCurrentWeather}`)
        .then(resp => resp.text())
    }   

    static sendRequestOnFileDta(){
        return fetch(`${Configurations.webServer}/${Configurations.resourceForFileData}`)
    }
}

function writeFile(path, content){
    fs.writeFile(path, JSON.stringify(content, null, '\t'), err => {
        if (err) {
            console.error(err);
        }
    });
}

function onCurrentWeatherRequest(){
    const currentWeatherAsync =  APILayer.sendRequestOnCurrentWeather()
    
    const content = `${Configurations.webServer}/${Configurations.resourceForCurrentWeather}`
    const pathAndName = `${Configurations.directory}/${Date.now()}.txt`

    currentWeatherAsync.then(() => {
        writeFile(pathAndName, content);
    })

    return currentWeatherAsync;
}

function onForecastWeatherRequest(){
    const forecastWeatherAsync =  APILayer.sendRequestOnForecastWeather()
    
    const content = `${Configurations.webServer}/${Configurations.resourceForForecastWeather}`
    const pathAndName = `${Configurations.directory}/${Date.now()}.txt`

    forecastWeatherAsync.then(() => {
        writeFile(pathAndName, content);
    })

    return forecastWeatherAsync;
}


function onFileDataRequest(){
    const fileDataAsync =  APILayer.sendRequestOnFileDta()
    
    const content = `${Configurations.webServer}/${Configurations.resourceForFileData}`


    const pathAndName = `${Configurations.directory}/${Date.now()}.txt`

    fileDataAsync.then(() => {
        writeFile(pathAndName, content);
    })

    return fileDataAsync;
}
