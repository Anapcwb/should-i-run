import React, { Component } from 'react';
import NoSession from './NoSession';
import Session from './Session';
import Input from './Input';
import '../styles/GoogleMap.css';
import { GOOGLE_MAPS_API } from '../apis/googleMapsApi';

class Map extends Component {
  // initialize component state
  state = {
    status: 'noSession',
    inputTimes: null,
    sessionStartLocation: {
      lat: null,
      lng: null
    },
    expiryTime: '00:00'
  };

  // declare fields
  map = undefined;
  runningMarker = undefined;
  carMarker = undefined;

  // set the center location for the map received from App
  center = {
    lat: this.props.lat,
    lng: this.props.lng
  };

  // render the map when component mounts
  componentDidMount() {
    this.renderMap();
    //this.addMarkers();
  }

  // addMarkers() {
  //   // add markers to the map
  //   this.runningMarker.setMap(this.map);

  //   // add the car marker only when in a session
  //   // FIXME: this is not currently rendering, needs fixing
  //   // (need to be able to call setMap from outside the scope of initMap)
  //   if (this.state.status === 'inSession') {
  //     this.carMarker.setMap(this.map);
  //   }
  // }

  // load the Google Maps script tag
  renderMap = () => {
    loadScript(GOOGLE_MAPS_API);
    window.initMap = this.initMap;
  };

  // Initialize and add the map
  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: this.center
    });
    console.log(window.google);

    // marker code goes here

    // define markers
    // TODO: change to the colored icons used in the prototype
    this.runningMarker = new window.google.maps.Marker({
      position: this.center,
      icon: 'https://img.icons8.com/metro/26/000000/running.png'
    });

    this.carMarker = new window.google.maps.Marker({
      posistion: this.center,
      icon: 'https://img.icons8.com/material/24/000000/car--v1.png'
    });

    // add markers to the map
    this.runningMarker.setMap(this.map);
    console.log('Running: ', this.runningMarker);

    // add the car marker only when in a session
    // FIXME: this is not currently rendering, needs fixing
    // (need to be able to call setMap from outside the scope of initMap)
    this.carMarker.setMap(this.map);
    console.log('Car: ', this.carMarker);
  };

  // conditionally render the controls based on component state
  renderControls() {
    if (this.state.status === 'noSession') {
      return <NoSession onSetTimer={this.setTimer} />;
    } else if (this.state.status === 'setTimer') {
      return (
        <Input
          onClearSession={this.clearSession}
          onStartSession={this.startSession}
          onSetExpiry={this.setExpiry}
        />
      );
    } else if (this.state.status === 'inSession') {
      return (
        <Session
          onClearSession={this.clearSession}
          expiryTime={this.state.expiryTime}
        />
      );
    }
  }

  render() {
    return (
      <main>
        <div id="map"></div>
        {this.renderControls()}
      </main>
    );
  }

  //callback functions that set Map state from children
  setTimer = () => {
    this.setState({ status: 'setTimer' });
  };

  clearSession = () => {
    this.setState({ status: 'noSession' });
  };

  startSession = () => {
    this.setState({
      status: 'inSession',

      sessionStartLocation: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
  };

  setExpiry = expiration => {
    this.setState({
      expiryTime: expiration
    });
  };
}

// append the Google Maps <script> tag to the document
function loadScript(url) {
  let index = window.document.getElementsByTagName('script')[0];
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default Map;
