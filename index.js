const nextISSTimesForMyLocation = require('./iss');

nextISSTimesForMyLocation((err, nextTimes, location) => {
  if (!err) {
    console.log(`For ${location}:`);
    for (let nextTime of nextTimes) {
      let dateTime = new Date(0);
      dateTime.setUTCSeconds(nextTime.risetime);
      console.log(`Next pass at ${dateTime} for ${nextTime.duration} seconds!`);
    }
  } else {
    console.log(err);
  }
});