import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import NoSession from "./NoSession";
import Session from "./Session";
import Input from "./Input";
import Marker from "./Marker";
import "../styles/GoogleMap.css";
import { GOOGLE_API_KEY } from "../apis/googleMapsApi";

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
      expiryTime: "00:00"
      //markers: []
    };
    //this.location = new Location("debug"); //debug or live
  }

  // set the center location for the map received from App
  center = {
    lat: this.props.lat,
    lng: this.props.lng
  };

  // conditionally render the controls based on component state
  renderControls() {
    if (this.state.status === "noSession") {
      return <NoSession onSetTimer={this.setTimer} />;
    } else if (this.state.status === "setTimer") {
      return (
        <Input
          onClearSession={this.clearSession}
          onStartSession={this.startSession}
          onSetExpiry={this.setExpiry}
        />
      );
    } else if (this.state.status === "inSession") {
      return (
        <Session
          onClearSession={this.clearSession}
          expiryTime={this.state.expiryTime}
          addMessage={this.props.addMessage}
          removeMessages={this.props.removeMessages}
          storedLocation={this.state.sessionStartLocation}
          currentLocation={{ lat: this.props.lat, lng: this.props.lng }}
        />
      );
    }
  }

  renderMarkers(markers) {
    if (markers !== null) {
      return markers.map((marker, i) => {
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

  render() {
    const markers = [
      {
        title: "Current Location",
        lat: this.props.lat,
        lng: this.props.lng,
        icon: "https://i.imgur.com/9Fho7kq.png"
      }
    ];

    this.state.status === "inSession" &&
      markers.unshift({
        title: "Stored Location",
        lat: this.state.sessionStartLocation.lat,
        lng: this.state.sessionStartLocation.lng,
        icon: "https://i.imgur.com/4lwh63l.png"
      });

    return (
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={this.center}
          defaultZoom={13}
        >
          {this.renderMarkers(markers)}
        </GoogleMapReact>
        {this.renderControls()}
      </div>
    );
  }

  //callback functions that set Map state from children
  setTimer = () => {
    this.setState({ status: "setTimer" });
  };

  clearSession = () => {
    this.setState({ status: "noSession" });
  };

  startSession = expiration => {
    this.setState({
      status: "inSession",

      sessionStartLocation: {
        lat: this.props.lat,
        lng: this.props.lng
      },
      expiryTime: expiration
    });
  };

  // setExpiry = expiration => {
  //   this.setState({
  //     expiryTime: expiration
  //   });
  // };
}

export default Map;
