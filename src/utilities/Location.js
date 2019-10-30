export default class Location {
  watchID = null;

  onPositionReceived(position) {
    console.log(position);
  }

  locationNotReceived(positionError) {
    console.log('Posistion Error: ', positionError);
  }

  getLocation() {
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
  }

  clearPositionWatch() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}
