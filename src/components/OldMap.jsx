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

  london = {
    lat: 51.5074,
    lng: -0.1278
  };
  // render the map when component mounts
  componentDidMount() {
    this.renderMap();
  }

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

    const locations = [
      {
        title: 'Current Location',
        position: this.center,
        icon: 'https://img.icons8.com/metro/26/000000/running.png',
        map: this.map
      },
      {
        title: 'Stored Location',
        position: this.london,
        icon: 'https://img.icons8.com/material/24/000000/car--v1.png',
        map: this.map
      }
    ];

    // marker code goes here
    function addMarkers(locations) {
      locations.forEach(location => {
        const marker = new window.google.maps.Marker(location);
        console.log(location);
      });
    }

    addMarkers(locations);
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
