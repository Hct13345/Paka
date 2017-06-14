import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import { firebaseData } from "./firebase-config";
import { Form, Icon, Input, Button, Checkbox, Progress } from "antd";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ReferralPage from "./Referral Page";

class NameSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpUserName: "",
      signUpUserNumber: ""
    };
  }

  handleNameChange = event => {
    this.setState({
      signUpUserName: event.target.value
    });
  };

  handleNumberChange = event => {
    this.setState({
      signUpUserNumber: event.target.value
    });
  };

  validateInput = (name, number) => {
    var reName = /^[a-z ,.'-]+$/i;
    var reNumber = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i;
    if (name) {
      if (reName.test(name)) {
        this.addNametoDatabase(name);
        if (number) {
          if (reNumber.test(number)) {
            this.addNumbertoDatabase(number);
          } else {
            alert("Use only numbers; dashes optional.");
            this.setState({
              ...this.state,
              signUpUserNumber: ""
            });
          }
        }
      } else {
        alert("Numbers and special characters not allowed.");
        this.setState({
          ...this.state,
          signUpUserName: ""
        });
      }
    } else {
      alert("Name Required");
      this.setState({
        ...this.state,
        signUpUserNumber: "",
        signUpUserName: ""
      });
    }
  };

  addNametoDatabase = name => {
    var linkNameToUser = firebase
      .database()
      .ref()
      .orderByChild("email")
      .equalTo(this.props.location.state.email);
    linkNameToUser.once("value", snapshot => {
      var key = Object.keys(snapshot.val())[0];
      firebase.database().ref(key).update({
        name: name,
        id: this.makeid()
      });
    });
  };

  addNumbertoDatabase = number => {
    var linkNumberToUser = firebase
      .database()
      .ref()
      .orderByChild("email")
      .equalTo(this.props.location.state.email);

    linkNumberToUser.once("value", snapshot => {
      var key = Object.keys(snapshot.val())[0];
      firebase.database().ref(key).update({
        number: number
      });
    });
  };

  makeid = () => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  render() {
    console.log(this.props.location.state.email);
    return (
      <div>
      <Router>

        <div className="background">
          <p1>
            <img
              src="http://i.imgur.com/B7YQozS.png"
              height="250"
              width="575"
            />
          </p1>
          <div className="centerbox">
            <Input
              className="TextField"
              type="text"
              placeholder="Name"
              size="large"
              value={this.state.signUpUserName}
              onChange={event => this.handleNameChange(event)}
            />
            {/*<Input
              className="TextField"
              type="text"
              placeholder="Number"
              size="large"
              value={this.state.signUpUserNumber}
              onChange={event => this.handleNumberChange(event)}
            />*/}
            <Button
              className="signup"
              ghost
              onClick={() =>
                this.validateInput(
                  this.state.signUpUserName,
                  this.state.signUpUserNumber
                )}
              value="Sign Up"
              disabled={!this.state.signUpUserName}
            >
              Name
            </Button>
            <Route exact path="/Referral" component={ReferralPage} />
            <Link to="/Referral">
              <Button value="Next Page">
                Go to Next Page
              </Button>
            </Link>
          </div>
        </div>
      </Router>
       <ReferralPage/>
       </div>

    );
  }
}

export default NameSignUp;
