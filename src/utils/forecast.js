const request = require('request');

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6777f6570893c3e04e6272472a9704dc&query='+lat+','+long;

    request({json: true, url},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(body.error){
            callback(undefined, 'Please specify a valid location identifier using the query parameter');
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degree celsius out. It feels like '+body.current.feelslike+' degree celsius.');
        }
    });
}

module.exports = forecast;