const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIp = function(callback) {
  request('https://api.ipify.org?format=json', (err, resp, body) => {
    if (err) {
      callback(`Error: Unable to obtain the IP from ipify.org.\n ${err}.`);
    } else if (resp.statusCode !== 200) {
      callback(`Error: Unable to obtain the IP from ipify.org.\n Status Code: ${resp.statusCode}.\n Response: ${body}`);
    } else {
      const ip = JSON.parse(body).ip;
      if (ip) {
        callback(null, ip);
      } else {
        callback('Error: Could not obtain your IP address');
      }
    }
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat, lng, and location as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' , location: 'Toronto, Ontario, Canada'}
 */
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (err, resp, body) => {
    if (err) {
      return callback(`Error: Could not obtain GeoLocation from ip-api.com. ${err}`);
    } else if (resp.statusCode !== 200) {
      return callback(`Error: ${resp.statusCode} response code received from 'ip-api.com.' ${body}`);
    } else {
      const result = JSON.parse(body);
      if (result.status.toLowerCase() === 'success') {
        return callback(null, {
          latitude: result.lat.toString(),
          longitude: result.lon.toString(),
          location: result.city + ', ' + result.regionName + ', ' + result.country
        });
      } else {
        return callback(`Error: Could not obtain GeoLocation from ip-api.com. Status: ${result.status}`);
      }
    }
  });
};

module.exports = { fetchMyIp, fetchCoordsByIP };
