const nextISSTimesForMyLocation = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(nextTimes => {
    for (let nextTime of nextTimes) {
      let dateTime = new Date(0);
      dateTime.setUTCSeconds(nextTime.risetime);
      console.log(`Next pass at ${dateTime} for ${nextTime.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log(error.message);
  });