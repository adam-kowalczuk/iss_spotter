//MAKES A SINGLE API REQUEST TO FETCH THE USER'S API ADDRESS

const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//FETCHING GEOCODE (LATITUDE AND LONGITUDE)

const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const msg = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(msg), null);
      return;
    }

    const geocode = {latitude: parsedBody.latitude, longitude: parsedBody.longitude};
    callback(null, geocode);
  });
};

//USES COORDINATES TO FETCH FLYOVER TIMES

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const parsedBody = JSON.parse(body).response;
    callback(null, parsedBody);
  });
};


//TIES TOGETHER ABOVE 3 FUNCTIONS AND OUTPUTS FLYOVER TIMES BASED ON USER'S IP AND GEOCODE

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, nextPass) => {
        if (error) {
          return callback(error, null);
        }

         callback(null, nextPass);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};
