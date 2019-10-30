export default class Location {
  watchID = null;

  onPositionReceived = position => {
    console.log(position);
    this.position.lat = position.coords.latitude;
    this.position.lng = position.coords.longitude;
    this.position.unixtime = new Date();
  };

  locationNotReceived = positionError => {
    console.log("Posistion Error: ", positionError);
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.onPositionReceived,
        this.locationNotReceived
      );
      this.watchID = navigator.geolocation.watchPosition(
        this.onPositionReceived,
        this.locationNotReceived
      );
    }
  };

  clearPositionWatch = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };

  position = {
    lat: null,
    lng: null,
    unixtime: null
  };

  config = {
    increment: 0.001,
    totalSteps: 10,
    currentStep: 0,
    direction: "forwards"
  };

  squareWalk = () => {
    console.log(this.config);
    const intervalID = setInterval(function() {
      if (this.config.currentStep < this.config.totalSteps) {
        if (
          this.config.direction === "forwards" ||
          this.config.direction === "backwards"
        ) {
          this.position.lat =
            this.config.direction === "forwards"
              ? (this.position.lat += this.config.increment)
              : (this.position.lat -= this.config.increment);
        } else if (
          this.config.direction === "left" ||
          this.config.direction === "right"
        ) {
          this.position.lng =
            this.config.direction === "left"
              ? (this.position.lng += this.config.increment)
              : (this.position.lng -= this.config.increment);
        }
        this.config.currentStep += 1;
      } else {
        this.config.currentStep = 0;
        this.config.direction =
          this.config.direction === "forwards"
            ? "left"
            : this.config.direction === "left"
            ? "backwards"
            : this.config.direction === "backwards"
            ? "right"
            : "forwards";
      }
      console.log(this.position);
    }, 500);
  };
}
