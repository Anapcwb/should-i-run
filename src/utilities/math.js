//this containes a number of generic math functions that provide utilities for the application

//this function converts users' inputs that contain hours and minutes to unix timestamp
//for the purpose of taking expiry of the parking ticket for the duration input and then add it to the current time
export function durationToExpiry(hour, minute) {
  //convert hours to seconds
  var hrs = hour * (3600 * 1000);
  //convert minutes to seconds
  var mns = minute * (60 * 1000);
  //add hour seconds and minute seconds to current time and return duration and current time
  return hrs + mns + Date.now();
}

//this function adds hour and minute in time to unix time
export function addTimeToUnix(hour, minute) {
  //convert hours to miliseconds
  var miliseconds = hour * (3600 * 1000);
  //convert minutes to miliseconds
  miliseconds += minute * (60 * 1000);
  //add hour seconds and minute seconds to midnight time in unix and return it
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var oneDay = 86400 * 1000; //one day in milliseconds

  //this is to work out if the time is in the past then that means it is the day after
  if (hour < hours) {
    //if input hour is less than hour now that means tomorrow's time
    return miliseconds + now.setHours(0, 0, 0, 0) + oneDay;
  }
  if (hour === hours && minute < minutes) {
    //if the current hour, but minute is in the past, that means tomorrow's time
    //setHours() is a metod of Date class that sets hour, minute, second and milisecond as parameters
    return miliseconds + now.setHours(0, 0, 0, 0) + oneDay;
  }
  return miliseconds + now.setHours(0, 0, 0, 0);
}

//this function works out at what time a notification should be sent to the users
export function getEarlyNotificationUnix(expiryTime) {
  //take a unix time number
  //remove 5 minutes (60*5 in unix seconds) and 5% (100 - 5% = 95 and then tranforms it into a fraction 0.95) of the total time
  var math = expiryTime - Date.now(); //stores duration
  math = math * 0.95; //deduct the duration by 5%
  math = Math.round(math - 300000); //deduct the duration by 5mins
  //if duration less than 0 it then uses 0 to convert negative num
  if (math < 0) {
    math = 0;
  }
  //add the current time to the modified duration
  return math + Date.now();
}

//this function takes in latitude and longitude of two locations
//and returns the distance between them as the crow flies (in km)
function calculateDistanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
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

//this function converts km per hour to km per second
function getKmPerSecond(kmPerHour) {
  //returns km per seconds
  return kmPerHour / 3600;
}

//this function returns an integer based on the distance and the time
//the integer increases as the distance becomes greater or the time becomes lower
function canYouMakeIt(dist, time) {
  time = Math.round((time - Date.now()) / 1000); //time to duration
  let distanceCanTravel = time * getKmPerSecond(1); //how far users can go
  let fixedTimeMargin = 300 * getKmPerSecond(1); //extra margin of 5 mins if users run
  let distanceCanTravelIfYouRun = distanceCanTravel * 2; //how far users can go if they run
  distanceCanTravelIfYouRun += fixedTimeMargin; //final calculation if users can run with some extra time
  let distanceCanTravelIfSlow = distanceCanTravel * 0.8; //how far users can go if they walk slowly

  if (dist < distanceCanTravelIfSlow) {
    //if users walk slowly within the distance and time
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

//this function takes in expiry time and two locations
export function geoNotificationStatus(expiryTime, locationOne, locationTwo) {
  //get distance between car and person
  const distance = calculateDistanceBetweenCoordinates(
    locationOne.lat,
    locationOne.lng,
    locationTwo.lat,
    locationTwo.lng
  );

  //return the status of canYouMakeIt
  return canYouMakeIt(distance, expiryTime);
}
