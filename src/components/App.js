import React, { Component } from "react";
import "../styles/App.css";
import Loading from "./Loading";
import Map from "./Map";
import Message from "./Message";
import Header from "./Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state.location is dynamically updated with getLocation method
      location: {
        lat: null,
        long: null,
        time: null
      },
      isLoading: true,
      gpsSignal: false,
      messageToSend: "",
      messageIdToSend: 0,
      messages: [
        {
          id: 1,
          time: Date.now() + 5000,
          content: "Your parking time is expiring."
        },
        {
          id: 2,
          time: Date.now() + 10000,
          content: "Your parking duration has expired."
        }
      ]
    };

    /*this method is called inside the constructor method, because it manipulates the state*/
    this.getLocation();
  }

  //this.interval is a variable created in this App class component that calls checkMessage method in setInterval to access the properties of Messages state
  componentDidMount() {
    this.interval = setInterval(() => this.checkMessage(), 1000);
  }

  render() {
    return (
      <div>
        <Header />
        {/*this method is called inside the render method, because it outputs the display*/}
        {this.getActiveScreen()}
        {/*this is a conditional rendering using shorthand if statement that only applies when a method cannot be called from the render method because it has more than one or two rendering methods at once*/}
        {!this.state.isLoading ? this.getMessage() : null}
      </div>
    );
  }

  getLocation() {
    let coordinates = {};
    // get coordinates from geolocation api
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(position => {
        coordinates = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };

        //these setState change the state.location.lat and state.location.long dynamically with the coordinates variable to retrieve user's current location,
        //change state.isLoading to false to notify that the loading screen has been loaded
        //change state.gpsSignal to true to notify that the GPS signal to retrieve the location has been found
        this.setState({ location: coordinates });
        this.setState({ isLoading: false });
        this.setState({ gpsSignal: true });

        console.log(this.state);

        //this updates the state.location.time in a form of unix timestamp
        coordinates.time = Date.now();
      });
    } else {
      /* geolocation IS NOT available */
      console.log("geolocation is not available");

      //this setState change the gpsSignal state back to false,
      //when there is no network after the app has been loaded and the location has been retrieved
      this.setState({ gpsSignal: false });
    }

    //outputs value of coordinates
    return coordinates;
  }

  //this method is a conditional rendering that updates the state of isLoading
  //if it remains true, then displays Loading subcomponent, else, displays Map subcomponent.
  getActiveScreen() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Header />
        <Map
          lat={this.state.location.lat}
          lng={this.state.location.long}
          timestamp={this.state.location.time}
        />
      </React.Fragment>
    );
  }

  checkMessage() {
    console.log("I just ran!");
    //call display rel message    //iterate over messages array
    for (let i = 0; i < this.state.messages.length; i++) {
      //for each object in messages array, check if its time is less than the current time
      if (this.state.messages[i].time < Date.now()) {
        //if so, add a message component
        //return <Message />;
        /*console.log(
          "I HAVE A MESSAGE",
          this.state.messages[i].time,
          Date.now()
        );*/

        //this stores the iterated content of Messages in messageToSend empty string value
        this.setState({
          messageToSend: this.state.messages[i].content,
          messageIdToSend: this.state.messages[i].id
        });
      }
    }
  }

  //this is s conditional rendering to check whether there is a message due to be delivered and display it in Message subcomponent, otherwise return nothing
  getMessage() {
    if (this.state.messageToSend === "") {
      return;
    }
    return (
      <Message msg={this.state.messageToSend} msgButton={this.msgButton} />
    );
  }

  //this is a callback function; therefore, it uses fat arrow function to update the state of this.
  //this method is passed in msgButton property as msgButton={this.msgButton} to be rendered in conditional rendering.
  msgButton = () => {
    //fat arrow to bind this
    console.log("buttonClicked");
    //remove every content in messages array by comparing the index of messages.id with the index of messageIdToSend
    var index = this.state.messages.findIndex(
      m => m.id === this.state.messageIdToSend
    );
    this.state.messages.splice(index, 1);
    console.log(this.state.messageIdToSend, index);
    this.setState({ messageIdToSend: this.state.messages.id });
    this.setState({ messageToSend: "" });
  };
}
export default App;
