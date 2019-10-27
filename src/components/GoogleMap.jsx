import React, { Component } from 'react';
import '../styles/GoogleMap.css';
import { GOOGLE_MAPS_API } from '../apis/googleMapsApi';

export default class GoogleMap extends Component {
  // render the map when component mounts
  componentDidMount() {
    this.renderMap();
  }

  // load the script tag
  renderMap = () => {
    loadScript(GOOGLE_MAPS_API);
    window.initMap = this.initMap;
  };

  // Initialize and add the map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: this.props.zoom,
      center: this.props.center
    });
    //var marker = new google.maps.Marker({ position: this.props.center, map: map });
  };

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
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
