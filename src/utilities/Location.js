/**
 * This class provides location data from the Geolocation API
 * It can simulate movemnent if instantiated in 'test' mode
 * (const Location = new Location('test))
 */
import { WALK_CONFIG } from "../utilities/config";

export default class Location {
  // the constructor initiates the getLocation process
  constructor(mode) {
    this.mode = mode;
    this.getLocation();
  }

  position = {
    error: {},
    lat: null,
    lng: null,
    unixtime: null
  };

  // this method takes a positon object as an argument and sets the position
  // property of the class. It also sets a unix timestamp
  onPositionReceived = position => {
    this.position.lat = position.coords.latitude;
    this.position.lng = position.coords.longitude;
    this.position.unixtime = Date.now();
    // if the class is in 'test'mode, run the walking simulation
    if (this.mode === "test") {
      this.squareWalk();
    }
  };

  // this method handles location errors
  locationNotReceived = positionError => {
    this.position.error = positionError; // add the error message to the position property
    //position error object is immutable even when copied as is actually interface

    //if we are in test mode, start location as London and initiates squarewalk
    if (this.mode === "test") {
      this.position.lat = 51.5;
      this.position.lng = -0.127;
      this.squareWalk();
    }
  };

  // calls the Geolocation API to get the current location
  getLocation = () => {
    if (navigator.geolocation) {
      // check if a location is available
      navigator.geolocation.getCurrentPosition(
        // gets a quick location
        this.onPositionReceived,
        this.locationNotReceived
      );
      if (this.mode !== "test") {
        this.watchID = navigator.geolocation.watchPosition(
          // update location when more accurate data available
          this.onPositionReceived,
          this.locationNotReceived
        );
      }
    }
  };

  // This method can be called stop the watchPosition method
  clearPositionWatch = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };

  // initiate the simulated movement (when in test mode)
  squareWalk = () => {
    this.intervalID = setInterval(() => this.intervalWalk(), 100);
  };

  // update the coordinates
  intervalWalk = () => {
    // increment or decrement the longitide or lattitude based on the direction
    if (WALK_CONFIG.currentStep < WALK_CONFIG.totalSteps) {
      if (
        WALK_CONFIG.direction === "forwards" ||
        WALK_CONFIG.direction === "backwards"
      ) {
        this.position.lat =
          WALK_CONFIG.direction === "forwards"
            ? (this.position.lat += WALK_CONFIG.increment)
            : (this.position.lat -= WALK_CONFIG.increment);
      } else if (
        WALK_CONFIG.direction === "left" ||
        WALK_CONFIG.direction === "right"
      ) {
        this.position.lng =
          WALK_CONFIG.direction === "left"
            ? (this.position.lng += WALK_CONFIG.increment)
            : (this.position.lng -= WALK_CONFIG.increment);
      }
      WALK_CONFIG.currentStep += 1;
    } else {
      // reset the counter and change direction
      WALK_CONFIG.currentStep = 0;
      WALK_CONFIG.direction =
        WALK_CONFIG.direction === "forwards"
          ? "left"
          : WALK_CONFIG.direction === "left"
          ? "backwards"
          : WALK_CONFIG.direction === "backwards"
          ? "right"
          : "forwards";
    }
  };

  // can be used to stop the simulation
  clearSquareWalk = () => {
    clearInterval(this.interval);
  };
}
