const request = require('request');

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFyaWtyaXNobmFuMTkwODE5OTEiLCJhIjoiY2tkN2R2eDVnMGFreDJybm52MWY5bGhneiJ9.kutbij1D656a0CBCjIJPLg';

    request({json: true, url}, (error, {body})=>{
    if(error){
        callback('Unable to connect to location service', undefined);
    }else if(body.features.length ===0){
        callback('Please provide valid query parameter', undefined);
    }else{
        callback(undefined, {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1]
        });
    };
    });
};

module.exports = geocode;