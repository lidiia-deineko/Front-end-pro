var http = require('http'); 
var static = require('node-static');  
const fetch = require('node-fetch');
let port = 7227;   

const TelegramBot = require('node-telegram-bot-api');

const token = '5493368270:AAHGl7e1_aBdgMP4W_rTR5DYGs1fCa7ZjAQ';

const bot = new TelegramBot(token, {polling: true});

http.createServer(function(req, res){

    if(req.url === '/weather/forecast/24p'){
        onForecastWeatherRequest()
        .then(weather => {
            let infoData = [];
            weather.list.forEach((item) => {
              const temp =  Number((item.main.temp - 273.15).toFixed(2));
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

             let msg = ''
             infoData.forEach((item) => {
                msg += `<i>The time: </i><b>${item.time}</b>\n<i>The temp: </i><b>${item.temp} °C</b>\n\n`;
             })

            bot.sendMessage(726578508, msg, {parse_mode: "HTML"});
            res.write(JSON.stringify(infoData));
            res.end();
        })
        return;
    }

    if(req.url === '/weather/current'){
      onCurrenttWeatherRequest()
      .then(weather => {
        const currentWeatherKelvin = weather.main.temp;
        const currentWeatherCelsius = Number((currentWeatherKelvin - 273.15).toFixed(2)); 
        bot.sendMessage(726578508, `<i>The current weather: </i><b>${JSON.stringify(currentWeatherCelsius)} °C</b>`, {parse_mode: "HTML"});
        res.write(JSON.stringify(currentWeatherCelsius));
        res.end(); 
      })

      return;
    }

    res.write('hello BotApiWrapperService');
    res.end()
}).listen(port);
console.log(`Server running on port ${port}`);


class Configurations{
    static openWeatherAPI = 'https://api.openweathermap.org/data/2.5';
    static weatherKey = 'dacb51a8819e8befbdcc509145419487';
}

class APILayer{
    static loadForecastWeather(){
        return fetch(`${Configurations.openWeatherAPI}/forecast?lat=48.51656&lon=34.61273&appid=${Configurations.weatherKey}`)
        .then(resp => resp.json())
    }

    static loadCurrentWeather(){
      return fetch(`${Configurations.openWeatherAPI}/weather?lat=48.51656&lon=34.61273&appid=${Configurations.weatherKey}`)
      .then(resp => resp.json()); 
  } 
}

function onForecastWeatherRequest(){
  const forecastWeatherAsync = APILayer.loadForecastWeather();

  return forecastWeatherAsync;
}

function onCurrenttWeatherRequest(){
  const currentWeatherAsync = APILayer.loadCurrentWeather();

  return currentWeatherAsync;
}
