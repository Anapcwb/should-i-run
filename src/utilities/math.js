//this function converts users' inputs that contain hours and minutes to unix timestamp
//for the purpose of taking expiry of the parking ticket for the duration input and then add it to the current time
export function parkingDuration(hour, minute) {
  //convert hours to seconds
  var hrs = hour * (3600 * 1000);
  //convert minutes to seconds
  var mns = minute * (60 * 1000);
  //add hour seconds and minute seconds to current time and return
  return hrs + mns + Date.now();
}

/*var res = parkingDuration(10, 10);
console.log(Date.now() + " > " + res);*/

//this function works out at what time a notification should be sent to the users
function notifyUser(notificationTime) {
  //take a unix time number
  //remove 5 minutes (60*5 in unix seconds) and 5% (100 - 5% = 95 and then tranforms it into a fraction 0.95) of the total time
  var percent = notificationTime * 0.95;
  var fixed = Math.round(percent - 300);
  if (fixed < 0) {
    fixed = 0;
  }
  return fixed;
}

/*var data = 1571840528;
var res = notifyUser(data);
console.log(data, res);*/

//this function takes in latitude and longitude of two locations
//and returns the distance between them as the crow flies (in km)
function calculateCoordinate(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
//this function converts numeric degrees to radians and is used in calculateCoordinate function
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

/*const distance = calculateCoordinate(
  59.3293371,
  13.4877472,
  59.3225525,
  13.4619422
);
console.log(distance);*/

//this function works out if users have travelled too far based on the time between now and the expiry
function calculateSteps(currentTime, expiryTime, distanceBetweenLocations) {
  console.log(currentTime, expiryTime, distanceBetweenLocations);

  //this variable stores the remaining time for users to travel: current time minus the expiry time
  var timeLeft = expiryTime - currentTime;
  console.log(timeLeft);

  //this variable stores how many fractions of a km that users can travel per second
  var distanceCanTravelPerSecond = 1 / 3600;
  //this variable stores how far the users can travel in milliseconds by dividing timeLeft with 1000
  var distanceUsersCanTravel = distanceCanTravelPerSecond * (timeLeft / 1000);
  console.log(distanceCanTravelPerSecond, distanceUsersCanTravel);

  if (distanceBetweenLocations > distanceUsersCanTravel) {
    return false;
  }
  return true;
}

/*var res = calculateSteps(Date.now(), Date.now() + 1000000, 0.10001);
console.log(res);*/
