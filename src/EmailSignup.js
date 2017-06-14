import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import { firebaseData } from "./firebase-config";
import NameSignUp from "./NameSignup.js";
import { Form, Icon, Input, Button, Checkbox, Progress } from "antd";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './background.jpg';

class EmailSignup extends Component {
  state = {
    signUpUserEmail: "",
    validatedEmailProptoPass: ""
  };

  //Code for loading animation for sign-up button
  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  handleEmailChange = event => {
    this.setState({
      ...this.state,
      signUpUserEmail: event.target.value
    });
  };

  handleSignUp(event) {
    console.log("email: " + this.state.signUpUserEmail);
    this.validateEmail(this.state.signUpUserEmail);
    //push to database
  }

  validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      this.checkEmailInDatabase(email);
    } else {
      alert("Not a valid email.");
    }
  };

  checkEmailInDatabase = signUpUserEmail => {
    var existingEmail = firebase
      .database()
      .ref()
      .orderByChild("email")
      .equalTo(signUpUserEmail);

    existingEmail.once("value", snapshot => {
      if (snapshot.val() === null) {
        firebase.database().ref().push({
          email: signUpUserEmail
        });
        this.setState({
          ...this.state,
          emailVerified: true,
          validatedEmailProptoPass: signUpUserEmail
        });
      } else {
        alert("Account already exists.");
      }
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/SignUp" component={NameSignUp} />
          {!this.state.emailVerified &&
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
                  placeholder="Email"
                  size="large"
                  value={this.state.signUpUserEmail}
                  onChange={event => this.handleEmailChange(event)}
                />

                <Button
                  className="signup"
                  ghost
                  onClick={() => this.validateEmail(this.state.signUpUserEmail)}
                  disabled={!this.state.signUpUserEmail}
                >
                  Sign Up
                </Button>
              </div>
            </div>}
          <div>
            {this.state.emailVerified &&
              <Redirect
                to={{
                  pathname: "/SignUp",
                  state: { email: this.state.validatedEmailProptoPass }
                }}
                push={true}
              />}

          </div>

        </div>
      </Router>
    );
  }
}

export default EmailSignup;
