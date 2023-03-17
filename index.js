const { nextISSTimesForMyLocation } = require('./iss');
const { printPassTimes } = require('./printPassTimes');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  console.log(printPassTimes(passTimes));
});

module.exports = { printPassTimes };

//VVV ORIGINAL FUNCTION CALLS

// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('172.218.227.87', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned Geocode:" , data);
// });

// const coords = { latitude: "48.4284207", longitude: "-123.3656444" };

// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned Flyover Times:" , data);
// });
