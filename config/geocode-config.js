const geocode = require('geocode');
const openweather = require('openweather');

openweather.config({
  apikey: process.env.OPEN_WEATHER_KEY  
})

geocode.config({
  apikey: process.env.REACT_APP_GEOCODE_KEY
});
