const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine, views location and registerPartials method in hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Harikrishnan Ramanathan'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Harikrishnan Ramanathan'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Guide',
        helpMessage: 'This is Help Page for the needy on how to use the Weather Application',
        paragraph: 'In the Home Page, Enter a valid value related to a location and get the Weather Information',
        name: 'Harikrishnan Ramanathan'
    });
});

app.get('/weather', (req, res)=>{
    const add = req.query.address;
    if(!add){
        return res.send({
            error: 'Kindly provide an address term'
        });
    };
    geocode(add, (error, {longitude, latitude, location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastedData)=>{
            if(error){ 
                return res.send({error})
            };
            res.send({
                forecast: forecastedData,
                location,
                address: add
            });
        });
    });
});

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 'Error',
        message: 'Help article not found',
        name: 'Harikrishnan Ramanathan'   
    });
});

app.get('*', (req, res)=>{
    res.render('error', {
        title: 'Error',
        message: 'Page not found',
        name: 'Harikrishnan Ramanathan'
    });
});

app.listen(port, ()=>{
    console.log('Server is up on port '+port);
});