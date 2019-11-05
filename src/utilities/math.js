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

export function timeToUnix(hour, minute) {
  //convert hours to seconds
  var hrs = hour * (3600 * 1000);
  //convert minutes to seconds
  var mns = minute * (60 * 1000);
  //add hour seconds and minute seconds and return
  return hrs + mns;
}

export function addTimeToUnix(hour, minute) {
  //convert hours to seconds
  var hrs = hour * (3600 * 1000);
  //convert minutes to seconds
  var mns = minute * (60 * 1000);
  //add hour seconds and minute seconds to midnight time in unix and return it
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var oneDay = 86400 * 1000;

  if (hour < hours) {
    return hrs + mns + now.setHours(0, 0, 0, 0) + oneDay;
  }
  if (hour === hours && minute < minutes) {
    return hrs + mns + now.setHours(0, 0, 0, 0) + oneDay;
  }
  return hrs + mns + now.setHours(0, 0, 0, 0);
}

/*var res = parkingDuration(10, 10);
console.log(Date.now() + " > " + res);*/

//this function works out at what time a notification should be sent to the users
export function notifyUser(expiryTime) {
  //take a unix time number
  //remove 5 minutes (60*5 in unix seconds) and 5% (100 - 5% = 95 and then tranforms it into a fraction 0.95) of the total time
  var duration = expiryTime - Date.now();
  var percent = duration * 0.95; //(Date.now() - notificationTime) * 0.95;
  var fixed = Math.round(percent - 300000);
  if (fixed < 0) {
    fixed = 0;
  }
  console.log(fixed);
  return fixed + Date.now();
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

function convert_KmPerHr_To_KmPerSec() {
  return 1 / 3600;
}
function convertMinToSecUnix(num) {
  return num * 60;
}
function tooFar(dist, time) {
  time = Math.round((time - Date.now()) / 1000); //time to duration

  let distanceCanTravel = time * convert_KmPerHr_To_KmPerSec();
  let fixedTimeMargin = 300 * convert_KmPerHr_To_KmPerSec();
  let distanceCanTravelIfYouRun = distanceCanTravel * 2;
  let distanceCanTravelIfSlow = distanceCanTravel * 0.8;
  distanceCanTravelIfYouRun += fixedTimeMargin;
  console.log(dist, distanceCanTravelIfSlow);
  if (dist < distanceCanTravelIfSlow) {
    //add padding to geofence
    return 0;
  } else {
    if (dist > distanceCanTravel) {
      //checks if too far
      if (dist < distanceCanTravelIfYouRun) {
        //check if too far when running
        return 2; //run
      }
      return 3; //you are too far away
    } else {
      return 1; //walk
    }
  }
}

/*let car = {
  lat: 1.004,
  lng: 1.004
};

let person = {
  lat: 1,
  lng: 1
};

geoNotificationStatus(Date.now() + 9500000, car, person);*/

function geoNotificationStatus(expiryTime, car, person) {
  //console.log(car.lat, car.long);

  //task 1, get distance between car and person
  const distance = calculateCoordinate(
    car.lat,
    car.lng,
    person.lat,
    person.lng
  );

  //task 2, call are you too far
  const checkNotification = tooFar(distance, expiryTime);
  console.log(distance, expiryTime);
  console.log(">>>>>", checkNotification);
  return checkNotification;
}
