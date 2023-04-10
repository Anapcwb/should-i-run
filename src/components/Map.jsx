import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import NoSession from "./NoSession";
import Session from "./Session";
import Input from "./Input";
import Marker from "./Marker";
import "../styles/GoogleMap.css";
import GOOGLE_API_KEY from "../apis/googleMapsApi";

// renders the GoogleMap and controls
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "noSession",
      inputTimes: null,
      sessionStartLocation: {
        lat: null,
        lng: null
      },
      expiryTime: 0
    };
  }

  // get the lat and long from props into an obj,
  //which is required by GoogleMapsReact component
  center = {
    lat: this.props.lat,
    lng: this.props.lng
  };

  // conditionally render the controls based on component state

  renderControls() {
    // 'setTimer' gets input from the user
    if (this.state.status === "setTimer") {
      return (
        <Input
          onClearSession={this.clearSession}
          onStartSession={this.startSession}
          onSetExpiry={this.setExpiry}
        />
      );
    }

    // 'inSession' displays the countdown timer and current and stored location markers
    if (this.state.status === "inSession") {
      return (
        <Session
          onClearSession={this.clearSession} // set state to noSession
          expiryTime={this.state.expiryTime} // set the expiry time
          addMessage={this.props.addMessage} // add a new message to the array
          removeMessages={this.props.removeMessages} // clear all the messages
          storedLocation={this.state.sessionStartLocation} // store the current location in state
          currentLocation={{ lat: this.props.lat, lng: this.props.lng }} // take the current location from props
        />
      );
    }

    // display the 'Start Session' button
    return <NoSession onSetTimer={this.setTimer} />;
  }

  // the method takes an array of marker objects and returns Marker components
  renderMarkers(markers) {
    if (markers !== null) {
      return markers.map(marker => {
        return (
          <Marker
            key={marker.title}
            lat={marker.lat}
            lng={marker.lng}
            img_src={marker.icon}
          />
        );
      });
    }
  }

  //callback functions that set Map state from children
  // in this state the Input controls will render
  setTimer = () => {
    this.setState({ status: "setTimer" });
  };

  // in this state the 'Home' controls will render
  clearSession = () => {
    this.setState({ status: "noSession" });
  };

  // in this state the Session controls will render
  startSession = expiration => {
    this.setState({
      status: "inSession",

      // set the current location and expiry time
      sessionStartLocation: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      expiryTime: expiration
    });
  };

  // sets options Google Maps
  createMapOptions = () => {
    return {
      zoomControl: false,
      fullscreenControl: false
    };
  };

  render() {
    const markers = [
      {
        // this is current location of the user
        title: "Current Location",
        lat: this.props.lat,
        lng: this.props.lng,
        icon: "https://i.imgur.com/9Fho7kq.png"
      }
    ];

    this.state.status === "inSession" &&
      markers.unshift({
        // this is the optional location of the car,
        // only rendered once a session has begun
        title: "Stored Location",
        lat: this.state.sessionStartLocation.lat,
        lng: this.state.sessionStartLocation.lng,
        icon: "https://i.imgur.com/4lwh63l.png"
      });

    return (
      <div id="map">
        <GoogleMapReact
          options={this.createMapOptions} // Google Maps options
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }} //  Google Maps API key
          defaultCenter={this.center} // lat & long values
          defaultZoom={16} // zoom setting on the map
        >
          {/* render the markers on the map */}
          {this.renderMarkers(markers)}
        </GoogleMapReact>
        {/* render the Input or Session controls  */}
        {this.renderControls()}
      </div>
    );
  }
}

export default Map;
