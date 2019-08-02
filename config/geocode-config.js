const geocode = require('geocode');

geocode.config({
  api_key: process.env.REACT_APP_GEOCODE_KEY
});