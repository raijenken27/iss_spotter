// Contains logics for fetching data from endpoints
// jshint esversion : 6
const request = require('request-promise-native');


/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

/*
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input: JSON string containing IP's `latitude` and `longitude`
 * Returns: Promise of request for fly over times
 */
const issFlyOverTime = function(body) {
  const location = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${location.lat}&lon=${location.lon}&n=5`);
};


/*
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(issFlyOverTime)
    .then(body => {
      return JSON.parse(body).response;
    });
};


module.exports = nextISSTimesForMyLocation;