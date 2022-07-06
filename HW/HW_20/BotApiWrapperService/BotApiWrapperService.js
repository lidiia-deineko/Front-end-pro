var http = require('http'); 
const fs = require('fs');
var static = require('node-static');  
const fetch = require('node-fetch');
var file = new static.Server('./client');   
let port = 7227;   

const TelegramBot = require('node-telegram-bot-api');
const { resolve } = require('path');
const { time } = require('console');

const token = '5493368270:AAHGl7e1_aBdgMP4W_rTR5DYGs1fCa7ZjAQ';

const bot = new TelegramBot(token, {polling: true});

http.createServer(function(req, res){

    if(req.url === '/weather/forecast/24p'){
        onForecastWeatherRequest()
        .then(weather => {
            let infoData = [];
            weather.list.forEach((item) => {
              const temp = item.main.temp;
              const time = item.dt_txt;
              
              const tempAndTime = {
                temp,
                time
              }

              if(infoData.length > 7){
                return;
              }
             
              infoData.push(tempAndTime)
             })

            bot.sendMessage(726578508, JSON.stringify(infoData, null, '\t'));
            res.write(JSON.stringify(infoData));
            res.end();
        })
        return;
    }

    if(req.url === '/weather/current'){
      onCurrenttWeatherRequest()
      .then(weather => {
        const currentWeather = weather.main.temp;
        bot.sendMessage(726578508, JSON.stringify(currentWeather, null, '\t'));
        res.write(JSON.stringify(currentWeather));
        res.end();
      })

      return;
    }
    
    if(req.url === '/data/get'){
      let readDirRequest = onReadDirectoryRequest()
      readDirRequest
      .then((files) => {
        let readFileRequests = []
        files.forEach((file) => {
          readFileRequests.push(onReadFileRequest(file)) 
        })
        Promise.all(readFileRequests)
        .then((datas) => {
          
          if(datas.length != files.length){
            res.statusCode = 400;
            res.write(`statusCode: ${res.statusCode}`);
            res.end();
            return;
          }

          let objDataRequest = {}
          datas.forEach((data, index) => {
            let dateStr = files[index].split('.')[0];
            let date = new Date(Number(dateStr)).toLocaleString();
            objDataRequest[date] = data;

            console.log(typeof(data))
            console.log('date', typeof(date))
            console.log('objDataRequest', typeof(objDataRequest))
            
          })

          bot.sendMessage(726578508, JSON.stringify(objDataRequest, null, '\t'));
          res.write(JSON.stringify(objDataRequest, null, '\t'));
          res.end();
        })

      })

      return
    }

    res.write('hello BotApiWrapperService');
    res.end()

}).listen(port);
console.log(`Server running on port ${port}`);


class Configurations{
    static openWeatherAPI = 'https://api.openweathermap.org';
    static weatherKey = 'dacb51a8819e8befbdcc509145419487';
    static resourceForForecastWeather = 'data/2.5/forecast';
    static resourceForCurrentWeather = 'data/2.5/weather';
    static getParamsForForecastWeather = `lat=48.51656&lon=34.61273&appid=${Configurations.weatherKey}`;
    static getParamsForCurrentWeather = `lat=48.51656&lon=34.61273&appid=${Configurations.weatherKey}`;
    static directory = '../data';
}

class APILayer{
    static loadForecastWeather(){
        return fetch(`${Configurations.openWeatherAPI}/${Configurations.resourceForForecastWeather}?${Configurations.getParamsForForecastWeather}`)
        .then(resp => resp.json())
    }

    static loadCurrentWeather(){
      return fetch(`${Configurations.openWeatherAPI}/${Configurations.resourceForCurrentWeather}?${Configurations.getParamsForCurrentWeather}`)
      .then(resp => resp.json());
  } 
}

function writeFile(path, content){
  fs.writeFile(path, JSON.stringify(content, null, '\t'), err => {
      if (err) {
          console.error(err);
      }
  });
}

function onForecastWeatherRequest(){
  const forecastWeatherAsync = APILayer.loadForecastWeather();

  const content = `${Configurations.openWeatherAPI}/${Configurations.resourceForForecastWeather}?${Configurations.getParamsForForecastWeather}`
  const pathAndName = `${Configurations.directory}/${Date.now()}.txt`

  forecastWeatherAsync.then(() => {
    writeFile(pathAndName, content)
  })

  return forecastWeatherAsync;
}


function onCurrenttWeatherRequest(){
  const currentWeatherAsync = APILayer.loadCurrentWeather();

  const content = `${Configurations.openWeatherAPI}/${Configurations.resourceForCurrentWeather}?${Configurations.getParamsForCurrentWeather}`
  const pathAndName = `${Configurations.directory}/${Date.now()}.txt`

  currentWeatherAsync.then(() => {
    writeFile(pathAndName, content)
  });

  return currentWeatherAsync;
}

function onReadDirectoryRequest(){
  
  return new Promise((resolve, reject) => {
   const obj = {}
    fs.readdir(`${Configurations.directory}`, (err, files) => {
      if (err) {
        console.error(err);
        reject(err)
        return;
      }
     
      resolve(files)

    });
  }) 
}

function onReadFileRequest(file){
    return new Promise((resolve, reject) => {
      fs.readFile(`${Configurations.directory}/${file}`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(data)
      })
    })
}


