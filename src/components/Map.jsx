import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import NoSession from './NoSession';
import Session from './Session';
import Input from './Input';
import CurrentLocation from './CurrentLocation';
import StoredLocation from './StoredLocation';
import GoogleMap from './GoogleMap';

class Map extends Component {
  state = {
    status: 'noSession',
    inputTimes: null,
    sessionStartLocation: {
      lat: null,
      lng: null
    },
    expiryTime: '00:00'
  };

  // set the center location for the map
  center = {
    lat: this.props.lat,
    lng: this.props.lng
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
    console.log(this.state);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '100%' }}>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDAFhz0X6KXxM9_WZKe5B8S5Spfc8ubscM' }}
          defaultCenter={this.center}
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.state.status === 'inSession' && (
            <StoredLocation
              lat={this.state.sessionStartLocation.lat}
              lng={this.state.sessionStartLocation.lat}
            />
          )}
          <CurrentLocation lat={this.props.lat} lng={this.props.lng} />
          <CurrentLocation lat={this.props.lat + 1} lng={this.props.lng + 1} />
        </GoogleMapReact> */}

        <GoogleMap center={this.center} zoom={15}></GoogleMap>

        {this.renderControls()}
      </div>
    );
  }

  //callback functions
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

export default Map;
