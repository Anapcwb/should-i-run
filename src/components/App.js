import React, { Component } from "react";
import "../styles/App.css";
import Loading from "./Loading";
import Map from "./Map";
import Message from "./Message";
import Header from "./Header";
import Location from "../utilities/Location";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state.location is dynamically updated with getLocation method
      location: {
        lat: null,
        lng: null,
        time: null
      },
      isLoading: true,
      //gpsSignal: false,
      messageToSend: "",
      messageIdToSend: 0,
      messages: [
        {
          //id: 1,
          //time: Date.now() + 5000,
          //content: "Your parking time is running out!"
        }
        /*{
          id: 2,
          time: Date.now() + 10000,
          content:
            "You have gone too far away from your vehicle, you are going to struggle to get back in time!"
        },
        {
          id: 3,
          time: Date.now() + 15000,
          content:
            "Considering the remaining time of your parking ticket, the distance you are from your vehicle means that you need to head back to your vehicle now!"
        },
        {
          id: 4,
          time: Date.now() + 20000,
          content: "Your parking time has run out!"
        }*/
      ]
    };

    /*this method is called inside the constructor method, because it manipulates the state*/
    //this.getLocation();
    this.location = new Location("debug"); //or live
    //this.setLocation();
    //console.log("location:", this.location.position);
  }

  //this.interval is a variable created in this App class component that calls checkMessage method in setInterval to access the properties of Messages state
  componentDidMount() {
    this.interval = setInterval(() => this.scheduledTasksInterval(), 1000);
    //console.log(this.state.messages);
    //this.removeMessages();
    this.addMessage(1570669322, "Parking message");
  }

  componentDidUpdate() {
    //console.log(this.state.messages);
  }

  render() {
    return (
      <div className="styleApp">
        {/*this method is called inside the render method, because it outputs the display*/}
        {this.getActiveScreen()}
        {/*this is a conditional rendering using shorthand if statement that only applies when a method cannot be called from the render method because it has more than one or two rendering methods at once*/}
        {!this.state.isLoading ? this.getMessage() : null}
      </div>
    );
  }

  scheduledTasksInterval() {
    this.checkMessage();
    this.checkLocation();
  }

  checkLocation() {
    if (this.location.position.lat !== null) {
      this.setLocation();
    }
  }

  setLocation = () => {
    let coordinates = {};
    //console.log(this.location.position);
    //     //these setState change the state.location.lat and state.location.long dynamically with the coordinates variable to retrieve user's current location,
    //     //change state.isLoading to false to notify that the loading screen has been loaded
    //     //change state.gpsSignal to true to notify that the GPS signal to retrieve the location has been found
    coordinates.lat = this.location.position.lat;
    coordinates.lng = this.location.position.lng;
    this.setState({ location: coordinates });
    this.setState({ isLoading: false });
    //     //this.setState({ gpsSignal: true });

    //   console.log(this.state);

    //     //this updates the state.location.time in a form of unix timestamp
    //     coordinates.time = Date.now();
  };

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
          lng={this.state.location.lng}
          timestamp={this.state.location.time}
          removeMessages={this.removeMessages}
          addMessage={this.addMessage}
        />
      </React.Fragment>
    );
  }

  checkMessage() {
    this.setState({
      location: {
        lat: this.state.location.lat + 0.001,
        long: this.state.location.long + 0.001
      }
    });

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
      <Message msgButton={this.msgButton} msg={this.state.messageToSend} />
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
    //this.setState({ messageIdToSend: this.state.messages.id });
    this.setState({ messageToSend: "" });
  };

  removeMessages() {
    this.setState({ messages: {} });
  }

  addMessage(unixTime, content) {
    //create an obj based on the props its gonna get
    var pushMsg = {
      id: getRandomId(123456789121, 234567891234),
      time: unixTime,
      content: content
    };
    //push this obj into messages array
    this.state.messages.push(pushMsg);
    //random id
    function getRandomId(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  }
}
export default App;
