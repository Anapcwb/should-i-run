import React, { Component } from "react";
import Loading from "./Loading";
import Map from "./Map";
import Message from "./Message";
import Header from "./Header";
import Location from "../utilities/Location";
import "../styles/App.css";
import { GEO_ERRORS } from "../utilities/config";

//this is the main component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state.location is dynamically updated with getLocation method
      location: {
        lat: null,
        lng: null,
        time: null,
        errorMessage: ""
      },
      isLoading: true,
      messageToSend: "",
      messageIdToSend: 0,
      messages: []
    };

    //this method is called inside the constructor method, because it manipulates the state
    this.location = new Location("test"); // call with 'test' as argument for testing
  }

  componentDidMount() {
    //this.interval is a variable created in this App class component that runs the timer for scheduled tasks
    this.interval = setInterval(() => this.scheduledTasksInterval(), 1000);
  }

  //this is run every second by the timer
  scheduledTasksInterval() {
    this.checkMessage();
    this.checkLocation();
  }

  //this function is checking if there is a location available
  checkLocation() {
    if (this.location.position.lat !== null) {
      this.setLocation();
    }
    if (this.location.position.error.code) {
      this.setState({
        location: {
          errorMessage: GEO_ERRORS[this.location.position.error.code - 1]
        }
      });
    }
  }

  //this function sets the location of users when there is a location available
  setLocation = () => {
    let coordinates = {};
    //these setState change the state.location.lat and state.location.lng dynamically
    //with the coordinates variable to retrieve user's current location,
    //change state.isLoading to false to notify that the loading screen has been loaded
    coordinates.lat = this.location.position.lat;
    coordinates.lng = this.location.position.lng;
    this.setState({ location: coordinates });
    this.setState({ isLoading: false });
  };

  //this method is a conditional rendering that checks isLoading
  //if it remains true, then displays Loading subcomponent, else, displays Map subcomponent.
  getActiveScreen() {
    //console.log(this.state.errorMessages);
    if (this.state.isLoading) {
      return <Loading message={this.state.location.errorMessage} />;
    }
    return (
      <React.Fragment>
        <Header />
        <Map
          lat={this.state.location.lat}
          lng={this.state.location.lng}
          timestamp={this.state.location.time}
          removeMessages={this.clearMessages}
          addMessage={this.addMessage}
        />
      </React.Fragment>
    );
  }

  //this function checks if there is a message to be delivered
  checkMessage() {
    for (let i = 0; i < this.state.messages.length; i++) {
      //for each object in messages array, check if its time is less than the current time
      if (this.state.messages[i].time < Date.now()) {
        //this stores the content of the message in messageToSend empty string value
        this.setState({
          messageToSend: this.state.messages[i].content,
          messageIdToSend: this.state.messages[i].id
        });
      }
    }
  }

  //this is s conditional rendering to check whether there is a message due to be delivered
  //and display it in Message subcomponent, otherwise return nothing
  renderMessage() {
    if (this.state.messageToSend === "") {
      return;
    }
    return (
      <Message msgButton={this.removeMessage} msg={this.state.messageToSend} />
    );
  }

  //this is a callback function; therefore, it uses fat arrow function to bind the function in this class component
  //this function removes a message from the messages array
  removeMessage = () => {
    //remove every content in messages array by comparing the index of messages.id with the index of messageIdToSend
    var index = this.state.messages.findIndex(
      m => m.id === this.state.messageIdToSend
    );
    this.state.messages.splice(index, 1);
    this.setState({ messageToSend: "" });
  };

  //this function clears all messages
  clearMessages = () => {
    this.setState({ messageToSend: "" });
    this.setState({ messages: [] });
  };

  //this function adds a message to the messages array
  addMessage = (unixTime, content) => {
    //create an obj based on the inputs
    var pushMsg = {
      id: Math.round(Math.random() * 1000000000),
      time: unixTime,
      content: content
    };

    //push this obj into messages array
    this.state.messages.push(pushMsg);
  };

  render() {
    return (
      <div className="styleApp">
        {/*this method is called inside the render method, because it outputs the display*/}
        {this.getActiveScreen()}
        {/*this is a conditional rendering using shorthand if statement that only applies when a method cannot be called from the render method because it has more than one or two rendering methods at once*/}
        {!this.state.isLoading ? this.renderMessage() : null}
      </div>
    );
  }
}
export default App;
